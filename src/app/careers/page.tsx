'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/careers.module.css";

export default function Careers() {
  const [showToast, setShowToast] = useState(false);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.gridBg}></div>
        <div className={styles.hLabel}>We&apos;re Hiring</div>
        <h1 className={styles.hTitle}>
          Build the future of<br />YouTube automation.
        </h1>
        <p className={styles.hSub}>
          Small team, remote-first, bootstrapped & profitable. If building AI tools for creators excites you — we want to talk.
        </p>
      </div>

      {/* CULTURE */}
      <div style={{ padding: "0 6% 60px", maxWidth: "1000px", margin: "0 auto" }}>
        <div className={styles.cultureGrid}>
          <div className={styles.cc}>
            <div className={styles.ccIcon}>🌍</div>
            <div className={styles.ccTitle}>Remote-first, always</div>
            <p className={styles.ccDesc}>
              Work from anywhere. Our team spans Lahore, London, and Manila. We care about what you ship, not where you sit.
            </p>
          </div>
          <div className={styles.cc}>
            <div className={styles.ccIcon}>🏃</div>
            <div className={styles.ccTitle}>Move fast, ship often</div>
            <p className={styles.ccDesc}>
              We ship weekly. No 6-month roadmaps. You&apos;ll see your work used by real creators within days of writing it.
            </p>
          </div>
          <div className={styles.cc}>
            <div className={styles.ccIcon}>🎯</div>
            <div className={styles.ccTitle}>Outcome-driven</div>
            <p className={styles.ccDesc}>
              We measure results, not hours. Own your work, set your schedule, and make an actual dent in what you&apos;re building.
            </p>
          </div>
          <div className={styles.cc}>
            <div className={styles.ccIcon}>📈</div>
            <div className={styles.ccTitle}>Bootstrapped & profitable</div>
            <p className={styles.ccDesc}>
              No investor pressure. We grow at the pace the product deserves — decisions made by the team, not a board.
            </p>
          </div>
          <div className={styles.cc}>
            <div className={styles.ccIcon}>🛠️</div>
            <div className={styles.ccTitle}>Makers over managers</div>
            <p className={styles.ccDesc}>
              Small team means everyone builds. No committees, no endless meetings. 80% of your time making things.
            </p>
          </div>
          <div className={styles.cc}>
            <div className={styles.ccIcon}>🤖</div>
            <div className={styles.ccTitle}>AI-native by default</div>
            <p className={styles.ccDesc}>
              We use AI in our own workflow to build AI tools. If you love experimenting with LLMs, you&apos;ll fit right in.
            </p>
          </div>
        </div>
      </div>

      {/* PERKS */}
      <div className={styles.perksSection}>
        <div className={styles.secTitle}>Perks & Benefits</div>
        <div className={styles.perksGrid}>
          <div className={styles.perk}>
            <div className={styles.perkIcon}>💰</div>
            <div className={styles.perkTitle}>Competitive salary</div>
            <p className={styles.perkDesc}>Market-rate pay — no &quot;startup discount.&quot;</p>
          </div>
          <div className={styles.perk}>
            <div className={styles.perkIcon}>🌴</div>
            <div className={styles.perkTitle}>Unlimited PTO</div>
            <p className={styles.perkDesc}>Take time off when you need it.</p>
          </div>
          <div className={styles.perk}>
            <div className={styles.perkIcon}>💻</div>
            <div className={styles.perkTitle}>$1,500 setup budget</div>
            <p className={styles.perkDesc}>For your home office setup.</p>
          </div>
          <div className={styles.perk}>
            <div className={styles.perkIcon}>📚</div>
            <div className={styles.perkTitle}>$500 learning budget</div>
            <p className={styles.perkDesc}>Courses, books, conferences.</p>
          </div>
          <div className={styles.perk}>
            <div className={styles.perkIcon}>🏥</div>
            <div className={styles.perkTitle}>Health coverage</div>
            <p className={styles.perkDesc}>Full medical or stipend.</p>
          </div>
          <div className={styles.perk}>
            <div className={styles.perkIcon}>🚀</div>
            <div className={styles.perkTitle}>Equity</div>
            <p className={styles.perkDesc}>Early team gets meaningful equity.</p>
          </div>
          <div className={styles.perk}>
            <div className={styles.perkIcon}>🤝</div>
            <div className={styles.perkTitle}>Annual retreat</div>
            <p className={styles.perkDesc}>Full team meets once a year — on us.</p>
          </div>
          <div className={styles.perk}>
            <div className={styles.perkIcon}>🎯</div>
            <div className={styles.perkTitle}>Free Pro access</div>
            <p className={styles.perkDesc}>AutoTubeOS Pro forever.</p>
          </div>
        </div>
      </div>

      {/* OPEN POSITIONS */}
      <div className={styles.jobsSection}>
        <div className={styles.secTitle} style={{ textAlign: "left", marginBottom: "20px" }}>
          Open Positions (3)
        </div>

        <div className={styles.jobCard}>
          <div className={styles.jobHeader}>
            <div className={styles.jobTitle}>Senior Full-Stack Engineer</div>
            <div style={{ display: "flex", gap: "6px" }}>
              <span className={`${styles.jtag} ${styles.tagRemote}`}>Remote</span>
              <span className={`${styles.jtag} ${styles.tagFull}`}>Full-time</span>
            </div>
          </div>
          <div className={styles.jobMeta}>
            <span>🏢 Engineering</span>
            <span>💰 $80K–$120K</span>
            <span>📍 Anywhere</span>
          </div>
          <p className={styles.jobDesc}>
            Build core AutoTubeOS platform — Next.js frontend, Node/FastAPI backend, and AI integration layer. Own features from idea to production.
          </p>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", justifyContent: "space-between" }}>
            <div>
              <span className={styles.jskill}>Next.js</span>
              <span className={styles.jskill}>TypeScript</span>
              <span className={styles.jskill}>PostgreSQL</span>
              <span className={styles.jskill}>AI APIs</span>
            </div>
            <button className={styles.applyBtn} onClick={triggerToast}>
              Apply Now →
            </button>
          </div>
        </div>

        <div className={styles.jobCard}>
          <div className={styles.jobHeader}>
            <div className={styles.jobTitle}>AI/ML Engineer</div>
            <div style={{ display: "flex", gap: "6px" }}>
              <span className={`${styles.jtag} ${styles.tagRemote}`}>Remote</span>
              <span className={`${styles.jtag} ${styles.tagFull}`}>Full-time</span>
            </div>
          </div>
          <div className={styles.jobMeta}>
            <span>🤖 AI</span>
            <span>💰 $90K–$130K</span>
            <span>📍 Anywhere</span>
          </div>
          <p className={styles.jobDesc}>
            Own our AI pipeline — prompt engineering to fine-tuning models for YouTube script generation. Work with Groq, Gemini, Anthropic.
          </p>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", justifyContent: "space-between" }}>
            <div>
              <span className={styles.jskill}>Python</span>
              <span className={styles.jskill}>LLMs</span>
              <span className={styles.jskill}>Fine-tuning</span>
              <span className={styles.jskill}>FastAPI</span>
            </div>
            <button className={styles.applyBtn} onClick={triggerToast}>
              Apply Now →
            </button>
          </div>
        </div>

        <div className={styles.jobCard}>
          <div className={styles.jobHeader}>
            <div className={styles.jobTitle}>Head of Growth & Marketing</div>
            <div style={{ display: "flex", gap: "6px" }}>
              <span className={`${styles.jtag} ${styles.tagRemote}`}>Remote</span>
              <span className={`${styles.jtag} ${styles.tagFull}`}>Full-time</span>
            </div>
          </div>
          <div className={styles.jobMeta}>
            <span>📈 Marketing</span>
            <span>💰 $60K–$90K</span>
            <span>📍 Anywhere</span>
          </div>
          <p className={styles.jobDesc}>
            Own our entire go-to-market — content, SEO, affiliate program, paid acquisition. Must understand the YouTube creator world deeply.
          </p>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", justifyContent: "space-between" }}>
            <div>
              <span className={styles.jskill}>SEO</span>
              <span className={styles.jskill}>Content</span>
              <span className={styles.jskill}>Paid Ads</span>
              <span className={styles.jskill}>YouTube</span>
            </div>
            <button className={styles.applyBtn} onClick={triggerToast}>
              Apply Now →
            </button>
          </div>
        </div>

        <div className={styles.openApp}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>📬</div>
          <div style={{ fontFamily: "var(--font-head)", fontSize: "1rem", fontWeight: 700, marginBottom: "6px" }}>
            Don&apos;t see the right role?
          </div>
          <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "14px" }}>
            Send us your story and what you&apos;d build at AutoTubeOS.
          </div>
          <button className={styles.applyBtn} style={{ float: "none" }} onClick={triggerToast}>
            Send Open Application →
          </button>
        </div>
      </div>

      <Footer />

      {/* TOAST */}
      <div className={`${styles.toast} ${showToast ? styles.show : ""}`}>
        ✓ Opening application...
      </div>
    </>
  );
}
