"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/comparison.module.css";

export default function Comparison() {
  const [activeTab, setActiveTab] = useState<"tubebuddy" | "vidiq" | "all">("tubebuddy");

  const switchTab = (tab: "tubebuddy" | "vidiq" | "all") => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      {/* PAGE SWITCHER */}
      <div className={styles.pgSwitch}>
        <button
          className={`${styles.pgBtn} ${activeTab === "tubebuddy" ? styles.on : ""}`}
          onClick={() => switchTab("tubebuddy")}
        >
          AutoTubeOS vs TubeBuddy
        </button>
        <button
          className={`${styles.pgBtn} ${activeTab === "vidiq" ? styles.on : ""}`}
          onClick={() => switchTab("vidiq")}
        >
          AutoTubeOS vs VidIQ
        </button>
        <button
          className={`${styles.pgBtn} ${activeTab === "all" ? styles.on : ""}`}
          onClick={() => switchTab("all")}
        >
          3-Way Comparison
        </button>
      </div>

      {/* ── VS TUBEBUDDY ── */}
      {activeTab === "tubebuddy" && (
        <div className={`${styles.pview} ${styles.active}`}>
          <div className={styles.hero}>
            <div className={styles.gridBg}></div>
            <div className={styles.hBadge}>Head-to-Head Comparison · 2026</div>
            <h1 className={styles.hTitle}>AutoTubeOS vs TubeBuddy</h1>
            <p className={styles.hSub}>
              TubeBuddy optimizes individual videos. AutoTubeOS replaces your entire content workflow. Here&apos;s the honest comparison.
            </p>
            <div className={styles.verdictRow}>
              <div className={`${styles.verdictCard} ${styles.vcWinner}`}>
                <div className={styles.vcTool}>AutoTubeOS</div>
                <div className={styles.vcScore}>9.2</div>
                <div className={styles.vcLabel}>Overall Score</div>
                <div className={styles.winnerBadge}>🏆 Winner</div>
              </div>
              <div className={styles.verdictCard}>
                <div className={styles.vcTool}>TubeBuddy</div>
                <div className={styles.vcScore} style={{ color: "var(--muted)" }}>
                  6.4
                </div>
                <div className={styles.vcLabel}>Overall Score</div>
              </div>
            </div>
          </div>

          <div className={styles.tableSection}>
            <h2 className={styles.tsTitle}>Full Feature Comparison</h2>
            <table className={styles.cmpTable}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className={styles.us}>AutoTubeOS</th>
                  <th>TubeBuddy</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.groupRow}>
                  <td colSpan={3}>Content Creation</td>
                </tr>
                <tr>
                  <td>AI Script Generator</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Topic / Idea Finder</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cPartial}>Basic</td>
                </tr>
                <tr>
                  <td>Retention Optimizer</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Thumbnail Idea Engine</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cPartial}>A/B test only</td>
                </tr>
                <tr>
                  <td>Shorts Repurposer</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Script formats (8+)</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>

                <tr className={styles.groupRow}>
                  <td colSpan={3}>SEO & Analytics</td>
                </tr>
                <tr>
                  <td>Keyword Research</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cYes}>✓</td>
                </tr>
                <tr>
                  <td>Tag Suggestions</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cYes}>✓</td>
                </tr>
                <tr>
                  <td>Competitor Analysis</td>
                  <td className={`${styles.us} ${styles.cBest}`}>Advanced</td>
                  <td className={styles.cMid}>Basic</td>
                </tr>
                <tr>
                  <td>RPM Estimation</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Trending Topics</td>
                  <td className={`${styles.us} ${styles.cBest}`}>Real-time AI</td>
                  <td className={styles.cMid}>Manual</td>
                </tr>

                <tr className={styles.groupRow}>
                  <td colSpan={3}>Workflow & Team</td>
                </tr>
                <tr>
                  <td>Content Calendar</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Team Collaboration</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ (Agency)</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>AI Agents / Automation</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ (Beta)</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Bulk Processing</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cYes}>✓</td>
                </tr>

                <tr className={styles.groupRow}>
                  <td colSpan={3}>Pricing</td>
                </tr>
                <tr>
                  <td>Free Plan</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ (generous)</td>
                  <td className={styles.cYes}>✓ (limited)</td>
                </tr>
                <tr>
                  <td>Starting Price</td>
                  <td className={`${styles.us} ${styles.cBest}`}>$29/mo</td>
                  <td className={styles.cMid}>$9/mo (basic)</td>
                </tr>
                <tr>
                  <td>Value for creators</td>
                  <td className={`${styles.us} ${styles.cBest}`}>High</td>
                  <td className={styles.cMid}>Medium</td>
                </tr>
                <tr>
                  <td>Replaces other tools</td>
                  <td className={`${styles.us} ${styles.cYes}`}>Yes — 7+ tools</td>
                  <td className={styles.cNo}>No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.painSection}>
            <h2 className={styles.tsTitle} style={{ textAlign: "center", marginBottom: "20px" }}>
              Where TubeBuddy falls short
            </h2>
            <div className={styles.painGrid}>
              <div className={styles.painCard}>
                <div className={styles.painHeader}>
                  <div className={styles.painLogo}>🐛</div>
                  <div className={styles.painName}>TubeBuddy Limitations</div>
                </div>
                <div className={styles.painList}>
                  <div className={styles.painItem}>No script generator — you still write everything yourself</div>
                  <div className={styles.painItem}>No AI content ideas — just keyword research tools</div>
                  <div className={styles.painItem}>No Shorts repurposing workflow</div>
                  <div className={styles.painItem}>No content calendar or upload scheduling</div>
                  <div className={styles.painItem}>No team collaboration features</div>
                  <div className={styles.painItem}>Browser extension only — no standalone dashboard</div>
                </div>
              </div>
              <div
                className={styles.painCard}
                style={{
                  background: "linear-gradient(135deg, rgba(34,197,94,0.05), var(--s2))",
                  borderColor: "var(--green-border)",
                }}
              >
                <div className={styles.painHeader}>
                  <div className={styles.painLogo} style={{ background: "var(--red-bg)" }}>
                    🚀
                  </div>
                  <div className={styles.painName} style={{ color: "var(--green)" }}>
                    AutoTubeOS Wins
                  </div>
                </div>
                <div className={styles.painList}>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ Full AI script generation — 8 formats, hooks included
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ Viral topic finder with RPM and competition scoring
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ Automated Shorts from every long video
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ Content calendar with team task management
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ AI Agents that run your workflow automatically
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ Full workspace — not just a browser extension
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VS VIDIQ ── */}
      {activeTab === "vidiq" && (
        <div className={`${styles.pview} ${styles.active}`}>
          <div className={styles.hero}>
            <div className={styles.gridBg}></div>
            <div className={styles.hBadge}>Head-to-Head Comparison · 2026</div>
            <h1 className={styles.hTitle}>AutoTubeOS vs VidIQ</h1>
            <p className={styles.hSub}>
              VidIQ focuses on analytics and SEO. AutoTubeOS is the full creator operating system. Here&apos;s how they compare.
            </p>
            <div className={styles.verdictRow}>
              <div className={`${styles.verdictCard} ${styles.vcWinner}`}>
                <div className={styles.vcTool}>AutoTubeOS</div>
                <div className={styles.vcScore}>9.2</div>
                <div className={styles.vcLabel}>Overall Score</div>
                <div className={styles.winnerBadge}>🏆 Winner</div>
              </div>
              <div className={styles.verdictCard}>
                <div className={styles.vcTool}>VidIQ</div>
                <div className={styles.vcScore} style={{ color: "var(--muted)" }}>
                  6.8
                </div>
                <div className={styles.vcLabel}>Overall Score</div>
              </div>
            </div>
          </div>

          <div className={styles.tableSection}>
            <h2 className={styles.tsTitle}>Full Feature Comparison</h2>
            <table className={styles.cmpTable}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className={styles.us}>AutoTubeOS</th>
                  <th>VidIQ</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.groupRow}>
                  <td colSpan={3}>Content Creation</td>
                </tr>
                <tr>
                  <td>AI Script Generator</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cPartial}>Basic AI</td>
                </tr>
                <tr>
                  <td>Topic / Idea Finder</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cYes}>✓</td>
                </tr>
                <tr>
                  <td>Retention Optimizer</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Shorts Repurposer</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Script Formats (8+)</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>

                <tr className={styles.groupRow}>
                  <td colSpan={3}>SEO & Research</td>
                </tr>
                <tr>
                  <td>Keyword Research</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cYes}>✓</td>
                </tr>
                <tr>
                  <td>Competitor Analysis</td>
                  <td className={`${styles.us} ${styles.cBest}`}>Advanced AI</td>
                  <td className={styles.cMid}>Good</td>
                </tr>
                <tr>
                  <td>Trending Topics</td>
                  <td className={`${styles.us} ${styles.cBest}`}>Real-time AI</td>
                  <td className={styles.cYes}>✓</td>
                </tr>
                <tr>
                  <td>RPM Estimation</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Thumbnail A/B Testing</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ (concepts)</td>
                  <td className={styles.cYes}>✓ (real)</td>
                </tr>

                <tr className={styles.groupRow}>
                  <td colSpan={3}>Workflow</td>
                </tr>
                <tr>
                  <td>Content Calendar</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cPartial}>Basic</td>
                </tr>
                <tr>
                  <td>Team Collaboration</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ (Agency)</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>AI Agents</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ (Beta)</td>
                  <td className={styles.cNo}>✕</td>
                </tr>

                <tr className={styles.groupRow}>
                  <td colSpan={3}>Pricing</td>
                </tr>
                <tr>
                  <td>Starting Price</td>
                  <td className={`${styles.us} ${styles.cBest}`}>$29/mo</td>
                  <td className={styles.cBad}>$49/mo (Pro)</td>
                </tr>
                <tr>
                  <td>Features per dollar</td>
                  <td className={`${styles.us} ${styles.cBest}`}>Excellent</td>
                  <td className={styles.cMid}>Medium</td>
                </tr>
                <tr>
                  <td>Replaces other tools</td>
                  <td className={`${styles.us} ${styles.cYes}`}>Yes — 7+ tools</td>
                  <td className={styles.cNo}>No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.painSection}>
            <h2 className={styles.tsTitle} style={{ textAlign: "center", marginBottom: "20px" }}>
              Where VidIQ falls short
            </h2>
            <div className={styles.painGrid}>
              <div className={styles.painCard}>
                <div className={styles.painHeader}>
                  <div className={styles.painLogo}>📊</div>
                  <div className={styles.painName}>VidIQ Limitations</div>
                </div>
                <div className={styles.painList}>
                  <div className={styles.painItem}>Script generator is basic — no format options or retention hooks</div>
                  <div className={styles.painItem}>No Shorts repurposing — manual workflow still required</div>
                  <div className={styles.painItem}>No team collaboration — solo creator tool only</div>
                  <div className={styles.painItem}>No AI Agents — everything still manual</div>
                  <div className={styles.painItem}>Pro plan at $49/mo — expensive for what it offers</div>
                  <div className={styles.painItem}>Analytics-heavy but doesn&apos;t help you create better content</div>
                </div>
              </div>
              <div
                className={styles.painCard}
                style={{
                  background: "linear-gradient(135deg, rgba(34,197,94,0.05), var(--s2))",
                  borderColor: "var(--green-border)",
                }}
              >
                <div className={styles.painHeader}>
                  <div className={styles.painLogo} style={{ background: "var(--red-bg)" }}>
                    🚀
                  </div>
                  <div className={styles.painName} style={{ color: "var(--green)" }}>
                    AutoTubeOS Wins
                  </div>
                </div>
                <div className={styles.painList}>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ Full AI script generator with 8 formats and retention scoring
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ Automated Shorts workflow from any long video
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ Team collaboration built-in for Agency users
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ AI Agents that automate your weekly content pipeline
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ $29/mo Pro — 40% cheaper than VidIQ Pro
                  </div>
                  <div className={styles.painItem} style={{ color: "var(--text)" }}>
                    ✓ Helps you create, not just analyze
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 3-WAY ── */}
      {activeTab === "all" && (
        <div className={`${styles.pview} ${styles.active}`}>
          <div className={styles.hero}>
            <div className={styles.gridBg}></div>
            <div className={styles.hBadge}>3-Way Comparison · 2026</div>
            <h1 className={styles.hTitle}>AutoTubeOS vs TubeBuddy vs VidIQ</h1>
            <p className={styles.hSub}>The complete comparison of the three most popular YouTube tools.</p>
            <div className={styles.verdictRow}>
              <div className={`${styles.verdictCard} ${styles.vcWinner}`}>
                <div className={styles.vcTool}>AutoTubeOS</div>
                <div className={styles.vcScore}>9.2</div>
                <div className={styles.vcLabel}>Overall</div>
                <div className={styles.winnerBadge}>🏆 Best Overall</div>
              </div>
              <div className={styles.verdictCard}>
                <div className={styles.vcTool}>VidIQ</div>
                <div className={styles.vcScore} style={{ color: "var(--amber)" }}>
                  6.8
                </div>
                <div className={styles.vcLabel}>Overall</div>
              </div>
              <div className={styles.verdictCard}>
                <div className={styles.vcTool}>TubeBuddy</div>
                <div className={styles.vcScore} style={{ color: "var(--muted)" }}>
                  6.4
                </div>
                <div className={styles.vcLabel}>Overall</div>
              </div>
            </div>
          </div>

          <div className={styles.tableSection}>
            <h2 className={styles.tsTitle}>Complete 3-Way Feature Table</h2>
            <table className={styles.cmpTable}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className={styles.us}>AutoTubeOS</th>
                  <th>VidIQ</th>
                  <th>TubeBuddy</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.groupRow}>
                  <td colSpan={4}>Content Creation</td>
                </tr>
                <tr>
                  <td>AI Script Generator</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ (8 formats)</td>
                  <td className={styles.cPartial}>Basic</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Topic Finder</td>
                  <td className={`${styles.us} ${styles.cBest}`}>AI-powered</td>
                  <td className={styles.cYes}>✓</td>
                  <td className={styles.cPartial}>Basic</td>
                </tr>
                <tr>
                  <td>Retention Optimizer</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Shorts Repurposer</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Thumbnail Engine</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cYes}>✓</td>
                  <td className={styles.cYes}>✓</td>
                </tr>

                <tr className={styles.groupRow}>
                  <td colSpan={4}>SEO & Research</td>
                </tr>
                <tr>
                  <td>Keyword Research</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cYes}>✓</td>
                  <td className={styles.cYes}>✓</td>
                </tr>
                <tr>
                  <td>Competitor Analysis</td>
                  <td className={`${styles.us} ${styles.cBest}`}>Advanced AI</td>
                  <td className={styles.cMid}>Good</td>
                  <td className={styles.cMid}>Basic</td>
                </tr>
                <tr>
                  <td>RPM Estimation</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cNo}>✕</td>
                  <td className={styles.cNo}>✕</td>
                </tr>

                <tr className={styles.groupRow}>
                  <td colSpan={4}>Workflow & Team</td>
                </tr>
                <tr>
                  <td>Content Calendar</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ Full</td>
                  <td className={styles.cPartial}>Basic</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>Team Collaboration</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ (Agency)</td>
                  <td className={styles.cNo}>✕</td>
                  <td className={styles.cNo}>✕</td>
                </tr>
                <tr>
                  <td>AI Agents</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓ (Beta)</td>
                  <td className={styles.cNo}>✕</td>
                  <td className={styles.cNo}>✕</td>
                </tr>

                <tr className={styles.groupRow}>
                  <td colSpan={4}>Pricing</td>
                </tr>
                <tr>
                  <td>Free Plan</td>
                  <td className={`${styles.us} ${styles.cYes}`}>✓</td>
                  <td className={styles.cYes}>✓</td>
                  <td className={styles.cYes}>✓</td>
                </tr>
                <tr>
                  <td>Pro Price</td>
                  <td className={`${styles.us} ${styles.cBest}`}>$29/mo</td>
                  <td className={styles.cBad}>$49/mo</td>
                  <td className={styles.cMid}>$9–$49/mo</td>
                </tr>
                <tr>
                  <td>Replaces other tools</td>
                  <td className={`${styles.us} ${styles.cYes}`}>Yes — 7+ tools</td>
                  <td className={styles.cNo}>No</td>
                  <td className={styles.cNo}>No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* WHY SECTION */}
      <div className={styles.whySection}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2 style={{ fontFamily: "var(--fh)", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.5px" }}>
            Why AutoTubeOS wins for creators
          </h2>
        </div>
        <div className={styles.whyGrid}>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>🔄</div>
            <h3 className={styles.whyTitle}>Workflow, not just tools</h3>
            <p className={styles.whyDesc}>
              TubeBuddy and VidIQ optimize individual steps. AutoTubeOS connects the entire pipeline from idea to upload.
            </p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>🤖</div>
            <h3 className={styles.whyTitle}>Real AI, not just data</h3>
            <p className={styles.whyDesc}>
              Others show you data. AutoTubeOS uses AI to generate scripts, optimize retention, and find viral ideas automatically.
            </p>
          </div>
          <div className={styles.whyCard}>
            <div className={styles.whyIcon}>💰</div>
            <h3 className={styles.whyTitle}>Replace 7 tools for $29</h3>
            <p className={styles.whyDesc}>
              ChatGPT + TubeBuddy + Canva + Notion + ElevenLabs = $100+/mo. AutoTubeOS replaces them all for $29.
            </p>
          </div>
        </div>
      </div>

      {/* CTA BLOCK */}
      <div className={styles.ctaBlock}>
        <div className={styles.ctaGlow}></div>
        <h2 className={styles.ctaT}>Try AutoTubeOS free for 14 days.</h2>
        <p className={styles.ctaS}>No credit card. No commitment. Cancel anytime.</p>
        <Link href="/auth" className={styles.btnR}>
          Start Free Trial →
        </Link>
      </div>

      <Footer />
    </>
  );
}
