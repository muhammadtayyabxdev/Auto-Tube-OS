'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BarChart3, Bell, CalendarDays, ChevronDown, Flame, Handshake, LayoutDashboard, LogOut, Mail, Menu, PenTool, Settings, X, Zap } from 'lucide-react';
import styles from '@/styles/sidebar.module.css';
import { useUser, useClerk } from '@clerk/nextjs';

interface SidebarProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export default function Sidebar({ currentView = 'home', onViewChange }: SidebarProps) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = router.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleItemClick = (view: string, path?: string) => {
    setIsOpen(false); // Auto-close sidebar on mobile after clicking
    if (path) {
      router.push(path);
    } else if (onViewChange && pathname === '/dashboard') {
      onViewChange(view);
    } else {
      router.push(`/dashboard?view=${view}`);
    }
  };

  const isItemActive = (view: string, path?: string) => {
    if (pathname === '/dashboard') {
      return currentView === view;
    }
    if (path) {
      return pathname === path;
    }
    return false;
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON FOR MOBILE */}
      <button 
        className={styles.sbMobileToggle} 
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation sidebar"
      >
        <Menu size={18} />
      </button>

      {/* GLASSMORPHIC BACKDROP OVERLAY */}
      {isOpen && (
        <div 
          className={styles.sbOverlay} 
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sbHeader}>
          <Link href="/dashboard" className={styles.sbLogo} onClick={() => setIsOpen(false)}>
            AutoTube<span>OS</span>
          </Link>
          
          {/* CLOSE TRIGGER BUTTON FOR MOBILE */}
          <button 
            className={styles.sbCloseBtn} 
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.sbWorkspace} onClick={() => handleItemClick('home', '/dashboard')}>
          <div className={styles.wsAvatar}>FY</div>
          <div className={styles.wsName}>Finance YouTube</div>
          <div className={styles.wsArrow}><ChevronDown size={14} /></div>
        </div>

        <div className={styles.sbSection}>Main</div>
        
        <div 
          className={`${styles.sbItem} ${isItemActive('home', '/dashboard') ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('home', '/dashboard')}
        >
          <span className={styles.sbIcon}><LayoutDashboard size={16} /></span> Overview
        </div>
        
        <div 
          className={`${styles.sbItem} ${isItemActive('topics') ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('topics')}
        >
          <span className={styles.sbIcon}><Flame size={16} /></span> Topic Finder
          <span className={`${styles.sbBadge} ${styles.sbBadgeNew}`}>New</span>
        </div>

        <div 
          className={`${styles.sbItem} ${isItemActive('script', '/script-generator') ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('script', '/script-generator')}
        >
          <span className={styles.sbIcon}><PenTool size={16} /></span> Script Generator
        </div>

        <div 
          className={`${styles.sbItem} ${isItemActive('shorts') ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('shorts')}
        >
          <span className={styles.sbIcon}><Zap size={16} /></span> Shorts Repurposer
        </div>

        <div 
          className={`${styles.sbItem} ${isItemActive('calendar') ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('calendar')}
        >
          <span className={styles.sbIcon}><CalendarDays size={16} /></span> Content Calendar
          <span className={styles.sbBadge}>3</span>
        </div>

        <div className={styles.sbSection}>Insights</div>
        
        <div 
          className={`${styles.sbItem} ${isItemActive('analytics') ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('analytics')}
        >
          <span className={styles.sbIcon}><BarChart3 size={16} /></span> Analytics
        </div>

        <div 
          className={`${styles.sbItem} ${pathname === '/affiliate-dashboard' ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('affiliate-dashboard', '/affiliate-dashboard')}
        >
          <span className={styles.sbIcon}><Handshake size={16} /></span> Affiliate Dashboard
        </div>

        <div 
          className={`${styles.sbItem} ${pathname === '/emails' ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('emails', '/emails')}
        >
          <span className={styles.sbIcon}><Mail size={16} /></span> Creator Emails
        </div>

        <div 
          className={`${styles.sbItem} ${pathname === '/notifications' ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('notifications', '/notifications')}
        >
          <span className={styles.sbIcon}><Bell size={16} /></span> Notifications
        </div>


        <div className={styles.sbBottom}>
          <div style={{ position: 'relative' }}>
            <button
              className={styles.sbUser}
              onClick={() => setUserMenuOpen(prev => !prev)}
              aria-label="User menu"
            >
              <div className={styles.userAv}>
                <img src={user?.imageUrl || "/ahmed_avatar.png"} alt={user?.fullName || "User"} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div className={styles.userInfo}>
                <div className={styles.name}>{user?.fullName || "Creator"}</div>
                <div className={styles.plan}>
                  {user?.publicMetadata?.plan === 'pro'
                    ? 'Pro Plan'
                    : user?.publicMetadata?.plan === 'agency'
                    ? 'Agency Plan'
                    : 'Free Plan'}
                </div>
              </div>
              <ChevronDown size={12} style={{ marginLeft: 'auto', color: 'var(--muted)', transform: userMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {userMenuOpen && (
              <div className={styles.userDropdown}>
                <div className={styles.udEmail}>{user?.primaryEmailAddress?.emailAddress || "no email"}</div>
                <div className={styles.udDivider} />
                <button
                  className={styles.udItem}
                  onClick={() => { setUserMenuOpen(false); setIsOpen(false); router.push('/settings'); }}
                >
                  <Settings size={13} strokeWidth={1.8} />
                  Settings
                </button>
                <div className={styles.udDivider} />
                <button
                  className={`${styles.udItem} ${styles.udLogout}`}
                  onClick={async () => {
                    setUserMenuOpen(false);
                    setIsOpen(false);
                    await signOut();
                    router.push('/');
                  }}
                >
                  <LogOut size={13} strokeWidth={1.8} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

