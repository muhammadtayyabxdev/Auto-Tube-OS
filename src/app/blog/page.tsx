'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from '@/styles/blog.module.css';
import { Bot, Check, ClipboardList, DollarSign, Flame, Link2, MailOpen, Rocket, Star, Tag, TrendingUp, Wrench, Zap } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  emoji: string;
  category: string;
  categoryLabel: string;
  tagClass: string;
  date: string;
  author: string;
  initials: string;
  role: string;
  readTime: string;
  featured?: boolean;
  ptClass?: string;
  reads?: string;
  content?: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: 'complete-youtube-automation',
    title: 'The Complete YouTube Automation OS: How to Build a Channel That Runs Without You',
    excerpt: "Most creators think YouTube automation is about AI tools. It's not. It's about building a system — a repeatable workflow where every step from idea to upload is defined, delegated, or automated. Here's exactly how to do it in 2026.",
    emoji: '<Brain size={16} />',
    category: 'strategy',
    categoryLabel: 'Strategy',
    tagClass: styles.tagStrategy,
    date: 'May 14, 2026',
    author: 'Ahmed K.',
    initials: 'AK',
    role: 'Head of Creator Strategy',
    readTime: '14 min read',
    featured: true,
    reads: '38,412 reads',
    content: `
      <p>Most people who talk about "YouTube automation" are thinking too small. They're thinking about which AI tool writes scripts faster, or which voiceover sounds most human. That's not automation — that's just outsourcing individual tasks.</p>

      <p><strong>Real automation is a system.</strong> It's a repeatable workflow where every step — ideation, scripting, production, publishing, repurposing — is defined, delegated, or automated so that the channel grows without requiring your constant presence.</p>

      <div class="${styles.aStatRow}">
        <div class="${styles.aStat}"><div class="${styles.aStatNum}">73%</div><div class="${styles.aStatLbl}">Time saved per video</div></div>
        <div class="${styles.aStat}"><div class="${styles.aStatNum}">3×</div><div class="${styles.aStatLbl}">More output per month</div></div>
        <div class="${styles.aStat}"><div class="${styles.aStatNum}">$0</div><div class="${styles.aStatLbl}">Extra tools needed</div></div>
      </div>

      <h2>Phase 1: The Idea Engine</h2>
      <p>The biggest bottleneck in most channels isn't production — it's deciding what to make. Creators spend hours every week browsing YouTube, Reddit, and Twitter trying to find the next video idea. This is almost entirely eliminable.</p>

      <p>A proper idea engine does three things:</p>
      <ul>
        <li>Monitors trending topics in your niche in real time</li>
        <li>Scores ideas by potential views, RPM, and competition level</li>
        <li>Outputs a ranked list you can act on immediately</li>
      </ul>

      <div class="${styles.aCallout}">
        <div class="${styles.aCalloutLabel}"><Lightbulb size={16} /> Pro Tip</div>
        The best video ideas aren't the ones you think of — they're the ones your audience is already searching for. Build a system that listens before you create.
      </div>

      <h2>Phase 2: The Script System</h2>
      <p>Once you have a validated idea, scripting should take 20 minutes, not 3 hours. The key is having a reusable framework for each video format you produce — listicles, documentary-style, stories, finance breakdowns — so AI can fill in the structure rather than reinvent it each time.</p>

      <p>Every script framework should define: hook structure, intro length, number of main points, CTA placement, and retention hooks at the 2-minute and 5-minute marks. Once these are defined, AI can generate a first draft in minutes that you edit rather than write from scratch.</p>

      <h2>Phase 3: Production Without You</h2>
      <p>For faceless channels, production can be almost fully outsourced or automated:</p>
      <ul>
        <li><strong>Voiceover:</strong> ElevenLabs or a consistent voice actor on retainer</li>
        <li><strong>Video footage:</strong> Stock libraries, AI-generated b-roll, or screen recordings</li>
        <li><strong>Editing:</strong> A trained editor with your style guide — or automated with templates</li>
        <li><strong>Thumbnail:</strong> Canva template + AI-generated concept = consistent in 10 minutes</li>
      </ul>

      <h2>Phase 4: The Publish & Repurpose Loop</h2>
      <p>Every long-form video should automatically generate: a YouTube Shorts script, a newsletter summary, and three Twitter/X thread posts. This quadruples your content output with zero additional research or ideation.</p>

      <p>The creators winning in 2026 aren't the ones making more content. They're the ones making one piece of content that becomes ten.</p>

      <h2>Putting It All Together</h2>
      <p>The goal isn't to remove yourself from the process entirely — it's to remove yourself from the <em>low-leverage</em> parts. You should be spending your time on strategy and quality control, not on searching for ideas or writing the same intro structure for the hundredth time.</p>

      <p>Build the system once. Run it on autopilot. Iterate quarterly. That's the YouTube Automation OS.</p>
    `
  },
  {
    id: '7-viral-video-frameworks',
    title: '7 Viral Video Frameworks That Work in Any Niche',
    excerpt: "These aren't just hooks — they're full structural blueprints. Use any one of them and your retention will measurably improve.",
    emoji: '<Flame size={16} />',
    category: 'growth',
    categoryLabel: 'Growth',
    tagClass: styles.tagGrowth,
    date: 'May 11, 2026',
    author: 'Sara R.',
    initials: 'SR',
    role: 'Lead Growth Strategist',
    readTime: '8 min read',
    ptClass: styles.pt1,
    reads: '17,294 reads',
    content: `
      <p>Creating viral content isn't a game of luck. Behind every massive hit is a structural framework designed to capture attention and hook viewer psychology.</p>
      <p>We've analyzed over 1,000 top-performing faceless and personal brand videos across YouTube. The most successful channels use a handful of recurring video frameworks that guarantee high retention.</p>
      
      <h2>1. The "Before vs After" Transformation Blueprint</h2>
      <p>This is the ultimate dopamine loop. You establish a frustrating baseline, detail the struggle, introduce a secret catalyst, and showcase the glorious result.</p>
      
      <h2>2. The "I Tried X for 30 Days" Experiment</h2>
      <p>Human beings are naturally curious about outcomes but terrified of committing their own time. When you act as the lab rat, viewers will sit through the entire video to see if the experiment succeeded.</p>
      
      <div class="${styles.aCallout}">
        <div class="${styles.aCalloutLabel}"><TrendingUp size={16} /> Pro Tip</div>
        Always start your experiments with a high stakes warning: outline what you could lose (money, time, reputation) to maximize engagement immediately.
      </div>
      
      <h2>3. The "X Lies You Still Believe" Mythbuster</h2>
      <p>People hate feeling fooled. By challenging conventional wisdom right away, you build strong intellectual tension that forces the viewer to keep watching to see if they're making these common mistakes.</p>
    `
  },
  {
    id: 'high-rpm-niches-2026',
    title: 'High RPM Niches in 2026: Where the Real Ad Money Is',
    excerpt: "Finance isn't the only niche with $20+ RPM anymore. Here are 11 underserved niches with top-tier ad rates and almost no faceless competition.",
    emoji: '<DollarSign size={16} />',
    category: 'monetize',
    categoryLabel: 'Monetize',
    tagClass: styles.tagMonetize,
    date: 'May 9, 2026',
    author: 'James L.',
    initials: 'JL',
    role: 'Monetization Analyst',
    readTime: '6 min read',
    ptClass: styles.pt2,
    reads: '24,198 reads',
    content: `
      <p>Ad rates are changing rapidly. While standard niches like gaming or vlogs sit at $2-$4 RPM (Revenue Per Mille), smart creators are shifting towards premium niches that pay up to 10x more for the same views.</p>
      <p>If you want to maximize your YouTube earnings without needing millions of views, you need to align your content with high-intent advertisers. Here are the top spaces for 2026.</p>

      <div class="${styles.aStatRow}">
        <div class="${styles.aStat}"><div class="${styles.aStatNum}">$32</div><div class="${styles.aStatLbl}">Top SaaS Ad RPM</div></div>
        <div class="${styles.aStat}"><div class="${styles.aStatNum}">$24</div><div class="${styles.aStatLbl}">Web3 & Finance RPM</div></div>
        <div class="${styles.aStat}"><div class="${styles.aStatNum}">$18</div><div class="${styles.aStatLbl}">Biohacking Tech RPM</div></div>
      </div>

      <h2>1. B2B Software & Automation Integrations</h2>
      <p>Advertisers in this space are selling high-ticket monthly subscriptions to business owners. They are extremely willing to pay top dollar to place ads on videos that explain workflows, CRM tools, or AI automations.</p>

      <h2>2. Longevity, Biohacking & Neuro-Tech</h2>
      <p>The health niche has evolved. General fitness is low-paying, but highly technical biohacking tools, supplements, and cognitive trackers attract highly capitalized brands aiming at an affluent viewer base.</p>
    `
  },
  {
    id: 'claude-vs-chatgpt-scripts',
    title: 'Claude vs ChatGPT for YouTube Scripts: An Honest Comparison',
    excerpt: "We ran 200 scripts through both models. The results were surprisingly clear — but not in the direction most people expect.",
    emoji: '<Bot size={16} />',
    category: 'ai',
    categoryLabel: 'AI Tools',
    tagClass: styles.tagAi,
    date: 'May 7, 2026',
    author: 'Mariam Z.',
    initials: 'MZ',
    role: 'AI Workflow Architect',
    readTime: '10 min read',
    ptClass: styles.pt3,
    reads: '15,020 reads',
    content: `
      <p>Writing engaging YouTube scripts requires a delicate balance of pacing, conversational tone, and emotional hooks. General AI text sounds incredibly sterile, which ruins viewer retention.</p>
      <p>We put Claude 3.5 Sonnet and GPT-4o to the test, generating 200 scripts across finance, storytelling, and tech niches. Here is what we discovered.</p>

      <h2>Claude: The Master of Natural Tone</h2>
      <p>Claude shines when it comes to narrative flow. Its vocabulary feels less robotic, it avoids bullet-point clichés, and it easily adopts a relaxed, peer-to-peer tone that feels like a human wrote it.</p>

      <h2>ChatGPT: The Speed & Structure Champion</h2>
      <p>GPT-4o dominates when you need clear outlines, data organization, and strict compliance with word-count limits. It works best as an editor or ideation partner rather than the direct voice.</p>
    `
  },
  {
    id: 'turn-1-video-into-5-shorts',
    title: 'How to Turn 1 Long Video Into 5 Viral Shorts (Without Watching It)',
    excerpt: "The exact AI-powered process we use to identify the best clips, rewrite hooks for Shorts format, and schedule them on autopilot.",
    emoji: '<Zap size={16} />',
    category: 'shorts',
    categoryLabel: 'Shorts',
    tagClass: styles.tagShorts,
    date: 'May 5, 2026',
    author: 'Ahmed K.',
    initials: 'AK',
    role: 'Head of Creator Strategy',
    readTime: '5 min read',
    ptClass: styles.pt4,
    reads: '17,801 reads',
    content: `
      <p>Short-form vertical video is the fastest way to feed your top-of-funnel growth. But manually scrubbing through a 20-minute video to find highlights is incredibly tedious.</p>
      <p>Here is our automated pipeline to convert long-form videos into high-retention Shorts in under 15 minutes.</p>

      <h2>1. The Audio Transcript Scripting</h2>
      <p>Instead of watching the video, we feed the raw transcription to an LLM to identify the highest tension parts — where a story resolves, a shocking statistic is revealed, or a strong argument starts.</p>

      <h2>2. Re-Hooking the Shorts</h2>
      <p>The hook in a long video rarely works on vertical feeds. We rewrite the first 3 seconds of the extracted snippet to grab instant focus, ensuring a retention rate above 85%.</p>
    `
  },
  {
    id: 'tech-stack-5k-channel',
    title: 'The Exact Tech Stack for a $5K/Month Faceless Channel',
    excerpt: "Voiceovers, thumbnails, scripts, editing, scheduling — here's every tool we use, what we pay, and what we'd replace first.",
    emoji: '<BarChart3 size={16} />',
    category: 'tools',
    categoryLabel: 'Tools',
    tagClass: styles.tagTools,
    date: 'May 2, 2026',
    author: 'James L.',
    initials: 'JL',
    role: 'Monetization Analyst',
    readTime: '7 min read',
    ptClass: styles.pt5,
    reads: '19,332 reads',
    content: `
      <p>You don't need a massive agency budget to run a profitable YouTube automation channel. In fact, keeping your monthly software expenses low is key to sustaining growth during the initial stages.</p>
      <p>Here is our breakdown of the tools we use, including exact pricing and where you can cut corners.</p>

      <h2>The Budget Blueprint</h2>
      <ul>
        <li><strong>ElevenLabs ($22/mo):</strong> Unmatched voice cloning and emotional dynamic reading.</li>
        <li><strong>AutoTubeOS ($49/mo):</strong> Centralized scheduling, script generator, and thumbnail ideas.</li>
        <li><strong>CapCut Pro ($8/mo):</strong> Incredibly fast keyframes, auto captions, and sound effects.</li>
      </ul>
    `
  },
  {
    id: '90-day-content-calendar',
    title: 'The 90-Day Content Calendar That Grew a Channel to 100K',
    excerpt: "We're publishing the exact calendar — every topic, format, upload date, and thumbnail strategy — that took a brand-new finance channel to 100K in 3 months.",
    emoji: '<CalendarDays size={16} />',
    category: 'strategy',
    categoryLabel: 'Strategy',
    tagClass: styles.tagStrategy,
    date: 'Apr 29, 2026',
    author: 'Sara R.',
    initials: 'SR',
    role: 'Lead Growth Strategist',
    readTime: '12 min read',
    ptClass: styles.pt6,
    reads: '12,948 reads',
    content: `
      <p>Inconsistency is the main reason why channels stall. When the YouTube algorithm cannot predict your upload schedule or topic theme, it struggles to identify your core audience.</p>
      <p>This 90-day calendar resolves consistency issues by laying out a clear progression of authority-building videos, trend jackers, and deep-dive tutorials.</p>

      <h2>Month 1: The Foundation (8 Videos)</h2>
      <p>Focus purely on high-search-intent, evergreen search tutorials to signal your niche authority to the algorithm.</p>
    `
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [progressWidth, setProgressWidth] = useState('0%');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const overlayRef = useRef<HTMLDivElement>(null);

  // Filter posts based on category and search query
  useEffect(() => {
    let filtered = MOCK_POSTS;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    }

    setPosts(filtered);
  }, [activeCategory, searchQuery]);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const openArticle = (post: Post) => {
    setSelectedPost(post);
    setProgressWidth('0%');
    document.body.style.overflow = 'hidden';
  };

  const closeArticle = () => {
    setSelectedPost(null);
    document.body.style.overflow = '';
  };

  const handleOverlayScroll = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const scrollTop = overlay.scrollTop;
    const scrollHeight = overlay.scrollHeight - overlay.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    setProgressWidth(`${pct}%`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeArticle();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setEmailSubscribed(false);
    }, 4000);
  };

  const featuredPost = MOCK_POSTS.find(p => p.featured) || MOCK_POSTS[0];
  const gridPosts = posts.filter(p => !p.featured);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.gridBg}></div>
        <div className={styles.glow}></div>
        <div className={styles.heroInner}>
          <div className={styles.heroLabel}>Creator Resources</div>
          <h1>Grow smarter.<br />Create less. Earn more.</h1>
          <p>Guides, strategies, and AI workflows for faceless YouTube creators who are serious about scaling.</p>
          
          <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
            <input 
              className={styles.searchInput} 
              placeholder="Search articles — e.g. 'faceless YouTube', 'RPM', 'Shorts'…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
          </form>

          <div className={styles.categories}>
            <div 
              className={`${styles.category} ${activeCategory === 'all' ? styles.activeCategory : ''}`} 
              onClick={() => handleCategoryClick('all')}
            >
              All Posts
            </div>
            <div 
              className={`${styles.category} ${activeCategory === 'strategy' ? styles.activeCategory : ''}`} 
              onClick={() => handleCategoryClick('strategy')}
            >
              <ClipboardList size={16} /> Strategy
            </div>
            <div 
              className={`${styles.category} ${activeCategory === 'growth' ? styles.activeCategory : ''}`} 
              onClick={() => handleCategoryClick('growth')}
            >
              <TrendingUp size={16} /> Growth
            </div>
            <div 
              className={`${styles.category} ${activeCategory === 'ai' ? styles.activeCategory : ''}`} 
              onClick={() => handleCategoryClick('ai')}
            >
              <Bot size={16} /> AI Tools
            </div>
            <div 
              className={`${styles.category} ${activeCategory === 'tools' ? styles.activeCategory : ''}`} 
              onClick={() => handleCategoryClick('tools')}
            >
              <Wrench size={16} /> Tools
            </div>
            <div 
              className={`${styles.category} ${activeCategory === 'monetize' ? styles.activeCategory : ''}`} 
              onClick={() => handleCategoryClick('monetize')}
            >
              <DollarSign size={16} /> Monetize
            </div>
            <div 
              className={`${styles.category} ${activeCategory === 'shorts' ? styles.activeCategory : ''}`} 
              onClick={() => handleCategoryClick('shorts')}
            >
              <Zap size={16} /> Shorts
            </div>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className={styles.layout}>
        <div className={styles.mainCol}>

          {/* FEATURED CARD */}
          {activeCategory === 'all' && searchQuery === '' && featuredPost && (
            <div className={styles.featuredCard} onClick={() => openArticle(featuredPost)}>
              <div className={styles.fcThumb}>
                <div className={styles.fcThumbGlow}></div>
                <div className={styles.fcThumbInner}>
                  <span className={styles.fcEmoji}>{featuredPost.emoji}</span>
                  <div className={styles.fcThumbLabel}>Featured Article</div>
                </div>
              </div>
              <div className={styles.fcBody}>
                <div className={styles.fcMeta}>
                  <div className={`${styles.fcTag} ${featuredPost.tagClass}`}>
                    {featuredPost.categoryLabel}
                  </div>
                  <div className={styles.fcDate}>{featuredPost.date}</div>
                  <div className={styles.fcFeaturedBadge}><Star size={20} /> Editor's Pick</div>
                </div>
                <div className={styles.fcTitle}>{featuredPost.title}</div>
                <div className={styles.fcExcerpt}>{featuredPost.excerpt}</div>
                <div className={styles.fcFooter}>
                  <div className={styles.author}>
                    <div className={styles.authorAv}>{featuredPost.initials}</div>
                    <div>
                      <div className={styles.authorName}>{featuredPost.author}</div>
                      <div className={styles.authorRole}>{featuredPost.role}</div>
                    </div>
                  </div>
                  <div className={styles.readBtn}>Read article →</div>
                </div>
              </div>
            </div>
          )}

          {/* POSTS GRID */}
          <div className={styles.postsGrid}>
            {gridPosts.map((post) => (
              <div key={post.id} className={styles.postCard} onClick={() => openArticle(post)}>
                <div className={`${styles.postThumb} ${post.ptClass || styles.pt1}`}>
                  {post.emoji}
                </div>
                <div className={styles.postBody}>
                  <div className={styles.postMeta}>
                    <div className={`${styles.postTag} ${post.tagClass}`}>{post.categoryLabel}</div>
                    <div className={styles.postDate}>{post.date}</div>
                  </div>
                  <div className={styles.postTitle}>{post.title}</div>
                  <div className={styles.postExcerpt}>{post.excerpt}</div>
                  <div className={styles.postFooter}>
                    <div className={styles.postAuthor}>{post.author}</div>
                    <div className={styles.postRead}>{post.readTime}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
              No articles found matching your criteria. Try another search or filter.
            </div>
          )}

          {posts.length > 0 && (
            <div className={styles.loadMore}>
              <button className={styles.loadBtn} onClick={() => alert('All articles are loaded!')}>
                Load More Articles →
              </button>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          <div className={styles.nlCard}>
            <div className={styles.nlIcon}><MailOpen size={16} /></div>
            <div className={styles.nlTitle}>The Creator OS Weekly</div>
            <div className={styles.nlSub}>
              One email. Top YouTube automation strategy, AI tools, and growth tactics. Every Tuesday.
            </div>
            {emailSubscribed ? (
              <div style={{ color: 'var(--green)', fontSize: '13px', padding: '10px 0', fontWeight: 500 }}>
                <Check size={16} /> Success! Check your inbox to confirm subscription.
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input 
                  className={styles.nlInp} 
                  type="email" 
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className={styles.nlBtn}>Subscribe Free →</button>
              </form>
            )}
            <div className={styles.nlNote}>2,400+ creators · No spam ever</div>
          </div>

          <div className={styles.sbCard}>
            <div className={styles.sbTitle}><Flame size={16} /> Most Popular</div>
            <div className={styles.popularList}>
              {MOCK_POSTS.slice(0, 5).map((post, idx) => (
                <div key={post.id} className={styles.popItem} onClick={() => openArticle(post)}>
                  <div className={styles.popNum}>{(idx + 1).toString().padStart(2, '0')}</div>
                  <div className={styles.popInfo}>
                    <div className={styles.popTitle}>{post.title.split(':')[0]}</div>
                    <div className={styles.popMeta}>{post.readTime.split(' ')[0]} min · {post.reads}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sbCard}>
            <div className={styles.sbTitle}><Tag size={16} /> Browse Topics</div>
            <div className={styles.topicCloud}>
              {[
                'Faceless YouTube', 'RPM', 'AI Scripts', 'Retention', 'YouTube Shorts',
                'Automation', 'Thumbnails', 'SEO', 'Monetization', 'Workflow',
                'Competitor Research', 'Hook Writing', 'Content Calendar', 'Agency Model'
              ].map((topic) => (
                <div key={topic} className={styles.topicTag} onClick={() => setSearchQuery(topic)}>
                  {topic}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.toolsBanner}>
            <div className={styles.tbEmoji}><Rocket size={16} /></div>
            <div className={styles.tbTitle}>Try AutoTubeOS Free</div>
            <div className={styles.tbSub}>
              Put everything you read here into action — inside one AI-powered workspace.
            </div>
            <Link href="/auth" className={styles.tbBtn}>
              Start Free Trial →
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      {/* ARTICLE OVERLAY */}
      {selectedPost && (
        <div 
          className={`${styles.articleOverlay} ${styles.open}`} 
          ref={overlayRef} 
          onScroll={handleOverlayScroll}
        >
          <div className={styles.articleNav}>
            <button className={styles.backBtn} onClick={closeArticle}>
              ← Back to Blog
            </button>
            <div className={styles.aProgress}>
              <div className={styles.aProgressFill} style={{ width: progressWidth }}></div>
            </div>
          </div>
          <div className={styles.articleBody}>
            <div className={styles.aHeroThumb}>
              <div className={styles.aHeroGlow}></div>
              {selectedPost.emoji}
            </div>
            <div className={styles.aLabel}>
              {selectedPost.categoryLabel} · {selectedPost.readTime}
            </div>
            <h1 className={styles.aTitle}>{selectedPost.title}</h1>
            <div className={styles.aByline}>
              <div className={styles.aAv}>{selectedPost.initials}</div>
              <div>
                <div className={styles.aMetaName}>
                  {selectedPost.author} · {selectedPost.role}
                </div>
                <div className={styles.aMetaInfo}>
                  {selectedPost.date} · {selectedPost.reads}
                </div>
              </div>
              <div className={styles.aShare}>
                <div className={styles.shareBtn} title="Share" onClick={() => alert('Link copied to clipboard!')}><Link2 size={16} /></div>
                <div className={styles.shareBtn} title="Twitter" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}`)}>🐦</div>
                <div className={styles.shareBtn} title="Save" onClick={() => alert('Article saved!')}>🔖</div>
              </div>
            </div>

            <div 
              className={styles.aContent} 
              dangerouslySetInnerHTML={{ __html: selectedPost.content || '<p>Loading article content...</p>' }}
            />

            <div className={styles.aCta}>
              <h3>Put this into practice today.</h3>
              <p>
                AutoTubeOS gives you the exact system described in this article — topic finder, script generator, Shorts repurposer, and content calendar in one workspace.
              </p>
              <Link href="/auth" style={{ display: 'inline-block', textDecoration: 'none' }}>
                <button className={styles.aCtaBtn}>Try AutoTubeOS Free →</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
