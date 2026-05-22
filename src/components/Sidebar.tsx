'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BarChart3, CalendarDays, ChevronDown, Flame, Handshake, LayoutDashboard, Mail, Menu, PenTool, Settings, X, Zap } from 'lucide-react';
import styles from '@/styles/sidebar.module.css';

interface SidebarProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

export default function Sidebar({ currentView = 'home', onViewChange }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (view: string, path?: string) => {
    setIsOpen(false); // Auto-close sidebar on mobile after clicking
    if (onViewChange && pathname === '/dashboard') {
      onViewChange(view);
    } else if (path) {
      router.push(path);
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
          <Link href="/" className={styles.sbLogo} onClick={() => setIsOpen(false)}>
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

        <div className={styles.sbSection}>Workspace</div>
        
        <div 
          className={`${styles.sbItem} ${pathname === '/settings' ? styles.sbItemActive : ''}`}
          onClick={() => handleItemClick('settings', '/settings')}
        >
          <span className={styles.sbIcon}><Settings size={16} /></span> Settings
        </div>

        <div className={styles.sbBottom}>
          <Link href="/settings" className={styles.sbUser} onClick={() => setIsOpen(false)}>
            <div className={styles.userAv}>AK</div>
            <div className={styles.userInfo}>
              <div className={styles.name}>Ahmed K.</div>
              <div className={styles.plan}>Pro Plan</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

