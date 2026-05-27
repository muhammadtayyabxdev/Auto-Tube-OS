import Head from 'next/head';


import { Suspense, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/settings.module.css';
import { useAuth } from '@/hooks/useAuth';
import { useUser, useClerk } from '@clerk/nextjs';
import { AlertTriangle, ArrowDown, BarChart3, Bell, Bot, Check, CreditCard, Link2, Lock, Mail, Play, Receipt, Rocket, Shield, User, Users, XCircle, Zap } from 'lucide-react';
import { GroqIcon, GeminiIcon } from '@/components/BrandIcons';

function SettingsContent() {
  const router = useRouter(); const searchParams = useMemo(() => ({ get: (key: string) => { const val = router.query[key]; return Array.isArray(val) ? val[0] : (val || null); } }), [router.query]);
  

  // Active settings tab syncing
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | null>(null);

  // Sync tab from URL query params
  useEffect(() => {
    const tab = searchParams.get('tab');
    const validTabs = [
      'profile', 'security', 'notifications', 'integrations',
      'team', 'ai', 'billing', 'invoices', 'privacy', 'danger'
    ];
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab('profile');
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/settings?tab=${tab}`, undefined, { scroll: false });
  };

  // Toast System
  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
  };

  const { user } = useUser();
  const { signOut } = useClerk();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Get active plan from Clerk user metadata
  const currentPlan = (user?.publicMetadata?.plan as string || 'free').toLowerCase();

  // 1. Profile State
  const [profile, setProfile] = useState({
    firstName: 'Ahmed',
    lastName: 'Khan',
    email: 'ahmed@example.com',
    workspaceName: 'Finance YouTube',
    niche: 'Finance',
    market: 'US Market'
  });

  // Sync Clerk user with profile state
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      }));
    }
  }, [user]);

  const handleUpgrade = async (planName: 'pro' | 'agency') => {
    setLoadingPlan(planName);
    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          plan: planName,
          billingCycle: 'monthly'
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        if (window.LemonSqueezy) {
          window.LemonSqueezy.Url.Open(data.checkoutUrl);
        } else {
          window.location.href = data.checkoutUrl;
        }
      } else {
        alert(data.error || 'Failed to generate checkout link.');
      }
    } catch (error) {
      console.error('Upgrade checkout error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  // 2. Security State
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });

  const handlePasswordChange = (key: string, value: string) => {
    setPasswords(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.current) {
      triggerToast('Please enter your current password', 'error');
      return;
    }
    if (passwords.newPass.length < 8) {
      triggerToast('New password must be at least 8 characters', 'error');
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      triggerToast('Passwords do not match', 'error');
      return;
    }
    triggerToast('Password updated successfully!');
    setPasswords({ current: '', newPass: '', confirm: '' });
  };

  // 3. Notifications State
  const [notifications, setNotifications] = useState({
    weeklyReport: true,
    trendingAlerts: true,
    teamReminders: false,
    productUpdates: true,
    billingReminders: true
  });

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  interface IntegrationItem {
    id: string;
    name: string;
    sub: string;
    icon: React.ReactNode;
    connected: boolean;
  }

  // 4. Integrations State (Fully Interactive!)
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    { id: 'yt', name: 'YouTube Channel', sub: 'Finance Channel · 241K subscribers', icon: <Play size={16} />, connected: true },
    { id: 'ga', name: 'Google Analytics', sub: 'Track YouTube traffic to your website', icon: <BarChart3 size={16} />, connected: false },
    { id: 'bh', name: 'Beehiiv Newsletter', sub: 'Convert viewers to email subscribers', icon: <Mail size={16} />, connected: false },
    { id: 'gr', name: 'Groq API', sub: 'gsk_••••••••••3a2f · LLaMA 3.3 70B', icon: <GroqIcon size={16} />, connected: true },
    { id: 'gm', name: 'Google Gemini API', sub: 'Generate high retention scripts', icon: <GeminiIcon size={16} />, connected: false }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(int => {
      if (int.id === id) {
        const nextState = !int.connected;
        if (nextState) {
          triggerToast(`Connecting ${int.name}...`);
          setTimeout(() => {
            triggerToast(`${int.name} successfully connected!`);
          }, 800);
          return {
            ...int,
            connected: true,
            sub: id === 'ga' ? 'Connected to analytics-fy.json' : id === 'bh' ? 'Connected to FY Newsletter list' : 'Connected successfully'
          };
        } else {
          triggerToast(`Disconnected ${int.name}.`);
          return {
            ...int,
            connected: false,
            sub: id === 'ga' ? 'Track YouTube traffic to your website' : id === 'bh' ? 'Convert viewers to email subscribers' : 'Not connected'
          };
        }
      }
      return int;
    }));
  };

  // 5. AI Settings State
  const [aiSettings, setAiSettings] = useState({
    primaryProvider: 'Groq — LLaMA 3.3 70B',
    fallbackProvider: 'Gemini 2.0 Flash',
    defaultFormat: 'Listicle',
    retentionHooks: true,
    seoTags: true
  });

  const handleAISelect = (key: string, value: string) => {
    setAiSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleAISetting = (key: 'retentionHooks' | 'seoTags') => {
    setAiSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 6. Privacy State
  const [privacy, setPrivacy] = useState({
    analyticsCookies: true,
    productImprovement: false
  });

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Global Save Handler
  const handleSaveChanges = async () => {
    try {
      if (user) {
        await user.update({
          firstName: profile.firstName,
          lastName: profile.lastName,
        });
        triggerToast('Profile and settings updated successfully!');
      } else {
        triggerToast('Settings changes saved successfully!');
      }
    } catch (error: any) {
      console.error('Error saving profile changes:', error);
      triggerToast(error?.message || 'Failed to update profile', 'error');
    }
  };

  const tabTitles: Record<string, string> = {
    profile: 'Profile Details',
    security: 'Account Security',
    notifications: 'Notification Preferences',
    integrations: 'Workspace Integrations',
    team: 'Team Members',
    ai: 'AI Generator Settings',
    billing: 'Billing & Plan Details',
    invoices: 'Invoice History',
    privacy: 'Privacy & Data Protection',
    danger: 'Danger Zone Management'
  };

  return (
    <div className={styles.app}>
      {/* GLOBAL SIDEBAR */}
      <Sidebar />

      {/* MAIN SYSTEM */}
      <div className={styles.main}>
        {/* TOPBAR */}
        <div className={styles.topbar}>
          <div className={styles.tbTitle}>{tabTitles[activeTab] || 'Settings'}</div>
          <button className={styles.saveBtn} onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          
          {/* TOAST SYSTEM */}
          {toastMessage && (
            <div 
              style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                background: 'var(--s3)',
                border: `1px solid ${toastType === 'error' ? 'var(--red-border)' : 'var(--green-border)'}`,
                borderRadius: '10px',
                padding: '12px 18px',
                fontSize: '13px',
                color: toastType === 'error' ? 'var(--red)' : 'var(--green)',
                zIndex: 9999,
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {toastType === 'error' ? <XCircle size={16} /> : <Check size={16} />} {toastMessage}
            </div>
          )}

          {/* SETTINGS WORKSPACE GRID */}
          <div className={styles.settingsLayout}>
            
            {/* SUB SIDEBAR */}
            <div className={styles.subSidebar}>
              <div className={styles.sbSec}>Account</div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'profile' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('profile')}
              >
                <span className={styles.sbIcon}><User size={16} /></span> Profile
              </div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'security' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('security')}
              >
                <span className={styles.sbIcon}><Lock size={16} /></span> Security
              </div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'notifications' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('notifications')}
              >
                <span className={styles.sbIcon}><Bell size={16} /></span> Notifications
              </div>

              <div className={styles.sbSec}>Workspace</div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'integrations' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('integrations')}
              >
                <span className={styles.sbIcon}><Link2 size={16} /></span> Integrations
              </div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'team' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('team')}
              >
                <span className={styles.sbIcon}><Users size={16} /></span> Team
              </div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'ai' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('ai')}
              >
                <span className={styles.sbIcon}><Bot size={16} /></span> AI Settings
              </div>

              <div className={styles.sbSec}>Billing</div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'billing' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('billing')}
              >
                <span className={styles.sbIcon}><CreditCard size={16} /></span> Billing & Plan
              </div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'invoices' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('invoices')}
              >
                <span className={styles.sbIcon}><Receipt size={16} /></span> Invoices
              </div>

              <div className={styles.sbSec}>Data</div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'privacy' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('privacy')}
              >
                <span className={styles.sbIcon}><Shield size={16} /></span> Privacy
              </div>
              <div 
                className={`${styles.sbItem} ${activeTab === 'danger' ? styles.sbItemOn : ''}`}
                onClick={() => handleTabChange('danger')}
              >
                <span className={styles.sbIcon} style={{ color: 'var(--red)' }}><AlertTriangle size={16} /></span> Danger Zone
              </div>
            </div>

            {/* ACTIVE PANEL CONTENT */}
            <div className={styles.panelContent}>

              {/* ─── PROFILE PANEL ─── */}
              {activeTab === 'profile' && (
                <div>
                  <div className={styles.svTitle}>Profile</div>
                  <div className={styles.svSub}>Manage your personal information and workspace settings.</div>
                  
                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Personal Info</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '5px' }}>First Name</label>
                        <input 
                          className={styles.inpS} 
                          style={{ width: '100%' }} 
                          value={profile.firstName} 
                          onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '5px' }}>Last Name</label>
                        <input 
                          className={styles.inpS} 
                          style={{ width: '100%' }} 
                          value={profile.lastName} 
                          onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '5px' }}>Email</label>
                      <input 
                        className={styles.inpS} 
                        style={{ width: '100%' }} 
                        value={profile.email} 
                        type="email"
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '5px' }}>Workspace Name</label>
                      <input 
                        className={styles.inpS} 
                        style={{ width: '100%' }} 
                        value={profile.workspaceName} 
                        onChange={(e) => handleProfileChange('workspaceName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Preferences</div>
                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Primary Niche</div>
                        <div className={styles.srDesc}>Used for AI topic recommendations</div>
                      </div>
                      <select 
                        className={styles.inpS} 
                        value={profile.niche} 
                        onChange={(e) => handleProfileChange('niche', e.target.value)}
                      >
                        <option value="Finance">Finance</option>
                        <option value="AI & Tech">AI & Tech</option>
                        <option value="Self Improvement">Self Improvement</option>
                      </select>
                    </div>
                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Target Market</div>
                        <div className={styles.srDesc}>Region for trend analysis</div>
                      </div>
                      <select 
                        className={styles.inpS} 
                        value={profile.market} 
                        onChange={(e) => handleProfileChange('market', e.target.value)}
                      >
                        <option value="US Market">US Market</option>
                        <option value="Global">Global</option>
                        <option value="Pakistan">Pakistan</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SECURITY PANEL ─── */}
              {activeTab === 'security' && (
                <div>
                  <div className={styles.svTitle}>Security</div>
                  <div className={styles.svSub}>Manage your password and account security.</div>
                  
                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Password</div>
                    <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                      <div>
                        <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '5px' }}>Current Password</label>
                        <input 
                          className={styles.inpS} 
                          style={{ width: '100%' }} 
                          type="password" 
                          placeholder="••••••••" 
                          value={passwords.current}
                          onChange={(e) => handlePasswordChange('current', e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '5px' }}>New Password</label>
                        <input 
                          className={styles.inpS} 
                          style={{ width: '100%' }} 
                          type="password" 
                          placeholder="Min. 8 characters" 
                          value={passwords.newPass}
                          onChange={(e) => handlePasswordChange('newPass', e.target.value)}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '5px' }}>Confirm Password</label>
                        <input 
                          className={styles.inpS} 
                          style={{ width: '100%' }} 
                          type="password" 
                          placeholder="Repeat password" 
                          value={passwords.confirm}
                          onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                        />
                      </div>
                      <button type="submit" className={styles.saveBtn} style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
                        Update Password
                      </button>
                    </form>
                  </div>

                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Two-Factor Authentication</div>
                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Authenticator App</div>
                        <div className={styles.srDesc}>Use Google Authenticator or Authy</div>
                      </div>
                      <button className={styles.saveBtn} style={{ fontSize: '12px', padding: '7px 14px' }} onClick={() => triggerToast('Opening 2FA Setup Flow...')}>
                        Enable 2FA
                      </button>
                    </div>
                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Active Sessions</div>
                        <div className={styles.srDesc}>2 active sessions</div>
                      </div>
                      <button 
                        className={styles.dangerBtn} 
                        style={{ fontSize: '12px', padding: '7px 14px' }} 
                        onClick={() => triggerToast('All other sessions signed out!')}
                      >
                        Sign Out All
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── NOTIFICATIONS PANEL ─── */}
              {activeTab === 'notifications' && (
                <div>
                  <div className={styles.svTitle}>Notifications</div>
                  <div className={styles.svSub}>Choose what you want to be notified about.</div>
                  
                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Email Notifications</div>
                    
                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Weekly Performance Report</div>
                        <div className={styles.srDesc}>Channel stats every Monday</div>
                      </div>
                      <div 
                        className={`${styles.toggle} ${notifications.weeklyReport ? styles.toggleOn : ''}`}
                        onClick={() => toggleNotif('weeklyReport')}
                      >
                        <div className={styles.toggleThumb}></div>
                      </div>
                    </div>

                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Trending Topic Alerts</div>
                        <div className={styles.srDesc}>When viral ideas appear in your niche</div>
                      </div>
                      <div 
                        className={`${styles.toggle} ${notifications.trendingAlerts ? styles.toggleOn : ''}`}
                        onClick={() => toggleNotif('trendingAlerts')}
                      >
                        <div className={styles.toggleThumb}></div>
                      </div>
                    </div>

                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Team Task Reminders</div>
                        <div className={styles.srDesc}>When a task is completed or overdue</div>
                      </div>
                      <div 
                        className={`${styles.toggle} ${notifications.teamReminders ? styles.toggleOn : ''}`}
                        onClick={() => toggleNotif('teamReminders')}
                      >
                        <div className={styles.toggleThumb}></div>
                      </div>
                    </div>

                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Product Updates</div>
                        <div className={styles.srDesc}>New features and changelog emails</div>
                      </div>
                      <div 
                        className={`${styles.toggle} ${notifications.productUpdates ? styles.toggleOn : ''}`}
                        onClick={() => toggleNotif('productUpdates')}
                      >
                        <div className={styles.toggleThumb}></div>
                      </div>
                    </div>

                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Billing Reminders</div>
                        <div className={styles.srDesc}>Upcoming charges and invoices</div>
                      </div>
                      <div 
                        className={`${styles.toggle} ${notifications.billingReminders ? styles.toggleOn : ''}`}
                        onClick={() => toggleNotif('billingReminders')}
                      >
                        <div className={styles.toggleThumb}></div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ─── INTEGRATIONS PANEL ─── */}
              {activeTab === 'integrations' && (
                <div>
                  <div className={styles.svTitle}>Integrations</div>
                  <div className={styles.svSub}>Connect external services to power your workspace.</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {integrations.map(int => (
                      <div key={int.id} className={styles.intCard}>
                        <div className={styles.intIcon}>{int.icon}</div>
                        <div>
                          <div className={styles.intName}>{int.name}</div>
                          <div className={styles.intSub}>{int.sub}</div>
                        </div>
                        {int.connected ? (
                          <div 
                            className={`${styles.intStatus} ${styles.sConnected}`}
                            onClick={() => toggleIntegration(int.id)}
                            style={{ cursor: 'pointer' }}
                            title="Click to disconnect"
                          >
                            <Check size={16} /> Connected
                          </div>
                        ) : (
                          <div 
                            className={`${styles.intStatus} ${styles.sConnect}`}
                            onClick={() => toggleIntegration(int.id)}
                          >
                            Connect
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── TEAM PANEL ─── */}
              {activeTab === 'team' && (
                <div>
                  <div className={styles.svTitle}>Team</div>
                  <div className={styles.svSub}>Manage team members and permissions. Agency plan only.</div>
                  
                  <div className={styles.teamEmpty}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}><Users size={16} /></div>
                    <div style={{ fontFamily: 'var(--fh)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>
                      Team features require Agency plan
                    </div>
                    <div style={{ fontSize: '13px', marginBottom: '14px', color: 'var(--muted)' }}>
                      Upgrade to invite editors and scriptwriters.
                    </div>
                    <button className={styles.saveBtn} onClick={() => triggerToast('Opening checkout for Agency upgrade...')}>
                      Upgrade to Agency — $99/mo
                    </button>
                  </div>
                </div>
              )}

              {/* ─── AI SETTINGS PANEL ─── */}
              {activeTab === 'ai' && (
                <div>
                  <div className={styles.svTitle}>AI Settings</div>
                  <div className={styles.svSub}>Configure how AI generates content for your channels.</div>
                  
                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Default Model</div>
                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Primary AI Provider</div>
                        <div className={styles.srDesc}>Used for script and topic generation</div>
                      </div>
                      <select 
                        className={styles.inpS} 
                        value={aiSettings.primaryProvider} 
                        onChange={(e) => handleAISelect('primaryProvider', e.target.value)}
                      >
                        <option value="Groq — LLaMA 3.3 70B">Groq — LLaMA 3.3 70B</option>
                        <option value="Gemini 2.0 Flash">Gemini 2.0 Flash</option>
                        <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                      </select>
                    </div>

                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Fallback Provider</div>
                        <div className={styles.srDesc}>When primary is rate-limited</div>
                      </div>
                      <select 
                        className={styles.inpS} 
                        value={aiSettings.fallbackProvider} 
                        onChange={(e) => handleAISelect('fallbackProvider', e.target.value)}
                      >
                        <option value="Gemini 2.0 Flash">Gemini 2.0 Flash</option>
                        <option value="Groq — LLaMA 3.1 8B">Groq — LLaMA 3.1 8B</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Content Style</div>
                    
                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Default Script Format</div>
                        <div className={styles.srDesc}>Pre-selected in Script Generator</div>
                      </div>
                      <select 
                        className={styles.inpS} 
                        value={aiSettings.defaultFormat} 
                        onChange={(e) => handleAISelect('defaultFormat', e.target.value)}
                      >
                        <option value="Listicle">Listicle</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Finance">Finance</option>
                      </select>
                    </div>

                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Auto-Include Retention Hooks</div>
                        <div className={styles.srDesc}>AI adds pattern interrupts automatically</div>
                      </div>
                      <div 
                        className={`${styles.toggle} ${aiSettings.retentionHooks ? styles.toggleOn : ''}`}
                        onClick={() => toggleAISetting('retentionHooks')}
                      >
                        <div className={styles.toggleThumb}></div>
                      </div>
                    </div>

                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Auto-Generate SEO Tags</div>
                        <div className={styles.srDesc}>Creates YouTube tags after every script</div>
                      </div>
                      <div 
                        className={`${styles.toggle} ${aiSettings.seoTags ? styles.toggleOn : ''}`}
                        onClick={() => toggleAISetting('seoTags')}
                      >
                        <div className={styles.toggleThumb}></div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ─── BILLING PANEL ─── */}
              {activeTab === 'billing' && (
                <div>
                  <div className={styles.svTitle}>Billing & Plan</div>
                  <div className={styles.svSub}>Manage your subscription, payment method, and plan.</div>
                  
                  <div className={styles.planCard}>
                    <div className={styles.pcRow}>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--muted2)', marginBottom: '4px' }}>Current Plan</div>
                        <div className={styles.pcName}>
                          {currentPlan === 'agency' ? (
                            <><Zap size={16} /> Agency Plan</>
                          ) : currentPlan === 'pro' ? (
                            <><Rocket size={16} /> Pro Plan</>
                          ) : (
                            <><User size={16} /> Free Plan</>
                          )}
                        </div>
                      </div>
                      <div className={styles.pcPrice}>
                        {currentPlan === 'agency' ? '$99' : currentPlan === 'pro' ? '$29' : '$0'}
                        <span className={styles.pcPriceSpan}>/mo</span>
                      </div>
                    </div>
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted2)' }}>
                      <span>Status: {currentPlan !== 'free' ? 'Active (Synced via Webhook)' : 'Free Tier'}</span>
                      <span>No credit card required</span>
                    </div>
                  </div>

                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Actions</div>
                    
                    {currentPlan === 'free' && (
                      <>
                        <div className={styles.setRow}>
                          <div>
                            <div className={styles.srLabel}>Upgrade to Pro</div>
                            <div className={styles.srDesc}>Unlimited topic ideas + unlimited scripts</div>
                          </div>
                          <button 
                            className={styles.saveBtn} 
                            disabled={loadingPlan !== null}
                            onClick={() => handleUpgrade('pro')}
                          >
                            {loadingPlan === 'pro' ? 'Loading...' : 'Upgrade — $29/mo'}
                          </button>
                        </div>
                        <div className={styles.setRow}>
                          <div>
                            <div className={styles.srLabel}>Upgrade to Agency</div>
                            <div className={styles.srDesc}>Unlimited channels + team collaboration</div>
                          </div>
                          <button 
                            className={styles.saveBtn} 
                            disabled={loadingPlan !== null}
                            onClick={() => handleUpgrade('agency')}
                          >
                            {loadingPlan === 'agency' ? 'Loading...' : 'Upgrade — $99/mo'}
                          </button>
                        </div>
                      </>
                    )}

                    {currentPlan === 'pro' && (
                      <>
                        <div className={styles.setRow}>
                          <div>
                            <div className={styles.srLabel}>Upgrade to Agency</div>
                            <div className={styles.srDesc}>Unlimited channels + team collaboration (10 seats)</div>
                          </div>
                          <button 
                            className={styles.saveBtn} 
                            disabled={loadingPlan !== null}
                            onClick={() => handleUpgrade('agency')}
                          >
                            {loadingPlan === 'agency' ? 'Loading...' : 'Upgrade — $99/mo'}
                          </button>
                        </div>
                        <div className={styles.setRow}>
                          <div>
                            <div className={styles.srLabel}>Manage Pro Subscription</div>
                            <div className={styles.srDesc}>Update payment details, download invoices, or cancel plan.</div>
                          </div>
                          <button 
                            className={styles.saveBtn} 
                            style={{ background: '#7928ca' }}
                            onClick={() => {
                              triggerToast('Opening LemonSqueezy Billing Portal...');
                              window.open('https://autotubeos.lemonsqueezy.com/billing', '_blank');
                            }}
                          >
                            Billing Portal
                          </button>
                        </div>
                      </>
                    )}

                    {currentPlan === 'agency' && (
                      <div className={styles.setRow}>
                        <div>
                          <div className={styles.srLabel}>Manage Agency Subscription</div>
                          <div className={styles.srDesc}>Update payment details, download invoices, or cancel plan.</div>
                        </div>
                        <button 
                          className={styles.saveBtn} 
                          style={{ background: '#7928ca' }}
                          onClick={() => {
                            triggerToast('Opening LemonSqueezy Billing Portal...');
                            window.open('https://autotubeos.lemonsqueezy.com/billing', '_blank');
                          }}
                        >
                          Billing Portal
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── INVOICES PANEL ─── */}
              {activeTab === 'invoices' && (
                <div>
                  <div className={styles.svTitle}>Invoices</div>
                  <div className={styles.svSub}>Download your billing history and receipts.</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className={styles.invRow}>
                      <div className={styles.irDate}>May 1, 2026 — Pro Plan</div>
                      <div className={styles.irAmount}>$29.00</div>
                      <div className={styles.irBadge}>Paid</div>
                      <div className={styles.irDl} onClick={() => triggerToast('Downloading invoice PDF for May 2026...')}><ArrowDown size={16} /> PDF</div>
                    </div>
                    <div className={styles.invRow}>
                      <div className={styles.irDate}>Apr 1, 2026 — Pro Plan</div>
                      <div className={styles.irAmount}>$29.00</div>
                      <div className={styles.irBadge}>Paid</div>
                      <div className={styles.irDl} onClick={() => triggerToast('Downloading invoice PDF for April 2026...')}><ArrowDown size={16} /> PDF</div>
                    </div>
                    <div className={styles.invRow}>
                      <div className={styles.irDate}>Mar 1, 2026 — Pro Plan</div>
                      <div className={styles.irAmount}>$29.00</div>
                      <div className={styles.irBadge}>Paid</div>
                      <div className={styles.irDl} onClick={() => triggerToast('Downloading invoice PDF for March 2026...')}><ArrowDown size={16} /> PDF</div>
                    </div>
                    <div className={styles.invRow}>
                      <div className={styles.irDate}>Feb 1, 2026 — Pro Plan</div>
                      <div className={styles.irAmount}>$29.00</div>
                      <div className={styles.irBadge}>Paid</div>
                      <div className={styles.irDl} onClick={() => triggerToast('Downloading invoice PDF for February 2026...')}><ArrowDown size={16} /> PDF</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── PRIVACY PANEL ─── */}
              {activeTab === 'privacy' && (
                <div>
                  <div className={styles.svTitle}>Privacy & Data</div>
                  <div className={styles.svSub}>Control how your data is used and stored.</div>
                  
                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Data Usage</div>
                    
                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Analytics Cookies</div>
                        <div className={styles.srDesc}>Help us understand how you use the product</div>
                      </div>
                      <div 
                        className={`${styles.toggle} ${privacy.analyticsCookies ? styles.toggleOn : ''}`}
                        onClick={() => togglePrivacy('analyticsCookies')}
                      >
                        <div className={styles.toggleThumb}></div>
                      </div>
                    </div>

                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Product Improvement Data</div>
                        <div className={styles.srDesc}>Share anonymized usage to improve AI models</div>
                      </div>
                      <div 
                        className={`${styles.toggle} ${privacy.productImprovement ? styles.toggleOn : ''}`}
                        onClick={() => togglePrivacy('productImprovement')}
                      >
                        <div className={styles.toggleThumb}></div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.setSec}>
                    <div className={styles.setSecTitle}>Your Data Actions</div>
                    
                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Export All Data</div>
                        <div className={styles.srDesc}>Download a complete JSON copy of your channel scripts and details</div>
                      </div>
                      <button className={styles.saveBtn} onClick={() => triggerToast('Export started — we\'ll email you a download link within 5 minutes!')}>
                        Export Data
                      </button>
                    </div>

                    <div className={styles.setRow}>
                      <div>
                        <div className={styles.srLabel}>Disconnect YouTube Channel</div>
                        <div className={styles.srDesc}>Removes connected YouTube OAuth tokens from our servers</div>
                      </div>
                      <button className={styles.dangerBtn} style={{ fontSize: '12px', padding: '7px 14px' }} onClick={() => triggerToast('YouTube integration disconnected successfully.')}>
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── DANGER ZONE PANEL ─── */}
              {activeTab === 'danger' && (
                <div>
                  <div className={styles.svTitle} style={{ color: 'var(--red)' }}><AlertTriangle size={16} /> Danger Zone</div>
                  <div className={styles.svSub}>These actions are irreversible. Proceed with extreme caution.</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className={styles.setRow} style={{ borderColor: 'var(--red-border)' }}>
                      <div>
                        <div className={styles.srLabel}>Delete All Content</div>
                        <div className={styles.srDesc}>Permanently deletes all scripts, calendar entries, and research data</div>
                      </div>
                      <button className={styles.dangerBtn} onClick={() => {
                        if (confirm('Are you absolutely sure? This will delete all generated scripts, transcripts, and scheduled ideas, and cannot be undone.')) {
                          triggerToast('All generated content permanently deleted.', 'error');
                        }
                      }}>
                        Delete Content
                      </button>
                    </div>

                    <div className={styles.setRow} style={{ borderColor: 'var(--red-border)' }}>
                      <div>
                        <div className={styles.srLabel}>Cancel Subscription</div>
                        <div className={styles.srDesc}>Downgrade to Free plan at the end of this billing period (June 1)</div>
                      </div>
                      <button className={styles.dangerBtn} onClick={() => {
                        if (confirm('Are you sure you want to cancel your Pro plan? You will lose access to premium AI script formats at the end of your billing cycle.')) {
                          triggerToast('Subscription cancellation request submitted.', 'error');
                        }
                      }}>
                        Cancel Plan
                      </button>
                    </div>

                    <div className={styles.setRow} style={{ borderColor: 'var(--red-border)', background: 'rgba(255, 61, 61, 0.03)' }}>
                      <div>
                        <div className={styles.srLabel} style={{ color: 'var(--red)' }}>Delete Account</div>
                        <div className={styles.srDesc}>Permanently delete your user profile and all associated team workspace data</div>
                      </div>
                      <button 
                        className={styles.dangerBtn} 
                        style={{ background: 'var(--red-bg)' }} 
                        onClick={() => {
                          const email = prompt('Type your account email (ahmed@example.com) to confirm permanent deletion:');
                          if (email === 'ahmed@example.com') {
                            triggerToast('Account deletion request queued.', 'error');
                          } else if (email !== null) {
                            triggerToast('Incorrect email. Deletion cancelled.', 'error');
                          }
                        }}
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const { loading } = useAuth(true);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#07080c',
        color: '#eef0f6',
        fontFamily: 'sans-serif'
      }}>
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#ff3d3d" style={{ marginBottom: '16px' }}>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="3">
              <circle strokeOpacity=".1" cx="18" cy="18" r="18" stroke="#ffffff"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
        <div style={{ fontSize: '12px', color: '#a0aec0', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Verifying Session...
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Account Settings — AutoTube OS</title>
        <meta name="description" content="Configure your channel workspaces, manage billing, integrations, and secure your API keys." />
      </Head>
      <Suspense fallback={
      <div 
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#07080c',
          color: '#eef0f6',
          fontFamily: 'sans-serif'
        }}
      >
        Loading Settings Panel...
      </div>
    }>
      <SettingsContent />
    </Suspense>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" defer />
    </>
  );
}
