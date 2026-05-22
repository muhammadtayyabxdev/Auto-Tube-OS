'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/mobile.module.css';
import { BarChart3, Bell, CalendarDays, ClipboardList, Flame, LayoutDashboard, PenTool, Play, RefreshCw, Zap } from 'lucide-react';

export default function MobilePromo() {
  const [activeTab, setActiveTab] = useState<'home' | 'ideas' | 'scripts' | 'stats' | 'profile'>('home');
  
  // Secondary phone script generation state
  const [scriptTopic, setScriptTopic] = useState('AI Side Hustles That Pay $500/Day');
  const [scriptHook, setScriptHook] = useState(
    'What if I told you there are people making $500 a day using only AI tools you can start for free today?'
  );
  const [generating, setGenerating] = useState(false);
  const [scriptCount, setScriptCount] = useState(0);

  const handleGenerateScript = () => {
    if (generating) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setScriptCount(prev => prev + 1);
      
      const topics = [
        'How 99% of Creators Stay Broke',
        'Unusual High RPM YouTube Niches',
        'Recreating a Viral Thumbnail in 3 Mins',
        'Secrets of YouTube Retention Exposed'
      ];
      const hooks = [
        'Most creators focus on titles and thumbnails. But they are missing the single most important number that determines if a channel makes $100 or $10,000...',
        'You probably think finance is the highest paying YouTube niche. It isn\'t. In fact, there is a hidden niche paying over $30 CPM with almost no competition...',
        'I built a tool that cloned the top 100 YouTube thumbnails in under 3 minutes. The results were shockingly identical — and here is how you can copy the exact formula...',
        'The first 3 seconds of your video are actually wasting 80% of your potential views. Here is the physical editing adjustment you must make right now...'
      ];
      
      const idx = scriptCount % topics.length;
      setScriptTopic(topics[idx]);
      setScriptHook(hooks[idx]);
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <div className={styles.hero}>
        <div className={styles.gridBg}></div>
        <div className={styles.glow}></div>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <div className={styles.hLabel}>Mobile App — iOS & Android</div>
            <h1 className={styles.hTitle}>Your channel OS,<br />in your pocket.</h1>
            <p className={styles.hSub}>
              Manage your YouTube automation workflow on the go. Generate scripts, find viral topics, and track your channel stats — all from your phone.
            </p>
            <div className={styles.storeBtns}>
              <a href="#" className={styles.storeBtn} onClick={(e) => { e.preventDefault(); alert('iOS App download link triggered! Available on TestFlight.'); }}>
                <span className={styles.storeIcon}>🍎</span>
                <div>
                  <div className={styles.storeSub}>Download on the</div>
                  <div className={styles.storeName}>App Store</div>
                </div>
              </a>
              <a href="#" className={styles.storeBtn} onClick={(e) => { e.preventDefault(); alert('Android App download link triggered! Available on Google Play Store Beta.'); }}>
                <span className={styles.storeIcon}><Play size={16} /></span>
                <div>
                  <div className={styles.storeSub}>Get it on</div>
                  <div className={styles.storeName}>Google Play</div>
                </div>
              </a>
            </div>
            <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--muted2)' }}>
              Free to download · Syncs with your dashboard · iOS 16+ / Android 10+
            </div>
          </div>

          <div className={styles.heroPhones}>
            {/* PRIMARY PHONE - MAIN VIEW */}
            <div className={styles.phone}>
              <div className={styles.phoneNotch}>
                <div className={styles.notchPill}></div>
              </div>
              <div className={styles.phoneScreen}>
                <div className={styles.sTopbar}>
                  <div className={styles.sLogo}>AutoTube<span>OS</span></div>
                  <div className={styles.sNotif} onClick={() => alert('Notifications clicked!')}><Bell size={16} /></div>
                </div>

                <div className={styles.sGreet}>
                  Good morning 👋
                  <b>Ahmed's Dashboard</b>
                </div>

                <div className={styles.sStats}>
                  <div className={styles.sStat} onClick={() => alert('Views: 2.4M')}>
                    <div className={styles.sStatVal}>2.4M</div>
                    <div className={styles.sStatLbl}>Views this month</div>
                  </div>
                  <div className={styles.sStat} onClick={() => alert('Revenue: $3.8K')}>
                    <div className={styles.sStatVal}>$3.8K</div>
                    <div className={styles.sStatLbl}>Est. Revenue</div>
                  </div>
                  <div className={styles.sStat} onClick={() => alert('Subscribers: 241K')}>
                    <div className={styles.sStatVal}>241K</div>
                    <div className={styles.sStatLbl}>Subscribers</div>
                  </div>
                  <div className={styles.sStat} onClick={() => alert('Published: 12')}>
                    <div className={styles.sStatVal}>12</div>
                    <div className={styles.sStatLbl}>Videos Published</div>
                  </div>
                </div>

                <div className={styles.sSectionTitle}>Quick Actions</div>
                <div className={styles.sQuick}>
                  <div className={styles.sQbtn} onClick={() => alert('Opening mobile Topic Finder...')}>
                    <div className={styles.sQbtnIcon}><Flame size={16} /></div>
                    <div className={styles.sQbtnLbl}>Topic Finder</div>
                  </div>
                  <div className={styles.sQbtn} onClick={() => alert('Opening Mobile Script Generator...')}>
                    <div className={styles.sQbtnIcon}><PenTool size={16} /></div>
                    <div className={styles.sQbtnLbl}>New Script</div>
                  </div>
                  <div className={styles.sQbtn} onClick={() => alert('Opening Shorts Repurposer...')}>
                    <div className={styles.sQbtnIcon}><Zap size={16} /></div>
                    <div className={styles.sQbtnLbl}>Shorts</div>
                  </div>
                  <div className={styles.sQbtn} onClick={() => alert('Opening Content Calendar...')}>
                    <div className={styles.sQbtnIcon}><CalendarDays size={16} /></div>
                    <div className={styles.sQbtnLbl}>Calendar</div>
                  </div>
                </div>

                <div className={styles.sSectionTitle}>Pipeline</div>
                <div className={styles.sCard}>
                  <div className={styles.sCardTitle}>AI Side Hustles — $500/Day</div>
                  <div className={styles.sCardSub}>Script done · Editing in progress</div>
                  <div className={styles.sProgress}>
                    <div className={styles.sProgressFill} style={{ width: '70%' }}></div>
                  </div>
                  <span className={`${styles.sTag} ${styles.tagB}`}>In Review</span>
                </div>
                <div className={styles.sCard}>
                  <div className={styles.sCardTitle}>Why 99% Stay Broke</div>
                  <div className={styles.sCardSub}>Ready to upload · Scheduled May 21</div>
                  <div className={styles.sProgress}>
                    <div className={styles.sProgressFill} style={{ width: '100%', background: 'var(--green)' }}></div>
                  </div>
                  <span className={`${styles.sTag} ${styles.tagG}`}>Ready</span>
                </div>

                <div style={{ height: '10px' }}></div>
                <div className={styles.sBottomNav}>
                  <div className={`${styles.sNavItem} ${activeTab === 'home' ? styles.on : ''}`} onClick={() => setActiveTab('home')}>
                    <div className={styles.sNavIcon}><LayoutDashboard size={16} /></div>Home
                  </div>
                  <div className={`${styles.sNavItem} ${activeTab === 'ideas' ? styles.on : ''}`} onClick={() => { setActiveTab('ideas'); alert('Feature available in downloaded app!'); }}>
                    <div className={styles.sNavIcon}><Flame size={16} /></div>Ideas
                  </div>
                  <div className={`${styles.sNavItem} ${activeTab === 'scripts' ? styles.on : ''}`} onClick={() => { setActiveTab('scripts'); alert('Feature available in downloaded app!'); }}>
                    <div className={styles.sNavIcon}><PenTool size={16} /></div>Scripts
                  </div>
                  <div className={`${styles.sNavItem} ${activeTab === 'stats' ? styles.on : ''}`} onClick={() => { setActiveTab('stats'); alert('Feature available in downloaded app!'); }}>
                    <div className={styles.sNavIcon}><BarChart3 size={16} /></div>Stats
                  </div>
                </div>
              </div>
            </div>

            {/* SECONDARY PHONE - INTERACTIVE SCRIPT view */}
            <div className={`${styles.phone} ${styles.secondary}`}>
              <div className={styles.phoneNotch}>
                <div className={styles.notchPill}></div>
              </div>
              <div className={styles.phoneScreen}>
                <div className={styles.sTopbar}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', cursor: 'pointer' }} onClick={() => alert('Exit')}>← Back</div>
                  <div style={{ fontFamily: 'var(--fh)', fontSize: '0.72rem', fontWeight: 800 }}>Script Generator</div>
                  <div style={{ fontSize: '12px', color: 'var(--red)', cursor: 'pointer' }} onClick={() => alert('Saved!')}>Save</div>
                </div>
                <div style={{ padding: '8px 12px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--muted2)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Topic</div>
                  <div style={{ background: 'var(--s2)', border: '1px solid var(--red-border)', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: 'var(--text)', marginBottom: '10px' }}>
                    {scriptTopic}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                    <div style={{ background: 'var(--red-bg)', border: '1px solid var(--red-border)', borderRadius: '7px', padding: '6px', textAlign: 'center', fontSize: '9px', color: 'var(--red)', fontWeight: 600 }}><ClipboardList size={16} /> Listicle</div>
                    <div style={{ background: 'var(--s3)', border: '1px solid var(--border)', borderRadius: '7px', padding: '6px', textAlign: 'center', fontSize: '9px', color: 'var(--muted)' }}><Play size={16} /> Doc</div>
                  </div>
                  <div 
                    style={{ background: generating ? 'var(--s4)' : 'var(--red)', borderRadius: '8px', padding: '9px', textAlign: 'center', fontSize: '10px', fontWeight: 700, color: '#fff', marginBottom: '10px', cursor: 'pointer', transition: 'all 0.2s' }}
                    onClick={handleGenerateScript}
                  >
                    {generating ? '<Sparkles size={16} /> Generating...' : '<Sparkles size={16} /> Generate Script'}
                  </div>
                  <div style={{ background: 'var(--s2)', borderRadius: '8px', padding: '8px 10px' }}>
                    <div style={{ fontSize: '8px', color: 'var(--red)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '5px' }}>🎣 Hook</div>
                    <div style={{ fontSize: '9px', color: 'rgba(238,240,246,0.7)', lineHeight: 1.5, transition: 'opacity 0.2s', opacity: generating ? 0.3 : 1 }}>
                      {scriptHook}
                    </div>
                  </div>
                </div>
                <div style={{ height: '60px' }}></div>
                <div className={styles.sBottomNav}>
                  <div className={styles.sNavItem}>
                    <div className={styles.sNavIcon}><LayoutDashboard size={16} /></div>Home
                  </div>
                  <div className={styles.sNavItem}>
                    <div className={styles.sNavIcon}><Flame size={16} /></div>Ideas
                  </div>
                  <div className={`${styles.sNavItem} ${styles.on}`}>
                    <div className={styles.sNavIcon}><PenTool size={16} /></div>Scripts
                  </div>
                  <div className={styles.sNavItem}>
                    <div className={styles.sNavIcon}><BarChart3 size={16} /></div>Stats
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FEATURES */}
      <div className={styles.featuresSection}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className={styles.secLabel}>Mobile Features</div>
          <h2 className={styles.secTitle}>Full power, pocket-sized</h2>
        </div>
        <div className={styles.featList}>
          <div className={styles.featItem}>
            <div className={styles.featIcon}><Flame size={16} /></div>
            <div>
              <div className={styles.featTitle}>Topic Finder on Mobile</div>
              <div className={styles.featDesc}>Get viral topic ideas while commuting, at the gym, or anywhere. One tap to save ideas to your pipeline.</div>
            </div>
          </div>
          <div className={styles.featItem}>
            <div className={styles.featIcon}><PenTool size={16} /></div>
            <div>
              <div className={styles.featTitle}>Script Generator</div>
              <div className={styles.featDesc}>Generate full scripts on your phone. Edit, copy, and send to your team with one tap.</div>
            </div>
          </div>
          <div className={styles.featItem}>
            <div className={styles.featIcon}><Bell size={16} /></div>
            <div>
              <div className={styles.featTitle}>Smart Notifications</div>
              <div className={styles.featDesc}>Get alerted when a video is ready for review, a team task is overdue, or a trend spikes in your niche.</div>
            </div>
          </div>
          <div className={styles.featItem}>
            <div className={styles.featIcon}><BarChart3 size={16} /></div>
            <div>
              <div className={styles.featTitle}>Live Analytics</div>
              <div className={styles.featDesc}>Watch your view count, subscriber growth, and revenue update in real time from your lock screen widget.</div>
            </div>
          </div>
          <div className={styles.featItem}>
            <div className={styles.featIcon}><CalendarDays size={16} /></div>
            <div>
              <div className={styles.featTitle}>Calendar Management</div>
              <div className={styles.featDesc}>Approve, reschedule, or reassign content calendar items on the go. Full drag-and-drop on mobile.</div>
            </div>
          </div>
          <div className={styles.featItem}>
            <div className={styles.featIcon}><RefreshCw size={16} /></div>
            <div>
              <div className={styles.featTitle}>Syncs Instantly</div>
              <div className={styles.featDesc}>Everything you do on mobile syncs instantly to your desktop dashboard and vice versa. Always in sync.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className={styles.ctaSection}>
        <h2>Download AutoTubeOS today.</h2>
        <p>Free with your Pro or Agency plan. iOS and Android.</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" className={styles.storeBtn} onClick={(e) => { e.preventDefault(); alert('App Store triggered!'); }} style={{ padding: '12px 22px' }}>
            <span style={{ fontSize: '1.8rem' }}>🍎</span>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Download on the</div>
              <div style={{ fontFamily: 'var(--fh)', fontSize: '1rem', fontWeight: 700 }}>App Store</div>
            </div>
          </a>
          <a href="#" className={styles.storeBtn} onClick={(e) => { e.preventDefault(); alert('Google Play Store triggered!'); }} style={{ padding: '12px 22px' }}>
            <span style={{ fontSize: '1.8rem' }}><Play size={16} /></span>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>Get it on</div>
              <div style={{ fontFamily: 'var(--fh)', fontSize: '1rem', fontWeight: 700 }}>Google Play</div>
            </div>
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
