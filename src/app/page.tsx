import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/home.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGridBg}></div>
        <div className={styles.heroGlow}></div>

        <div className={styles.heroBadge}>
          <div className={styles.badgeDot}></div>
          Now accepting early access — limited spots
        </div>

        <h1>
          The <span className={styles.highlight}>Operating System</span><br />
          for Faceless YouTube Creators
        </h1>

        <p>
          Stop juggling ChatGPT, Canva, Notion, TubeBuddy, and 6 other tools.
          Run your entire YouTube automation workflow from one AI-powered workspace.
        </p>

        <div className={styles.heroActions}>
          <Link href="#waitlist" className={styles.btnPrimary}>
            Start for Free →
          </Link>
          <Link href="#features" className={styles.btnSecondary}>
            See Features
          </Link>
        </div>

        <div className={styles.heroSocialProof}>
          <div className={styles.avatars}>
            <div className={styles.avatar}>AK</div>
            <div className={styles.avatar}>MZ</div>
            <div className={styles.avatar}>SR</div>
            <div className={styles.avatar}>JL</div>
          </div>
          <span>Joined by 1,200+ creators on the waitlist</span>
        </div>
      </section>

      {/* LOGOS */}
      <div className={styles.logosSection}>
        <p className={styles.logosLabel}>Replaces your entire toolstack</p>
        <div className={styles.logosRow}>
          <span className={styles.logoChip}>ChatGPT</span>
          <span className={styles.logoChip}>Canva</span>
          <span className={styles.logoChip}>Notion</span>
          <span className={styles.logoChip}>TubeBuddy</span>
          <span className={styles.logoChip}>ElevenLabs</span>
          <span className={styles.logoChip}>CapCut</span>
          <span className={styles.logoChip}>VidIQ</span>
        </div>
      </div>

      {/* PROBLEM */}
      <section className={`${styles.section} ${styles.problemSection}`}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionLabel}>The Problem</div>
          <h2 className={styles.sectionTitle}>
            You&apos;re not failing at YouTube.<br />You&apos;re failing at workflow.
          </h2>
          <p className={styles.sectionSub}>
            Most creators spend 80% of their time managing tools instead of growing their channel. We fix that.
          </p>
        </div>
        <div className={styles.problemGrid}>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>⏳</div>
            <h3>Too many tools</h3>
            <p>Average creator uses 7+ separate apps just to publish one video. Context-switching kills momentum.</p>
          </div>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>📉</div>
            <h3>Inconsistent output</h3>
            <p>Manual workflows break down. You miss posting days, lose subscribers, and momentum disappears.</p>
          </div>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>🔍</div>
            <h3>No topic strategy</h3>
            <p>Guessing video ideas instead of using data. Competitors find viral topics while you post blindly.</p>
          </div>
          <div className={styles.problemCard}>
            <div className={styles.problemIcon}>✂️</div>
            <h3>Shorts left on table</h3>
            <p>Every long video has 5+ shorts hiding inside it. Nobody has time to manually repurpose all of them.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.section} style={{ padding: "4rem 5%" }}>
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <div className={styles.statNum}>73%</div>
            <div className={styles.statLabel}>Time saved per video</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>7×</div>
            <div className={styles.statLabel}>Faster content pipeline</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>2.4×</div>
            <div className={styles.statLabel}>More videos per month</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>$0</div>
            <div className={styles.statLabel}>Extra tools needed</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionLabel}>Features</div>
          <h2 className={styles.sectionTitle}>
            Everything your channel needs.<br />Nothing it doesn&apos;t.
          </h2>
          <p className={styles.sectionSub}>Seven AI-powered modules. One dashboard. Zero context switching.</p>
        </div>

        <div className={styles.featuresWrapper}>
          <div className={styles.featureBig}>
            <div>
              <div className={styles.featNumber}>01 — KILLER FEATURE</div>
              <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.8rem", letterSpacing: "-0.5px" }}>
                Viral Topic Finder
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                AI scans trending topics across YouTube, Reddit, and Google Trends in real-time.
                Get low-competition, high-RPM video ideas ranked by potential views — before your competitors find them.
              </p>
              <div className={styles.featTags} style={{ marginTop: "1.5rem" }}>
                <span className={styles.featTag}>Trending Detection</span>
                <span className={styles.featTag}>Competitor Gap Analysis</span>
                <span className={styles.featTag}>RPM Estimation</span>
                <span className={styles.featTag}>Niche Scoring</span>
              </div>
            </div>
            <div style={{ background: "var(--s3)", borderRadius: "12px", padding: "1.5rem", border: "1px solid var(--border2)" }}>
              <p style={{ fontSize: "0.72rem", color: "var(--muted2)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>
                Top Ideas This Week
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.75rem 1rem" }}>
                  <span style={{ fontSize: "0.88rem" }}>&quot;AI Side Hustles That Pay $500/Day&quot;</span>
                  <span style={{ color: "var(--red)", fontSize: "0.8rem", fontWeight: 600 }}>9.2/10</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.75rem 1rem" }}>
                  <span style={{ fontSize: "0.88rem" }}>&quot;Why 99% of People Stay Broke&quot;</span>
                  <span style={{ color: "var(--red)", fontSize: "0.8rem", fontWeight: 600 }}>8.7/10</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "8px", padding: "0.75rem 1rem" }}>
                  <span style={{ fontSize: "0.88rem" }}>&quot;I Tested Every AI Tool for 30 Days&quot;</span>
                  <span style={{ color: "var(--red)", fontSize: "0.8rem", fontWeight: 600 }}>8.1/10</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featNumber}>02</div>
            <h3>Script Generator</h3>
            <p>AI writes retention-optimized scripts in 12+ formats — Documentary, Horror, Finance, Reddit Stories, Shorts, and more. Hooks are built-in.</p>
            <div className={styles.featTags}>
              <span className={styles.featTag}>12+ Formats</span>
              <span className={styles.featTag}>Hook Builder</span>
              <span className={styles.featTag}>Retention Flow</span>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featNumber}>03</div>
            <h3>Thumbnail Engine</h3>
            <p>Generate thumbnail concepts, test title combinations, and predict CTR before you even open Canva. AI-powered A/B concepts in seconds.</p>
            <div className={styles.featTags}>
              <span className={styles.featTag}>CTR Prediction</span>
              <span className={styles.featTag}>Title Testing</span>
              <span className={styles.featTag}>Hook Combos</span>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featNumber}>04</div>
            <h3>Retention Optimizer</h3>
            <p>Paste your script — AI identifies weak intros, boring sections, and pacing issues before you record. Fix problems before upload, not after.</p>
            <div className={styles.featTags}>
              <span className={styles.featTag}>Intro Scorer</span>
              <span className={styles.featTag}>Pacing Check</span>
              <span className={styles.featTag}>Drop-off Predictor</span>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featNumber}>05</div>
            <h3>Shorts Repurposer</h3>
            <p>Upload your long video — AI finds the 5 best moments, writes Shorts scripts with hooks, and formats them for maximum reach on YouTube Shorts and Reels.</p>
            <div className={styles.featTags}>
              <span className={styles.featTag}>Auto Clip Detection</span>
              <span className={styles.featTag}>Hook Writing</span>
              <span className={styles.featTag}>Multi-platform</span>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featNumber}>06</div>
            <h3>Content Calendar</h3>
            <p>AI schedules your upload pipeline, assigns tasks to team members, and tracks approvals. Never miss a posting day again.</p>
            <div className={styles.featTags}>
              <span className={styles.featTag}>Team Collaboration</span>
              <span className={styles.featTag}>Approval Flow</span>
              <span className={styles.featTag}>Auto Scheduling</span>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featNumber}>07</div>
            <h3>Competitor Intelligence</h3>
            <p>Paste any competitor channel. Get their posting frequency, best-performing videos, average views, thumbnail patterns, and gaps you can exploit.</p>
            <div className={styles.featTags}>
              <span className={styles.featTag}>Channel Analyzer</span>
              <span className={styles.featTag}>Gap Finder</span>
              <span className={styles.featTag}>Pattern Detection</span>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW VIZ */}
      <section id="workflow" className={`${styles.section} ${styles.workflowSection}`}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionLabel}>How It Works</div>
          <h2 className={styles.sectionTitle}>From zero to published in one workflow.</h2>
          <p className={styles.sectionSub}>No more tab-hopping. Every step of your content pipeline, connected.</p>
        </div>
        <div className={styles.workflowSteps}>
          <div className={styles.wfStep}>
            <div className={styles.wfNum}>01</div>
            <div className={styles.wfContent}>
              <h3>Find Your Next Viral Topic</h3>
              <p>AI scans trending content in your niche, scores it by potential, and surfaces low-competition ideas with high RPM.</p>
              <div className={styles.wfTools}>
                <span className={styles.wfTool}>Topic Finder</span>
                <span className={styles.wfTool}>Competitor Intelligence</span>
              </div>
            </div>
          </div>
          <div className={styles.wfStep}>
            <div className={styles.wfNum}>02</div>
            <div className={styles.wfContent}>
              <h3>Generate a Retention-Optimized Script</h3>
              <p>Choose your format, input your topic, and get a full script with hooks, pacing markers, and CTAs built in.</p>
              <div className={styles.wfTools}>
                <span className={styles.wfTool}>Script Generator</span>
                <span className={styles.wfTool}>Retention Optimizer</span>
              </div>
            </div>
          </div>
          <div className={styles.wfStep}>
            <div className={styles.wfNum}>03</div>
            <div className={styles.wfContent}>
              <h3>Plan Your Thumbnail & Title</h3>
              <p>Generate 5 thumbnail concepts with title combinations. Test predicted CTR before spending a minute in Canva.</p>
              <div className={styles.wfTools}>
                <span className={styles.wfTool}>Thumbnail Engine</span>
                <span className={styles.wfTool}>SEO Optimizer</span>
              </div>
            </div>
          </div>
          <div className={styles.wfStep}>
            <div className={styles.wfNum}>04</div>
            <div className={styles.wfContent}>
              <h3>Send to Your Team or Automate</h3>
              <p>Assign tasks, set deadlines, track approvals. Your editor, voiceover artist, and thumbnail designer all in one pipeline.</p>
              <div className={styles.wfTools}>
                <span className={styles.wfTool}>Content Calendar</span>
                <span className={styles.wfTool}>Team Management</span>
              </div>
            </div>
          </div>
          <div className={styles.wfStep}>
            <div className={styles.wfNum}>05</div>
            <div className={styles.wfContent}>
              <h3>Repurpose Into Shorts Automatically</h3>
              <p>After upload, AI identifies your best 5 moments and writes ready-to-post Shorts scripts. Double your output with no extra work.</p>
              <div className={styles.wfTools}>
                <span className={styles.wfTool}>Shorts Repurposer</span>
                <span className={styles.wfTool}>Auto Scheduler</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <div className={styles.sectionLabel}>Early Feedback</div>
          <h2 className={styles.sectionTitle}>Creators who tested the beta</h2>
        </div>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testiCard}>
            <div className={styles.testiStars}>★★★★★</div>
            <p className={styles.testiText}>
              &quot;I was using 8 different tools before this. Now I run my entire 3-channel operation from one dashboard. The topic finder alone is worth the subscription.&quot;
            </p>
            <div className={styles.testiAuthor}>
              <div className={styles.testiAv}>AK</div>
              <div>
                <div className={styles.testiName}>Ahmed K.</div>
                <div className={styles.testiMeta}>Finance YouTube · 240K subscribers</div>
              </div>
            </div>
          </div>
          <div className={styles.testiCard}>
            <div className={styles.testiStars}>★★★★★</div>
            <p className={styles.testiText}>
              &quot;The Shorts Repurposer literally doubled my channel growth. Each long video now gives me 5 shorts automatically. I can&apos;t believe I was doing this manually before.&quot;
            </p>
            <div className={styles.testiAuthor}>
              <div className={styles.testiAv}>SR</div>
              <div>
                <div className={styles.testiName}>Sarah R.</div>
                <div className={styles.testiMeta}>Faceless Horror Channel · 89K subscribers</div>
              </div>
            </div>
          </div>
          <div className={styles.testiCard}>
            <div className={styles.testiStars}>★★★★★</div>
            <p className={styles.testiText}>
              &quot;We manage 12 client channels at my agency. AutoTubeOS cut our production time by 60%. The team collaboration feature is exactly what we needed.&quot;
            </p>
            <div className={styles.testiAuthor}>
              <div className={styles.testiAv}>JL</div>
              <div>
                <div className={styles.testiName}>James L.</div>
                <div className={styles.testiMeta}>YouTube Automation Agency · 12 clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className={styles.section} style={{ background: "var(--s1)" }}>
        <div className={styles.sectionHead} style={{ textAlign: "center" }}>
          <div className={styles.sectionLabel} style={{ textAlign: "center" }}>Pricing</div>
          <h2 className={styles.sectionTitle} style={{ margin: "0 auto" }}>Simple pricing. No surprises.</h2>
          <p className={styles.sectionSub} style={{ margin: "1rem auto 0" }}>All plans include a 14-day free trial. No credit card required.</p>
        </div>
        <div className={styles.pricingGrid} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
          <div className={styles.priceCard} style={{ background: "var(--s2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2.5rem", transition: "border-color 0.2s" }}>
            <div className={styles.priceTier} style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>Free</div>
            <div className={styles.priceAmount} style={{ fontFamily: "var(--font-head)", fontSize: "3rem", fontWeight: 800, letterSpacing: "-2px" }}>$0<span style={{ fontSize: "1rem", fontWeight: 300, color: "var(--muted)" }}>/mo</span></div>
            <p className={styles.priceDesc} style={{ color: "var(--muted)", fontSize: "0.88rem", margin: "0.5rem 0 1.5rem" }}>Perfect for testing the waters</p>
            <ul className={styles.priceFeatures} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2rem" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>5 video ideas per month</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>3 scripts per month</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>1 channel workspace</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Basic topic finder</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Community access</li>
            </ul>
            <Link href="#waitlist" className={`${styles.btnSecondary}`} style={{ display: "block", textAlign: "center", width: "100%", padding: "0.85rem" }}>
              Get Started Free
            </Link>
          </div>
          
          <div className={`${styles.priceCard} ${styles.featured}`} style={{ background: "linear-gradient(135deg, rgba(255,61,61,0.06) 0%, var(--s2) 100%)", border: "1px solid var(--red)", borderRadius: "16px", padding: "2.5rem", position: "relative", transition: "border-color 0.2s" }}>
            <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "var(--red)", color: "#fff", borderRadius: "100px", padding: "0.2rem 0.9rem", fontSize: "0.72rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              Most Popular
            </div>
            <div className={styles.priceTier} style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>Pro</div>
            <div className={styles.priceAmount} style={{ fontFamily: "var(--font-head)", fontSize: "3rem", fontWeight: 800, letterSpacing: "-2px" }}><sup style={{ fontSize: "1.2rem", fontWeight: 400 }}>$</sup>29<span style={{ fontSize: "1rem", fontWeight: 300, color: "var(--muted)" }}>/mo</span></div>
            <p className={styles.priceDesc} style={{ color: "var(--muted)", fontSize: "0.88rem", margin: "0.5rem 0 1.5rem" }}>For serious faceless creators</p>
            <ul className={styles.priceFeatures} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2rem" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Unlimited video ideas</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Unlimited scripts</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>3 channel workspaces</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Shorts Repurposer (10/mo)</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Competitor Intelligence</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Content Calendar</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Retention Optimizer</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Priority support</li>
            </ul>
            <Link href="#waitlist" className={styles.btnPrimary} style={{ display: "block", textAlign: "center", width: "100%", padding: "0.85rem" }}>
              Start 14-Day Trial
            </Link>
          </div>

          <div className={styles.priceCard} style={{ background: "var(--s2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2.5rem", transition: "border-color 0.2s" }}>
            <div className={styles.priceTier} style={{ fontSize: "0.8rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>Agency</div>
            <div className={styles.priceAmount} style={{ fontFamily: "var(--font-head)", fontSize: "3rem", fontWeight: 800, letterSpacing: "-2px" }}><sup style={{ fontSize: "1.2rem", fontWeight: 400 }}>$</sup>99<span style={{ fontSize: "1rem", fontWeight: 300, color: "var(--muted)" }}>/mo</span></div>
            <p className={styles.priceDesc} style={{ color: "var(--muted)", fontSize: "0.88rem", margin: "0.5rem 0 1.5rem" }}>For teams managing multiple channels</p>
            <ul className={styles.priceFeatures} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "2rem" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Everything in Pro</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Unlimited channels</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Unlimited Shorts repurposing</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Team collaboration (10 seats)</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Client approval workflows</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>White-label reports</li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--muted)" }}>Dedicated onboarding</li>
            </ul>
            <Link href="#waitlist" className={`${styles.btnSecondary}`} style={{ display: "block", textAlign: "center", width: "100%", padding: "0.85rem" }}>
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* WAITLIST CTA */}
      <section id="waitlist" className={styles.ctaSection}>
        <div className={styles.ctaGlow}></div>
        <p style={{ fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--red)", fontWeight: 500, marginBottom: "0.8rem" }}>Early Access</p>
        <h2>Ready to systemize your<br />YouTube growth?</h2>
        <p>Join 1,200+ creators on the waitlist. Early members get 50% off for life.</p>
        <div className={styles.waitlistForm}>
          <input type="email" placeholder="your@email.com" />
          <button type="button">Join Waitlist →</button>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--muted2)" }}>No spam. Unsubscribe anytime.</p>
      </section>

      <Footer />
    </>
  );
}
