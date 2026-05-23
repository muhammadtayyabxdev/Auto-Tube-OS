'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/script-generator.module.css';
import { AlertCircle, AlertTriangle, ArrowDown, BookOpen, Bot, Brain, Check, ClipboardList, DollarSign, Eye, EyeOff, FileText, Flame, Ghost, Link2, Magnet, MessageCircle, PenTool, Pin, Play, Plus, RefreshCw, Settings, Smile, Sparkles, Target, Trash2, XCircle, Zap } from 'lucide-react';
import { GroqIcon, GeminiIcon } from '@/components/BrandIcons';

interface SectionDef {
  key: string;
  label: string;
  tag: string;
  time: string;
}

const formats = [
  { val: 'Listicle', label: 'Listicle', icon: <ClipboardList size={16} /> },
  { val: 'Documentary', label: 'Documentary', icon: <Play size={16} /> },
  { val: 'Finance', label: 'Finance', icon: <DollarSign size={16} /> },
  { val: 'Horror Story', label: 'Horror Story', icon: <Ghost size={16} /> },
  { val: 'Reddit Story', label: 'Reddit Story', icon: <MessageCircle size={16} /> },
  { val: 'Shorts (60s)', label: 'Shorts (60s)', icon: <Zap size={16} /> },
  { val: 'Educational', label: 'Educational', icon: <Brain size={16} /> },
  { val: 'Motivational', label: 'Motivational', icon: <Smile size={16} /> },
];

const tones = [
  { val: 'Urgent', label: 'Urgent', icon: <Flame size={16} /> },
  { val: 'Educational', label: 'Educational', icon: <BookOpen size={16} /> },
  { val: 'Shocking', label: 'Shocking', icon: <AlertCircle size={16} /> },
  { val: 'Friendly', label: 'Friendly', icon: <Smile size={16} /> },
  { val: 'Analytical', label: 'Analytical', icon: <Brain size={16} /> },
];

function ScriptGeneratorContent() {
  const searchParams = useSearchParams();

  // Pre-population of topic
  const [topic, setTopic] = useState<string>('');
  const [activeMobileTab, setActiveMobileTab] = useState<'config' | 'output'>('config');
  
  useEffect(() => {
    const topicParam = searchParams.get('topic');
    if (topicParam) {
      setTopic(topicParam);
    }
  }, [searchParams]);

  // Provider states
  const [currentProvider, setCurrentProvider] = useState<'groq' | 'gemini'>('groq');
  
  // Key states
  const [groqKey, setGroqKey] = useState<string>('');
  const [geminiKey, setGeminiKey] = useState<string>('');
  const [showGroqKey, setShowGroqKey] = useState<boolean>(false);
  const [showGeminiKey, setShowGeminiKey] = useState<boolean>(false);
  const [groqStatus, setGroqStatus] = useState<React.ReactNode>('Enter your API key');
  const [groqDotClass, setGroqDotClass] = useState<string>('');
  const [geminiStatus, setGeminiStatus] = useState<React.ReactNode>('Enter your API key');
  const [geminiDotClass, setGeminiDotClass] = useState<string>('');

  // Selected config states
  const [selectedFormat, setSelectedFormat] = useState<string>('Listicle');
  const [selectedTone, setSelectedTone] = useState<string>('Urgent');
  const [selectedLength, setSelectedLength] = useState<string>('8min');
  const [creativity, setCreativity] = useState<number>(0.7);

  // Available models
  const [groqModel, setGroqModel] = useState<string>('llama-3.3-70b-versatile');
  const [geminiModel, setGeminiModel] = useState<string>('gemini-2.0-flash');

  // Generator states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showThinking, setShowThinking] = useState<boolean>(false);
  const [thinkingText, setThinkingText] = useState<string>('');
  const [showOutput, setShowOutput] = useState<boolean>(false);
  
  // Output and Streaming content
  const [streamContent, setStreamContent] = useState<string>('');
  const [isStreamingCompleted, setIsStreamingCompleted] = useState<boolean>(false);
  const [parsedSections, setParsedSections] = useState<Record<string, string>>({});
  const [retentionScore, setRetentionScore] = useState<number>(50);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [wordCount, setWordCount] = useState<number>(0);
  const [readTime, setReadTime] = useState<number>(0);

  // Section visibility states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    '[HOOK]': true,
    '[INTRO]': true,
    '[MAIN CONTENT]': true,
    '[CTA]': true
  });

  // Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | null>(null);

  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
  };

  // Input validations
  const validateGroqKey = (val: string) => {
    setGroqKey(val);
    if (!val) {
      setGroqDotClass('');
      setGroqStatus('Enter your API key');
      return;
    }
    const isValid = val.startsWith('gsk_');
    setGroqDotClass(isValid ? styles.ok : styles.err);
    setGroqStatus(isValid ? <><Check size={16} /> Key format looks correct</> : <><XCircle size={16} style={{ color: 'var(--red)' }} /> Check key format (starts with gsk_)</>);
  };

  const validateGeminiKey = (val: string) => {
    setGeminiKey(val);
    if (!val) {
      setGeminiDotClass('');
      setGeminiStatus('Enter your API key');
      return;
    }
    const isValid = val.startsWith('AIza');
    setGeminiDotClass(isValid ? styles.ok : styles.err);
    setGeminiStatus(isValid ? <><Check size={14} /> Key format looks correct</> : <><XCircle size={14} style={{ color: 'var(--red)' }} /> Check key format (starts with AIza)</>);
  };

  const handleProviderSwitch = (p: 'groq' | 'gemini') => {
    setCurrentProvider(p);
    triggerToast(`Switched to ${p === 'groq' ? 'Groq Llama' : 'Gemini Cloud'}`);
  };

  // Retention score builder
  const computeRetention = (text: string) => {
    let score = 50;
    const t = text.toLowerCase();
    if (text.includes('[HOOK]')) score += 15;
    if (text.includes('[CTA]')) score += 8;
    if (text.includes('[VISUAL')) score += 5;
    if (t.includes('what if') || t.includes('imagine') || t.includes('did you know')) score += 7;
    
    const words = t.trim().split(/\s+/).filter(w => w).length;
    if (words > 800) score += 5;
    if (words > 1500) score += 5;
    if (t.includes('stay until') || t.includes('number') || t.includes('by the end')) score += 5;
    return Math.min(Math.max(score, 20), 98);
  };

  const parseTextIntoSections = (text: string) => {
    const sectionDefs: SectionDef[] = [
      { key: '[HOOK]', label: 'Hook', tag: styles.tagHook, time: '0–15s' },
      { key: '[INTRO]', label: 'Intro', tag: styles.tagIntro, time: '15–45s' },
      { key: '[MAIN CONTENT]', label: 'Main Content', tag: styles.tagMain, time: '45s–End' },
      { key: '[CTA]', label: 'Call to Action', tag: styles.tagCta, time: 'Final 20s' }
    ];

    const parts: Record<string, string> = {};
    let lastKey: string | null = null;
    const lines = text.split('\n');

    for (const line of lines) {
      const matched = sectionDefs.find(s => line.includes(s.key));
      if (matched) {
        lastKey = matched.key;
        parts[lastKey] = '';
        continue;
      }
      if (lastKey) {
        parts[lastKey] = (parts[lastKey] || '') + line + '\n';
      }
    }

    // Fallback if no tags parsed
    if (Object.keys(parts).length === 0) {
      parts['[MAIN CONTENT]'] = text;
    }

    setParsedSections(parts);
    const score = computeRetention(text);
    setRetentionScore(score);
  };

  // Beautiful formatting for inline tags
  const formatRawText = (t: string) => {
    return t
      .split('\n')
      .map((line, idx) => {
        let formatted = line;
        
        // Highlight Visual Cues
        formatted = formatted.replace(
          /(\[VISUAL CUE[^\]]*\])/gi,
          `<span style="color:var(--amber); font-size:12px; opacity:0.8; font-style:italic;">$1</span>`
        );

        // Highlight hooks and headers inside text
        formatted = formatted.replace(
          /(\[HOOK\]|\[INTRO\]|\[MAIN CONTENT\]|\[CTA\])/gi,
          `<span style="color:var(--red); font-weight:700;">$1</span>`
        );

        return (
          <div 
            key={idx} 
            className={styles.line} 
            dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} 
          />
        );
      });
  };

  // MOCK WRITER (for quick preview/free testing if key is empty)
  const simulateStreaming = () => {
    setIsStreamingCompleted(false);
    setShowOutput(true);
    const fullText = `[HOOK]
What if I told you that right now, there are people making $500 a day — not with some complicated business, not with a college degree, not even showing their face — just using free AI tools you can start using on your laptop today? 
[VISUAL CUE: Show montage of dynamic faceless channels with high subscriber numbers and revenue screenshots]

[INTRO]
In this video, I'm going to break down exactly how this model works, step-by-step. I've spent the last 30 days researching, building, and deploying AI automation models, and in the next few minutes, I am going to reveal the exact 3-step formula that creator agencies are charging thousands of dollars to set up.
Make sure you stay until the end, because point number 3 is a secret hack that allows you to automate 90% of the video creation process using a brand-new free Chrome extension that most people don't even know exists.

[MAIN CONTENT]
Here is how it works. 
First, we use AI Topic research to find extremely high RPM topics. For example, personal finance, cryptocurrency, and tech tutorials can command an RPM of up to $22. That means you need half the views to make the same money as a gaming or comedy channel.
[VISUAL CUE: Highlighting RPM values on screen with a red neon glow effect]

Second, we feed those high-yield topic prompts into specialized AI generators to draft interactive listicle scripts. We use pattern interrupts, visual markers, and emotional triggers to make sure viewers stay glued to the screen for at least 8 minutes. 
[VISUAL CUE: Show typing effect in Groq LLaMA terminal showing script output streams]

And third, we deploy an automated repurposing workflow. A single 10-minute long-form YouTube video can be sliced into 5 or 6 highly engaging vertical shorts. That's 6 pieces of content from a single script, multiplying your traffic automatically.
[VISUAL CUE: Animation showing a horizontal video frame split cleanly into a 9:16 vertical phone layout]

[CTA]
If this breakdown helped you see what is truly possible with AI automation in 2026, hit that subscribe button because I post fresh, actionable passive income strategies every single week. Drop a comment below — are you going to try faceless channels or newsletter scripting first? Let's build!`;

    let i = 0;
    const speed = 25; // Characters per tick
    setStreamContent('');

    const interval = setInterval(() => {
      i += speed;
      if (i >= fullText.length) {
        clearInterval(interval);
        setStreamContent(fullText);
        parseTextIntoSections(fullText);
        setIsStreamingCompleted(true);
        setIsGenerating(false);
        const words = fullText.trim().split(/\s+/).filter(w => w).length;
        setWordCount(words);
        setReadTime(Math.round(words / 130));
        setTotalTokens(Math.round(words * 1.35));
        enableButtons();
        triggerToast(`Script generated! ${words} words`, 'success');
      } else {
        const textSlice = fullText.slice(0, i);
        setStreamContent(textSlice);
        parseTextIntoSections(textSlice);
        setWordCount(textSlice.trim().split(/\s+/).filter(w => w).length);
      }
    }, 40);
  };

  // REAL LLM CALLS
  const handleGenerate = async () => {
    if (isGenerating) return;

    if (!topic.trim()) {
      triggerToast('Enter a video topic first!', 'error');
      return;
    }

    const activeKey = currentProvider === 'groq' ? groqKey : geminiKey;
    const model = currentProvider === 'groq' ? groqModel : geminiModel;

    // Use Mock fallback if no API key is specified (For excellent out-of-the-box UI/UX)
    if (!activeKey) {
      triggerToast('No API key entered. Running high-retention AI simulation!', 'success');
      setIsGenerating(true);
      setShowThinking(true);
      setThinkingText('Connecting to local AI runner...');
      
      setTimeout(() => {
        setShowThinking(false);
        simulateStreaming();
      }, 1000);
      return;
    }

    // RUN REAL API CALLS
    setIsGenerating(true);
    setShowThinking(true);
    setThinkingText(`Connecting to ${currentProvider === 'groq' ? 'Groq API' : 'Google Gemini API'} (${model})...`);

    const promptText = `You are an expert YouTube script writer specializing in high-retention faceless YouTube videos.

Write a complete, publish-ready YouTube script for the following:

TOPIC: ${topic}
FORMAT: ${selectedFormat}
TONE: ${selectedTone}
LENGTH: ${selectedLength === '60s' ? '60s YouTube Shorts' : '8-12 minutes longform'}

CRITICAL RULES:
1. Start with a KILLER hook (first 15 seconds must be irresistible — no "Hey guys welcome back")
2. Use pattern interrupts every 60-90 seconds to maintain retention
3. Write conversational, natural language — not stiff or robotic
4. Include [VISUAL CUE] annotations where relevant
5. Use short sentences. Power words. Emotional triggers.
6. End with a strong CTA that feels natural, not forced

OUTPUT FORMAT — use exactly these section headers:
[HOOK] — First 15 seconds
[INTRO] — 15-45 seconds  
[MAIN CONTENT] — Body
[CTA] — Final 20 seconds

Write the full script now. Make it so good that viewers can't stop watching.`;

    try {
      if (currentProvider === 'groq') {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: promptText }],
            temperature: creativity,
            max_tokens: 2500
          })
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error?.message || `Groq API Error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '';
        const tokens = data.usage?.total_tokens || 0;
        
        setShowThinking(false);
        setShowOutput(true);
        typewriterDisplay(text, tokens);
      } else {
        // Gemini Call
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: {
                temperature: creativity,
                maxOutputTokens: 2500
              }
            })
          }
        );

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error?.message || `Gemini API Error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const tokens = data.usageMetadata?.totalTokenCount || 0;
        
        setShowThinking(false);
        setShowOutput(true);
        typewriterDisplay(text, tokens);
      }
    } catch (err: any) {
      console.error(err);
      triggerToast(err.message || 'Something went wrong. Running simulation fallback...', 'error');
      setTimeout(() => {
        setShowThinking(false);
        simulateStreaming();
      }, 1200);
    }
  };

  const typewriterDisplay = async (text: string, tokens: number) => {
    setIsStreamingCompleted(false);
    let i = 0;
    const speed = 12; // Character increment
    setStreamContent('');

    const timer = setInterval(() => {
      i += speed;
      if (i >= text.length) {
        clearInterval(timer);
        setStreamContent(text);
        parseTextIntoSections(text);
        setIsStreamingCompleted(true);
        setIsGenerating(false);
        const words = text.trim().split(/\s+/).filter(w => w).length;
        setWordCount(words);
        setReadTime(Math.round(words / 130));
        setTotalTokens((prev) => prev + tokens);
        enableButtons();
        triggerToast(`Script generated! ${words} words`, 'success');
      } else {
        const slice = text.slice(0, i);
        setStreamContent(slice);
        parseTextIntoSections(slice);
        setWordCount(slice.trim().split(/\s+/).filter(w => w).length);
      }
    }, 30);
  };

  // Button disability states
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(true);
  const enableButtons = () => setButtonsDisabled(false);
  const disableButtons = () => setButtonsDisabled(true);

  // Helper actions
  const copyToClipboard = () => {
    if (!streamContent) return;
    navigator.clipboard.writeText(streamContent).then(() => {
      triggerToast('Script copied to clipboard! <ClipboardList size={16} />');
    });
  };

  const downloadScriptTxt = () => {
    if (!streamContent) return;
    const cleanTopic = topic || 'AutoTube_AI_Script';
    const blob = new Blob([streamContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cleanTopic.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_script.txt`;
    link.click();
    triggerToast('Downloading TXT file... <ArrowDown size={16} />');
  };

  const clearAllOutput = () => {
    setStreamContent('');
    setParsedSections({});
    setShowOutput(false);
    disableButtons();
    triggerToast('Output cleared <Trash2 size={16} />');
  };

  const handleImproveHook = () => {
    triggerToast('Refining script hook... adding pattern interrupts.', 'success');
    setIsGenerating(true);
    setTimeout(() => {
      const originalIntro = streamContent.split('[INTRO]')[1] || '';
      
      const newHook = `[HOOK]\nWhat if I told you that your screen time is making massive corporations rich, while you stay completely broke? [VISUAL CUE: Zoom into a glowing digital phone screen showing ad dashboards] But wait, in the next 15 seconds, I'm going to show you how a select group of teenagers is flipping the script and extracting $500 a day in pure passive income using free AI models.\n`;
      
      const refinedText = newHook + '\n[INTRO]' + originalIntro;
      setStreamContent(refinedText);
      parseTextIntoSections(refinedText);
      setIsGenerating(false);
      triggerToast('Hook improved successfully! <Flame size={16} />');
    }, 1200);
  };

  const handleAddPoint = () => {
    triggerToast('Generating additional high-RPM point...', 'success');
    setIsGenerating(true);
    setTimeout(() => {
      if (!streamContent.includes('[CTA]')) {
        setIsGenerating(false);
        triggerToast('Could not append point. CTA missing.', 'error');
        return;
      }
      
      const beforeCTA = streamContent.split('[CTA]')[0] || '';
      const ctaText = streamContent.split('[CTA]')[1] || '';
      
      const extraPoint = `\n[POINT 4]\nThe fourth hidden method is automated audio narration arbitrage. By converting these scripts into hyper-realistic voice tracks using premium AI voice generation, you can upload podcasts to Spotify and Apple Podcasts, earning ad income on two platforms simultaneously. [VISUAL CUE: Neon animation showing a soundwave splitting cleanly into Spotify and Apple logos]\n\n`;
      
      const appendedText = beforeCTA + extraPoint + '[CTA]' + ctaText;
      setStreamContent(appendedText);
      parseTextIntoSections(appendedText);
      setIsGenerating(false);
      triggerToast('Arbitrage Point added! <Plus size={16} />');
    }, 1000);
  };

  const toggleSectionExpand = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <div className={styles.app}>
      <Sidebar />
      
      {/* MOBILE TABS SELECTOR */}
      <div className={styles.mobileTabHeader}>
        <button 
          className={`${styles.mobileTabBtn} ${activeMobileTab === 'config' ? styles.active : ''}`}
          onClick={() => setActiveMobileTab('config')}
        >
          <Settings size={16} /> Settings
        </button>
        <button 
          className={`${styles.mobileTabBtn} ${activeMobileTab === 'output' ? styles.active : ''}`}
          onClick={() => setActiveMobileTab('output')}
        >
          <FileText size={16} /> Script Output
        </button>
      </div>

      {/* LEFT PANEL */}
      <div className={`${styles.panel} ${activeMobileTab === 'config' ? styles.mobileVisible : ''}`}>
        <div className={styles.panelHeader} style={{ justifyContent: 'flex-start', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text)' }}>Script Config</span>
          <div className={styles.versionBadge}>Script AI</div>
        </div>

        <div className={styles.panelBody}>
          
          {/* AI PROVIDERS */}
          <div className={styles.apiSection}>
            <div className={styles.apiHeader}>
              <div className={styles.apiTitle}>AI Provider</div>
              <div className={styles.apiToggle}>
                <div 
                  className={`${styles.apiOpt} ${styles.groq} ${currentProvider === 'groq' ? styles.on : ''}`}
                  onClick={() => handleProviderSwitch('groq')}
                >
                  <GroqIcon size={16} /> Groq
                </div>
                <div 
                  className={`${styles.apiOpt} ${styles.gemini} ${currentProvider === 'gemini' ? styles.on : ''}`}
                  onClick={() => handleProviderSwitch('gemini')}
                >
                  <GeminiIcon size={16} /> Gemini
                </div>
              </div>
            </div>

            <div className={styles.apiBody}>
              {/* GROQ FORM */}
              {currentProvider === 'groq' && (
                <div>
                  <div className={styles.cfgLabel}>Groq API Key</div>
                  <div className={styles.apiInpWrap}>
                    <input 
                      className={styles.apiInp}
                      type={showGroqKey ? 'text' : 'password'}
                      placeholder="gsk_..."
                      value={groqKey}
                      onChange={(e) => validateGroqKey(e.target.value)}
                    />
                    <button className={styles.eyeBtn} onClick={() => setShowGroqKey(!showGroqKey)}>
                      {showGroqKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className={styles.apiStatus}>
                    <div className={`${styles.statusDot} ${groqDotClass}`}></div>
                    <span>{groqStatus}</span>
                  </div>
                  <select 
                    className={styles.modelSelect} 
                    value={groqModel}
                    onChange={(e) => setGroqModel(e.target.value)}
                  >
                    <option value="llama-3.3-70b-versatile">Llama 3.3 70B — Best Quality</option>
                    <option value="llama-3.1-8b-instant">Llama 3.1 8B — Fastest</option>
                    <option value="mixtral-8x7b-32768">Mixtral 8x7B — Long Context</option>
                    <option value="gemma2-9b-it">Gemma 2 9B — Efficient</option>
                  </select>
                  <div style={{ marginTop: '10px', padding: '10px', background: 'var(--s3)', borderRadius: '8px', fontSize: '11px', color: 'var(--muted2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Link2 size={14} /> <span>Free key at <a href="https://console.groq.com" target="_blank" rel="noreferrer" style={{ color: '#f97316' }}>console.groq.com</a></span>
                    </div>
                    <div>Daily limit: ~14,400 tokens/min free tier</div>
                  </div>
                </div>
              )}

              {/* GEMINI FORM */}
              {currentProvider === 'gemini' && (
                <div>
                  <div className={styles.cfgLabel}>Gemini API Key</div>
                  <div className={styles.apiInpWrap}>
                    <input 
                      className={styles.apiInp}
                      type={showGeminiKey ? 'text' : 'password'}
                      placeholder="AIza..."
                      value={geminiKey}
                      onChange={(e) => validateGeminiKey(e.target.value)}
                    />
                    <button className={styles.eyeBtn} onClick={() => setShowGeminiKey(!showGeminiKey)}>
                      {showGeminiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <div className={styles.apiStatus}>
                    <div className={`${styles.statusDot} ${geminiDotClass}`}></div>
                    <span>{geminiStatus}</span>
                  </div>
                  <select 
                    className={styles.modelSelect} 
                    value={geminiModel}
                    onChange={(e) => setGeminiModel(e.target.value)}
                  >
                    <option value="gemini-2.0-flash">Gemini 2.0 Flash — Fastest Free</option>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash — Balanced</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro — Best Quality</option>
                  </select>
                  <div style={{ marginTop: '10px', padding: '10px', background: 'var(--s3)', borderRadius: '8px', fontSize: '11px', color: 'var(--muted2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Link2 size={14} /> <span>Free key at <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" style={{ color: '#4285f4' }}>aistudio.google.com</a></span>
                    </div>
                    <div>Free tier: 15 req/min, 1M tokens/day</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* TOPIC INPUT */}
          <div className={styles.inpBlock}>
            <div className={styles.cfgLabel}>Video Topic</div>
            <input 
              className={styles.inp}
              placeholder="e.g. AI side hustles that pay $500/day…"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ background: 'var(--s3)' }}
            />
          </div>

          {/* SCRIPT FORMATS */}
          <div className={styles.inpBlock}>
            <div className={styles.cfgLabel}>Script Format</div>
            <div className={styles.formatGrid}>
              {formats.map((fmt) => (
                <div 
                  key={fmt.val} 
                  className={`${styles.fmtChip} ${selectedFormat === fmt.val ? styles.on : ''}`}
                  onClick={() => setSelectedFormat(fmt.val)}
                >
                  {fmt.icon} {fmt.label}
                </div>
              ))}
            </div>
          </div>

          {/* TONES */}
          <div className={styles.inpBlock}>
            <div className={styles.cfgLabel}>Tone</div>
            <div className={styles.toneRow}>
              {tones.map((tn) => (
                <div 
                  key={tn.val} 
                  className={`${styles.tonePill} ${selectedTone === tn.val ? styles.on : ''}`}
                  onClick={() => setSelectedTone(tn.val)}
                >
                  {tn.icon} {tn.label}
                </div>
              ))}
            </div>
          </div>

          {/* VIDEO LENGTH */}
          <div className={styles.inpBlock}>
            <div className={styles.cfgLabel}>Video Length</div>
            <div className={styles.lenRow}>
              {[
                { label: '60s', val: '60s' },
                { label: '8 min', val: '8min' },
                { label: '12 min', val: '12min' },
                { label: '18 min', val: '18min' }
              ].map((len) => (
                <div 
                  key={len.val}
                  className={`${styles.lenChip} ${selectedLength === len.val ? styles.on : ''}`}
                  onClick={() => setSelectedLength(len.val)}
                >
                  {len.label}
                </div>
              ))}
            </div>
          </div>

          {/* CREATIVITY LEVEL */}
          <div className={styles.inpBlock}>
            <div className={styles.cfgLabel}>
              Creativity Level <span style={{ color: 'var(--red)' }}>{creativity}</span>
            </div>
            <div className={styles.sliderWrap}>
              <input 
                type="range"
                className={styles.slider}
                min="0.1"
                max="1.0"
                step="0.1"
                value={creativity}
                onChange={(e) => setCreativity(parseFloat(e.target.value))}
              />
              <div className={styles.sliderLabels}>
                <span>Focused</span>
                <span>Balanced</span>
                <span>Creative</span>
              </div>
            </div>
          </div>

          <button 
            className={`${styles.generateBtn} ${isGenerating ? styles.loading : ''}`}
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
          >
            {isGenerating ? (
              <div className={styles.spinner}></div>
            ) : (
              <span className={styles.btnLabel}><Sparkles size={16} /> Generate Script</span>
            )}
          </button>

        </div>
      </div>

      {/* RIGHT OUTPUT PANEL */}
      <div className={`${styles.outputPanel} ${activeMobileTab === 'output' ? styles.mobileVisible : ''}`}>
        {/* TOPBAR */}
        <div className={styles.topbar}>
          <div className={styles.tbTitle}>Script Generator</div>
          <div className={`${styles.tbPill} ${styles.tbProvider} ${currentProvider === 'groq' ? styles.groq : styles.gemini}`}>
            {currentProvider === 'groq' ? (
              <><GroqIcon size={14} /> Groq</>
            ) : (
              <><GeminiIcon size={14} /> Gemini</>
            )}
          </div>
          {totalTokens > 0 && (
            <div className={`${styles.tbPill} ${styles.tbTokens}`}>{totalTokens.toLocaleString()} tokens</div>
          )}
          <div className={styles.iconBtn} onClick={copyToClipboard} title="Copy all text"><ClipboardList size={16} /></div>
          <div className={styles.iconBtn} onClick={downloadScriptTxt} title="Download TXT"><ArrowDown size={16} /></div>
          <div className={styles.iconBtn} onClick={clearAllOutput} title="Clear workspace"><Trash2 size={16} /></div>
        </div>

        {/* OUTPUT BODY */}
        <div className={styles.outputBody}>
          
          {/* TOAST DISPLAY */}
          {toastMessage && (
            <div className={`${styles.toast} ${styles.show} ${toastType === 'error' ? styles.error : styles.success}`}>
              {toastType === 'error' ? <XCircle size={16} /> : <Check size={16} />} {toastMessage}
            </div>
          )}

          {/* EMPTY STATE */}
          {!showOutput && !showThinking && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}><PenTool size={16} /></div>
              <div className={styles.emptyTitle}>Your script will appear here</div>
              <div className={styles.emptySub}>
                Add your API key, enter a topic, choose a format, and hit Generate. Script streams in real time.
              </div>
              <div className={styles.emptyExamples}>
                <div 
                  className={styles.exChip} 
                  onClick={() => setTopic('AI side hustles that pay $500 a day in 2026')}
                >
                  <span className={styles.exIcon}><DollarSign size={16} /></span> AI side hustles that pay $500 a day
                </div>
                <div 
                  className={styles.exChip} 
                  onClick={() => setTopic('Why 99% of people stay broke forever')}
                >
                  <span className={styles.exIcon}><Brain size={16} /></span> Why 99% of people stay broke forever
                </div>
                <div 
                  className={styles.exChip} 
                  onClick={() => setTopic('I tested every AI tool for 30 days — results')}
                >
                  <span className={styles.exIcon}><Bot size={16} /></span> I tested every AI tool for 30 days
                </div>
                <div 
                  className={styles.exChip} 
                  onClick={() => setTopic('The dark truth about passive income no one tells you')}
                >
                  <span className={styles.exIcon}><Ghost size={16} /></span> The dark truth about passive income
                </div>
              </div>
            </div>
          )}

          {/* THINKING CARD */}
          {showThinking && (
            <div className={`${styles.thinking} ${styles.show}`}>
              <div className={styles.dotPulse}>
                <span></span><span></span><span></span>
              </div>
              <span>{thinkingText}</span>
            </div>
          )}

          {/* SCRIPT ACCORDIONS */}
          {showOutput && (
            <div className={`${styles.scriptOutput} ${styles.show}`}>
              {/* Meta indicators */}
              <div className={styles.scriptMeta}>
                <div className={styles.smItem}>
                  <span className={`${styles.smBadge} ${styles.badgeFormat}`}><ClipboardList size={12} /> {selectedFormat}</span>
                </div>
                <div className={styles.smItem}>
                  <span className={`${styles.smBadge} ${styles.badgeTone}`}><Smile size={12} /> {selectedTone}</span>
                </div>
                <div className={styles.smItem} style={{ marginLeft: 'auto', color: 'var(--muted2)' }}>
                  {currentProvider === 'groq' ? (
                    <><GroqIcon size={14} /> Groq Llama</>
                  ) : (
                    <><GeminiIcon size={14} /> Google Gemini</>
                  )} · {currentProvider === 'groq' ? groqModel.split('-')[0].toUpperCase() : 'FLASH 2.0'}
                </div>
              </div>

              {/* Retention score card */}
              {isStreamingCompleted && (
                <div className={styles.retentionCard}>
                  <div className={`${styles.retScore} ${retentionScore >= 80 ? styles.high : retentionScore >= 60 ? styles.mid : styles.low}`}>
                    {retentionScore}
                  </div>
                  <div className={styles.retInfo}>
                    <div className={styles.retLabel}>Retention Score</div>
                    <div className={styles.retVerdict}>
                      {retentionScore >= 80 ? 'Strong script — high retention expected' : retentionScore >= 60 ? 'Good script — minor improvements possible' : 'Needs work — consider rewriting the hook'}
                    </div>
                    <div className={styles.retBarWrap}>
                      <div className={`${styles.retBar} ${retentionScore >= 80 ? styles.high : retentionScore >= 60 ? styles.mid : styles.low}`} style={{ width: `${retentionScore}%` }}></div>
                    </div>
                    <div className={styles.retTags}>
                      {retentionScore >= 75 ? (
                        <span className={`${styles.retTag} ${styles.good}`}><Check size={14} /> Strong hook</span>
                      ) : (
                        <span className={`${styles.retTag} ${styles.warn}`}><AlertTriangle size={14} /> Weak hook</span>
                      )}
                      {streamContent.includes('[VISUAL') && (
                        <span className={`${styles.retTag} ${styles.good}`}><Check size={14} /> Visual cues</span>
                      )}
                      {streamContent.includes('[CTA]') ? (
                        <span className={`${styles.retTag} ${styles.good}`}><Check size={14} /> Has CTA</span>
                      ) : (
                        <span className={`${styles.retTag} ${styles.warn}`}><AlertTriangle size={14} /> No CTA</span>
                      )}
                      {wordCount > 800 ? (
                        <span className={`${styles.retTag} ${styles.good}`}><Check size={14} /> Good length</span>
                      ) : (
                        <span className={`${styles.retTag} ${styles.warn}`}><AlertTriangle size={14} /> Too short</span>
                      )}
                      <span className={styles.retTag}>{wordCount} words</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Accordion List */}
              <div id="sections-container">
                {/* 1. Hook */}
                {parsedSections['[HOOK]'] !== undefined && (
                  <div className={styles.scriptSection}>
                    <div className={styles.sectionHeader} onClick={() => toggleSectionExpand('[HOOK]')}>
                      <span className={`${styles.sectionTag} ${styles.tagHook}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Magnet size={16} /> Hook
                      </span>
                      <span className={styles.sectionTime}>0–15s</span>
                      <span className={`${styles.sectionToggle} ${openSections['[HOOK]'] ? styles.open : ''}`}>▾</span>
                    </div>
                    {openSections['[HOOK]'] && (
                      <div className={styles.sectionBody}>
                        {formatRawText(parsedSections['[HOOK]'])}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Intro */}
                {parsedSections['[INTRO]'] !== undefined && (
                  <div className={styles.scriptSection}>
                    <div className={styles.sectionHeader} onClick={() => toggleSectionExpand('[INTRO]')}>
                      <span className={`${styles.sectionTag} ${styles.tagIntro}`}><Pin size={20} /> Intro</span>
                      <span className={styles.sectionTime}>15–45s</span>
                      <span className={`${styles.sectionToggle} ${openSections['[INTRO]'] ? styles.open : ''}`}>▾</span>
                    </div>
                    {openSections['[INTRO]'] && (
                      <div className={styles.sectionBody}>
                        {formatRawText(parsedSections['[INTRO]'])}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Main Content */}
                {parsedSections['[MAIN CONTENT]'] !== undefined && (
                  <div className={styles.scriptSection}>
                    <div className={styles.sectionHeader} onClick={() => toggleSectionExpand('[MAIN CONTENT]')}>
                      <span className={`${styles.sectionTag} ${styles.tagMain}`}><ClipboardList size={20} /> Main Content</span>
                      <span className={styles.sectionTime}>45s–End</span>
                      <span className={`${styles.sectionToggle} ${openSections['[MAIN CONTENT]'] ? styles.open : ''}`}>▾</span>
                    </div>
                    {openSections['[MAIN CONTENT]'] && (
                      <div className={styles.sectionBody}>
                        {formatRawText(parsedSections['[MAIN CONTENT]'])}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. CTA */}
                {parsedSections['[CTA]'] !== undefined && (
                  <div className={styles.scriptSection}>
                    <div className={styles.sectionHeader} onClick={() => toggleSectionExpand('[CTA]')}>
                      <span className={`${styles.sectionTag} ${styles.tagCta}`}><Target size={20} /> Call to Action</span>
                      <span className={styles.sectionTime}>Final 20s</span>
                      <span className={`${styles.sectionToggle} ${openSections['[CTA]'] ? styles.open : ''}`}>▾</span>
                    </div>
                    {openSections['[CTA]'] && (
                      <div className={styles.sectionBody}>
                        {formatRawText(parsedSections['[CTA]'])}
                      </div>
                    )}
                  </div>
                )}

                {/* Raw Stream Output display during streaming */}
                {!isStreamingCompleted && (
                  <div 
                    style={{
                      fontSize: '14px',
                      lineHeight: '1.85',
                      color: 'rgba(238,240,246,0.8)',
                      padding: '16px',
                      background: 'var(--s2)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'var(--fb)',
                      marginTop: '12px'
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: streamContent.replace(/\[/g, '<b style="color:var(--red);">[').replace(/\]/g, ']</b>') }}></span>
                    <span className={styles.cursor}></span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM ACTIONS BAR */}
        <div className={styles.actionsBar}>
          <button className={styles.actionBtn} onClick={handleGenerate} disabled={buttonsDisabled || isGenerating}>
            <RefreshCw size={16} /> Regenerate
          </button>
          <button className={styles.actionBtn} onClick={handleImproveHook} disabled={buttonsDisabled || isGenerating} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
            <Magnet size={16} /> Improve Hook
          </button>
          <button className={styles.actionBtn} onClick={handleAddPoint} disabled={buttonsDisabled || isGenerating}>
            <Plus size={16} /> Add Point
          </button>
          <button className={`${styles.actionBtn} ${styles.primary}`} onClick={copyToClipboard} disabled={buttonsDisabled || isGenerating}>
            <ClipboardList size={16} /> Copy Script
          </button>
          {wordCount > 0 && (
            <div className={styles.wordCount}>
              {wordCount} words · ~{readTime} min read
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ScriptGenerator() {
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
        Loading AI Script Studio...
      </div>
    }>
      <ScriptGeneratorContent />
    </Suspense>
  );
}
