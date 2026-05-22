'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/help.module.css';
import { AlertTriangle, ArrowUp, Ban, BarChart3, Bell, Bot, CalendarDays, Clock, CreditCard, DollarSign, Eye, FileText, Flame, Gauge, Globe, Home, Info, Key, Lightbulb, Link2, Mail, MessageCircle, Palette, PenTool, Play, Receipt, RefreshCw, Rocket, Search, Smartphone, Sparkles, Target, ThumbsDown, ThumbsUp, Tv, Users, Wrench, X, ClipboardList, Zap } from 'lucide-react';

interface Article {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  icon: React.ReactNode;
  readTime: string;
  views: string;
  updatedAt: string;
  isPopular?: boolean;
  isUpdated?: boolean;
  isNew?: boolean;
  steps?: string[];
  callout?: string;
  codeBlock?: string;
  tip?: string;
  body: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'getting-started-walkthrough',
    category: 'getting-started',
    categoryLabel: 'Getting Started',
    title: 'Getting started with AutoTubeOS — full walkthrough',
    icon: <Rocket size={16} />,
    readTime: '5 min',
    views: '12,400',
    updatedAt: 'May 14, 2026',
    isPopular: true,
    body: [
      'Welcome to AutoTubeOS — the operating system for faceless YouTube creators. This guide will walk you through setting up your workspace in under 10 minutes.',
      'AutoTubeOS integrates topic generation, script writing, video assets, and metadata optimization in one seamless dashboard. Let\'s get your channel launched!'
    ],
    steps: [
      'Go to autotubeos.com/signup and enter your email address',
      'Verify your email address (check your spam folder if you do not see it in 2 minutes)',
      'Complete the 5-step onboarding flow by choosing your niche, language, and weekly target goals',
      'Connect your YouTube channel through secure OAuth to unlock automatic calendar scheduling'
    ],
    callout: 'Get your free Groq API key at console.groq.com. It starts with "gsk_" and gives you 14,400 tokens/minute completely free.',
    codeBlock: 'Settings → Integrations → Groq API Key → Paste key → Save',
    tip: 'Sort by "Low Competition + High RPM" for the best first video ideas. Anything with an opportunity score above 8.0 is highly recommended.'
  },
  {
    id: 'completing-onboarding',
    category: 'getting-started',
    categoryLabel: 'Getting Started',
    title: 'Completing the onboarding flow',
    icon: <ClipboardList size={16} />,
    readTime: '3 min',
    views: '3,800',
    updatedAt: 'Apr 28, 2026',
    body: [
      'The 5-step onboarding flow is designed to calibrate your AI copywriter to match your specific target audience. Here\'s how to maximize its effectiveness.',
      'Make sure to choose a highly specific niche rather than a generic one. For instance, select "Personal Finance for Gen Z" instead of just "Finance". This allows the LLM to write highly relevant scripts.'
    ]
  },
  {
    id: 'choosing-niche',
    category: 'getting-started',
    categoryLabel: 'Getting Started',
    title: 'Choosing your niche and setting goals',
    icon: <Target size={16} />,
    readTime: '4 min',
    views: '4,100',
    updatedAt: 'May 02, 2026',
    body: [
      'Choosing the right niche is critical for CPM and viewer retention. High RPM niches include Finance, Tech, Software, and Business.',
      'Set realistic publishing goals in the dashboard (e.g., 2 Shorts and 1 Long-form video per week) to establish consistent audience growth.'
    ]
  },
  {
    id: 'connecting-youtube-channel',
    category: 'getting-started',
    categoryLabel: 'Getting Started',
    title: 'Connecting your YouTube channel',
    icon: <Tv size={16} />,
    readTime: '3 min',
    views: '9,300',
    updatedAt: 'May 10, 2026',
    body: [
      'To enable direct publishing and detailed analytics tracking, you can link your YouTube channel via Google OAuth.',
      'AutoTubeOS only requests the minimum necessary permissions to upload video drafts and read performance statistics.'
    ]
  },
  {
    id: 'creating-first-video',
    category: 'getting-started',
    categoryLabel: 'Getting Started',
    title: 'Creating your first video from scratch',
    icon: <Play size={16} />,
    readTime: '7 min',
    views: '6,200',
    updatedAt: 'May 12, 2026',
    body: [
      'A step-by-step guide to generating your first video script, optimizing the title/thumbnail metadata, exporting the assets, and scheduling your video for release.'
    ]
  },
  {
    id: 'groq-api-key-setup',
    category: 'ai-setup',
    categoryLabel: 'AI & API Setup',
    title: 'How to add your Groq or Gemini API key',
    icon: <Key size={16} />,
    readTime: '2 min',
    views: '11,500',
    updatedAt: 'May 15, 2026',
    isPopular: true,
    body: [
      'AutoTubeOS runs AI generations directly using your own API keys. This means you do not pay premium markups and get direct access to raw model speeds.',
      'You can fetch API keys from the respective platform provider consoles. We encrypt your key locally in your browser storage so it never passes through our servers.'
    ],
    steps: [
      'Log into console.groq.com or aistudio.google.com',
      'Navigate to API Keys and click "Create New Key"',
      'Copy the generated key (it starts with "gsk_" for Groq)',
      'Open AutoTubeOS and go to Settings → Integrations',
      'Paste your key under the appropriate input and click Save Connection'
    ]
  },
  {
    id: 'gemini-key-setup',
    category: 'ai-setup',
    categoryLabel: 'AI & API Setup',
    title: 'How to get your free Google Gemini API key',
    icon: <Sparkles size={16} />,
    readTime: '2 min',
    views: '4,500',
    updatedAt: 'May 12, 2026',
    body: [
      'Google Gemini API provides a robust free tier with 15 requests per minute, which is perfect for drafting long scripts.',
      'Go to Google AI Studio, generate a key, and link it under the settings tab.'
    ]
  },
  {
    id: 'groq-vs-gemini',
    category: 'ai-setup',
    categoryLabel: 'AI & API Setup',
    title: 'Groq vs Gemini — which should I use?',
    icon: <Zap size={16} />,
    readTime: '4 min',
    views: '6,700',
    updatedAt: 'May 08, 2026',
    body: [
      'Groq uses LPU technology which delivers incredibly fast streaming (over 250 tokens per second). It is perfect for interactive script drafting.',
      'Gemini has a massive context window (up to 2 million tokens) which is excellent for analyzing long source videos or transcripts.'
    ]
  },
  {
    id: 'rate-limit-fixes',
    category: 'ai-setup',
    categoryLabel: 'AI & API Setup',
    title: 'Fixing "rate limit exceeded" errors',
    icon: <Ban size={16} />,
    readTime: '3 min',
    views: '3,200',
    updatedAt: 'May 01, 2026',
    body: [
      'If you get a 429 rate limit error, you have exceeded the provider\'s free tier limits.',
      'To fix this, either space your generations 1 minute apart or add a backup billing method in your Groq/Google Cloud console.'
    ]
  },
  {
    id: 'non-english-scripts',
    category: 'ai-setup',
    categoryLabel: 'AI & API Setup',
    title: 'Generating scripts in non-English languages',
    icon: <Globe size={16} />,
    readTime: '3 min',
    views: '2,900',
    updatedAt: 'May 18, 2026',
    isNew: true,
    body: [
      'AutoTubeOS fully supports scripting and topic generation in over 30 languages, including Spanish, German, French, Hindi, Arabic, and Urdu.',
      'Select your preferred script language in the Settings panel under Preferences, and the AI models will respond natively.'
    ]
  },
  {
    id: 'plan-features-breakdown',
    category: 'billing',
    categoryLabel: 'Billing & Plans',
    title: 'What\'s included in each plan?',
    icon: <DollarSign size={16} />,
    readTime: '3 min',
    views: '2,300',
    updatedAt: 'Mar 15, 2026',
    body: [
      'We offer three plans: Starter (for single-channel creators), Professional (our most popular tier for multi-channel growth), and Agency (for full production teams).'
    ]
  },
  {
    id: 'upgrading-plan',
    category: 'billing',
    categoryLabel: 'Billing & Plans',
    title: 'How to upgrade your plan',
    icon: <ArrowUp size={16} />,
    readTime: '2 min',
    views: '1,900',
    updatedAt: 'Apr 02, 2026',
    body: [
      'You can upgrade instantly from the Billing section in your account dashboard. Price differences are prorated automatically.'
    ]
  },
  {
    id: 'cancelling-subscription',
    category: 'billing',
    categoryLabel: 'Billing & Plans',
    title: 'How to cancel your subscription',
    icon: <X size={16} />,
    readTime: '2 min',
    views: '8,400',
    updatedAt: 'May 11, 2026',
    isPopular: true,
    body: [
      'We are sorry to see you go! You can cancel your subscription at any time with a single click in your Account Settings. Your premium features will remain active until the end of your billing cycle.'
    ],
    steps: [
      'Go to Settings → Billing',
      'Click on the "Manage Subscription" button',
      'Click "Cancel Plan" and confirm your choice',
      'A confirmation email will be sent immediately'
    ]
  },
  {
    id: 'refund-policy',
    category: 'billing',
    categoryLabel: 'Billing & Plans',
    title: 'Refund policy — 7-day money back guarantee',
    icon: <DollarSign size={16} />,
    readTime: '2 min',
    views: '2,100',
    updatedAt: 'Jan 20, 2026',
    body: [
      'If you are not satisfied with your purchase, contact us within 7 days of your initial payment for a full refund.'
    ]
  },
  {
    id: 'downloading-invoices',
    category: 'billing',
    categoryLabel: 'Billing & Plans',
    title: 'Downloading invoices and receipts',
    icon: <Receipt size={16} />,
    readTime: '1 min',
    views: '1,400',
    updatedAt: 'Feb 15, 2026',
    body: [
      'Go to Billing, scroll to Billing History, and click download PDF on any past transaction.'
    ]
  },
  {
    id: 'updating-payment-method',
    category: 'billing',
    categoryLabel: 'Billing & Plans',
    title: 'Updating your payment method',
    icon: <CreditCard size={16} />,
    readTime: '2 min',
    views: '3,000',
    updatedAt: 'May 04, 2026',
    body: [
      'Easily swap credit cards or transition your subscription to PayPal through Stripe Billing.'
    ]
  },
  {
    id: 'topic-finder-guide',
    category: 'features',
    categoryLabel: 'Features',
    title: 'Topic Finder — complete guide',
    icon: <Flame size={16} />,
    readTime: '6 min',
    views: '5,600',
    updatedAt: 'May 05, 2026',
    body: [
      'The Topic Finder extracts highly viral, low-competition video concepts by scanning your competitor channels and YouTube trends.',
      'Simply type your primary keyword and hit search to get customized suggestions ranked by our proprietary opportunity score.'
    ]
  },
  {
    id: 'script-generator-formats',
    category: 'features',
    categoryLabel: 'Features',
    title: 'Script Generator — all 8 formats explained',
    icon: <PenTool size={16} />,
    readTime: '8 min',
    views: '7,100',
    updatedAt: 'May 06, 2026',
    body: [
      'Our AI script generator supports 8 custom-tailored formats including Listicles, Documentaries, and High-RPM Explainer videos.',
      'Each script formats hooks, call-to-actions, and retention patterns perfectly to keep viewers engaged.'
    ]
  },
  {
    id: 'shorts-repurposer-guide',
    category: 'features',
    categoryLabel: 'Features',
    title: 'Shorts Repurposer — full guide',
    icon: <Zap size={16} />,
    readTime: '6 min',
    views: '9,200',
    updatedAt: 'May 16, 2026',
    isUpdated: true,
    body: [
      'Learn how to take any long-form video link, extract its key highlights, transcribe, and convert it into 5 high-converting vertical Shorts scripts with AI overlays in under a minute.'
    ]
  },
  {
    id: 'retention-optimizer',
    category: 'features',
    categoryLabel: 'Features',
    title: 'Retention Optimizer — how the score works',
    icon: <BarChart3 size={16} />,
    readTime: '4 min',
    views: '3,100',
    updatedAt: 'Mar 10, 2026',
    body: [
      'The Retention Optimizer analyzes your draft script text and predicts points where viewers might click away.',
      'It gives a score from 1-10 and highlights suggestions to shorten intros or add visual pattern interrupts.'
    ]
  },
  {
    id: 'content-calendar',
    category: 'features',
    categoryLabel: 'Features',
    title: 'Content Calendar — scheduling your pipeline',
    icon: <CalendarDays size={16} />,
    readTime: '5 min',
    views: '2,800',
    updatedAt: 'Apr 11, 2026',
    body: [
      'Keep track of drafts, scripts in production, and completed videos with the interactive drag-and-drop Content Calendar.'
    ]
  },
  {
    id: 'competitor-intelligence',
    category: 'features',
    categoryLabel: 'Features',
    title: 'Competitor Intelligence — analyzing channels',
    icon: <Search size={16} />,
    readTime: '5 min',
    views: '4,000',
    updatedAt: 'Apr 24, 2026',
    body: [
      'Analyze what is currently performing best on other channels in your niche and replicate their success hooks legally.'
    ]
  },
  {
    id: 'ai-agents-setup',
    category: 'features',
    categoryLabel: 'Features',
    title: 'AI Agents (Beta) — full setup guide',
    icon: <Bot size={16} />,
    readTime: '8 min',
    views: '2,500',
    updatedAt: 'May 20, 2026',
    isNew: true,
    body: [
      'Configure specialized AI agents that run in the background doing research, auto-drafting content, or checking transcripts for copyright tags.'
    ]
  },
  {
    id: 'connecting-youtube-oauth',
    category: 'integrations',
    categoryLabel: 'Integrations',
    title: 'Connecting YouTube — OAuth permissions explained',
    icon: <Tv size={16} />,
    readTime: '4 min',
    views: '5,000',
    updatedAt: 'May 03, 2026',
    body: [
      'Learn about Google OAuth permissions, why they are required, and how we securely query your public stats.'
    ]
  },
  {
    id: 'google-analytics-guide',
    category: 'integrations',
    categoryLabel: 'Integrations',
    title: 'Google Analytics integration guide',
    icon: <BarChart3 size={16} />,
    readTime: '5 min',
    views: '1,800',
    updatedAt: 'Feb 12, 2026',
    body: [
      'Link Google Analytics to track how much of your external channel traffic converts directly into leads and newsletter subscribers.'
    ]
  },
  {
    id: 'beehiiv-newsletter',
    category: 'integrations',
    categoryLabel: 'Integrations',
    title: 'Connecting Beehiiv newsletter',
    icon: <Mail size={16} />,
    readTime: '3 min',
    views: '1,700',
    updatedAt: 'Jan 28, 2026',
    body: [
      'Directly sync your YouTube viewers who sign up for your lead magnets to your Beehiiv subscribers database via simple API keys.'
    ]
  },
  {
    id: 'canva-templates',
    category: 'integrations',
    categoryLabel: 'Integrations',
    title: 'Canva integration for thumbnail templates',
    icon: <Palette size={16} />,
    readTime: '4 min',
    views: '2,900',
    updatedAt: 'Apr 18, 2026',
    body: [
      'Export title text overlays directly from your scripts into your Canva workspace with our thumbnail creation widget.'
    ]
  },
  {
    id: 'script-widget-trouble',
    category: 'troubleshoot',
    categoryLabel: 'Troubleshooting',
    title: 'Script generator not working — fixes',
    icon: <AlertTriangle size={16} />,
    readTime: '3 min',
    views: '3,800',
    updatedAt: 'May 14, 2026',
    body: [
      'If your script generator stays loading indefinitely, the primary cause is typically an invalid API key, lack of funds on your model account, or internet blocking.',
      'Check console logs or double-check your API key setting. Ensure no VPN blocks request routes to the LLM servers.'
    ]
  },
  {
    id: 'youtube-sync-errors',
    category: 'troubleshoot',
    categoryLabel: 'Troubleshooting',
    title: 'YouTube analytics not syncing',
    icon: <RefreshCw size={16} />,
    readTime: '3 min',
    views: '2,500',
    updatedAt: 'Apr 10, 2026',
    body: [
      'This happens when OAuth credentials expire. Simply log out of AutoTubeOS, log back in, and re-authenticate Google permissions.'
    ]
  },
  {
    id: 'invalid-api-key-error',
    category: 'troubleshoot',
    categoryLabel: 'Troubleshooting',
    title: 'API key showing invalid — troubleshooting',
    icon: <Key size={16} />,
    readTime: '4 min',
    views: '2,700',
    updatedAt: 'May 07, 2026',
    body: [
      'Common formatting errors include pasting quotes or spaces alongside your key. Ensure the string matches the exact key from the provider dashboard.'
    ]
  },
  {
    id: 'slow-dashboard',
    category: 'troubleshoot',
    categoryLabel: 'Troubleshooting',
    title: 'Dashboard loading slowly — how to fix',
    icon: <Gauge size={16} />,
    readTime: '2 min',
    views: '1,400',
    updatedAt: 'Mar 08, 2026',
    body: [
      'Clear cache, close background streams, or disable heavy browser extensions that inject scripts into client pages.'
    ]
  },
  {
    id: 'login-issues',
    category: 'troubleshoot',
    categoryLabel: 'Troubleshooting',
    title: 'Can\'t log in to my account',
    icon: <Smartphone size={16} />,
    readTime: '3 min',
    views: '2,100',
    updatedAt: 'May 02, 2026',
    body: [
      'Try resetting your password via our Password Reset flow, or contact Support via the direct form.'
    ]
  },
  {
    id: 'team-collaboration',
    category: 'features',
    categoryLabel: 'Features',
    title: 'Team collaboration for Agency plan users',
    icon: <Users size={16} />,
    readTime: '5 min',
    views: '1,200',
    updatedAt: 'May 19, 2026',
    isNew: true,
    body: [
      'Invite script editors, voice actors, and managers to work on the same video workspace. Restrict roles and track who generated which segments.'
    ]
  },
  {
    id: 'multilingual-scripts',
    category: 'features',
    categoryLabel: 'Features',
    title: 'Generating scripts in Urdu, Hindi, and Arabic',
    icon: <Globe size={16} />,
    readTime: '3 min',
    views: '950',
    updatedAt: 'May 17, 2026',
    isNew: true,
    body: [
      'Target international audiences effortlessly. Select the language dropdown in Topic Finder or Script Writer to unlock highly localized translations.'
    ]
  }
];

const CATEGORIES = [
  { id: 'overview', label: 'All Articles', icon: <Home size={16} /> },
  { id: 'getting-started', label: 'Getting Started', icon: <Rocket size={16} />, count: 5 },
  { id: 'features', label: 'Features', icon: <Sparkles size={20} />, count: 9 },
  { id: 'ai-setup', label: 'AI & API Setup', icon: <Bot size={16} />, count: 5 },
  { id: 'billing', label: 'Billing & Plans', icon: <CreditCard size={16} />, count: 6 },
  { id: 'integrations', label: 'Integrations', icon: <Link2 size={16} />, count: 4 },
  { id: 'troubleshoot', label: 'Troubleshooting', icon: <Wrench size={16} />, count: 5 }
];

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState<string>('overview');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, React.ReactNode>>({});

  // Filter articles based on active category and search query
  const filteredArticles = useMemo(() => {
    let list = ARTICLES;
    
    // Category filter
    if (activeCategory !== 'overview') {
      list = list.filter(art => art.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        art =>
          art.title.toLowerCase().includes(q) ||
          art.body.some(b => b.toLowerCase().includes(q)) ||
          art.categoryLabel.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  const mostViewedArticles = useMemo(() => {
    return ARTICLES.filter(art => art.isPopular).slice(0, 5);
  }, []);

  const recentlyUpdatedArticles = useMemo(() => {
    return ARTICLES.filter(art => art.isNew || art.isUpdated).slice(0, 3);
  }, []);

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setSelectedArticle(null);
    setSearchQuery('');
  };

  const handleOpenArticle = (art: Article) => {
    setSelectedArticle(art);
    // Find category to set active in sidebar
    setActiveCategory(art.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    setActiveCategory('overview');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedArticle(null); // Return to list view while searching
  };

  const handlePopularChipClick = (query: string) => {
    // If it maps exactly to an article title snippet, let's open that article directly
    const found = ARTICLES.find(art => art.title.toLowerCase().includes(query.toLowerCase()));
    if (found) {
      handleOpenArticle(found);
    } else {
      setSearchQuery(query);
      setSelectedArticle(null);
    }
  };

  const handleHelpfulClick = (artId: string, answer: 'yes' | 'no') => {
    setHelpfulFeedback(prev => ({
      ...prev,
      [artId]: answer === 'yes' ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><ThumbsUp size={14} /> Thanks!</span> : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><FileText size={14} /> Noted</span>
    }));
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.gridBg}></div>
        <div className={styles.hLabel}>Help Center</div>
        <div className={styles.hTitle}>How can we help you?</div>
        <div className={styles.hSub}>
          Guides, tutorials, and answers for every part of AutoTubeOS.
        </div>
        <div className={styles.searchWrap}>
          <div className={styles.searchRow}>
            <span className={styles.searchIcon}><Search size={16} /></span>
            <input
              className={styles.searchInp}
              placeholder="Search 80+ articles..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--muted)', 
                  cursor: 'pointer',
                  marginRight: '8px'
                }}
              >
                <X size={18} />
              </button>
            )}
            <button className={styles.searchBtn}>Search</button>
          </div>
          <div className={styles.popularSearches}>
            <span style={{ fontSize: '12px', color: 'var(--muted2)' }}>Popular:</span>
            <div className={styles.psChip} onClick={() => handlePopularChipClick('Getting started')}>
              Getting started
            </div>
            <div className={styles.psChip} onClick={() => handlePopularChipClick('API key')}>
              API key setup
            </div>
            <div className={styles.psChip} onClick={() => handlePopularChipClick('cancel')}>
              Cancel subscription
            </div>
            <div className={styles.psChip} onClick={() => handlePopularChipClick('repurposer')}>
              Shorts repurposer
            </div>
            <div className={styles.psChip} onClick={() => handlePopularChipClick('YouTube')}>
              Connect YouTube
            </div>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className={styles.mainLayout}>
        {/* SIDEBAR */}
        <aside className={styles.docsSidebar}>
          <div className={styles.dsLabel}>Categories</div>
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className={`${styles.dsItem} ${activeCategory === cat.id && !selectedArticle ? styles.on : ''}`}
              onClick={() => handleSelectCategory(cat.id)}
            >
              <span className={styles.dsIcon}>{cat.icon}</span>
              {cat.label}
              {cat.count && <span className={styles.dsBadge}>{cat.count}</span>}
            </div>
          ))}
          <div className={styles.dsLabel}>Quick Links</div>
          <Link href="/blog" className={styles.dsItem}>
            <span className={styles.dsIcon}><Tv size={16} /></span>Video Tutorials
          </Link>
          <Link href="/changelog" className={styles.dsItem}>
            <span className={styles.dsIcon}><Bell size={16} /></span>Changelog
          </Link>
          <Link href="/status" className={styles.dsItem}>
            <span className={styles.dsIcon}><BarChart3 size={16} /></span>Status Page
          </Link>
          <Link href="/contact" className={styles.dsItem}>
            <span className={styles.dsIcon}><MessageCircle size={16} /></span>Contact Support
          </Link>
        </aside>

        {/* CONTENT AREA */}
        <main className={styles.docsContent}>
          {/* ARTICLE DETAIL VIEW */}
          {selectedArticle ? (
            <div className={`${styles.articleView} ${styles.show}`}>
              <div className={styles.avBreadcrumb}>
                <a onClick={handleCloseArticle}>Help Center</a> › {selectedArticle.categoryLabel}
              </div>
              <h1 className={styles.avTitle}>{selectedArticle.title}</h1>
              <div className={styles.avMeta}>
                <span><CalendarDays size={16} /> Updated {selectedArticle.updatedAt}</span>
                <span><Clock size={16} /> {selectedArticle.readTime} read</span>
                <span><Eye size={16} /> {selectedArticle.views} views</span>
              </div>
              <div className={styles.avBody}>
                {selectedArticle.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {selectedArticle.steps && (
                  <>
                    <h2>Step-by-Step Instructions</h2>
                    <div className={styles.avSteps}>
                      {selectedArticle.steps.map((step, idx) => (
                        <div key={idx} className={styles.avStep}>
                          <div className={styles.avStepNum}>{idx + 1}</div>
                          <div className={styles.avStepText} dangerouslySetInnerHTML={{ __html: step.replace(/strong\>(.*?)\<\/strong/g, 'b>$1</b') }}></div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {selectedArticle.callout && (
                  <div className={styles.avCallout}>
                    <div className={styles.avCalloutLabel}><Info size={16} /> Note</div>
                    <p style={{ margin: 0 }}>{selectedArticle.callout}</p>
                  </div>
                )}

                {selectedArticle.codeBlock && (
                  <div className={styles.codeBlock}>{selectedArticle.codeBlock}</div>
                )}

                {selectedArticle.tip && (
                  <div className={styles.avTip}>
                    <div className={styles.avTipLabel}><Lightbulb size={16} /> Pro Tip</div>
                    <p style={{ margin: 0 }}>{selectedArticle.tip}</p>
                  </div>
                )}
              </div>
              
              <div className={styles.helpfulRow}>
                <div className={styles.helpfulLabel}>Was this article helpful?</div>
                {helpfulFeedback[selectedArticle.id] ? (
                  <span style={{ color: 'var(--green)', fontSize: '13px', fontWeight: 600 }}>
                    {helpfulFeedback[selectedArticle.id]}
                  </span>
                ) : (
                  <>
                    <button 
                      className={styles.helpfulBtn} 
                      onClick={() => handleHelpfulClick(selectedArticle.id, 'yes')}
                    >
                      <ThumbsUp size={14} /> Yes
                    </button>
                    <button 
                      className={styles.helpfulBtn} 
                      onClick={() => handleHelpfulClick(selectedArticle.id, 'no')}
                    >
                      <ThumbsDown size={14} /> No
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* LIST VIEW OR OVERVIEW VIEW */
            <div className={`${styles.docView} ${styles.active}`}>
              {activeCategory === 'overview' && !searchQuery ? (
                <>
                  <div style={{ marginBottom: '28px' }}>
                    <h1 style={{ fontFamily: 'var(--fh)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
                      All Help Articles
                    </h1>
                    <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                      80+ articles across 6 categories
                    </div>
                  </div>

                  {/* Overview categories grid */}
                  <div className={styles.overviewGrid}>
                    {CATEGORIES.slice(1).map(cat => (
                      <div 
                        key={cat.id} 
                        className={styles.ovCard}
                        onClick={() => handleSelectCategory(cat.id)}
                      >
                        <div className={styles.ovIcon}>{cat.icon}</div>
                        <div className={styles.ovTitle}>{cat.label}</div>
                        <div className={styles.ovDesc}>
                          {cat.id === 'getting-started' && 'Account setup, onboarding walkthrough, first video guide.'}
                          {cat.id === 'features' && 'Topic Finder, Script Generator, Shorts Repurposer, Calendar.'}
                          {cat.id === 'ai-setup' && 'Groq, Gemini, model selection, rate limits, troubleshooting.'}
                          {cat.id === 'billing' && 'Pricing, upgrades, cancellation, invoices, refunds.'}
                          {cat.id === 'integrations' && 'YouTube, Google Analytics, Beehiiv, Canva connections.'}
                          {cat.id === 'troubleshoot' && 'Common errors, fixes, browser issues, data syncing.'}
                        </div>
                        <div className={styles.ovCount}>{cat.count} articles</div>
                      </div>
                    ))}
                  </div>

                  {/* Most Viewed and Recently Updated grids */}
                  <div className={styles.articleGroup}>
                    <div className={styles.agTitle}><Flame size={16} /> Most Viewed Articles</div>
                    {mostViewedArticles.map(art => (
                      <div 
                        key={art.id} 
                        className={styles.articleItem}
                        onClick={() => handleOpenArticle(art)}
                      >
                        <div className={styles.aiIcon}>{art.icon}</div>
                        <div className={styles.aiTitle}>{art.title}</div>
                        <div className={`${styles.aiBadge} ${styles.popBadge}`}>Popular</div>
                        <div className={styles.aiMeta}>{art.readTime}</div>
                        <div className={styles.aiArrow}>›</div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.articleGroup}>
                    <div className={styles.agTitle}><Sparkles size={16} /> Recently Updated</div>
                    {recentlyUpdatedArticles.map(art => (
                      <div 
                        key={art.id} 
                        className={styles.articleItem}
                        onClick={() => handleOpenArticle(art)}
                      >
                        <div className={styles.aiIcon}>{art.icon}</div>
                        <div className={styles.aiTitle}>{art.title}</div>
                        <div className={`${styles.aiBadge} ${styles.newBadge}`}>
                          {art.isNew ? 'New' : 'Updated'}
                        </div>
                        <div className={styles.aiMeta}>{art.readTime}</div>
                        <div className={styles.aiArrow}>›</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* SPECIFIC CATEGORY OR SEARCH RESULTS VIEW */
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <h1 style={{ fontFamily: 'var(--fh)', fontSize: '1.3rem', fontWeight: 800 }}>
                      {searchQuery ? `Search Results for "${searchQuery}"` : CATEGORIES.find(c => c.id === activeCategory)?.label}
                    </h1>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                      Found {filteredArticles.length} article{filteredArticles.length === 1 ? '' : 's'}
                    </div>
                  </div>

                  <div className={styles.articleGroup}>
                    {filteredArticles.length > 0 ? (
                      filteredArticles.map(art => (
                        <div 
                          key={art.id} 
                          className={styles.articleItem}
                          onClick={() => handleOpenArticle(art)}
                        >
                          <div className={styles.aiIcon}>{art.icon}</div>
                          <div className={styles.aiTitle}>{art.title}</div>
                          {art.isPopular && <div className={`${styles.aiBadge} ${styles.popBadge}`}>Popular</div>}
                          {art.isNew && <div className={`${styles.aiBadge} ${styles.newBadge}`}>New</div>}
                          {art.isUpdated && <div className={`${styles.aiBadge} ${styles.newBadge}`}>Updated</div>}
                          <div className={styles.aiMeta}>{art.readTime}</div>
                          <div className={styles.aiArrow}>›</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--muted)' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '10px' }}><Search size={16} /></div>
                        <h3>No articles found</h3>
                        <p style={{ fontSize: '12px', marginTop: '6px' }}>Try searching for generic terms like "API", "YouTube", or "Billing".</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}
