'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/chat-widget.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

interface HelpArticle {
  icon: string;
  title: string;
  readTime: string;
}

const INITIAL_ARTICLES: HelpArticle[] = [
  { icon: '🚀', title: 'Getting started with AutoTubeOS', readTime: '5 min read' },
  { icon: '🔑', title: 'How to add your Groq or Gemini API key', readTime: '2 min read' },
  { icon: '📺', title: 'Connecting your YouTube channel', readTime: '3 min read' },
  { icon: '💳', title: 'Billing, plans, and upgrades', readTime: '4 min read' },
  { icon: '⚡', title: 'Using the Shorts Repurposer', readTime: '3 min read' },
  { icon: '🤖', title: 'Setting up AI Agents (Beta)', readTime: '6 min read' },
  { icon: '🆕', title: 'v2.4.0 — AI Agents + Shorts 3.0', readTime: 'May 14, 2026' },
  { icon: '🆕', title: 'v2.3.0 — Team Collaboration', readTime: 'Apr 8, 2026' }
];

const AUTO_REPLIES = [
  "Great question! Let me help you with that 😊",
  "Sure thing! This is one of our most common questions.",
  "Happy to help! Here's what you need to know:",
  "Thanks for reaching out. Our team is looking into this right now.",
  "Absolutely! I can help you get that sorted quickly.",
];

const SPECIFIC_REPLIES: Record<string, string> = {
  'pricing': "Our plans start at $0 (free), $29/mo (Pro), and $99/mo (Agency). All include a 14-day free trial with no credit card needed. Which plan are you curious about?",
  'tech': "Sorry you're running into an issue! Could you tell me more about what's happening? Include your browser, what you were doing, and any error messages you see.",
  'start': "Getting started is easy! 1) Create your account 2) Pick your niche 3) Connect your YouTube channel 4) Run the Topic Finder. Takes about 5 minutes total. Would you like me to walk you through any of these steps?",
  'ai': "We support Groq (free tier, fastest) and Google Gemini (generous free tier, 1M tokens/day). Both work great for script generation. Want me to explain how to get your API key?",
  'pricing question': "Our plans start at $0 (free), $29/mo (Pro), and $99/mo (Agency). All include a 14-day free trial with no credit card needed. Which plan are you curious about?",
  'technical issue': "Sorry you're running into an issue! Could you tell me more about what's happening? Include your browser, what you were doing, and any error messages you see.",
  'how to get started?': "Getting started is easy! 1) Create your account 2) Pick your niche 3) Connect your YouTube channel 4) Run the Topic Finder. Takes about 5 minutes total. Would you like me to walk you through any of these steps?",
  'ai api question': "We support Groq (free tier, fastest) and Google Gemini (generous free tier, 1M tokens/day). Both work great for script generation. Want me to explain how to get your API key?",
};

export default function ChatWidgetDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'help' | 'contact'>('chat');
  const [hasBadge, setHasBadge] = useState(true);
  
  // Chatting State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      text: "Hey! 👋 I'm Ahmed, founder of AutoTubeOS. How can I help you today?",
      sender: 'support',
      time: 'Just now'
    },
    {
      id: 'init-2',
      text: "Feel free to ask about pricing, features, your account, or anything else. I personally read every message 🙂",
      sender: 'support',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  
  // Help Search State
  const [helpSearch, setHelpSearch] = useState('');
  const [articles, setArticles] = useState<HelpArticle[]>(INITIAL_ARTICLES);
  
  // Satisfaction State
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [rated, setRated] = useState(false);

  const msgAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of message area
  useEffect(() => {
    if (msgAreaRef.current) {
      msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Filter Help articles in real time
  useEffect(() => {
    if (helpSearch.trim() === '') {
      setArticles(INITIAL_ARTICLES);
    } else {
      const q = helpSearch.toLowerCase();
      setArticles(INITIAL_ARTICLES.filter(a => a.title.toLowerCase().includes(q)));
    }
  }, [helpSearch]);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasBadge(false);
    }
  };

  const handleTabClick = (tab: 'chat' | 'help' | 'contact') => {
    setActiveTab(tab);
  };

  const executeResponse = (userQuery: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Determine response content
      const q = userQuery.toLowerCase();
      let matchKey = '';
      if (q.includes('pricing')) matchKey = 'pricing';
      else if (q.includes('tech') || q.includes('bug') || q.includes('error')) matchKey = 'tech';
      else if (q.includes('start') || q.includes('how to')) matchKey = 'start';
      else if (q.includes('ai') || q.includes('api') || q.includes('gemini') || q.includes('groq')) matchKey = 'ai';

      const responseText = matchKey 
        ? SPECIFIC_REPLIES[matchKey] 
        : AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];

      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [
        ...prev,
        {
          id: `support-${Date.now()}`,
          text: responseText,
          sender: 'support',
          time: now
        }
      ]);
    }, 1500);
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;
    const text = inputText;
    setInputText('');
    setShowQuickReplies(false);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
      time: now
    };
    
    setMessages(prev => [...prev, userMsg]);
    executeResponse(text);
  };

  const handleQuickReply = (text: string) => {
    setShowQuickReplies(false);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      text: text,
      sender: 'user',
      time: now
    };
    setMessages(prev => [...prev, userMsg]);
    executeResponse(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleRating = (ratingIndex: number) => {
    setSelectedRating(ratingIndex);
    setRated(true);
  };

  return (
    <div className={styles.pageBg}>
      <div className={styles.gridBg}></div>
      <div className={styles.glow}></div>
      
      <div className={styles.pageContent}>
        <div className={styles.pageLogo}>AutoTube<span>OS</span></div>
        <h1 className={styles.pageTitle}>Live Chat Widget</h1>
        <p className={styles.pageSub}>
          A fully branded support widget with live chat, help articles, and contact options — no third-party tool needed. Click the button in the bottom right to try it.
        </p>
        <div className={styles.demoHint} onClick={toggleWidget} style={{ cursor: 'pointer' }}>
          Try the chat widget <span className={styles.arrow}>→</span>
        </div>
      </div>

      {/* ─── CHAT WIDGET PANEL & LAUNCHER ─── */}
      <div className={styles.chatWidget}>
        
        {/* PANEL */}
        <div className={`${styles.chatPanel} ${isOpen ? styles.openPanel : ''}`}>
          
          {/* HEADER */}
          <div className={styles.chatHeader}>
            <div className={styles.chTop}>
              <div className={styles.chBrand}>AutoTubeOS Support</div>
              <button className={styles.chClose} onClick={toggleWidget}>✕</button>
            </div>
            <div className={styles.chAgents}>
              <div className={styles.agentAv}>AK</div>
              <div className={styles.agentAv}>SR</div>
              <div className={styles.agentAv}>JL</div>
            </div>
            <div className={styles.chInfo}>
              <div className={styles.chTitle}>Hi there 👋</div>
              <div className={styles.chSub}>
                <span className={styles.onlineDot}></span>
                We're online · Usually reply in 2 min
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className={styles.chatTabs}>
            <div 
              className={`${styles.cTab} ${activeTab === 'chat' ? styles.on : ''}`}
              onClick={() => handleTabClick('chat')}
            >
              💬 Chat
            </div>
            <div 
              className={`${styles.cTab} ${activeTab === 'help' ? styles.on : ''}`}
              onClick={() => handleTabClick('help')}
            >
              📖 Help
            </div>
            <div 
              className={`${styles.cTab} ${activeTab === 'contact' ? styles.on : ''}`}
              onClick={() => handleTabClick('contact')}
            >
              📞 Contact
            </div>
          </div>

          {/* CHAT VIEW */}
          <div className={`${styles.chatView} ${activeTab === 'chat' ? styles.active : ''}`}>
            <div className={styles.msgArea} ref={msgAreaRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`${styles.msg} ${msg.sender === 'user' ? styles.user : ''}`}>
                  {msg.sender === 'support' && <div className={`${styles.msgAv} ${styles.support}`}>AK</div>}
                  <div>
                    <div className={`${styles.msgBubble} ${msg.sender === 'support' ? styles.supportBubble : ''}`}>
                      {msg.text}
                    </div>
                    <div className={styles.msgTime}>{msg.time}</div>
                  </div>
                  {msg.sender === 'user' && (
                    <div className={styles.msgAv} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                      You
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className={styles.msg}>
                  <div className={`${styles.msgAv} ${styles.support}`}>AK</div>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>

            {/* QUICK REPLIES */}
            {showQuickReplies && (
              <div className={styles.quickReplies}>
                <div className={styles.qrBtn} onClick={() => handleQuickReply('💳 Pricing question')}>💳 Pricing</div>
                <div className={styles.qrBtn} onClick={() => handleQuickReply('🔧 Technical issue')}>🔧 Tech issue</div>
                <div className={styles.qrBtn} onClick={() => handleQuickReply('🚀 How to get started?')}>🚀 Get started</div>
                <div className={styles.qrBtn} onClick={() => handleQuickReply('🤖 AI API question')}>🤖 AI question</div>
              </div>
            )}

            {/* INPUT */}
            <div className={styles.chatInputWrap}>
              <input 
                className={styles.chatInput} 
                placeholder="Type a message…" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className={styles.sendBtn} onClick={handleSend}>➤</button>
            </div>

            {/* SATISFACTION */}
            <div className={styles.satBar}>
              {rated ? (
                <div style={{ fontSize: '12px', color: 'var(--green)', padding: '4px 0' }}>
                  ✓ Thanks for your feedback!
                </div>
              ) : (
                <>
                  <div className={styles.satLabel}>Was this helpful?</div>
                  <div className={styles.satEmojis}>
                    <div className={`${styles.satEmoji} ${selectedRating === 0 ? styles.selected : ''}`} onClick={() => handleRating(0)}>😞</div>
                    <div className={`${styles.satEmoji} ${selectedRating === 1 ? styles.selected : ''}`} onClick={() => handleRating(1)}>😐</div>
                    <div className={`${styles.satEmoji} ${selectedRating === 2 ? styles.selected : ''}`} onClick={() => handleRating(2)}>😊</div>
                    <div className={`${styles.satEmoji} ${selectedRating === 3 ? styles.selected : ''}`} onClick={() => handleRating(3)}>🤩</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* HELP VIEW */}
          <div className={`${styles.chatView} ${activeTab === 'help' ? styles.active : ''}`}>
            <div className={styles.helpViewInner}>
              <input 
                className={styles.helpSearch} 
                placeholder="🔍 Search help articles…"
                value={helpSearch}
                onChange={(e) => setHelpSearch(e.target.value)}
              />
              <div className={styles.helpSectionTitle}>Articles</div>
              {articles.map((art, idx) => (
                <div key={idx} className={styles.helpArticle} onClick={() => alert(`Opening article: "${art.title}"`)}>
                  <div className={styles.haIcon}>{art.icon}</div>
                  <div>
                    <div className={styles.haTitle}>{art.title}</div>
                    <div className={styles.haSub}>{art.readTime}</div>
                  </div>
                  <div className={styles.haArrow}>›</div>
                </div>
              ))}
              {articles.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--muted2)', fontSize: '12px', padding: '20px 0' }}>
                  No articles match your search.
                </div>
              )}
            </div>
          </div>

          {/* CONTACT VIEW */}
          <div className={`${styles.chatView} ${activeTab === 'contact' ? styles.active : ''}`}>
            <div className={styles.contactViewInner}>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '14px', lineHeight: 1.6 }}>
                Choose how you want to reach us. We're a real team — no bots, no ticket queues.
              </div>
              <div className={styles.contactOption} onClick={() => setActiveTab('chat')}>
                <div className={styles.coIcon} style={{ background: 'var(--red-bg)' }}>💬</div>
                <div>
                  <div className={styles.coName}>Live Chat</div>
                  <div className={styles.coSub}>⚡ Usually reply in 2 minutes</div>
                </div>
                <div className={styles.coArrow}>›</div>
              </div>
              <div className={styles.contactOption} onClick={() => alert('Mail hello@autotubeos.com triggered!')}>
                <div className={styles.coIcon} style={{ background: 'var(--s4)' }}>📧</div>
                <div>
                  <div className={styles.coName}>Email</div>
                  <div className={styles.coSub}>hello@autotubeos.com · Reply in 2h</div>
                </div>
                <div className={styles.coArrow}>›</div>
              </div>
              <div className={styles.contactOption} onClick={() => window.open('https://twitter.com')}>
                <div className={styles.coIcon} style={{ background: 'rgba(29, 161, 242, 0.1)' }}>🐦</div>
                <div>
                  <div className={styles.coName}>Twitter / X</div>
                  <div className={styles.coSub}>@AutoTubeOS · DMs open</div>
                </div>
                <div className={styles.coArrow}>›</div>
              </div>
              <div className={styles.contactOption} onClick={() => alert('Discord Link clicked!')}>
                <div className={styles.coIcon} style={{ background: 'rgba(88, 101, 242, 0.1)' }}>💬</div>
                <div>
                  <div className={styles.coName}>Discord Community</div>
                  <div className={styles.coSub}>1,200+ creators · Very active</div>
                </div>
                <div className={styles.coArrow}>›</div>
              </div>
              <div style={{ padding: '14px', background: 'var(--s3)', border: '1px solid var(--border)', borderRadius: '10px', marginTop: '6px' }}>
                <div style={{ fontSize: '11px', color: 'var(--muted2)', marginBottom: '4px' }}>Support Hours</div>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>Mon – Fri · 9am – 6pm PKT</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Outside hours? We still check every few hours.</div>
              </div>
            </div>
          </div>

        </div>

        {/* LAUNCHER */}
        <button 
          className={`${styles.chatLauncher} ${isOpen ? styles.openLauncher : ''}`} 
          onClick={toggleWidget}
        >
          <span>{isOpen ? '✕' : '💬'}</span>
          {hasBadge && <div className={styles.notifBadge}>1</div>}
        </button>

      </div>
    </div>
  );
}
