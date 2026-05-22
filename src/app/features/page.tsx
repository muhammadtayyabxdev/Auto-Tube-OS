'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/features.module.css';
import { AlertTriangle, ArrowDown, BarChart3, Bell, Bot, Brain, CalendarDays, Check, ClipboardList, Clock, DollarSign, Eye, FileText, Flame, Globe, Image as ImageIcon, Lightbulb, MailOpen, MessageCircle, PenTool, Pin, Play, RefreshCw, Save, Search, Settings, Shuffle, Smartphone, Target, TrendingUp, Trophy, Upload, Users, Zap } from 'lucide-react';

type TabId = 'topic' | 'script' | 'shorts' | 'retention' | 'calendar' | 'competitor' | 'agents';

interface Tab {
  id: TabId;
  label: string;
}

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<TabId>('topic');

  const tabs: Tab[] = [
    { id: 'topic', label: '<Flame size={16} /> Topic Finder' },
    { id: 'script', label: '<PenTool size={16} /> Script Generator' },
    { id: 'shorts', label: '<Zap size={16} /> Shorts Repurposer' },
    { id: 'retention', label: '<BarChart3 size={16} /> Retention Optimizer' },
    { id: 'calendar', label: '<CalendarDays size={16} /> Content Calendar' },
    { id: 'competitor', label: '<Search size={16} /> Competitor Intel' },
    { id: 'agents', label: '<Bot size={16} /> AI Agents' },
  ];

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />

      <div className={styles.featNav}>
        <div className={styles.featTabs}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${styles.ftab} ${activeTab === tab.id ? styles.on : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* TOPIC FINDER */}
      <div className={`${styles.fview} ${activeTab === 'topic' ? styles.active : ''}`}>
        <div className={styles.featHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.featInner}>
            <div>
              <div className={styles.fiLabel} style={{ color: 'var(--red)' }}>
                Feature 01 — Topic Finder
              </div>
              <div className={styles.fiTitle}>Stop guessing. Start finding viral ideas.</div>
              <div className={styles.fiSub}>
                AI scans YouTube, Reddit, and Google Trends in real time — then scores every idea by
                views potential, RPM, and competition. Your next viral video is already out there.
                We'll find it.
              </div>
              <div className={styles.fiBtns}>
                <Link href="/auth" className={styles.btnP}>
                  Try Topic Finder Free →
                </Link>
              </div>
            </div>
            <div className={styles.demoBox}>
              <div className={styles.dbBar}>
                <div className={styles.dbd} style={{ background: '#ff5f57' }}></div>
                <div className={styles.dbd} style={{ background: '#ffbd2e' }}></div>
                <div className={styles.dbd} style={{ background: '#28c840' }}></div>
                <div style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--muted2)' }}>
                  Topic Finder — Finance
                </div>
              </div>
              <div className={styles.dbBody}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <div
                    style={{
                      flex: 1,
                      background: 'var(--s3)',
                      border: '1px solid var(--red-border)',
                      borderRadius: '7px',
                      padding: '8px 10px',
                      fontSize: '12px',
                      color: 'var(--muted2)',
                    }}
                  >
                    Personal Finance
                  </div>
                  <div
                    style={{
                      background: 'var(--red)',
                      borderRadius: '7px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    Find Topics
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 61, 61, 0.07), var(--s3))',
                      border: '1px solid var(--red-border)',
                      borderRadius: '9px',
                      padding: '11px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>
                        AI Side Hustles That Pay $500/Day
                      </span>
                      <span style={{ fontFamily: 'var(--fh)', fontWeight: 800, color: 'var(--red)' }}>
                        9.4
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '10px', color: 'var(--muted2)' }}>
                      <span>2.1M est. views</span>
                      <span>$18 RPM</span>
                      <span style={{ color: 'var(--green)' }}>Low comp.</span>
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'var(--s3)',
                      border: '1px solid var(--border)',
                      borderRadius: '9px',
                      padding: '11px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>
                        Why 99% of People Stay Broke
                      </span>
                      <span style={{ fontFamily: 'var(--fh)', fontWeight: 800, color: 'var(--red)' }}>
                        8.8
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '10px', color: 'var(--muted2)' }}>
                      <span>1.7M est. views</span>
                      <span>$22 RPM</span>
                      <span style={{ color: 'var(--amber)' }}>Medium</span>
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'var(--s3)',
                      border: '1px solid var(--border)',
                      borderRadius: '9px',
                      padding: '11px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>
                        I Tested Every AI Tool for 30 Days
                      </span>
                      <span style={{ fontFamily: 'var(--fh)', fontWeight: 800, color: 'var(--red)' }}>
                        8.1
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '10px', color: 'var(--muted2)' }}>
                      <span>980K est. views</span>
                      <span>$15 RPM</span>
                      <span style={{ color: 'var(--green)' }}>Low comp.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.featSec}>
          <div className={styles.secLbl} style={{ color: 'var(--red)' }}>
            How It Works
          </div>
          <div className={styles.secTtl}>From niche to ranked ideas in seconds</div>
          <div className={styles.hsteps}>
            <div className={styles.hs}>
              <div className={styles.hsN}>01</div>
              <div className={styles.hsI}>⌨️</div>
              <div className={styles.hsT}>Enter your niche</div>
              <div className={styles.hsD}>
                Type your niche or paste a competitor channel URL.
              </div>
            </div>
            <div className={styles.hs}>
              <div className={styles.hsN}>02</div>
              <div className={styles.hsI}><Search size={16} /></div>
              <div className={styles.hsT}>AI scans the web</div>
              <div className={styles.hsD}>
                YouTube trends, Reddit, and Google search volume analyzed.
              </div>
            </div>
            <div className={styles.hs}>
              <div className={styles.hsN}>03</div>
              <div className={styles.hsI}><BarChart3 size={16} /></div>
              <div className={styles.hsT}>Ideas get scored</div>
              <div className={styles.hsD}>
                Ranked 0–10 by views potential, RPM, and competition level.
              </div>
            </div>
            <div className={styles.hs}>
              <div className={styles.hsN}>04</div>
              <div className={styles.hsI}><PenTool size={16} /></div>
              <div className={styles.hsT}>One-click to script</div>
              <div className={styles.hsD}>
                Hit "Write Script" on any idea and jump to the generator.
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'var(--s1)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '60px 6%',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className={styles.statsR}>
              <div className={styles.sc}>
                <div className={styles.scN}>8+</div>
                <div className={styles.scL}>Ranked ideas per search</div>
              </div>
              <div className={styles.sc}>
                <div className={styles.scN}>Daily</div>
                <div className={styles.scL}>Trend data refreshed</div>
              </div>
              <div className={styles.sc}>
                <div className={styles.scN}>40+</div>
                <div className={styles.scL}>Countries supported</div>
              </div>
              <div className={styles.sc}>
                <div className={styles.scN}>30s</div>
                <div className={styles.scL}>Average time to results</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.featSec}>
          <div className={styles.secLbl} style={{ color: 'var(--red)' }}>
            What's Included
          </div>
          <div className={styles.secTtl}>Everything in Topic Finder</div>
          <div className={styles.fg}>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><TrendingUp size={16} /></div>
              <div className={styles.fgTitle}>Viral Score (0–10)</div>
              <div className={styles.fgDesc}>
                AI scores every idea by estimated views, trend velocity, and viral potential.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><DollarSign size={16} /></div>
              <div className={styles.fgTitle}>RPM Estimation</div>
              <div className={styles.fgDesc}>
                See estimated ad revenue per 1,000 views before you record.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Target size={16} /></div>
              <div className={styles.fgTitle}>Competition Level</div>
              <div className={styles.fgDesc}>
                Low, medium, or high — so you know where you can actually win.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Search size={16} /></div>
              <div className={styles.fgTitle}>Gap Analysis</div>
              <div className={styles.fgDesc}>
                Find topics your competitors haven't covered that their audience wants.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Globe size={16} /></div>
              <div className={styles.fgTitle}>Market Targeting</div>
              <div className={styles.fgDesc}>
                Switch between US, UK, Global, and local markets instantly.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Save size={16} /></div>
              <div className={styles.fgTitle}>Save to Pipeline</div>
              <div className={styles.fgDesc}>
                Save ideas to your pipeline and add them to Calendar with one click.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCRIPT GENERATOR */}
      <div className={`${styles.fview} ${activeTab === 'script' ? styles.active : ''}`}>
        <div className={styles.featHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.featInner}>
            <div>
              <div className={styles.fiLabel} style={{ color: 'var(--blue)' }}>
                Feature 02 — Script Generator
              </div>
              <div className={styles.fiTitle}>Full scripts. 60 seconds flat.</div>
              <div className={styles.fiSub}>
                8 different video formats, AI-powered hooks, retention markers, and CTAs. Stop
                writing from scratch. Start editing great first drafts.
              </div>
              <div className={styles.fiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--blue)' }}>
                  Generate a Script →
                </Link>
              </div>
            </div>
            <div className={styles.demoBox}>
              <div className={styles.dbBar}>
                <div className={styles.dbd} style={{ background: '#ff5f57' }}></div>
                <div className={styles.dbd} style={{ background: '#ffbd2e' }}></div>
                <div className={styles.dbd} style={{ background: '#28c840' }}></div>
              </div>
              <div className={styles.dbBody}>
                <div
                  style={{
                    fontSize: '9px',
                    color: 'var(--red)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '7px',
                  }}
                >
                  🎣 Hook (0–15s)
                </div>
                <div
                  style={{
                    background: 'var(--red-bg)',
                    borderLeft: '2px solid var(--red)',
                    borderRadius: '0 6px 6px 0',
                    padding: '10px 12px',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    marginBottom: '10px',
                  }}
                >
                  "What if I told you there are people making $500 a day using free AI tools right
                  now?"
                </div>
                <div
                  style={{
                    fontSize: '9px',
                    color: 'var(--blue)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '7px',
                  }}
                >
                  <Pin size={16} /> Intro (15–45s)
                </div>
                <div
                  style={{
                    background: 'rgba(59, 130, 246, 0.06)',
                    borderLeft: '2px solid var(--blue)',
                    borderRadius: '0 6px 6px 0',
                    padding: '10px 12px',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: 'var(--muted)',
                    marginBottom: '12px',
                  }}
                >
                  "In this video I'm breaking down 7 real AI side hustles working in 2026..."
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      flex: 1,
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--green), var(--amber), var(--red))',
                      borderRadius: '2px',
                    }}
                  ></div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: 'var(--green)',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    87 Score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featSec}>
          <div className={styles.secLbl} style={{ color: 'var(--blue)' }}>
            8 Script Formats
          </div>
          <div className={styles.secTtl}>Every format your channel needs</div>
          <div className={styles.fg} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><ClipboardList size={16} /></div>
              <div className={styles.fgTitle}>Listicle</div>
              <div className={styles.fgDesc}>
                "7 Ways to..." — numbered, easy to follow, high retention.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Play size={16} /></div>
              <div className={styles.fgTitle}>Documentary</div>
              <div className={styles.fgDesc}>Narrative storytelling with facts and reveals.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><DollarSign size={16} /></div>
              <div className={styles.fgTitle}>Finance</div>
              <div className={styles.fgDesc}>
                Data-driven with specific numbers and case studies.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}>👻</div>
              <div className={styles.fgTitle}>Horror Story</div>
              <div className={styles.fgDesc}>Suspense and dramatic reveals for story channels.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><MessageCircle size={16} /></div>
              <div className={styles.fgTitle}>Reddit Story</div>
              <div className={styles.fgDesc}>
                First-person confessions and AITA-style formats.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Zap size={16} /></div>
              <div className={styles.fgTitle}>Shorts (60s)</div>
              <div className={styles.fgDesc}>Ultra-punchy, one insight, perfect for Shorts.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Brain size={16} /></div>
              <div className={styles.fgTitle}>Educational</div>
              <div className={styles.fgDesc}>Clear structure, examples, and key takeaways.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}>🎭</div>
              <div className={styles.fgTitle}>Motivational</div>
              <div className={styles.fgDesc}>
                Emotional beats, inspiring language, high shareability.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHORTS */}
      <div className={`${styles.fview} ${activeTab === 'shorts' ? styles.active : ''}`}>
        <div className={styles.featHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.featInner}>
            <div>
              <div className={styles.fiLabel} style={{ color: 'var(--green)' }}>
                Feature 03 — Shorts Repurposer
              </div>
              <div className={styles.fiTitle}>1 video. 5 Shorts. Automatically.</div>
              <div className={styles.fiSub}>
                Upload or paste a YouTube URL. AI finds the 5 best moments, rewrites hooks for Shorts
                format, and exports scripts for TikTok, Reels, and YouTube Shorts. No manual
                watching required.
              </div>
              <div className={styles.fiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--green)' }}>
                  Try Shorts Repurposer →
                </Link>
              </div>
            </div>
            <div className={styles.demoBox}>
              <div className={styles.dbBar}>
                <div className={styles.dbd} style={{ background: '#ff5f57' }}></div>
                <div className={styles.dbd} style={{ background: '#ffbd2e' }}></div>
                <div className={styles.dbd} style={{ background: '#28c840' }}></div>
              </div>
              <div className={styles.dbBody}>
                <div style={{ fontSize: '11px', color: 'var(--muted2)', marginBottom: '10px' }}>
                  5 clips detected from "AI Side Hustles" (11m 42s)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'var(--s3)',
                      borderRadius: '8px',
                      padding: '9px',
                    }}
                  >
                    <span><Flame size={16} /></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', fontWeight: 600 }}>
                        Hook: "people making $500/day..."
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--muted2)' }}>0:00–0:38</div>
                    </div>
                    <div style={{ fontFamily: 'var(--fh)', fontWeight: 800, color: 'var(--green)' }}>
                      9.6
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'var(--s3)',
                      borderRadius: '8px',
                      padding: '9px',
                    }}
                  >
                    <span><Lightbulb size={16} /></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', fontWeight: 600 }}>AI YouTube numbers revealed</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted2)' }}>2:14–2:58</div>
                    </div>
                    <div style={{ fontFamily: 'var(--fh)', fontWeight: 800, color: 'var(--green)' }}>
                      8.9
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: 'var(--s3)',
                      borderRadius: '8px',
                      padding: '9px',
                    }}
                  >
                    <span><DollarSign size={16} /></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', fontWeight: 600 }}>
                        "This tool replaced my $3K/mo freelancer"
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--muted2)' }}>5:40–6:22</div>
                    </div>
                    <div style={{ fontFamily: 'var(--fh)', fontWeight: 800, color: 'var(--green)' }}>
                      8.7
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: '10px',
                    background: 'var(--green-bg)',
                    border: '1px solid var(--green-border)',
                    borderRadius: '8px',
                    padding: '8px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: 'var(--green)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <ArrowDown size={16} /> Export All 5 Shorts Scripts
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featSec}>
          <div className={styles.secLbl} style={{ color: 'var(--green)' }}>
            What's Included
          </div>
          <div className={styles.secTtl}>Shorts Repurposer features</div>
          <div className={styles.fg}>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Target size={16} /></div>
              <div className={styles.fgTitle}>Auto Clip Detection</div>
              <div className={styles.fgDesc}>
                Finds the highest-energy, most shareable moments automatically.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}>🪝</div>
              <div className={styles.fgTitle}>Hook Rewriter</div>
              <div className={styles.fgDesc}>
                Rewrites each clip's opening for the Shorts format.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Smartphone size={16} /></div>
              <div className={styles.fgTitle}>Multi-Platform Export</div>
              <div className={styles.fgDesc}>
                Scripts for YouTube Shorts, TikTok, and Instagram Reels.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><BarChart3 size={16} /></div>
              <div className={styles.fgTitle}>Virality Scoring</div>
              <div className={styles.fgDesc}>
                Each clip scored 0–10 so you know which to post first.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Clock size={16} /></div>
              <div className={styles.fgTitle}>Exact Timestamps</div>
              <div className={styles.fgDesc}>Start and end timestamps for your editor's reference.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Play size={16} /></div>
              <div className={styles.fgTitle}>4-Hour Videos</div>
              <div className={styles.fgDesc}>
                Works on long-form podcasts, documentaries, and deep-dives.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RETENTION */}
      <div className={`${styles.fview} ${activeTab === 'retention' ? styles.active : ''}`}>
        <div className={styles.featHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.featInner}>
            <div>
              <div className={styles.fiLabel} style={{ color: 'var(--amber)' }}>
                Feature 04 — Retention Optimizer
              </div>
              <div className={styles.fiTitle}>Fix your script before you record.</div>
              <div className={styles.fiSub}>
                Paste your script and get a retention score (0–100) with specific feedback on hook
                strength, pacing, and drop-off risk points. Backed by 50,000+ high-retention videos.
              </div>
              <div className={styles.fiBtns}>
                <Link
                  href="/auth"
                  className={styles.btnP}
                  style={{ background: 'var(--amber)', color: '#000' }}
                >
                  Analyze My Script →
                </Link>
              </div>
            </div>
            <div className={styles.demoBox}>
              <div className={styles.dbBar}>
                <div className={styles.dbd} style={{ background: '#ff5f57' }}></div>
                <div className={styles.dbd} style={{ background: '#ffbd2e' }}></div>
                <div className={styles.dbd} style={{ background: '#28c840' }}></div>
              </div>
              <div className={styles.dbBody}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                  <div style={{ fontFamily: 'var(--fh)', fontSize: '2.8rem', fontWeight: 800, color: 'var(--green)' }}>
                    87
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--muted2)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '3px',
                      }}
                    >
                      Retention Score
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>Strong script</div>
                    <div
                      style={{
                        height: '3px',
                        background: 'var(--s4)',
                        borderRadius: '2px',
                        marginTop: '7px',
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ width: '87%', height: '100%', background: 'var(--green)', borderRadius: '2px' }}></div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  <span style={{ fontSize: '9px', padding: '2px 7px', borderRadius: '4px', background: 'var(--green-bg)', color: 'var(--green)' }}>
                    <Check size={16} /> Strong hook
                  </span>
                  <span style={{ fontSize: '9px', padding: '2px 7px', borderRadius: '4px', background: 'var(--green-bg)', color: 'var(--green)' }}>
                    <Check size={16} /> Visual cues
                  </span>
                  <span style={{ fontSize: '9px', padding: '2px 7px', borderRadius: '4px', background: 'var(--amber-bg)', color: 'var(--amber)' }}>
                    <AlertTriangle size={16} /> Intro too long
                  </span>
                </div>
                <div style={{ background: 'var(--s3)', borderRadius: '8px', padding: '10px', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--amber)' }}>Tip:</strong> Your intro runs 62 seconds — cut to 45s for better retention.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featSec}>
          <div className={styles.statsR}>
            <div className={styles.sc}>
              <div className={styles.scN} style={{ color: 'var(--amber)' }}>
                50K+
              </div>
              <div className={styles.scL}>Videos analyzed</div>
            </div>
            <div className={styles.sc}>
              <div className={styles.scN} style={{ color: 'var(--amber)' }}>
                0–100
              </div>
              <div className={styles.scL}>Score range</div>
            </div>
            <div className={styles.sc}>
              <div className={styles.scN} style={{ color: 'var(--amber)' }}>
                12
              </div>
              <div className={styles.scL}>Factors analyzed</div>
            </div>
            <div className={styles.sc}>
              <div className={styles.scN} style={{ color: 'var(--amber)' }}>
                30s
              </div>
              <div className={styles.scL}>Time to score</div>
            </div>
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <div className={`${styles.fview} ${activeTab === 'calendar' ? styles.active : ''}`}>
        <div className={styles.featHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.featInner}>
            <div>
              <div className={styles.fiLabel} style={{ color: 'var(--purple)' }}>
                Feature 05 — Content Calendar
              </div>
              <div className={styles.fiTitle}>Never miss an upload day again.</div>
              <div className={styles.fiSub}>
                Drag-and-drop scheduling, team task assignment, approval workflows, and automatic
                upload day reminders. Your posting consistency — automated.
              </div>
              <div className={styles.fiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--purple)' }}>
                  Open Calendar →
                </Link>
              </div>
            </div>
            <div className={styles.demoBox}>
              <div className={styles.dbBar}>
                <div className={styles.dbd} style={{ background: '#ff5f57' }}></div>
                <div className={styles.dbd} style={{ background: '#ffbd2e' }}></div>
                <div className={styles.dbd} style={{ background: '#28c840' }}></div>
              </div>
              <div className={styles.dbBody}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '4px',
                    fontSize: '9px',
                    color: 'var(--muted2)',
                    textAlign: 'center',
                    marginBottom: '5px',
                  }}
                >
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                  <div style={{ background: 'var(--s3)', borderRadius: '5px', padding: '7px 3px', textAlign: 'center', fontSize: '9px' }}>5</div>
                  <div style={{ background: 'var(--s3)', borderRadius: '5px', padding: '7px 3px', textAlign: 'center', fontSize: '9px' }}>6</div>
                  <div
                    style={{
                      background: 'var(--red-bg)',
                      border: '1px solid var(--red-border)',
                      borderRadius: '5px',
                      padding: '5px 3px',
                      textAlign: 'center',
                      fontSize: '8px',
                      color: 'var(--red)',
                    }}
                  >
                    7<br /><Upload size={16} />
                  </div>
                  <div style={{ background: 'var(--s3)', borderRadius: '5px', padding: '7px 3px', textAlign: 'center', fontSize: '9px' }}>8</div>
                  <div style={{ background: 'var(--s3)', borderRadius: '5px', padding: '7px 3px', textAlign: 'center', fontSize: '9px' }}>9</div>
                  <div
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid var(--blue-border)',
                      borderRadius: '5px',
                      padding: '5px 3px',
                      textAlign: 'center',
                      fontSize: '8px',
                      color: 'var(--blue)',
                    }}
                  >
                    10<br /><PenTool size={16} />
                  </div>
                  <div style={{ background: 'var(--s3)', borderRadius: '5px', padding: '7px 3px', textAlign: 'center', fontSize: '9px' }}>11</div>
                  <div style={{ background: 'var(--s3)', borderRadius: '5px', padding: '7px 3px', textAlign: 'center', fontSize: '9px' }}>12</div>
                  <div style={{ background: 'var(--s3)', borderRadius: '5px', padding: '7px 3px', textAlign: 'center', fontSize: '9px' }}>13</div>
                  <div
                    style={{
                      background: 'var(--red-bg)',
                      border: '1px solid var(--red-border)',
                      borderRadius: '5px',
                      padding: '5px 3px',
                      textAlign: 'center',
                      fontSize: '8px',
                      color: 'var(--red)',
                    }}
                  >
                    14<br /><Upload size={16} />
                  </div>
                  <div
                    style={{
                      background: 'var(--green-bg)',
                      border: '1px solid var(--green-border)',
                      borderRadius: '5px',
                      padding: '5px 3px',
                      textAlign: 'center',
                      fontSize: '8px',
                      color: 'var(--green)',
                    }}
                  >
                    15<br /><Check size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featSec}>
          <div className={styles.secLbl} style={{ color: 'var(--purple)' }}>
            What's Included
          </div>
          <div className={styles.secTtl}>Content Calendar features</div>
          <div className={styles.fg}>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}>🖱️</div>
              <div className={styles.fgTitle}>Drag-and-Drop</div>
              <div className={styles.fgDesc}>
                Reschedule videos instantly by dragging to a new date.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Users size={16} /></div>
              <div className={styles.fgTitle}>Team Tasks</div>
              <div className={styles.fgDesc}>
                Assign scripting, editing, and thumbnail tasks to team members.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Check size={16} /></div>
              <div className={styles.fgTitle}>Approval Flow</div>
              <div className={styles.fgDesc}>Multi-stage: Script → Edit → Thumbnail → Publish.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Bell size={16} /></div>
              <div className={styles.fgTitle}>Upload Reminders</div>
              <div className={styles.fgDesc}>Automatic notifications 24 hours before each upload.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}>📺</div>
              <div className={styles.fgTitle}>Multi-Channel</div>
              <div className={styles.fgDesc}>Manage multiple YouTube channels in one calendar.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><BarChart3 size={16} /></div>
              <div className={styles.fgTitle}>Streak Tracker</div>
              <div className={styles.fgDesc}>See your posting streak and consistency score over time.</div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPETITOR */}
      <div className={`${styles.fview} ${activeTab === 'competitor' ? styles.active : ''}`}>
        <div className={styles.featHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.featInner}>
            <div>
              <div className={styles.fiLabel} style={{ color: 'var(--blue)' }}>
                Feature 06 — Competitor Intelligence
              </div>
              <div className={styles.fiTitle}>See exactly what's working for them.</div>
              <div className={styles.fiSub}>
                Paste any competitor channel URL. Get posting frequency, best videos, thumbnail
                patterns, title formulas, and content gaps — then outperform them.
              </div>
              <div className={styles.fiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--blue)' }}>
                  Analyze a Competitor →
                </Link>
              </div>
            </div>
            <div className={styles.demoBox}>
              <div className={styles.dbBar}>
                <div className={styles.dbd} style={{ background: '#ff5f57' }}></div>
                <div className={styles.dbd} style={{ background: '#ffbd2e' }}></div>
                <div className={styles.dbd} style={{ background: '#28c840' }}></div>
              </div>
              <div className={styles.dbBody}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'var(--s3)',
                    borderRadius: '8px',
                    padding: '9px 11px',
                    marginBottom: '10px',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>📺</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', fontWeight: 600 }}>
                      FinanceFocus — 1.2M subscribers
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--muted2)' }}>
                      3x/week · Avg 280K views
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '9px',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      background: 'var(--red-bg)',
                      color: 'var(--red)',
                    }}
                  >
                    Competitor
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '10px' }}>
                  <div style={{ background: 'var(--s3)', borderRadius: '7px', padding: '8px' }}>
                    <div style={{ color: 'var(--muted2)', marginBottom: '2px' }}>Best format</div>
                    <div style={{ fontWeight: 600 }}>Listicle + Finance</div>
                  </div>
                  <div style={{ background: 'var(--s3)', borderRadius: '7px', padding: '8px' }}>
                    <div style={{ color: 'var(--muted2)', marginBottom: '2px' }}>Thumbnail style</div>
                    <div style={{ fontWeight: 600 }}>Red text + shocked face</div>
                  </div>
                  <div
                    style={{
                      background: 'var(--green-bg)',
                      border: '1px solid var(--green-border)',
                      borderRadius: '7px',
                      padding: '8px',
                      gridColumn: 'span 2',
                    }}
                  >
                    <div style={{ color: 'var(--green)', fontWeight: 600, marginBottom: '2px' }}>
                      <Target size={16} /> Gap Found
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: '9px' }}>
                      Never covered "AI Investing" — 890K searches, low competition
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featSec}>
          <div className={styles.secLbl} style={{ color: 'var(--blue)' }}>
            What's Included
          </div>
          <div className={styles.secTtl}>Competitor Intelligence features</div>
          <div className={styles.fg}>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><BarChart3 size={16} /></div>
              <div className={styles.fgTitle}>Channel Analytics</div>
              <div className={styles.fgDesc}>
                Views, subscribers, posting frequency, and engagement rates.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><ImageIcon size={16} /></div>
              <div className={styles.fgTitle}>Thumbnail Patterns</div>
              <div className={styles.fgDesc}>
                AI analyzes colors, fonts, faces, and text overlays used in thumbnails.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Target size={16} /></div>
              <div className={styles.fgTitle}>Gap Finder</div>
              <div className={styles.fgDesc}>
                Topics their audience wants but they haven't covered yet.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><CalendarDays size={16} /></div>
              <div className={styles.fgTitle}>Post Schedule</div>
              <div className={styles.fgDesc}>
                Detect their best posting times, frequency, and upload patterns.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Trophy size={16} /></div>
              <div className={styles.fgTitle}>Top Videos Analysis</div>
              <div className={styles.fgDesc}>
                Breakdown of their highest-performing videos and why they worked.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><FileText size={16} /></div>
              <div className={styles.fgTitle}>Title Formulas</div>
              <div className={styles.fgDesc}>
                Extract the exact title patterns that drive their most views.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI AGENTS */}
      <div className={`${styles.fview} ${activeTab === 'agents' ? styles.active : ''}`}>
        <div className={styles.featHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.featInner}>
            <div>
              <div className={styles.fiLabel} style={{ color: 'var(--purple)' }}>
                Feature 07 — AI Agents (Beta)
              </div>
              <div className={styles.fiTitle}>Set it once. Channel runs itself.</div>
              <div className={styles.fiSub}>
                Define your niche, schedule, and style. AI Agents find topics weekly, generate
                scripts, schedule them in your calendar, and notify your team. True hands-off
                YouTube automation.
              </div>
              <div className={styles.fiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--purple)' }}>
                  Set Up Your Agent →
                </Link>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '12px 16px',
                    border: '1px solid var(--purple-border)',
                    borderRadius: '10px',
                    fontSize: '13px',
                    color: 'var(--purple)',
                    background: 'var(--purple-bg)',
                  }}
                >
                  ✦ Beta — Pro & Agency
                </div>
              </div>
            </div>
            <div className={styles.demoBox}>
              <div className={styles.dbBar}>
                <div className={styles.dbd} style={{ background: '#ff5f57' }}></div>
                <div className={styles.dbd} style={{ background: '#ffbd2e' }}></div>
                <div className={styles.dbd} style={{ background: '#28c840' }}></div>
              </div>
              <div className={styles.dbBody}>
                <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '10px' }}>
                  <Bot size={16} /> Agent: Finance Channel — Weekly Run
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      background: 'var(--green-bg)',
                      border: '1px solid var(--green-border)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  >
                    <span><Check size={16} /></span>
                    <span style={{ color: 'var(--green)' }}>Found 8 viral topics in Finance niche</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      background: 'var(--green-bg)',
                      border: '1px solid var(--green-border)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  >
                    <span><Check size={16} /></span>
                    <span style={{ color: 'var(--green)' }}>Selected top topic (score 9.2)</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      background: 'var(--green-bg)',
                      border: '1px solid var(--green-border)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  >
                    <span><Check size={16} /></span>
                    <span style={{ color: 'var(--green)' }}>Generated 1,400-word Listicle script</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      background: 'var(--s3)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  >
                    <span>⏳</span>
                    <span style={{ color: 'var(--muted)' }}>
                      Scheduled for Friday — awaiting your review
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '10px', color: 'var(--muted2)', textAlign: 'center' }}>
                  4 videos published · 0 missed uploads this month
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.featSec}>
          <div className={styles.secLbl} style={{ color: 'var(--purple)' }}>
            What's Included
          </div>
          <div className={styles.secTtl}>AI Agents features</div>
          <div className={styles.fg}>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><RefreshCw size={16} /></div>
              <div className={styles.fgTitle}>Weekly Auto-Run</div>
              <div className={styles.fgDesc}>
                Agent runs every Monday, finds topics, and scripts them automatically.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Settings size={16} /></div>
              <div className={styles.fgTitle}>Custom Rules</div>
              <div className={styles.fgDesc}>
                Set your niche, format preference, tone, and video length rules.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Eye size={16} /></div>
              <div className={styles.fgTitle}>Human Review Step</div>
              <div className={styles.fgDesc}>Agent pauses for your approval before scheduling anything.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><MailOpen size={16} /></div>
              <div className={styles.fgTitle}>Team Notifications</div>
              <div className={styles.fgDesc}>
                Automatically notifies editors and voice artists when work is ready.
              </div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><BarChart3 size={16} /></div>
              <div className={styles.fgTitle}>Agent Analytics</div>
              <div className={styles.fgDesc}>Track how many videos your agent produced and their performance.</div>
            </div>
            <div className={styles.fgCard}>
              <div className={styles.fgIcon}><Shuffle size={16} /></div>
              <div className={styles.fgTitle}>Multi-Channel</div>
              <div className={styles.fgDesc}>
                Run separate agents for each channel with different configs.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ctaBlock}>
        <div className={styles.ctaGlow}></div>
        <div className={styles.ctaT}>Every feature. One workspace.</div>
        <div className={styles.ctaS}>
          Start your 14-day free trial — no credit card required.
        </div>
        <Link href="/auth" className={styles.btnP} style={{ fontSize: '15px', padding: '14px 36px' }}>
          Start Free Trial →
        </Link>
      </div>

      <Footer />
    </>
  );
}
