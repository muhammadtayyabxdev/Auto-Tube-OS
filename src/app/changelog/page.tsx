'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from '@/styles/changelog.module.css';
import { AlertTriangle, BarChart3, Bot, CalendarDays, Check, Globe, MailOpen, Palette, Search, Users, Zap } from 'lucide-react';

interface ChangeItem {
  icon: string;
  title: string;
  desc: string;
  type: 'new' | 'improved' | 'fixed' | 'breaking';
  typeLabel: string;
  typeClass: string;
}

interface Release {
  version: string;
  id: string;
  title: string;
  date: string;
  summary: string;
  badges: { text: string; class: string }[];
  changes: ChangeItem[];
  isHero?: boolean;
  heroEmoji?: string;
}

const RELEASES: Release[] = [
  {
    version: 'v2.4.0',
    id: 'v2-4-0',
    title: 'AI Agents + Shorts 3.0',
    date: 'May 14, 2026',
    summary: 'Our biggest release yet. AI Agents can now run your entire content pipeline — from finding topics to scheduling uploads — autonomously. Plus a completely rebuilt Shorts Repurposer with 3× better clip detection.',
    isHero: true,
    heroEmoji: '<Bot size={28} />',
    badges: [
      { text: 'Major Release', class: styles.badgeMajor },
      { text: 'New', class: styles.badgeNew },
      { text: 'Improved', class: styles.badgeImproved }
    ],
    changes: [
      {
        icon: '<Bot size={16} />',
        title: 'AI Agents (Beta)',
        desc: 'Set up a fully autonomous content pipeline. Define your niche, schedule, and style — AI handles topic finding, scripting, and calendar scheduling automatically every week.',
        type: 'new',
        typeLabel: 'New',
        typeClass: styles.badgeNew
      },
      {
        icon: '<Zap size={16} />',
        title: 'Shorts Repurposer 3.0',
        desc: 'Completely rebuilt clip detection model. 3× more accurate, supports longer videos (up to 4 hours), and now generates platform-specific hooks for YouTube Shorts, TikTok, and Instagram Reels.',
        type: 'improved',
        typeLabel: 'Improved',
        typeClass: styles.badgeImproved
      },
      {
        icon: '<Search size={16} />',
        title: 'Competitor Intelligence 2.0',
        desc: 'Now analyzes thumbnail styles, color palettes, and title formulas from competitor channels — not just view counts and posting frequency.',
        type: 'improved',
        typeLabel: 'Improved',
        typeClass: styles.badgeImproved
      },
      {
        icon: '<Globe size={16} />',
        title: 'Multi-language Script Support',
        desc: 'Script Generator now supports 12 languages including Urdu, Hindi, Arabic, Spanish, and Portuguese. Niche detection works for non-English markets too.',
        type: 'new',
        typeLabel: 'New',
        typeClass: styles.badgeNew
      }
    ]
  },
  {
    version: 'v2.3.0',
    id: 'v2-3-0',
    title: 'Team Collaboration & Calendar Overhaul',
    date: 'April 8, 2026',
    summary: 'Full team collaboration features for Agency plan users, plus a completely redesigned Content Calendar with drag-and-drop scheduling.',
    badges: [
      { text: 'New', class: styles.badgeNew },
      { text: 'Improved', class: styles.badgeImproved },
      { text: 'Fixed', class: styles.badgeFixed }
    ],
    changes: [
      {
        icon: '<Users size={16} />',
        title: 'Team Collaboration (Agency)',
        desc: 'Invite editors, scriptwriters, and thumbnail designers. Assign tasks, set deadlines, and track approval status — all inside AutoTubeOS.',
        type: 'new',
        typeLabel: 'New',
        typeClass: styles.badgeNew
      },
      {
        icon: '<CalendarDays size={16} />',
        title: 'Drag-and-Drop Calendar',
        desc: 'Redesigned Content Calendar with drag-and-drop rescheduling, color coding by channel, and a new "Week" view alongside the existing Month view.',
        type: 'improved',
        typeLabel: 'Improved',
        typeClass: styles.badgeImproved
      },
      {
        icon: '🐛',
        title: 'Fixed: Script generator hanging on long topics',
        desc: 'Scripts with topics over 120 characters were causing the generator to hang. Fixed — now handles up to 500 character topic descriptions.',
        type: 'fixed',
        typeLabel: 'Fixed',
        typeClass: styles.badgeFixed
      },
      {
        icon: '🐛',
        title: 'Fixed: Analytics not syncing for channels with 1M+ subscribers',
        desc: 'YouTube API pagination was breaking for large channels. Resolved with proper cursor-based pagination.',
        type: 'fixed',
        typeLabel: 'Fixed',
        typeClass: styles.badgeFixed
      }
    ]
  },
  {
    version: 'v2.2.0',
    id: 'v2-2-0',
    title: 'Retention Optimizer & SEO Upgrade',
    date: 'March 3, 2026',
    summary: 'New Retention Optimizer tool that scores your script before you record, plus a complete overhaul of the SEO title and description generator.',
    badges: [
      { text: 'New', class: styles.badgeNew },
      { text: 'Improved', class: styles.badgeImproved }
    ],
    changes: [
      {
        icon: '<BarChart3 size={16} />',
        title: 'Retention Optimizer',
        desc: 'Paste your script and get a retention score (0–100) with specific feedback on hook strength, pacing issues, and drop-off risk points. Backed by analysis of 50K+ high-retention videos.',
        type: 'new',
        typeLabel: 'New',
        typeClass: styles.badgeNew
      },
      {
        icon: '<Search size={16} />',
        title: 'SEO Generator 2.0',
        desc: 'Now generates 5 title variations with predicted CTR, optimized descriptions with timestamps, and a ranked tag list. All based on real search volume data.',
        type: 'improved',
        typeLabel: 'Improved',
        typeClass: styles.badgeImproved
      }
    ]
  },
  {
    version: 'v2.0.0',
    id: 'v2-0-0',
    title: 'AutoTubeOS 2.0 — Full Relaunch',
    date: 'January 15, 2026',
    summary: 'Complete ground-up rebuild. Faster, more reliable, and with a brand new design system. Some API integrations require re-authentication.',
    badges: [
      { text: 'Major Release', class: styles.badgeMajor },
      { text: 'Breaking Change', class: styles.badgeBreaking }
    ],
    changes: [
      {
        icon: '<Zap size={16} />',
        title: '4× Faster Dashboard',
        desc: 'Rebuilt on Next.js 15 with server components. Dashboard loads in under 400ms. All AI requests now stream in real time.',
        type: 'improved',
        typeLabel: 'Improved',
        typeClass: styles.badgeImproved
      },
      {
        icon: '<Palette size={16} />',
        title: 'New Design System',
        desc: 'Completely redesigned UI with Poppins font, improved dark mode, and a consistent component library across all pages.',
        type: 'improved',
        typeLabel: 'Improved',
        typeClass: styles.badgeImproved
      },
      {
        icon: '<AlertTriangle size={16} />',
        title: 'Breaking: YouTube & Google integrations require re-auth',
        desc: 'Due to OAuth scope changes, all users must re-connect their YouTube and Google Analytics accounts. Your data is preserved — just visit Settings → Integrations.',
        type: 'breaking',
        typeLabel: 'Breaking',
        typeClass: styles.badgeBreaking
      }
    ]
  }
];

export default function Changelog() {
  const [filterType, setFilterType] = useState<'all' | 'new' | 'improved' | 'fixed'>('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleFilterClick = (type: 'all' | 'new' | 'improved' | 'fixed') => {
    setFilterType(type);
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToRelease = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter releases and their change items
  const filteredReleases = RELEASES.map(rel => {
    const matchedChanges = rel.changes.filter(c => filterType === 'all' || c.type === filterType);
    return { ...rel, changes: matchedChanges };
  }).filter(rel => rel.changes.length > 0);

  return (
    <>
      <Navbar />

      <div className={styles.shell}>
        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          <div className={styles.sbLogo}>
            AutoTube<span>OS</span>
          </div>
          
          <div className={styles.sbLabel}>Filter by Type</div>
          <div className={styles.filterRow}>
            <div 
              className={`${styles.filterBtn} ${filterType === 'all' ? styles.on : ''}`} 
              onClick={() => handleFilterClick('all')}
            >
              <div className={styles.fDot} style={{ background: 'var(--text)' }}></div>
              All Changes
            </div>
            <div 
              className={`${styles.filterBtn} ${filterType === 'new' ? styles.on : ''}`} 
              onClick={() => handleFilterClick('new')}
            >
              <div className={styles.fDot} style={{ background: 'var(--green)' }}></div>
              New Features
            </div>
            <div 
              className={`${styles.filterBtn} ${filterType === 'improved' ? styles.on : ''}`} 
              onClick={() => handleFilterClick('improved')}
            >
              <div className={styles.fDot} style={{ background: 'var(--blue)' }}></div>
              Improvements
            </div>
            <div 
              className={`${styles.filterBtn} ${filterType === 'fixed' ? styles.on : ''}`} 
              onClick={() => handleFilterClick('fixed')}
            >
              <div className={styles.fDot} style={{ background: 'var(--amber)' }}></div>
              Bug Fixes
            </div>
          </div>

          <div className={styles.sbLabel}>Releases</div>
          <div className={styles.sbReleases}>
            {RELEASES.map((rel, idx) => (
              <div 
                key={rel.id} 
                className={`${styles.relLink} ${idx === 0 ? styles.latest : ''}`}
                onClick={() => scrollToRelease(rel.id)}
              >
                {rel.version} — {rel.date.split(',')[0]}
                {idx === 0 && <span className={styles.relTag}>Latest</span>}
              </div>
            ))}
            <div className={styles.relLink} onClick={() => alert('Archive loading soon!')}>
              v1.x Archive →
            </div>
          </div>

          <div className={styles.subBanner}>
            <div className={styles.subTitle}><MailOpen size={16} /> Get Update Emails</div>
            <div className={styles.subDesc}>Be first to know when we ship new features.</div>
            {subscribed ? (
              <div style={{ color: 'var(--green)', fontSize: '11px', marginTop: '5px', fontWeight: 500 }}>
                <Check size={16} /> Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribeSubmit}>
                <input 
                  className={styles.subInp} 
                  type="email" 
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className={styles.subBtn}>Subscribe</button>
              </form>
            )}
          </div>
        </div>

        {/* MAIN */}
        <div className={styles.mainContent}>
          <div className={styles.pageTitle}>What's New</div>
          <div className={styles.pageSub}>Every improvement, fix, and new feature — in one place.</div>
          
          <div className={styles.filterChips}>
            <div 
              className={`${styles.fchip} ${filterType === 'all' ? styles.on : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              All
            </div>
            <div 
              className={`${styles.fchip} ${filterType === 'new' ? styles.on : ''}`}
              onClick={() => handleFilterClick('new')}
            >
              New Features
            </div>
            <div 
              className={`${styles.fchip} ${filterType === 'improved' ? styles.on : ''}`}
              onClick={() => handleFilterClick('improved')}
            >
              Improvements
            </div>
            <div 
              className={`${styles.fchip} ${filterType === 'fixed' ? styles.on : ''}`}
              onClick={() => handleFilterClick('fixed')}
            >
              Bug Fixes
            </div>
          </div>

          {filteredReleases.map((rel) => (
            <div 
              key={rel.id} 
              id={rel.id} 
              className={`${styles.release} ${rel.isHero ? styles.heroRel : ''}`}
            >
              {rel.isHero && rel.heroEmoji && (
                <div className={styles.heroThumb}>
                  <div className={styles.htGlow}></div>
                  {rel.heroEmoji}
                </div>
              )}
              <div className={styles.releaseHeader}>
                <div className={styles.relInfo}>
                  <div className={styles.relTitleRow}>
                    <div className={styles.relTitle}>{rel.title}</div>
                    <div className={styles.relDate}>{rel.date}</div>
                  </div>
                  <div className={styles.relBadges}>
                    {rel.badges.map((badge, bidx) => (
                      <span key={bidx} className={`${styles.badge} ${badge.class}`}>
                        {badge.text}
                      </span>
                    ))}
                  </div>
                  <div className={styles.relSummary}>{rel.summary}</div>
                </div>
              </div>

              <div className={styles.changesList}>
                {rel.changes.map((change, cidx) => (
                  <div key={cidx} className={styles.changeItem}>
                    <div className={styles.changeIcon}>{change.icon}</div>
                    <div className={styles.changeText}>
                      <div className={styles.changeTitle}>{change.title}</div>
                      <div className={styles.changeDesc}>{change.desc}</div>
                    </div>
                    <div className={`${styles.changeType} ${change.typeClass}`}>
                      {change.typeLabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredReleases.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
              No updates match the selected filter criteria.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
