import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/about.module.css";

export default function About() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.gridBg}></div>
        <div className={styles.glow}></div>
        <div className={styles.heroInner}>
          <div className={styles.hLabel}>Our Story</div>
          <h1 className={styles.hTitle}>
            Built by creators,<br />for creators.
          </h1>
          <p className={styles.hSub}>
            We got tired of switching between 8 tools just to publish one video. So we built the workspace we always wished existed.
          </p>
        </div>
      </div>

      {/* MISSION */}
      <div className={styles.mission}>
        <div className={styles.missionCard}>
          <div className={styles.mQuote}>
            &quot;We believe every creator deserves a <em>system</em> — not just a set of tools. Our mission is to make YouTube automation accessible, sustainable, and actually profitable.&quot;
          </div>
          <p className={styles.mSub}>
            AutoTubeOS exists so creators can spend their energy on strategy and creativity — not on juggling software, copy-pasting between tabs, or reinventing their workflow every week.
          </p>
        </div>
      </div>

      {/* STORY */}
      <div className={styles.story}>
        <div className={styles.storyText}>
          <div className={styles.sLabel}>How It Started</div>
          <h2>We were the customer first.</h2>
          <p>
            In 2024, our founder Ahmed was running three faceless YouTube channels while working full-time. He was using ChatGPT for scripts, Canva for thumbnails, Notion for planning, TubeBuddy for SEO, and ElevenLabs for voice — switching between apps dozens of times per video.
          </p>
          <p>
            After missing two upload days in a row due to workflow chaos, he started building a unified system. What started as a personal Notion + Zapier setup evolved into AutoTubeOS — now used by 1,200+ creators in 40+ countries.
          </p>
          <p>
            We&apos;re a small team obsessed with one problem: making the YouTube automation workflow as frictionless as possible.
          </p>
        </div>
        <div className={styles.storyVisual}>
          <div className={styles.storyStat}>
            <div className={styles.ssNum}>2024</div>
            <div className={styles.ssLbl}>
              <b>Founded</b>Lahore, Pakistan
            </div>
          </div>
          <div className={styles.storyStat}>
            <div className={styles.ssNum}>1.2K+</div>
            <div className={styles.ssLbl}>
              <b>Active Creators</b>In 40+ countries
            </div>
          </div>
          <div className={styles.storyStat}>
            <div className={styles.ssNum}>7</div>
            <div className={styles.ssLbl}>
              <b>Team Members</b>Remote-first, globally distributed
            </div>
          </div>
          <div className={styles.storyStat}>
            <div className={styles.ssNum}>$0</div>
            <div className={styles.ssLbl}>
              <b>Raised</b>Bootstrapped & profitable
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className={styles.values}>
        <div className={styles.sectionHead}>
          <div className={styles.secLabel}>What We Believe</div>
          <h2 className={styles.secTitle}>Our values</h2>
        </div>
        <div className={styles.valuesGrid}>
          <div className={styles.valCard}>
            <div className={styles.valIcon}>🎯</div>
            <div className={styles.valTitle}>Creators First, Always</div>
            <p className={styles.valDesc}>
              Every feature we build starts with a real creator problem. We don&apos;t add features to look impressive — we add them to save you time.
            </p>
          </div>
          <div className={styles.valCard}>
            <div className={styles.valIcon}>⚡</div>
            <div className={styles.valTitle}>Speed Is a Feature</div>
            <p className={styles.valDesc}>
              A 10-minute workflow that replaces 2 hours is the product. We obsess over every second of friction in the creator workflow.
            </p>
          </div>
          <div className={styles.valCard}>
            <div className={styles.valIcon}>🔍</div>
            <div className={styles.valTitle}>Radical Transparency</div>
            <p className={styles.valDesc}>
              No dark patterns, no fake scarcity, no hidden costs. We build the tool we&apos;d want to use and charge what it&apos;s actually worth.
            </p>
          </div>
          <div className={styles.valCard}>
            <div className={styles.valIcon}>🌍</div>
            <div className={styles.valTitle}>Global by Default</div>
            <p className={styles.valDesc}>
              We&apos;re based in Pakistan, with users in 40+ countries. We build for the global creator, not just Silicon Valley&apos;s definition of one.
            </p>
          </div>
          <div className={styles.valCard}>
            <div className={styles.valIcon}>🧠</div>
            <div className={styles.valTitle}>AI as a Tool, Not a Replacement</div>
            <p className={styles.valDesc}>
              AI handles the repetitive work so your creativity and judgment — the things that actually make channels succeed — can shine.
            </p>
          </div>
          <div className={styles.valCard}>
            <div className={styles.valIcon}>📈</div>
            <div className={styles.valTitle}>Sustainable Growth</div>
            <p className={styles.valDesc}>
              We&apos;re bootstrapped by choice. We grow at the pace our product deserves, not the pace investors demand.
            </p>
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div className={styles.team}>
        <div className={styles.sectionHead}>
          <div className={styles.secLabel}>The Team</div>
          <h2 className={styles.secTitle}>Small team. Big obsession.</h2>
        </div>
        <div className={styles.teamGrid}>
          <div className={styles.teamCard}>
            <div className={`${styles.teamAv} ${styles.red}`}>AK</div>
            <div className={styles.teamName}>Ahmed K.</div>
            <div className={styles.teamRole}>Founder & CEO</div>
            <p className={styles.teamBio}>
              Ex-YouTube creator with 3 channels. Built AutoTubeOS to solve his own workflow chaos.
            </p>
            <div className={styles.teamLinks}>
              <a href="#" className={styles.tLink}>𝕏</a>
              <a href="#" className={styles.tLink}>in</a>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div className={`${styles.teamAv} ${styles.blue}`}>SR</div>
            <div className={styles.teamName}>Sara R.</div>
            <div className={styles.teamRole}>Head of Product</div>
            <p className={styles.teamBio}>
              Previously led product at two Y Combinator startups. Obsessed with creator workflows.
            </p>
            <div className={styles.teamLinks}>
              <a href="#" className={styles.tLink}>𝕏</a>
              <a href="#" className={styles.tLink}>in</a>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div className={`${styles.teamAv} ${styles.green}`}>MZ</div>
            <div className={styles.teamName}>Mariam Z.</div>
            <div className={styles.teamRole}>AI Lead</div>
            <p className={styles.teamBio}>
              ML engineer with a background in NLP. Trained our fine-tuned script generation models.
            </p>
            <div className={styles.teamLinks}>
              <a href="#" className={styles.tLink}>𝕏</a>
              <a href="#" className={styles.tLink}>in</a>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div className={`${styles.teamAv} ${styles.amber}`}>JL</div>
            <div className={styles.teamName}>James L.</div>
            <div className={styles.teamRole}>Head of Growth</div>
            <p className={styles.teamBio}>
              Runs a YouTube agency on the side. Our best user and our harshest critic.
            </p>
            <div className={styles.teamLinks}>
              <a href="#" className={styles.tLink}>𝕏</a>
              <a href="#" className={styles.tLink}>in</a>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className={styles.timeline}>
        <div className={styles.sectionHead}>
          <div className={styles.secLabel}>Journey</div>
          <h2 className={styles.secTitle}>From idea to product</h2>
        </div>
        <div className={styles.tlItems}>
          <div className={styles.tlItem}>
            <div className={styles.tlDate}>Mar 2024</div>
            <div className={styles.tlDot}></div>
            <div className={styles.tlContent}>
              <h3>The Problem</h3>
              <p>Ahmed misses two upload days running 3 channels across 8 tools. Starts building a unified system in Notion.</p>
            </div>
          </div>
          <div className={styles.tlItem}>
            <div className={styles.tlDate}>Jul 2024</div>
            <div className={styles.tlDot}></div>
            <div className={styles.tlContent}>
              <h3>First Prototype</h3>
              <p>A rough dashboard with AI script generation and a topic finder. Shared with 20 creator friends — immediate traction.</p>
            </div>
          </div>
          <div className={styles.tlItem}>
            <div className={styles.tlDate}>Oct 2024</div>
            <div className={styles.tlDot}></div>
            <div className={styles.tlContent}>
              <h3>Private Beta</h3>
              <p>200 beta users. Added Shorts Repurposer after unanimous request. NPS score: 72.</p>
            </div>
          </div>
          <div className={styles.tlItem}>
            <div className={styles.tlDate}>Jan 2025</div>
            <div className={styles.tlDot}></div>
            <div className={styles.tlContent}>
              <h3>Public Launch</h3>
              <p>Product Hunt launch. #2 Product of the Day. 800 signups in 48 hours. Team grows to 7.</p>
            </div>
          </div>
          <div className={styles.tlItem}>
            <div className={styles.tlDate}>May 2026</div>
            <div className={styles.tlDot}></div>
            <div className={styles.tlContent}>
              <h3>Today</h3>
              <p>1,200+ active creators. Bootstrapped and profitable. Building the next generation of creator AI agents.</p>
            </div>
          </div>
        </div>
      </div>

      {/* INVESTORS */}
      <div className={styles.investors}>
        <div className={styles.invLabel}>Backed by the trust of creators worldwide — not investors</div>
        <div className={styles.invChips}>
          <div className={styles.invChip}>🇵🇰 Pakistan</div>
          <div className={styles.invChip}>🇺🇸 United States</div>
          <div className={styles.invChip}>🇬🇧 United Kingdom</div>
          <div className={styles.invChip}>🇮🇳 India</div>
          <div className={styles.invChip}>🇧🇷 Brazil</div>
          <div className={styles.invChip}>🇩🇪 Germany</div>
          <div className={styles.invChip}>🌍 40+ countries</div>
        </div>
      </div>

      {/* CTA STRIP */}
      <div className={styles.ctaStrip}>
        <div className={styles.ctaGlow}></div>
        <h2>Come build with us.</h2>
        <p>Join 1,200+ creators already running their channels on AutoTubeOS. Or join our team — we&apos;re always hiring.</p>
        <div className={styles.ctaBtns}>
          <Link href="/auth" className={styles.btnRed}>
            Start Free Trial →
          </Link>
          <Link href="/careers" className={styles.btnGhost}>
            View Open Roles
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
