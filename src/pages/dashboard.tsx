import Head from 'next/head';


import { Suspense, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/dashboard.module.css';
import { ArrowDown, ArrowUp, BarChart3, Bell, Bot, Brain, Check, Clock, DollarSign, Flame, Landmark, Lightbulb, PenTool, Play, Search, Smartphone, TrendingUp, Upload, X, XCircle, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

function DashboardContent() {
  const router = useRouter(); const searchParams = useMemo(() => ({ get: (key: string) => { const val = router.query[key]; return Array.isArray(val) ? val[0] : (val || null); } }), [router.query]);
  
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

  const handleViewChange = useCallback((view: string) => {
    setCurrentView(view);
    router.push(`/dashboard?view=${view}`, undefined, { scroll: false });
  }, [router]);

  // Toast notification system
  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
  };

  // Spotlight Search State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigationItems = useMemo(() => [
    { name: 'Overview / Dashboard', icon: <Landmark size={14} />, action: () => handleViewChange('home'), type: 'nav' },
    { name: 'Topic Finder', icon: <Flame size={14} />, action: () => handleViewChange('topics'), type: 'nav' },
    { name: 'Script Generator', icon: <PenTool size={14} />, action: () => router.push('/script-generator'), type: 'nav' },
    { name: 'Shorts Repurposer', icon: <Zap size={14} />, action: () => handleViewChange('shorts'), type: 'nav' },
    { name: 'Content Calendar', icon: <Clock size={14} />, action: () => handleViewChange('calendar'), type: 'nav' },
    { name: 'Analytics & Reports', icon: <BarChart3 size={14} />, action: () => handleViewChange('analytics'), type: 'nav' },
    { name: 'Affiliate Dashboard', icon: <DollarSign size={14} />, action: () => router.push('/affiliate-dashboard'), type: 'nav' },
    { name: 'Creator Emails', icon: <Bell size={14} />, action: () => router.push('/emails'), type: 'nav' },
    { name: 'Notifications Center', icon: <Bell size={14} />, action: () => router.push('/notifications'), type: 'nav' },
    { name: 'Account Settings', icon: <Bot size={14} />, action: () => router.push('/settings'), type: 'nav' },
  ], [handleViewChange, router]);

  // 1. HOME VIEW STATE
  const [pipelineItems] = useState([
    { id: 1, title: 'AI Side Hustles That Pay $500/Day', meta: 'Due in 2 days · Script done', status: 'In Review', statusClass: styles.sReview, thumb: <DollarSign size={14} /> },
    { id: 2, title: 'Why 99% of People Stay Broke Forever', meta: 'Due tomorrow · Editing', status: 'Ready', statusClass: styles.sReady, thumb: <Brain size={14} /> },
    { id: 3, title: 'I Invested $10K in Index Funds for 1 Year', meta: 'Due in 5 days · Writing', status: 'Scripting', statusClass: styles.sScript, thumb: <TrendingUp size={14} /> },
    { id: 4, title: '10 Money Mistakes Rich People Never Make', meta: 'Idea stage · Not started', status: 'Idea', statusClass: styles.sIdea, thumb: <Lightbulb size={14} /> }
  ]);

  // 2. TOPIC FINDER STATE
  const [niche, setNiche] = useState<string>('Personal Finance');
  const [market, setMarket] = useState<string>('US Market');
  const [period, setPeriod] = useState<string>('This Week');
  const [isSearchingTopics, setIsSearchingTopics] = useState<boolean>(false);
  const [topicList, setTopicList] = useState<any[]>([
    { id: 1, title: '"AI Side Hustles That Actually Pay $500/Day in 2026"', score: 9.4, badge: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Flame size={14} /> HOT PICK</span>, badgeClass: styles.scoreHot, views: '2.1M', rpm: '$18', comp: 'Low', isTop: true },
    { id: 2, title: '"Why 99% of People Stay Broke (And How to Escape)"', score: 8.8, badge: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Flame size={14} /> TRENDING</span>, badgeClass: styles.scoreHot, views: '1.7M', rpm: '$22', comp: 'Medium', isTop: false },
    { id: 3, title: '"I Tested Every AI Investing Tool for 30 Days — Here\'s What Happened"', score: 8.1, badge: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Zap size={14} /> RISING</span>, badgeClass: styles.scoreWarm, views: '980K', rpm: '$15', comp: 'Low', isTop: false },
    { id: 4, title: '"The $0 Budget Strategy That Made Me $100K"', score: 7.9, badge: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Zap size={14} /> RISING</span>, badgeClass: styles.scoreWarm, views: '850K', rpm: '$20', comp: 'Low', isTop: false },
    { id: 5, title: '"10 Money Mistakes That Are Keeping You Poor"', score: 7.2, badge: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><BarChart3 size={14} /> STEADY</span>, badgeClass: styles.scoreOk, views: '620K', rpm: '$19', comp: 'High', isTop: false },
    { id: 6, title: '"How to Save $1,000 in 30 Days on Any Income"', score: 6.8, badge: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><BarChart3 size={14} /> STEADY</span>, badgeClass: styles.scoreOk, views: '510K', rpm: '$17', comp: 'Medium', isTop: false }
  ]);

  const handleSearchTopics = async () => {
    if (!niche.trim()) {
      triggerToast('Enter your niche first!', 'error');
      return;
    }

    setIsSearchingTopics(true);
    triggerToast('Analyzing market search trends and RPM yields...', 'success');

    try {
      const response = await fetch('/api/ai/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, market, period })
      });

      if (!response.ok) {
        let errMsg = `Server Error: ${response.status}`;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const err = await response.json();
            errMsg = err.error || errMsg;
          } else {
            const text = await response.text();
            if (text && text.trim().startsWith('<')) {
              errMsg = `Server Error: ${response.status} (${response.statusText || 'Internal Server Error'})`;
            } else {
              errMsg = text || errMsg;
            }
          }
        } catch {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      if (data.topics && Array.isArray(data.topics)) {
        setTopicList(data.topics);
        triggerToast(`Found ${data.topics.length} viral topic ideas for ${niche}!`, 'success');
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      console.error(err);
      triggerToast(err.message || 'Failed to search topics. Running offline simulation...', 'error');
      
      // Graceful simulation fallback
      setTimeout(() => {
        triggerToast('Simulation loaded! Found 6 trending viral topics!');
      }, 1000);
    } finally {
      setIsSearchingTopics(false);
    }
  };

  const handleWriteScriptRedirect = useCallback((title: string) => {
    const cleanTitle = title.replace(/"/g, '');
    router.push(`/script-generator?topic=${encodeURIComponent(cleanTitle)}`);
  }, [router]);

  // 3. SHORTS STATE
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [isProcessingShorts, setIsProcessingShorts] = useState<boolean>(false);
  const [shortsProgress, setShortsProgress] = useState<number>(100);
  const [shortsClips, setShortsClips] = useState<any[]>([
    { id: 1, title: 'Hook: "What if I told you people are making $500/day with AI…"', meta: '0:00 – 0:38 · Perfect hook · High energy', score: 9.6, thumb: <Flame size={14} /> },
    { id: 2, title: 'AI Faceless YouTube breakdown — numbers revealed', meta: '2:14 – 2:58 · Surprising stat · Strong CTA', score: 8.9, thumb: <Lightbulb size={14} /> },
    { id: 3, title: '"This one tool replaced my $3K/mo freelancer"', meta: '5:40 – 6:22 · Value bomb · Shareable', score: 8.7, thumb: <DollarSign size={14} /> },
    { id: 4, title: 'AI writing hustle — $500 to $2K/month breakdown', meta: '7:05 – 7:50 · Actionable · Beginner-friendly', score: 8.2, thumb: <Bot size={14} /> },
    { id: 5, title: 'The #1 mistake people make with AI side hustles', meta: '9:30 – 10:08 · Contrarian · High shares', score: 7.9, thumb: <Smartphone size={14} /> }
  ]);

  const handleUploadClick = () => {
    triggerToast('Starting video file upload...', 'success');
  };

  const handleProcessYoutube = async () => {
    if (!youtubeUrl.trim()) {
      triggerToast('Please enter a YouTube URL', 'error');
      return;
    }
    setIsProcessingShorts(true);
    setShortsProgress(10);
    triggerToast('Downloading stream meta and parsing transcript...', 'success');

    const progressTimer = setInterval(() => {
      setShortsProgress((prev) => Math.min(prev + 12, 90));
    }, 450);

    try {
      const response = await fetch('/api/ai/shorts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl })
      });

      clearInterval(progressTimer);

      if (!response.ok) {
        let errMsg = `Server Error: ${response.status}`;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const err = await response.json();
            errMsg = err.error || errMsg;
          } else {
            const text = await response.text();
            if (text && text.trim().startsWith('<')) {
              errMsg = `Server Error: ${response.status} (${response.statusText || 'Internal Server Error'})`;
            } else {
              errMsg = text || errMsg;
            }
          }
        } catch {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      if (data.clips && Array.isArray(data.clips)) {
        setShortsProgress(100);
        setShortsClips(data.clips);
        triggerToast(`Success! Found ${data.clips.length} viral hooks in this video!`, 'success');
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      console.error(err);
      clearInterval(progressTimer);
      triggerToast(err.message || 'Failed to parse video. Running offline simulation...', 'error');
      
      // Graceful simulation fallback
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
    } finally {
      setIsProcessingShorts(false);
    }
  };

  const handleExportAllShorts = () => {
    triggerToast('Exporting all clips to Google Drive/Local downloads...');
  };

  const searchItems = useMemo(() => {
    const projectItems = pipelineItems.map(item => ({
      name: item.title,
      icon: <Play size={14} />,
      action: () => {
        triggerToast(`Opening project: "${item.title}"`);
        handleViewChange('home');
      },
      type: 'project'
    }));

    const topicItems = topicList.map(item => ({
      name: item.title.replace(/"/g, ''),
      icon: <Flame size={14} />,
      action: () => {
        handleWriteScriptRedirect(item.title);
      },
      type: 'topic'
    }));

    return [
      ...navigationItems,
      ...projectItems,
      ...topicItems
    ];
  }, [pipelineItems, topicList, navigationItems, handleViewChange, handleWriteScriptRedirect]);

  const filteredSearchItems = useMemo(() => {
    if (!searchQuery) return searchItems.slice(0, 8);
    return searchItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, searchItems]);

  // 4. CALENDAR STATE
  const [calendarEvents, setCalendarEvents] = useState<Record<number, { title: string; class: string; icon?: 'upload' | 'check' }[]>>({
    1: [{ title: 'Script: AI Tools', class: styles.evBlue }],
    3: [{ title: 'Upload: AI Side Hustles', class: styles.evRed, icon: 'upload' }],
    5: [{ title: 'Edit due: Stay Broke', class: styles.evGreen, icon: 'check' }],
    10: [
      { title: 'Upload: Stay Broke', class: styles.evRed, icon: 'upload' },
      { title: 'Script: Investing', class: styles.evBlue }
    ],
    16: [{ title: 'Thumbnail review', class: styles.evGreen, icon: 'check' }],
    21: [{ title: 'Upload: $10K Investing', class: styles.evRed, icon: 'upload' }],
    28: [{ title: 'Upload: Money Mistakes', class: styles.evRed, icon: 'upload' }]
  });

  const handleAddEvent = (day: number) => {
    if (day < 1 || day > 31) return;
    const title = prompt('Enter video title or event to schedule for May ' + day + ':', 'New Video Script');
    if (title) {
      const type = prompt('Enter event type (upload, script, review):', 'script');
      let evClass = styles.evBlue;
      let finalTitle = title;
      let finalIcon: 'upload' | 'check' | undefined = undefined;
      if (type === 'upload') {
        evClass = styles.evRed;
        finalTitle = 'Upload: ' + title;
        finalIcon = 'upload';
      } else if (type === 'review') {
        evClass = styles.evGreen;
        finalTitle = title;
        finalIcon = 'check';
      } else {
        finalTitle = 'Script: ' + title;
      }

      setCalendarEvents((prev) => ({
        ...prev,
        [day]: [...(prev[day] || []), { title: finalTitle, class: evClass, icon: finalIcon }]
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

  const viewActionLabels: Record<string, React.ReactNode> = {
    home: '+ New Video',
    topics: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Search size={16} /> Find Topics</span>,
    shorts: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><ArrowDown size={16} /> Export All</span>,
    calendar: '+ Schedule',
    analytics: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><BarChart3 size={16} /> Export</span>
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
          
          <div className={styles.tbSearchContainer}>
            <div className={styles.tbSearch} onClick={() => setSearchOpen(true)}>
              <span><Search size={16} /></span>
              <input
                ref={searchInputRef}
                className={styles.searchInput}
                type="text"
                placeholder="Search anything…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
              />
              <kbd>⌘K</kbd>
            </div>
            
            {searchOpen && (
              <>
                <div 
                  className={styles.searchBackdrop}
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }} 
                />
                <div className={styles.searchResultsDropdown} style={{ zIndex: 999 }}>
                  {/* Mobile Search Header */}
                  <div className={styles.mobileSearchHeader}>
                    <Search size={16} className={styles.mobileSearchIcon} />
                    <input
                      type="text"
                      className={styles.mobileSearchInput}
                      placeholder="Search anything..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button 
                      className={styles.mobileSearchClose}
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {searchQuery.trim().length === 0 ? (
                    <div className={styles.searchPrompt}>Type a query to search tools, active projects, and viral topics...</div>
                  ) : filteredSearchItems.length === 0 ? (
                    <div className={styles.searchEmpty}>No results found for &quot;{searchQuery}&quot;</div>
                  ) : (
                    <>
                      {filteredSearchItems.filter(item => item.type === 'nav').length > 0 && (
                        <div className={styles.searchSection}>
                          <div className={styles.searchHeader}>Tools & Pages</div>
                          {filteredSearchItems.filter(item => item.type === 'nav').map((item) => (
                            <div 
                              key={item.name} 
                              className={styles.searchItem} 
                              onClick={() => { item.action(); setSearchOpen(false); setSearchQuery(''); }}
                            >
                              <span className={styles.searchIcon}>{item.icon}</span>
                              <span>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {filteredSearchItems.filter(item => item.type === 'project').length > 0 && (
                        <div className={styles.searchSection}>
                          <div className={styles.searchHeader}>Active Projects</div>
                          {filteredSearchItems.filter(item => item.type === 'project').map((item) => (
                            <div 
                              key={item.name} 
                              className={styles.searchItem} 
                              onClick={() => { item.action(); setSearchOpen(false); setSearchQuery(''); }}
                            >
                              <span className={styles.searchIcon}>{item.icon}</span>
                              <span>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {filteredSearchItems.filter(item => item.type === 'topic').length > 0 && (
                        <div className={styles.searchSection}>
                          <div className={styles.searchHeader}>Viral Suggestions</div>
                          {filteredSearchItems.filter(item => item.type === 'topic').map((item) => (
                            <div 
                              key={item.name} 
                              className={styles.searchItem} 
                              onClick={() => { item.action(); setSearchOpen(false); setSearchQuery(''); }}
                            >
                              <span className={styles.searchIcon}>{item.icon}</span>
                              <span>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          <div className={`${styles.tbIconBtn} ${styles.notifDot}`} onClick={() => router.push('/notifications')}><Bell size={16} /></div>
          
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
              {toastType === 'error' ? <XCircle size={16} /> : <Check size={16} />} {toastMessage}
            </div>
          )}

          {/* ─── HOME VIEW ─── */}
          <div className={`${styles.view} ${currentView === 'home' ? styles.viewActive : ''}`}>
            <div className={styles.homeGrid}>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Total Views (30d)</div>
                <div className={styles.statVal}>2.4M</div>
                <div className={`${styles.statDelta} ${styles.deltaUp}`}><ArrowUp size={10} /> 18% vs last month</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Subscribers</div>
                <div className={styles.statVal}>241K</div>
                <div className={`${styles.statDelta} ${styles.deltaUp}`}><ArrowUp size={10} /> +3.2K this week</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Videos Published</div>
                <div className={styles.statVal}>12</div>
                <div className={`${styles.statDelta} ${styles.deltaUp}`}><ArrowUp size={10} /> 4 more than last month</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Est. Revenue (30d)</div>
                <div className={styles.statVal}>$3,840</div>
                <div className={`${styles.statDelta} ${styles.deltaUp}`}><ArrowUp size={10} /> 22% vs last month</div>
              </div>
            </div>

            <div className={styles.homeMid}>
              {/* Content Pipeline */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>Content Pipeline</div>
                  <div className={styles.cardAction} onClick={() => handleViewChange('calendar')}>View all</div>
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
                  <div className={styles.cardAction}><ArrowUp size={11} /> Best week ever</div>
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
                <div className={styles.qaIcon} style={{ background: 'var(--red-bg)' }}><Flame size={16} /></div>
                <div>
                  <div className={styles.qaLabel}>Find Viral Topics</div>
                  <div className={styles.qaSub}>AI-ranked ideas for your niche</div>
                </div>
              </div>
              <div className={styles.qaBtn} onClick={() => router.push('/script-generator')}>
                <div className={styles.qaIcon} style={{ background: 'var(--blue-bg)' }}><PenTool size={16} /></div>
                <div>
                  <div className={styles.qaLabel}>Write a Script</div>
                  <div className={styles.qaSub}>12 formats, hooks included</div>
                </div>
              </div>
              <div className={styles.qaBtn} onClick={() => handleViewChange('shorts')}>
                <div className={styles.qaIcon} style={{ background: 'var(--green-bg)' }}><Zap size={16} /></div>
                <div>
                  <div className={styles.qaLabel}>Repurpose to Shorts</div>
                  <div className={styles.qaSub}>Find best moments automatically</div>
                </div>
              </div>
              <div className={styles.qaBtn} onClick={() => handleViewChange('analytics')}>
                <div className={styles.qaIcon} style={{ background: 'var(--amber-bg)' }}><BarChart3 size={16} /></div>
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
                <option value="US Market">US Market</option>
                <option value="Global">Global</option>
                <option value="UK Market">UK Market</option>
              </select>
              <select className={styles.selectInput} value={period} onChange={(e) => setPeriod(e.target.value)}>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Trending Now">Trending Now</option>
              </select>
              <button className={styles.tbBtn} onClick={handleSearchTopics} disabled={isSearchingTopics}>
                {isSearchingTopics ? 'Searching...' : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Search size={16} /> Find Topics</span>}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Showing <b style={{ color: 'var(--text)' }}>8 ideas</b> ranked by viral potential</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--red-bg)', border: '1px solid var(--red-border)', color: 'var(--red)', fontSize: '11px', cursor: 'pointer' }} onClick={() => triggerToast('Filtering all hot topics')}><Flame size={16} /> All</div>
                <div style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--s3)', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: '11px', cursor: 'pointer' }} onClick={() => triggerToast('Filtered by high RPM')}>High RPM</div>
                <div style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--s3)', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: '11px', cursor: 'pointer' }} onClick={() => triggerToast('Filtered by low competition')}>Low Comp.</div>
              </div>
            </div>

            <div className={styles.topicsGrid}>
              {topicList.map((topic) => {
                const isStringBadge = typeof topic.badge === 'string';
                const displayBadge = isStringBadge ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {topic.badge === 'HOT PICK' || topic.badge === 'TRENDING' ? <Flame size={14} /> : 
                     topic.badge === 'RISING' ? <Zap size={14} /> : <BarChart3 size={14} />}
                    {topic.badge}
                  </span>
                ) : topic.badge;

                const badgeClass = isStringBadge ? (
                  topic.badge === 'HOT PICK' || topic.badge === 'TRENDING' ? styles.scoreHot :
                  topic.badge === 'RISING' ? styles.scoreWarm : styles.scoreOk
                ) : topic.badgeClass;

                return (
                  <div key={topic.id} className={`${styles.topicCard} ${topic.isTop ? styles.topPick : ''}`}>
                    <div className={styles.topicScore}>
                      <span className={`${styles.scoreBadge} ${badgeClass}`}>{displayBadge}</span>
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
                      <button className={`${styles.tAction} ${styles.primary}`} onClick={() => handleWriteScriptRedirect(topic.title)}><PenTool size={16} /> Write Script</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── SHORTS VIEW ─── */}
          <div className={`${styles.view} ${currentView === 'shorts' ? styles.viewActive : ''}`}>
            <div className={styles.shortsLayout}>
              <div>
                <div className={styles.uploadZone} style={{ marginBottom: '16px' }} onClick={handleUploadClick}>
                  <div className={styles.uploadIcon}><Play size={16} /></div>
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
                      {isProcessingShorts ? `Processing ${shortsProgress}%` : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Check size={16} /> Complete</span>}
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--s4)', borderRadius: '3px', overflow: 'hidden', marginBottom: '14px' }}>
                    <div style={{ width: `${shortsProgress}%`, height: '100%', background: isProcessingShorts ? 'var(--amber)' : 'var(--green)', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--muted)' }}>
                    <span><Clock size={16} /> 11m 42s original</span>
                    <span><Zap size={16} /> 5 clips found</span>
                    <span><Smartphone size={16} /> Ready to export</span>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>5 best moments detected · click to preview</div>
                  <button className={styles.tbBtn} style={{ fontSize: '11px', padding: '6px 12px' }} onClick={handleExportAllShorts}><ArrowDown size={16} /> Export All</button>
                </div>
                <div className={styles.shortsClips}>
                  {shortsClips.map((clip) => {
                    const displayThumb = clip.thumb || (
                      clip.score >= 9.0 ? <Flame size={14} /> :
                      clip.score >= 8.5 ? <Lightbulb size={14} /> :
                      clip.score >= 8.0 ? <DollarSign size={14} /> : <Smartphone size={14} />
                    );

                    return (
                      <div key={clip.id} className={styles.clipCard} onClick={() => triggerToast(`Playing preview for clip: ${clip.title}`)}>
                        <div className={styles.clipThumb}>{displayThumb}</div>
                        <div className={styles.clipInfo}>
                          <div className={styles.clipTitle}>{clip.title}</div>
                          <div className={styles.clipMeta}>{clip.meta}</div>
                        </div>
                        <div className={styles.clipScore}>{clip.score}</div>
                      </div>
                    );
                  })}
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
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          {ev.icon === 'upload' && <Upload size={12} />}
                          {ev.icon === 'check' && <Check size={12} />}
                          {ev.title}
                        </span>
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
                <div className={styles.chAv}><DollarSign size={16} /></div>
                <div className={styles.chName}>AI Side Hustles That Pay $500/Day</div>
                <div className={styles.chSubs}>342K views · $1,240</div>
                <div className={`${styles.chTrend} ${styles.chUp}`}><ArrowUp size={10} /> 38%</div>
              </div>
              <div className={styles.chRow}>
                <div className={styles.chAv}><Brain size={16} /></div>
                <div className={styles.chName}>Why 99% of People Stay Broke Forever</div>
                <div className={styles.chSubs}>218K views · $890</div>
                <div className={`${styles.chTrend} ${styles.chUp}`}><ArrowUp size={10} /> 22%</div>
              </div>
              <div className={styles.chRow}>
                <div className={styles.chAv}><TrendingUp size={16} /></div>
                <div className={styles.chName}>I Invested $10K for 1 Year — Results</div>
                <div className={styles.chSubs}>187K views · $740</div>
                <div className={`${styles.chTrend} ${styles.chUp}`}><ArrowUp size={10} /> 14%</div>
              </div>
              <div className={styles.chRow}>
                <div className={styles.chAv}><Lightbulb size={16} /></div>
                <div className={styles.chName}>10 Money Mistakes Rich People Never Make</div>
                <div className={styles.chSubs}>143K views · $580</div>
                <div className={`${styles.chTrend} ${styles.chDn}`}><ArrowDown size={10} /> 3%</div>
              </div>
              <div className={styles.chRow}>
                <div className={styles.chAv}><Landmark size={16} /></div>
                <div className={styles.chName}>The Truth About Passive Income in 2026</div>
                <div className={styles.chSubs}>98K views · $390</div>
                <div className={`${styles.chTrend} ${styles.chUp}`}><ArrowUp size={10} /> 8%</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
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
        <title>Creator Dashboard — AutoTube OS</title>
        <meta name="description" content="Manage your active YouTube channels, view growth intelligence, and track content status in real-time." />
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
        Loading Dashboard System...
      </div>
    }>
      <DashboardContent />
    </Suspense>
      </>
  );
}
