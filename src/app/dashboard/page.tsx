'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/dashboard.module.css';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<string>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | null>(null);

  // Search parameter syncing
  useEffect(() => {
    const view = searchParams.get('view');
    if (view && ['home', 'topics', 'shorts', 'calendar', 'analytics'].includes(view)) {
      setCurrentView(view);
    } else {
      setCurrentView('home');
    }
  }, [searchParams]);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    router.push(`/dashboard?view=${view}`, { scroll: false });
  };

  // Toast notification system
  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
  };

  // 1. HOME VIEW STATE
  const [pipelineItems, setPipelineItems] = useState([
    { id: 1, title: 'AI Side Hustles That Pay $500/Day', meta: 'Due in 2 days · Script done', status: 'In Review', statusClass: styles.sReview, thumb: '💰' },
    { id: 2, title: 'Why 99% of People Stay Broke Forever', meta: 'Due tomorrow · Editing', status: 'Ready', statusClass: styles.sReady, thumb: '🧠' },
    { id: 3, title: 'I Invested $10K in Index Funds for 1 Year', meta: 'Due in 5 days · Writing', status: 'Scripting', statusClass: styles.sScript, thumb: '📈' },
    { id: 4, title: '10 Money Mistakes Rich People Never Make', meta: 'Idea stage · Not started', status: 'Idea', statusClass: styles.sIdea, thumb: '💡' }
  ]);

  // 2. TOPIC FINDER STATE
  const [niche, setNiche] = useState<string>('Personal Finance');
  const [market, setMarket] = useState<string>('🇺🇸 US Market');
  const [period, setPeriod] = useState<string>('This Week');
  const [isSearchingTopics, setIsSearchingTopics] = useState<boolean>(false);
  const [topicList, setTopicList] = useState([
    { id: 1, title: '"AI Side Hustles That Actually Pay $500/Day in 2026"', score: 9.4, badge: '🔥 HOT PICK', badgeClass: styles.scoreHot, views: '2.1M', rpm: '$18', comp: 'Low', isTop: true },
    { id: 2, title: '"Why 99% of People Stay Broke (And How to Escape)"', score: 8.8, badge: '🔥 TRENDING', badgeClass: styles.scoreHot, views: '1.7M', rpm: '$22', comp: 'Medium', isTop: false },
    { id: 3, title: '"I Tested Every AI Investing Tool for 30 Days — Here\'s What Happened"', score: 8.1, badge: '⚡ RISING', badgeClass: styles.scoreWarm, views: '980K', rpm: '$15', comp: 'Low', isTop: false },
    { id: 4, title: '"The $0 Budget Strategy That Made Me $100K"', score: 7.9, badge: '⚡ RISING', badgeClass: styles.scoreWarm, views: '850K', rpm: '$20', comp: 'Low', isTop: false },
    { id: 5, title: '"10 Money Mistakes That Are Keeping You Poor"', score: 7.2, badge: '📊 STEADY', badgeClass: styles.scoreOk, views: '620K', rpm: '$19', comp: 'High', isTop: false },
    { id: 6, title: '"How to Save $1,000 in 30 Days on Any Income"', score: 6.8, badge: '📊 STEADY', badgeClass: styles.scoreOk, views: '510K', rpm: '$17', comp: 'Medium', isTop: false }
  ]);

  const handleSearchTopics = () => {
    setIsSearchingTopics(true);
    setTimeout(() => {
      setIsSearchingTopics(false);
      triggerToast('Found 6 trending viral topics!');
    }, 1000);
  };

  const handleWriteScriptRedirect = (title: string) => {
    const cleanTitle = title.replace(/"/g, '');
    router.push(`/script-generator?topic=${encodeURIComponent(cleanTitle)}`);
  };

  // 3. SHORTS STATE
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [isProcessingShorts, setIsProcessingShorts] = useState<boolean>(false);
  const [shortsProgress, setShortsProgress] = useState<number>(100);
  const [shortsClips, setShortsClips] = useState([
    { id: 1, title: 'Hook: "What if I told you people are making $500/day with AI…"', meta: '0:00 – 0:38 · Perfect hook · High energy', score: 9.6, thumb: '🔥' },
    { id: 2, title: 'AI Faceless YouTube breakdown — numbers revealed', meta: '2:14 – 2:58 · Surprising stat · Strong CTA', score: 8.9, thumb: '💡' },
    { id: 3, title: '"This one tool replaced my $3K/mo freelancer"', meta: '5:40 – 6:22 · Value bomb · Shareable', score: 8.7, thumb: '💰' },
    { id: 4, title: 'AI writing hustle — $500 to $2K/month breakdown', meta: '7:05 – 7:50 · Actionable · Beginner-friendly', score: 8.2, thumb: '🤖' },
    { id: 5, title: 'The #1 mistake people make with AI side hustles', meta: '9:30 – 10:08 · Contrarian · High shares', score: 7.9, thumb: '📱' }
  ]);

  const handleUploadClick = () => {
    triggerToast('Starting video file upload...', 'success');
  };

  const handleProcessYoutube = () => {
    if (!youtubeUrl) {
      triggerToast('Please enter a YouTube URL', 'error');
      return;
    }
    setIsProcessingShorts(true);
    setShortsProgress(15);
    const interval = setInterval(() => {
      setShortsProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessingShorts(false);
          triggerToast('Repurposer processing complete! Found 5 viral clips.');
          return 100;
        }
        return prev + 17;
      });
    }, 400);
  };

  const handleExportAllShorts = () => {
    triggerToast('Exporting all 5 clips to Google Drive/Local downloads...');
  };

  // 4. CALENDAR STATE
  const [calendarEvents, setCalendarEvents] = useState<Record<number, { title: string; class: string }[]>>({
    1: [{ title: 'Script: AI Tools', class: styles.evBlue }],
    3: [{ title: '📤 Upload: AI Side Hustles', class: styles.evRed }],
    5: [{ title: '✅ Edit due: Stay Broke', class: styles.evGreen }],
    10: [
      { title: '📤 Upload: Stay Broke', class: styles.evRed },
      { title: 'Script: Investing', class: styles.evBlue }
    ],
    16: [{ title: '✅ Thumbnail review', class: styles.evGreen }],
    21: [{ title: '📤 Upload: $10K Investing', class: styles.evRed }],
    28: [{ title: '📤 Upload: Money Mistakes', class: styles.evRed }]
  });

  const handleAddEvent = (day: number) => {
    if (day < 1 || day > 31) return;
    const title = prompt('Enter video title or event to schedule for May ' + day + ':', 'New Video Script');
    if (title) {
      const type = prompt('Enter event type (upload, script, review):', 'script');
      let evClass = styles.evBlue;
      let finalTitle = title;
      if (type === 'upload') {
        evClass = styles.evRed;
        finalTitle = '📤 Upload: ' + title;
      } else if (type === 'review') {
        evClass = styles.evGreen;
        finalTitle = '✅ ' + title;
      } else {
        finalTitle = 'Script: ' + title;
      }

      setCalendarEvents((prev) => ({
        ...prev,
        [day]: [...(prev[day] || []), { title: finalTitle, class: evClass }]
      }));
      triggerToast('Scheduled event successfully!');
    }
  };

  const handleScheduleClick = () => {
    const day = parseInt(prompt('Enter day of May (1-31) to schedule event:', '17') || '17');
    if (!isNaN(day) && day >= 1 && day <= 31) {
      handleAddEvent(day);
    }
  };

  // 5. TOPBAR GLOBAL ACTION
  const handleTopbarAction = () => {
    if (currentView === 'home') {
      handleViewChange('topics');
    } else if (currentView === 'topics') {
      handleSearchTopics();
    } else if (currentView === 'shorts') {
      handleExportAllShorts();
    } else if (currentView === 'calendar') {
      handleScheduleClick();
    } else if (currentView === 'analytics') {
      triggerToast('Downloading analytics CSV report...');
    }
  };

  const viewTitles: Record<string, string> = {
    home: 'Overview',
    topics: 'Topic Finder',
    shorts: 'Shorts Repurposer',
    calendar: 'Content Calendar',
    analytics: 'Analytics'
  };

  const viewActionLabels: Record<string, string> = {
    home: '+ New Video',
    topics: '🔍 Find Topics',
    shorts: '⬇️ Export All',
    calendar: '+ Schedule',
    analytics: '📊 Export'
  };

  return (
    <div className={styles.app}>
      {/* SIDEBAR */}
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />

      {/* MAIN CONTAINER */}
      <div className={styles.main}>
        {/* TOPBAR */}
        <div className={styles.topbar}>
          <div className={styles.tbTitle}>{viewTitles[currentView] || 'Dashboard'}</div>
          
          <div className={styles.tbSearch} onClick={() => triggerToast('Search indexing database... Please type in sections.')}>
            <span>🔍</span>
            <span style={{ color: 'var(--muted2)' }}>Search anything…</span>
            <kbd>⌘K</kbd>
          </div>

          <div className={`${styles.tbIconBtn} ${styles.notifDot}`} onClick={() => triggerToast('No new notifications!')}>🔔</div>
          
          <button className={styles.tbBtn} onClick={handleTopbarAction}>
            {viewActionLabels[currentView] || '+ New'}
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
              {toastType === 'error' ? '✗' : '✓'} {toastMessage}
            </div>
          )}

          {/* ─── HOME VIEW ─── */}
          <div className={`${styles.view} ${currentView === 'home' ? styles.viewActive : ''}`}>
            <div className={styles.homeGrid}>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Total Views (30d)</div>
                <div className={styles.statVal}>2.4M</div>
                <div className={`${styles.statDelta} ${styles.deltaUp}`}>↑ 18% vs last month</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Subscribers</div>
                <div className={styles.statVal}>241K</div>
                <div className={`${styles.statDelta} ${styles.deltaUp}`}>↑ +3.2K this week</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Videos Published</div>
                <div className={styles.statVal}>12</div>
                <div className={`${styles.statDelta} ${styles.deltaUp}`}>↑ 4 more than last month</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Est. Revenue (30d)</div>
                <div className={styles.statVal}>$3,840</div>
                <div className={`${styles.statDelta} ${styles.deltaUp}`}>↑ 22% vs last month</div>
              </div>
            </div>

            <div className={styles.homeMid}>
              {/* Content Pipeline */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>Content Pipeline</div>
                  <div className={styles.cardAction} onClick={() => handleViewChange('calendar')}>View all →</div>
                </div>
                
                {pipelineItems.map((item) => (
                  <div key={item.id} className={styles.pipelineItem}>
                    <div className={styles.pThumb}>{item.thumb}</div>
                    <div className={styles.pInfo}>
                      <div className={styles.pTitle}>{item.title}</div>
                      <div className={styles.pMeta}>{item.meta}</div>
                    </div>
                    <div className={`${styles.pStatus} ${item.statusClass}`}>{item.status}</div>
                  </div>
                ))}
              </div>

              {/* Views Chart */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>Views This Week</div>
                  <div className={styles.cardAction}>↑ Best week ever</div>
                </div>
                <div className={styles.miniChart}>
                  <div className={styles.bar} style={{ height: '35%' }} title="Mon: 120k"></div>
                  <div className={styles.bar} style={{ height: '48%' }} title="Tue: 180k"></div>
                  <div className={styles.bar} style={{ height: '40%' }} title="Wed: 150k"></div>
                  <div className={styles.bar} style={{ height: '62%' }} title="Thu: 220k"></div>
                  <div className={styles.bar} style={{ height: '55%' }} title="Fri: 190k"></div>
                  <div className={`${styles.bar} ${styles.hi}`} style={{ height: '88%' }} title="Sat: 340k"></div>
                  <div className={`${styles.bar} ${styles.hi}`} style={{ height: '100%' }} title="Sun: 410k"></div>
                </div>
                <div className={styles.chartLabels}>
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
                <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Avg Watch Time</span>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>8m 42s</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Click-Through Rate</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green)' }}>7.8%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Retention @ 30s</span>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>71%</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '10px', fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Actions</div>
            <div className={styles.qaGrid}>
              <div className={styles.qaBtn} onClick={() => handleViewChange('topics')}>
                <div className={styles.qaIcon} style={{ background: 'var(--red-bg)' }}>🔥</div>
                <div>
                  <div className={styles.qaLabel}>Find Viral Topics</div>
                  <div className={styles.qaSub}>AI-ranked ideas for your niche</div>
                </div>
              </div>
              <div className={styles.qaBtn} onClick={() => router.push('/script-generator')}>
                <div className={styles.qaIcon} style={{ background: 'var(--blue-bg)' }}>✍️</div>
                <div>
                  <div className={styles.qaLabel}>Write a Script</div>
                  <div className={styles.qaSub}>12 formats, hooks included</div>
                </div>
              </div>
              <div className={styles.qaBtn} onClick={() => handleViewChange('shorts')}>
                <div className={styles.qaIcon} style={{ background: 'var(--green-bg)' }}>⚡</div>
                <div>
                  <div className={styles.qaLabel}>Repurpose to Shorts</div>
                  <div className={styles.qaSub}>Find best moments automatically</div>
                </div>
              </div>
              <div className={styles.qaBtn} onClick={() => handleViewChange('analytics')}>
                <div className={styles.qaIcon} style={{ background: 'var(--amber-bg)' }}>📊</div>
                <div>
                  <div className={styles.qaLabel}>View Analytics</div>
                  <div className={styles.qaSub}>Deep channel performance stats</div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── TOPIC FINDER VIEW ─── */}
          <div className={`${styles.view} ${currentView === 'topics' ? styles.viewActive : ''}`}>
            <div className={styles.searchRow}>
              <input 
                className={styles.bigInput} 
                placeholder="Enter your niche — e.g. 'personal finance', 'AI tools', 'crypto'…" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
              <select className={styles.selectInput} value={market} onChange={(e) => setMarket(e.target.value)}>
                <option value="🇺🇸 US Market">🇺🇸 US Market</option>
                <option value="🌍 Global">🌍 Global</option>
                <option value="🇬🇧 UK Market">🇬🇧 UK Market</option>
              </select>
              <select className={styles.selectInput} value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Trending Now">Trending Now</option>
              </select>
              <button className={styles.tbBtn} onClick={handleSearchTopics} disabled={isSearchingTopics}>
                {isSearchingTopics ? 'Searching...' : '🔍 Find Topics'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Showing <b style={{ color: 'var(--text)' }}>8 ideas</b> ranked by viral potential</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--red-bg)', border: '1px solid var(--red-border)', color: 'var(--red)', fontSize: '11px', cursor: 'pointer' }} onClick={() => triggerToast('Filtering all hot topics')}>🔥 All</div>
                <div style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--s3)', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: '11px', cursor: 'pointer' }} onClick={() => triggerToast('Filtered by high RPM')}>High RPM</div>
                <div style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--s3)', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: '11px', cursor: 'pointer' }} onClick={() => triggerToast('Filtered by low competition')}>Low Comp.</div>
              </div>
            </div>

            <div className={styles.topicsGrid}>
              {topicList.map((topic) => (
                <div key={topic.id} className={`${styles.topicCard} ${topic.isTop ? styles.topPick : ''}`}>
                  <div className={styles.topicScore}>
                    <span className={`${styles.scoreBadge} ${topic.badgeClass}`}>{topic.badge}</span>
                    <span className={styles.scoreNum}>{topic.score}</span>
                  </div>
                  <div className={styles.topicTitle}>{topic.title}</div>
                  <div className={styles.topicMeta}>
                    <div className={styles.tMetaItem}><b>{topic.views}</b> est. views</div>
                    <div className={styles.tMetaItem}><b>{topic.rpm}</b> RPM</div>
                    <div className={styles.tMetaItem}><b>{topic.comp}</b> competition</div>
                  </div>
                  <div className={styles.topicActions}>
                    <button className={styles.tAction} onClick={() => triggerToast('Topic ideas saved to clipboard!')}>Save</button>
                    <button className={`${styles.tAction} ${styles.primary}`} onClick={() => handleWriteScriptRedirect(topic.title)}>✍️ Write Script</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── SHORTS VIEW ─── */}
          <div className={`${styles.view} ${currentView === 'shorts' ? styles.viewActive : ''}`}>
            <div className={styles.shortsLayout}>
              <div>
                <div className={styles.uploadZone} style={{ marginBottom: '16px' }} onClick={handleUploadClick}>
                  <div className={styles.uploadIcon}>🎬</div>
                  <div className={styles.uploadTitle}>Drop your video here</div>
                  <div className={styles.uploadSub}>MP4, MOV up to 4GB · or paste YouTube URL</div>
                  
                  <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.tbBtn} style={{ fontSize: '12px', padding: '7px 14px' }} onClick={handleUploadClick}>Upload File</button>
                    <input 
                      className={styles.bigInput} 
                      style={{ width: '220px', fontSize: '12px', padding: '7px 12px' }} 
                      placeholder="youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                    />
                    <button className={styles.tbBtn} style={{ fontSize: '12px', padding: '7px 14px' }} onClick={handleProcessYoutube}>Process URL</button>
                  </div>
                </div>

                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>Processing: {youtubeUrl ? 'Custom YouTube stream' : 'AI Side Hustles'}</div>
                    <span style={{ fontSize: '11px', color: isProcessingShorts ? 'var(--amber)' : 'var(--green)' }}>
                      {isProcessingShorts ? `Processing ${shortsProgress}%` : '✓ Complete'}
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--s4)', borderRadius: '3px', overflow: 'hidden', marginBottom: '14px' }}>
                    <div style={{ width: `${shortsProgress}%`, height: '100%', background: isProcessingShorts ? 'var(--amber)' : 'var(--green)', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--muted)' }}>
                    <span>⏱ 11m 42s original</span>
                    <span>⚡ 5 clips found</span>
                    <span>📱 Ready to export</span>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>5 best moments detected · click to preview</div>
                  <button className={styles.tbBtn} style={{ fontSize: '11px', padding: '6px 12px' }} onClick={handleExportAllShorts}>⬇️ Export All</button>
                </div>
                <div className={styles.shortsClips}>
                  {shortsClips.map((clip) => (
                    <div key={clip.id} className={styles.clipCard} onClick={() => triggerToast(`Playing preview for clip: ${clip.title}`)}>
                      <div className={styles.clipThumb}>{clip.thumb}</div>
                      <div className={styles.clipInfo}>
                        <div className={styles.clipTitle}>{clip.title}</div>
                        <div className={styles.clipMeta}>{clip.meta}</div>
                      </div>
                      <div className={styles.clipScore}>{clip.score}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ─── CALENDAR VIEW ─── */}
          <div className={`${styles.view} ${currentView === 'calendar' ? styles.viewActive : ''}`}>
            <div className={styles.calHeader}>
              <div className={styles.calNav} onClick={() => triggerToast('Viewing April 2026')}>‹</div>
              <div className={styles.calMonth}>May 2026</div>
              <div className={styles.calNav} onClick={() => triggerToast('Viewing June 2026')}>›</div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                <button className={styles.tbBtn} style={{ fontSize: '12px', padding: '6px 14px' }} onClick={handleScheduleClick}>+ Schedule Video</button>
              </div>
            </div>
            
            <div className={styles.calGrid}>
              <div className={styles.calDayName}>Sun</div>
              <div className={styles.calDayName}>Mon</div>
              <div className={styles.calDayName}>Tue</div>
              <div className={styles.calDayName}>Wed</div>
              <div className={styles.calDayName}>Thu</div>
              <div className={styles.calDayName}>Fri</div>
              <div className={styles.calDayName}>Sat</div>
              
              {/* Prior month days */}
              {[27, 28, 29, 30].map((d) => (
                <div key={`prev-${d}`} className={`${styles.calDay} ${styles.other}`}>
                  <div className={styles.dayNum}>{d}</div>
                </div>
              ))}

              {/* Current Month Days (May 1 - 31) */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const isToday = day === 17;
                const events = calendarEvents[day] || [];
                return (
                  <div 
                    key={`day-${day}`} 
                    className={`${styles.calDay} ${isToday ? styles.today : ''}`}
                    onClick={() => handleAddEvent(day)}
                  >
                    <div className={styles.dayNum}>{day}</div>
                    {events.map((ev, index) => (
                      <div key={index} className={`${styles.calEvent} ${ev.class}`} title={ev.title}>
                        {ev.title}
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Next month days */}
              {[1, 2, 3, 4].map((d) => (
                <div key={`next-${d}`} className={`${styles.calDay} ${styles.other}`}>
                  <div className={styles.dayNum}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── ANALYTICS VIEW ─── */}
          <div className={`${styles.view} ${currentView === 'analytics' ? styles.viewActive : ''}`}>
            <div className={styles.analyticsGrid}>
              <div className={styles.anCard}>
                <div className={styles.anLabel}>Total Views</div>
                <div className={styles.anVal}>2.4M</div>
                <div className={styles.anChart}>
                  <div className={styles.anBar} style={{ height: '30%' }}></div>
                  <div className={styles.anBar} style={{ height: '45%' }}></div>
                  <div className={styles.anBar} style={{ height: '38%' }}></div>
                  <div className={styles.anBar} style={{ height: '60%' }}></div>
                  <div className={styles.anBar} style={{ height: '52%' }}></div>
                  <div className={`${styles.anBar} ${styles.hi}`} style={{ height: '80%' }}></div>
                  <div className={`${styles.anBar} ${styles.hi}`} style={{ height: '100%' }}></div>
                </div>
              </div>
              <div className={styles.anCard}>
                <div className={styles.anLabel}>Watch Time (hours)</div>
                <div className={styles.anVal}>84.2K</div>
                <div className={styles.anChart}>
                  <div className={styles.anBar} style={{ height: '40%' }}></div>
                  <div className={styles.anBar} style={{ height: '55%' }}></div>
                  <div className={styles.anBar} style={{ height: '50%' }}></div>
                  <div className={styles.anBar} style={{ height: '65%' }}></div>
                  <div className={`${styles.anBar} ${styles.hi}`} style={{ height: '88%' }}></div>
                  <div className={`${styles.anBar} ${styles.hi}`} style={{ height: '100%' }}></div>
                  <div className={styles.anBar} style={{ height: '90%' }}></div>
                </div>
              </div>
              <div className={styles.anCard}>
                <div className={styles.anLabel}>Est. Revenue</div>
                <div className={styles.anVal}>$3,840</div>
                <div className={styles.anChart}>
                  <div className={styles.anBar} style={{ height: '35%' }}></div>
                  <div className={styles.anBar} style={{ height: '48%' }}></div>
                  <div className={styles.anBar} style={{ height: '42%' }}></div>
                  <div className={`${styles.anBar} ${styles.hi}`} style={{ height: '72%' }}></div>
                  <div className={styles.anBar} style={{ height: '60%' }}></div>
                  <div className={`${styles.anBar} ${styles.hi}`} style={{ height: '95%' }}></div>
                  <div className={`${styles.anBar} ${styles.hi}`} style={{ height: '100%' }}></div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '12px', fontFamily: 'var(--fh)', fontSize: '0.88rem', fontWeight: 700 }}>Top Performing Videos</div>
            <div className={styles.channelList}>
              <div className={styles.chRow}>
                <div className={styles.chAv}>💰</div>
                <div className={styles.chName}>AI Side Hustles That Pay $500/Day</div>
                <div className={styles.chSubs}>342K views · $1,240</div>
                <div className={`${styles.chTrend} ${styles.chUp}`}>↑ 38%</div>
              </div>
              <div className={styles.chRow}>
                <div className={styles.chAv}>🧠</div>
                <div className={styles.chName}>Why 99% of People Stay Broke Forever</div>
                <div className={styles.chSubs}>218K views · $890</div>
                <div className={`${styles.chTrend} ${styles.chUp}`}>↑ 22%</div>
              </div>
              <div className={styles.chRow}>
                <div className={styles.chAv}>📈</div>
                <div className={styles.chName}>I Invested $10K for 1 Year — Results</div>
                <div className={styles.chSubs}>187K views · $740</div>
                <div className={`${styles.chTrend} ${styles.chUp}`}>↑ 14%</div>
              </div>
              <div className={styles.chRow}>
                <div className={styles.chAv}>💡</div>
                <div className={styles.chName}>10 Money Mistakes Rich People Never Make</div>
                <div className={styles.chSubs}>143K views · $580</div>
                <div className={`${styles.chTrend} ${styles.chDn}`}>↓ 3%</div>
              </div>
              <div className={styles.chRow}>
                <div className={styles.chAv}>🏦</div>
                <div className={styles.chName}>The Truth About Passive Income in 2026</div>
                <div className={styles.chSubs}>98K views · $390</div>
                <div className={`${styles.chTrend} ${styles.chUp}`}>↑ 8%</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
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
        Loading Dashboard System...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
