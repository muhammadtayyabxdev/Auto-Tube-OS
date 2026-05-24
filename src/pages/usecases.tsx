import Head from 'next/head';


import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/usecases.module.css';
import { BarChart3, Bot, Building, CalendarDays, Check, Clock, DollarSign, Flame, Frown, Magnet, PenTool, Play, Smartphone, Smile, Sparkles, Sprout, Target, XCircle, Zap } from 'lucide-react';

type UseCaseId = 'all' | 'faceless' | 'agency' | 'beginners' | 'shorts' | 'finance';

interface UseCaseTab {
  id: UseCaseId;
  label: React.ReactNode;
}

export default function UseCasesPage() {
  const [activeTab, setActiveTab] = useState<UseCaseId>('all');

  const tabs: UseCaseTab[] = [
    { id: 'all', label: <><Target size={16} /> All Use Cases</> },
    { id: 'faceless', label: <><Smile size={16} /> Faceless Creators</> },
    { id: 'agency', label: <><Building size={16} /> YouTube Agencies</> },
    { id: 'beginners', label: <><Sprout size={16} /> Beginners</> },
    { id: 'shorts', label: <><Zap size={16} /> Shorts Creators</> },
    { id: 'finance', label: <><DollarSign size={16} /> Finance Channels</> },
  ];

  const handleTabChange = (id: UseCaseId) => {
    setActiveTab(id);
    window.scrollTo({ top: 62, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Use Cases for Creators — AutoTube OS</title>
        <meta name="description" content="Learn how documentary channels, horror narrators, finance gurus, and agencies scale with AutoTube OS." />
      </Head>

      <Navbar />

      <div className={styles.ucNav}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.uctab} ${activeTab === tab.id ? styles.on : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* ALL USE CASES */}
      <div className={`${styles.ucview} ${activeTab === 'all' ? styles.active : ''}`}>
        <div style={{ padding: '80px 6% 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className={styles.gridBg}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--red)',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              Use Cases
            </div>
            <div
              style={{
                fontFamily: 'var(--fh)',
                fontSize: 'clamp(2rem, 5vw, 3.6rem)',
                fontWeight: 800,
                letterSpacing: '-1.5px',
                marginBottom: '12px',
                lineHeight: 1.1,
              }}
            >
              Built for every
              <br />
              kind of creator.
            </div>
            <div
              style={{
                fontSize: '1rem',
                color: 'var(--muted)',
                maxWidth: '480px',
                margin: '0 auto 48px',
                lineHeight: 1.6,
              }}
            >
              Whether you're just starting or running a 12-channel agency, AutoTubeOS adapts to your workflow.
            </div>
          </div>
          <div className={styles.ucCardsGrid}>
            <div className={styles.uccCard} onClick={() => handleTabChange('faceless')}>
              <div className={styles.uccIcon}><Smile size={32} /></div>
              <div className={styles.uccTitle}>Faceless YouTube Creators</div>
              <div className={styles.uccDesc}>
                AI handles everything from topic research to script generation. You focus on growth strategy — not
                content production.
              </div>
              <div className={styles.uccLink}>See how it works →</div>
            </div>
            <div className={styles.uccCard} onClick={() => handleTabChange('agency')}>
              <div className={styles.uccIcon}><Building size={16} /></div>
              <div className={styles.uccTitle}>YouTube Automation Agencies</div>
              <div className={styles.uccDesc}>
                Manage 5–50 channels with one team. Client approval workflows, white-label reports, and bulk
                content generation.
              </div>
              <div className={styles.uccLink}>See how it works →</div>
            </div>
            <div className={styles.uccCard} onClick={() => handleTabChange('beginners')}>
              <div className={styles.uccIcon}><Sprout size={32} /></div>
              <div className={styles.uccTitle}>Beginner Creators</div>
              <div className={styles.uccDesc}>
                No experience needed. AutoTubeOS guides you from zero to your first video with step-by-step AI
                assistance.
              </div>
              <div className={styles.uccLink}>See how it works →</div>
            </div>
            <div className={styles.uccCard} onClick={() => handleTabChange('shorts')}>
              <div className={styles.uccIcon}><Zap size={16} /></div>
              <div className={styles.uccTitle}>Shorts-First Creators</div>
              <div className={styles.uccDesc}>
                Automatically turn every long video into 5 viral Shorts. Post daily without creating daily — the
                smart way.
              </div>
              <div className={styles.uccLink}>See how it works →</div>
            </div>
          </div>
        </div>
      </div>

      {/* FACELESS CREATORS */}
      <div className={`${styles.ucview} ${activeTab === 'faceless' ? styles.active : ''}`}>
        <div className={styles.ucHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.ucInner}>
            <div>
              <div className={styles.uiLabel} style={{ color: 'var(--red)' }}>
                Use Case — Faceless YouTube
              </div>
              <div className={styles.uiTitle}>The AI system for faceless creators who want to scale.</div>
              <div className={styles.uiSub}>
                No face. No studio. No burnout. AutoTubeOS handles the entire content pipeline so you can focus
                on scaling from 1 channel to 10.
              </div>
              <div className={styles.uiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--red)' }}>
                  Start Free →
                </Link>
              </div>
            </div>
            <div className={styles.profileCard}>
              <div
                className={styles.pcAv}
                style={{
                  background: 'var(--red-bg)',
                  border: '1px solid var(--red-border)',
                  color: 'var(--red)',
                }}
              >
                AK
              </div>
              <div className={styles.pcName}>Ahmed K.</div>
              <div className={styles.pcRole}>Faceless Finance Creator · Lahore, Pakistan</div>
              <div className={styles.pcStats}>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal}>241K</div>
                  <div className={styles.pcStatLbl}>Subscribers</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal}>$3.8K</div>
                  <div className={styles.pcStatLbl}>Monthly revenue</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal}>3</div>
                  <div className={styles.pcStatLbl}>Channels</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal}>12</div>
                  <div className={styles.pcStatLbl}>Videos/month</div>
                </div>
              </div>
              <div className={styles.pcQuote}>
                "AutoTubeOS cut my production time from 6 hours per video to 45 minutes. I publish 3x more now
                without working more hours."
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ucSection}>
          <div className={styles.pwinGrid}>
            <div className={styles.pwCard}>
              <div className={styles.pwTitle} style={{ color: 'var(--red)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Frown size={18} /> Before AutoTubeOS
              </div>
              <div className={styles.pwList}>
                <div className={styles.pwItem}>
                  <span className={styles.pwIcon} style={{ color: 'var(--red)' }}>
                    <XCircle size={16} />
                  </span>
                  Spending 3+ hours finding video ideas manually
                </div>
                <div className={styles.pwItem}>
                  <span className={styles.pwIcon} style={{ color: 'var(--red)' }}>
                    <XCircle size={16} />
                  </span>
                  Writing scripts from scratch took 4–5 hours
                </div>
                <div className={styles.pwItem}>
                  <span className={styles.pwIcon} style={{ color: 'var(--red)' }}>
                    <XCircle size={16} />
                  </span>
                  Juggling ChatGPT, Canva, Notion, TubeBuddy separately
                </div>
                <div className={styles.pwItem}>
                  <span className={styles.pwIcon} style={{ color: 'var(--red)' }}>
                    <XCircle size={16} />
                  </span>
                  Missing upload days due to workflow chaos
                </div>
                <div className={styles.pwItem}>
                  <span className={styles.pwIcon} style={{ color: 'var(--red)' }}>
                    <XCircle size={16} />
                  </span>
                  Manually creating Shorts — or not at all
                </div>
              </div>
            </div>
            <div className={styles.pwCard} style={{ borderColor: 'var(--green-border)' }}>
              <div className={styles.pwTitle} style={{ color: 'var(--green)' }}>
                <Sparkles size={16} /> After AutoTubeOS
              </div>
              <div className={styles.pwList}>
                <div className={styles.pwItem} style={{ color: 'var(--text)' }}>
                  <span className={styles.pwIcon} style={{ color: 'var(--green)' }}>
                    <Check size={16} />
                  </span>
                  Viral topic in 30 seconds — scored by views and RPM
                </div>
                <div className={styles.pwItem} style={{ color: 'var(--text)' }}>
                  <span className={styles.pwIcon} style={{ color: 'var(--green)' }}>
                    <Check size={16} />
                  </span>
                  Full script generated in 60 seconds — just edit and go
                </div>
                <div className={styles.pwItem} style={{ color: 'var(--text)' }}>
                  <span className={styles.pwIcon} style={{ color: 'var(--green)' }}>
                    <Check size={16} />
                  </span>
                  One workspace replaces all 7 tools
                </div>
                <div className={styles.pwItem} style={{ color: 'var(--text)' }}>
                  <span className={styles.pwIcon} style={{ color: 'var(--green)' }}>
                    <Check size={16} />
                  </span>
                  Content calendar keeps uploads consistent automatically
                </div>
                <div className={styles.pwItem} style={{ color: 'var(--text)' }}>
                  <span className={styles.pwIcon} style={{ color: 'var(--green)' }}>
                    <Check size={16} />
                  </span>
                  5 Shorts generated from every long video automatically
                </div>
              </div>
            </div>
          </div>
          <div className={styles.secLbl} style={{ color: 'var(--red)' }}>
            Features You'll Use Most
          </div>
          <div className={styles.secTtl}>Built for faceless creators</div>
          <div className={styles.featUsed}>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--red-bg)' }}>
                <Flame size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Topic Finder</div>
                <div className={styles.fuDesc}>
                  AI finds viral ideas for your niche daily — no manual research needed.
                </div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--blue-bg)' }}>
                <PenTool size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Script Generator</div>
                <div className={styles.fuDesc}>
                  8 formats. Hooks included. Ready to hand off to your voiceover artist.
                </div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--green-bg)' }}>
                <Zap size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Shorts Repurposer</div>
                <div className={styles.fuDesc}>Turn 1 long video into 5 Shorts scripts automatically.</div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--purple-bg)' }}>
                <Bot size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>AI Agents</div>
                <div className={styles.fuDesc}>
                  Set up once. Agent finds topics, scripts, and schedules every week.
                </div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--amber-bg)' }}>
                <BarChart3 size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Retention Optimizer</div>
                <div className={styles.fuDesc}>
                  Score your script before recording. Fix weak hooks before upload.
                </div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--s4)' }}>
                <CalendarDays size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Content Calendar</div>
                <div className={styles.fuDesc}>
                  Never miss an upload day. Automated reminders and scheduling.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AGENCY */}
      <div className={`${styles.ucview} ${activeTab === 'agency' ? styles.active : ''}`}>
        <div className={styles.ucHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.ucInner}>
            <div>
              <div className={styles.uiLabel} style={{ color: 'var(--blue)' }}>
                Use Case — YouTube Agency
              </div>
              <div className={styles.uiTitle}>Run 12 channels with a team of 3.</div>
              <div className={styles.uiSub}>
                Client approval workflows, multi-channel calendars, white-label reports, and bulk content
                generation. AutoTubeOS is the operating system for YouTube automation agencies.
              </div>
              <div className={styles.uiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--blue)' }}>
                  See Agency Plan →
                </Link>
              </div>
            </div>
            <div className={styles.profileCard}>
              <div
                className={styles.pcAv}
                style={{
                  background: 'var(--blue-bg)',
                  border: '1px solid var(--blue-border)',
                  color: 'var(--blue)',
                }}
              >
                JL
              </div>
              <div className={styles.pcName}>James L.</div>
              <div className={styles.pcRole}>YouTube Automation Agency · London, UK</div>
              <div className={styles.pcStats}>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--blue)' }}>
                    12
                  </div>
                  <div className={styles.pcStatLbl}>Client channels</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--blue)' }}>
                    3
                  </div>
                  <div className={styles.pcStatLbl}>Team members</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--blue)' }}>
                    48
                  </div>
                  <div className={styles.pcStatLbl}>Videos/month</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--blue)' }}>
                    60%
                  </div>
                  <div className={styles.pcStatLbl}>Time saved</div>
                </div>
              </div>
              <div className={styles.pcQuote} style={{ borderLeftColor: 'var(--blue)' }}>
                "We manage 12 client channels with 3 people. AutoTubeOS cut our production time by 60%. The
                approval workflow feature is exactly what we needed."
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ucSection}>
          <div className={styles.secLbl} style={{ color: 'var(--blue)' }}>
            Agency Workflow
          </div>
          <div className={styles.secTtl}>From client brief to published video</div>
          <div className={styles.workflow}>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--blue-bg)',
                    borderColor: 'var(--blue-border)',
                    color: 'var(--blue)',
                  }}
                >
                  01
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>Client onboarding — niche & style defined</div>
                <div className={styles.wfDesc}>
                  Create a workspace per client with their niche, target market, and content style rules set once.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--blue-bg)', color: 'var(--blue)' }}>
                  Workspace Setup
                </span>
              </div>
            </div>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--blue-bg)',
                    borderColor: 'var(--blue-border)',
                    color: 'var(--blue)',
                  }}
                >
                  02
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>AI finds topics every Monday</div>
                <div className={styles.wfDesc}>
                  Topic Finder automatically surfaces 8+ ranked ideas. Your team picks and assigns the best
                  one.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--red-bg)', color: 'var(--red)' }}>
                  Topic Finder
                </span>
              </div>
            </div>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--blue-bg)',
                    borderColor: 'var(--blue-border)',
                    color: 'var(--blue)',
                  }}
                >
                  03
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>Script generated → assigned to editor</div>
                <div className={styles.wfDesc}>
                  AI generates script. Team member gets notified to review and send to voiceover artist.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--blue-bg)', color: 'var(--blue)' }}>
                  Script Gen + Task Assignment
                </span>
              </div>
            </div>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--blue-bg)',
                    borderColor: 'var(--blue-border)',
                    color: 'var(--blue)',
                  }}
                >
                  04
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>Client approves via approval flow</div>
                <div className={styles.wfDesc}>
                  Client reviews the script and thumbnail concept before production starts. No back-and-forth
                  emails.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
                  Client Approval Flow
                </span>
              </div>
            </div>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--blue-bg)',
                    borderColor: 'var(--blue-border)',
                    color: 'var(--blue)',
                  }}
                >
                  05
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>Upload scheduled + Shorts auto-generated</div>
                <div className={styles.wfDesc}>
                  Video scheduled on calendar. AI repurposes into 5 Shorts automatically for extra reach.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--purple-bg)', color: 'var(--purple)' }}>
                  Calendar + Shorts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BEGINNERS */}
      <div className={`${styles.ucview} ${activeTab === 'beginners' ? styles.active : ''}`}>
        <div className={styles.ucHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.ucInner}>
            <div>
              <div className={styles.uiLabel} style={{ color: 'var(--green)' }}>
                Use Case — Beginners
              </div>
              <div className={styles.uiTitle}>From zero to first video in one afternoon.</div>
              <div className={styles.uiSub}>
                No experience needed. AutoTubeOS guides you step by step — from picking a niche to having your
                first script ready to record. No YouTube knowledge required.
              </div>
              <div className={styles.uiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--green)' }}>
                  Start for Free →
                </Link>
              </div>
            </div>
            <div className={styles.profileCard}>
              <div
                className={styles.pcAv}
                style={{
                  background: 'var(--green-bg)',
                  border: '1px solid var(--green-border)',
                  color: 'var(--green)',
                }}
              >
                MZ
              </div>
              <div className={styles.pcName}>Mariam Z.</div>
              <div className={styles.pcRole}>Started 3 months ago · AI Tools Niche</div>
              <div className={styles.pcStats}>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--green)' }}>
                    4.2K
                  </div>
                  <div className={styles.pcStatLbl}>Subscribers</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--green)' }}>
                    $180
                  </div>
                  <div className={styles.pcStatLbl}>First month revenue</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--green)' }}>
                    8
                  </div>
                  <div className={styles.pcStatLbl}>Videos published</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--green)' }}>
                    0
                  </div>
                  <div className={styles.pcStatLbl}>Prior experience</div>
                </div>
              </div>
              <div className={styles.pcQuote} style={{ borderLeftColor: 'var(--green)' }}>
                "I had zero YouTube experience. AutoTubeOS gave me my first viral idea and wrote the script. I
                just recorded the voiceover and uploaded. That easy."
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ucSection}>
          <div className={styles.secLbl} style={{ color: 'var(--green)' }}>
            Your First Week
          </div>
          <div className={styles.secTtl}>From account to first video in 5 steps</div>
          <div className={styles.workflow}>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--green-bg)',
                    borderColor: 'var(--green-border)',
                    color: 'var(--green)',
                  }}
                >
                  1
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>Create account + pick your niche</div>
                <div className={styles.wfDesc}>
                  Onboarding takes 5 minutes. Pick a niche — or let AI suggest one based on your interests.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
                  Day 1
                </span>
              </div>
            </div>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--green-bg)',
                    borderColor: 'var(--green-border)',
                    color: 'var(--green)',
                  }}
                >
                  2
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>Find your first viral idea</div>
                <div className={styles.wfDesc}>
                  Open Topic Finder, enter your niche, pick the idea with the highest score. Done in 3 minutes.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
                  Day 1
                </span>
              </div>
            </div>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--green-bg)',
                    borderColor: 'var(--green-border)',
                    color: 'var(--green)',
                  }}
                >
                  3
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>Generate your script</div>
                <div className={styles.wfDesc}>
                  Hit "Write Script." AI writes the full script — hook, intro, main points, CTA. Edit what you
                  like, leave the rest.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
                  Day 1–2
                </span>
              </div>
            </div>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--green-bg)',
                    borderColor: 'var(--green-border)',
                    color: 'var(--green)',
                  }}
                >
                  4
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>Record + edit</div>
                <div className={styles.wfDesc}>
                  Record your voiceover (or use ElevenLabs), add stock footage in CapCut, add thumbnail from
                  Canva.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
                  Day 3–5
                </span>
              </div>
            </div>
            <div className={styles.wfItem}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  className={styles.wfNum}
                  style={{
                    background: 'var(--green-bg)',
                    borderColor: 'var(--green-border)',
                    color: 'var(--green)',
                  }}
                >
                  5
                </div>
              </div>
              <div className={styles.wfContent}>
                <div className={styles.wfTitle}>Upload + schedule next video</div>
                <div className={styles.wfDesc}>
                  Upload to YouTube. Go back to AutoTubeOS, find your next idea, and repeat. You now have a
                  system.
                </div>
                <span className={styles.wfTag} style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
                  Day 7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHORTS */}
      <div className={`${styles.ucview} ${activeTab === 'shorts' ? styles.active : ''}`}>
        <div className={styles.ucHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.ucInner}>
            <div>
              <div className={styles.uiLabel} style={{ color: 'var(--amber)' }}>
                Use Case — Shorts Creators
              </div>
              <div className={styles.uiTitle}>Post daily without creating daily.</div>
              <div className={styles.uiSub}>
                Every long video has 5 Shorts hiding inside it. AutoTubeOS finds them, rewrites the hooks, and
                delivers ready-to-post scripts. Multiply your output without multiplying your work.
              </div>
              <div className={styles.uiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--amber)', color: '#000' }}>
                  Try Shorts Repurposer →
                </Link>
              </div>
            </div>
            <div className={styles.profileCard}>
              <div
                className={styles.pcAv}
                style={{
                  background: 'var(--amber-bg)',
                  border: '1px solid rgba(245, 158, 11, 0.28)',
                  color: 'var(--amber)',
                }}
              >
                SR
              </div>
              <div className={styles.pcName}>Sara R.</div>
              <div className={styles.pcRole}>Finance Shorts Creator · 180K Subscribers</div>
              <div className={styles.pcStats}>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--amber)' }}>
                    5
                  </div>
                  <div className={styles.pcStatLbl}>Shorts per long video</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--amber)' }}>
                    2×
                  </div>
                  <div className={styles.pcStatLbl}>Growth since using</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--amber)' }}>
                    20+
                  </div>
                  <div className={styles.pcStatLbl}>Shorts per month</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal} style={{ color: 'var(--amber)' }}>
                    0
                  </div>
                  <div className={styles.pcStatLbl}>Extra hours spent</div>
                </div>
              </div>
              <div className={styles.pcQuote} style={{ borderLeftColor: 'var(--amber)' }}>
                "The Shorts Repurposer literally doubled my channel growth. Each long video gives me 5 Shorts
                automatically. I can't believe I was doing this manually before."
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ucSection}>
          <div className={styles.secLbl} style={{ color: 'var(--amber)' }}>
            How It Works
          </div>
          <div className={styles.secTtl}>From one upload to 6 pieces of content</div>
          <div className={styles.featUsed}>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--red-bg)' }}>
                <Play size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Upload or paste URL</div>
                <div className={styles.fuDesc}>
                  Drop your video file or paste a YouTube link. Works up to 4 hours long.
                </div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--amber-bg)' }}>
                <Target size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>AI detects best moments</div>
                <div className={styles.fuDesc}>
                  5 clips ranked by virality score — the most emotional, surprising, or hook-worthy moments.
                </div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Magnet size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Hooks rewritten for Shorts</div>
                <div className={styles.fuDesc}>
                  Each clip gets a Shorts-optimized hook that stops the scroll in the first 2 seconds.
                </div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--blue-bg)' }}>
                <Smartphone size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Multi-platform scripts</div>
                <div className={styles.fuDesc}>
                  Scripts formatted for YouTube Shorts, TikTok, and Instagram Reels — all at once.
                </div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--purple-bg)' }}>
                <CalendarDays size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Auto-scheduled to calendar</div>
                <div className={styles.fuDesc}>
                  5 Shorts spread across the week automatically so your calendar stays full.
                </div>
              </div>
            </div>
            <div className={styles.fuCard}>
              <div className={styles.fuIcon} style={{ background: 'var(--s4)' }}>
                <Clock size={16} />
              </div>
              <div>
                <div className={styles.fuTitle}>Timestamps for editor</div>
                <div className={styles.fuDesc}>
                  Exact start/end timestamps for each clip sent to your editor automatically.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FINANCE */}
      <div className={`${styles.ucview} ${activeTab === 'finance' ? styles.active : ''}`}>
        <div className={styles.ucHero}>
          <div className={styles.gridBg}></div>
          <div className={styles.ucInner}>
            <div>
              <div className={styles.uiLabel} style={{ color: 'var(--red)' }}>
                Use Case — Finance Channels
              </div>
              <div className={styles.uiTitle}>The highest-RPM niche, fully automated.</div>
              <div className={styles.uiSub}>
                Finance channels earn $15–$25 RPM. AutoTubeOS finds the viral finance topics, writes the
                data-driven scripts, and keeps your upload schedule consistent. Maximum revenue, minimum
                effort.
              </div>
              <div className={styles.uiBtns}>
                <Link href="/auth" className={styles.btnP} style={{ background: 'var(--red)' }}>
                  Start Your Finance Channel →
                </Link>
              </div>
            </div>
            <div className={styles.profileCard}>
              <div
                className={styles.pcAv}
                style={{
                  background: 'var(--red-bg)',
                  border: '1px solid var(--red-border)',
                  color: 'var(--red)',
                }}
              >
                AK
              </div>
              <div className={styles.pcName}>Finance Channel · Anonymous</div>
              <div className={styles.pcRole}>Faceless Finance · Started Jan 2026</div>
              <div className={styles.pcStats}>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal}>100K</div>
                  <div className={styles.pcStatLbl}>In 4 months</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal}>$22</div>
                  <div className={styles.pcStatLbl}>Avg RPM</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal}>$4.2K</div>
                  <div className={styles.pcStatLbl}>Month 4 revenue</div>
                </div>
                <div className={styles.pcStat}>
                  <div className={styles.pcStatVal}>16</div>
                  <div className={styles.pcStatLbl}>Videos/month</div>
                </div>
              </div>
              <div className={styles.pcQuote}>
                "Finance niche is gold — but only if you can publish consistently. AutoTubeOS is the reason I
                hit 100K in 4 months. The topic scorer knew what would go viral before I did."
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.ucCta}>
        <div className={styles.ctaGlow}></div>
        <div className={styles.ctaT}>Find your use case. Start for free.</div>
        <div className={styles.ctaS}>14-day free trial. No credit card. Cancel anytime.</div>
        <Link
          href="/auth"
          className={styles.btnP}
          style={{
            background: 'var(--red)',
            fontSize: '15px',
            padding: '13px 32px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Start Free Trial →
        </Link>
      </div>

      <Footer />
    </>
  );
}
