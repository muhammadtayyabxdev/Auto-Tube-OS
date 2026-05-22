"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/onboarding.module.css";
import { BarChart3, Check, Flame, Lightbulb, Lock, Mail, Play, RefreshCw, Rocket, Sparkles, Target } from 'lucide-react';

interface NicheItem {
  name: string;
  icon: string;
  desc: string;
}

export default function Onboarding() {
  const router = useRouter();
  const [cur, setCur] = useState(1);
  const total = 6;

  // Form States
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    workspaceName: "",
  });

  const [niche, setNiche] = useState("Finance");
  const [nicheDesc, setNicheDesc] = useState("");

  const [goals, setGoals] = useState<string[]>([
    "Grow subscribers fast",
    "Publish more consistently",
    "Repurpose to Shorts",
  ]);
  const [freq, setFreq] = useState("8–12");

  const [conn, setConn] = useState({
    youtube: true,
    ga: false,
    newsletter: false,
  });

  const [ideaConfirmed, setIdeaConfirmed] = useState(false);

  const hints = [
    "Takes about 2 minutes <Clock size={16} />",
    "Choose the one that fits best",
    "Pick as many as you like",
    "You can skip and connect later",
    "Confirm your first video idea",
    "",
  ];

  const niches: NicheItem[] = [
    { name: "Finance", icon: "<DollarSign size={16} />", desc: "Money, investing, wealth" },
    { name: "AI & Tech", icon: "<Bot size={16} />", desc: "Tools, reviews, tutorials" },
    { name: "Health", icon: "<Dumbbell size={16} />", desc: "Fitness, nutrition, wellness" },
    { name: "Self Improvement", icon: "<Brain size={16} />", desc: "Habits, mindset, productivity" },
    { name: "Gaming", icon: "🎮", desc: "Reviews, walkthroughs" },
    { name: "Business", icon: "<Building size={16} />", desc: "Startups, entrepreneurship" },
    { name: "Travel", icon: "✈️", desc: "Destinations, tips, vlogs" },
    { name: "Creative", icon: "<Palette size={16} />", desc: "Design, art, storytelling" },
    { name: "Other", icon: "<Sparkles size={16} />", desc: "Something else entirely" },
  ];

  const goalOptions = [
    "<DollarSign size={16} /> Make money from ads",
    "<TrendingUp size={16} /> Grow subscribers fast",
    "<Zap size={16} /> Publish more consistently",
    "<Bot size={16} /> Automate my workflow",
    "<Smartphone size={16} /> Repurpose to Shorts",
    "<Building size={16} /> Run a YouTube agency",
    "<Globe size={16} /> Build a personal brand",
    "🛒 Sell products / courses",
    "<Handshake size={16} /> Get brand sponsorships",
  ];

  const go = (n: number) => {
    if (n < 1 || n > total) return;
    setCur(n);
  };

  const toggleGoal = (g: string) => {
    if (goals.includes(g)) {
      setGoals(goals.filter((x) => x !== g));
    } else {
      setGoals([...goals, g]);
    }
  };

  const toggleConn = (key: "youtube" | "ga" | "newsletter") => {
    setConn({ ...conn, [key]: !conn[key] });
  };

  const handleFinishSetup = () => {
    router.push("/dashboard");
  };

  return (
    <div className={styles.shell}>
      {/* LEFT PANEL */}
      <div className={styles.left}>
        <div className={styles.leftGlow}></div>
        <div className={styles.logo}>
          AutoTube<span>OS</span>
        </div>
        <div className={styles.steps}>
          <div className={`${styles.stepItem} ${cur > 1 ? styles.done : ""} ${cur === 1 ? styles.active : ""}`}>
            <div className={styles.stepDot}>1</div>
            <div>
              <div className={styles.stepName}>Your Profile</div>
              <div className={styles.stepSub}>Name & email</div>
            </div>
          </div>
          <div className={`${styles.stepItem} ${cur > 2 ? styles.done : ""} ${cur === 2 ? styles.active : ""}`}>
            <div className={styles.stepDot}>2</div>
            <div>
              <div className={styles.stepName}>Pick Your Niche</div>
              <div className={styles.stepSub}>What you&apos;ll create about</div>
            </div>
          </div>
          <div className={`${styles.stepItem} ${cur > 3 ? styles.done : ""} ${cur === 3 ? styles.active : ""}`}>
            <div className={styles.stepDot}>3</div>
            <div>
              <div className={styles.stepName}>Set Your Goals</div>
              <div className={styles.stepSub}>What matters most</div>
            </div>
          </div>
          <div className={`${styles.stepItem} ${cur > 4 ? styles.done : ""} ${cur === 4 ? styles.active : ""}`}>
            <div className={styles.stepDot}>4</div>
            <div>
              <div className={styles.stepName}>Connect Channel</div>
              <div className={styles.stepSub}>Optional but powerful</div>
            </div>
          </div>
          <div className={`${styles.stepItem} ${cur > 5 ? styles.done : ""} ${cur === 5 ? styles.active : ""}`}>
            <div className={styles.stepDot}>5</div>
            <div>
              <div className={styles.stepName}>Your First Idea</div>
              <div className={styles.stepSub}>AI-picked for your niche</div>
            </div>
          </div>
          <div className={`${styles.stepItem} ${cur === 6 ? styles.active : ""}`}>
            <div className={styles.stepDot}><Rocket size={16} /></div>
            <div>
              <div className={styles.stepName}>Launch Dashboard</div>
              <div className={styles.stepSub}>You&apos;re all set</div>
            </div>
          </div>
        </div>
        <div className={styles.leftBottom}>
          <div className={styles.testimonial}>
            &quot;AutoTubeOS cut my content prep from <b>6 hours to 45 minutes</b>. I publish 3× more now.&quot;
            <div className={styles.testimonialAuthor}>— Ahmed K., 241K subscribers</div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.right}>
        <div className={styles.topbar}>
          <span style={{ fontSize: "12px", color: "var(--muted2)" }}>Almost there 👋</span>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${(cur / total) * 100}%` }}></div>
          </div>
          <span className={styles.stepCounter}>
            Step {cur} of {total}
          </span>
          {cur < total && (
            <button className={styles.skipBtn} onClick={() => go(cur + 1)}>
              Skip →
            </button>
          )}
        </div>

        <div className={styles.rightBody}>
          {/* S1: PROFILE */}
          <div className={`${styles.screen} ${cur === 1 ? styles.active : ""}`}>
            <div className={styles.sLabel}>Step 1 — Welcome</div>
            <h2 className={styles.sTitle}>
              Let&apos;s set up
              <br />
              your workspace
            </h2>
            <p className={styles.sSub}>Tell us a bit about yourself so we can personalize everything for you.</p>
            <div className={`${styles.row2} ${styles.field}`}>
              <div>
                <label className={styles.fieldLabel}>First Name</label>
                <input
                  className={styles.inp}
                  placeholder="Ahmed"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className={styles.fieldLabel}>Last Name</label>
                <input
                  className={styles.inp}
                  placeholder="Khan"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input
                className={styles.inp}
                type="email"
                placeholder="you@example.com"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Workspace Name</label>
              <input
                className={styles.inp}
                placeholder="e.g. Finance Channel, My YT Agency…"
                value={profile.workspaceName}
                onChange={(e) => setProfile({ ...profile, workspaceName: e.target.value })}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px",
                background: "var(--s2)",
                border: "1px solid var(--border)",
                borderRadius: "9px",
                marginTop: "4px",
              }}
            >
              <span style={{ fontSize: "16px" }}><Lock size={16} /></span>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                Your data is encrypted and never shared with third parties.
              </span>
            </div>
          </div>

          {/* S2: NICHE */}
          <div className={`${styles.screen} ${cur === 2 ? styles.active : ""}`}>
            <div className={styles.sLabel}>Step 2 — Niche</div>
            <h2 className={styles.sTitle}>
              What&apos;s your
              <br />
              channel about?
            </h2>
            <p className={styles.sSub}>Pick your main niche. AI will tailor topic ideas, scripts, and SEO around this.</p>
            <div className={`${styles.cardGrid} ${styles.col3}`}>
              {niches.map((n) => (
                <div
                  key={n.name}
                  className={`${styles.selCard} ${niche === n.name ? styles.on : ""}`}
                  onClick={() => setNiche(n.name)}
                >
                  <div className={styles.cardIcon}>{n.icon}</div>
                  <div className={styles.cardName}>{n.name}</div>
                  <div className={styles.cardDesc}>{n.desc}</div>
                </div>
              ))}
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Or describe your niche</label>
              <input
                className={styles.inp}
                placeholder="e.g. Faceless YouTube about Pakistani real estate…"
                value={nicheDesc}
                onChange={(e) => setNicheDesc(e.target.value)}
              />
            </div>
          </div>

          {/* S3: GOALS */}
          <div className={`${styles.screen} ${cur === 3 ? styles.active : ""}`}>
            <div className={styles.sLabel}>Step 3 — Goals</div>
            <h2 className={styles.sTitle}>
              What do you want
              <br />
              to achieve?
            </h2>
            <p className={styles.sSub}>Pick all that apply. We&apos;ll tune your AI settings around your priorities.</p>
            <div className={styles.pillWrap}>
              {goalOptions.map((g) => (
                <div
                  key={g}
                  className={`${styles.pill} ${goals.includes(g) ? styles.on : ""}`}
                  onClick={() => toggleGoal(g)}
                >
                  {g}
                </div>
              ))}
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Videos per month goal</label>
              <div className={styles.cardGrid} style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                {[
                  { name: "1–2", label: "Casual" },
                  { name: "4–6", label: "Weekly" },
                  { name: "8–12", label: "Serious" },
                  { name: "12+", label: "Agency" },
                ].map((f) => (
                  <div
                    key={f.name}
                    className={`${styles.selCard} ${freq === f.name ? styles.on : ""}`}
                    onClick={() => setFreq(f.name)}
                    style={{ textAlign: "center", padding: "13px 6px" }}
                  >
                    <div style={{ fontFamily: "var(--fh)", fontSize: "1.4rem", fontWeight: 800 }}>{f.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "3px" }}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* S4: CONNECT */}
          <div className={`${styles.screen} ${cur === 4 ? styles.active : ""}`}>
            <div className={styles.sLabel}>Step 4 — Connect</div>
            <h2 className={styles.sTitle}>
              Connect your
              <br />
              YouTube channel
            </h2>
            <p className={styles.sSub}>
              Optional but powerful — real analytics make AI recommendations far more accurate.
            </p>
            <div
              className={`${styles.connectCard} ${conn.youtube ? styles.on : ""}`}
              onClick={() => toggleConn("youtube")}
            >
              <div className={styles.connIcon}><Play size={16} /></div>
              <div>
                <div className={styles.connName}>YouTube Channel</div>
                <div className={styles.connSub}>Sync analytics, subscribers & video data</div>
              </div>
              <div className={`${styles.connStatus} ${conn.youtube ? styles.csOn : styles.csOff}`}>
                {conn.youtube ? "<Check size={16} /> Connected" : "Connect"}
              </div>
            </div>
            <div
              className={`${styles.connectCard} ${conn.ga ? styles.on : ""}`}
              onClick={() => toggleConn("ga")}
            >
              <div className={styles.connIcon}><BarChart3 size={16} /></div>
              <div>
                <div className={styles.connName}>Google Analytics</div>
                <div className={styles.connSub}>Track traffic from YouTube to your website</div>
              </div>
              <div className={`${styles.connStatus} ${conn.ga ? styles.csOn : styles.csOff}`}>
                {conn.ga ? "<Check size={16} /> Connected" : "Connect"}
              </div>
            </div>
            <div
              className={`${styles.connectCard} ${conn.newsletter ? styles.on : ""}`}
              onClick={() => toggleConn("newsletter")}
            >
              <div className={styles.connIcon}><Mail size={16} /></div>
              <div>
                <div className={styles.connName}>Newsletter (Beehiiv / Mailchimp)</div>
                <div className={styles.connSub}>Convert views to email subscribers</div>
              </div>
              <div className={`${styles.connStatus} ${conn.newsletter ? styles.csOn : styles.csOff}`}>
                {conn.newsletter ? "<Check size={16} /> Connected" : "Connect"}
              </div>
            </div>
            <div
              style={{
                marginTop: "14px",
                padding: "13px",
                background: "var(--s2)",
                border: "1px solid var(--border)",
                borderRadius: "9px",
                fontSize: "12px",
                color: "var(--muted)",
                display: "flex",
                gap: "8px",
                alignItems: "flex-start",
              }}
            >
              <span><Lightbulb size={16} /></span>
              <span>
                You can connect these later from Settings. We only read your data — we never post anything on your behalf.
              </span>
            </div>
          </div>

          {/* S5: FIRST IDEA */}
          <div className={`${styles.screen} ${cur === 5 ? styles.active : ""}`}>
            <div className={styles.sLabel}>Step 5 — First Video</div>
            <h2 className={styles.sTitle}>
              AI picked your
              <br />
              first video idea
            </h2>
            <p className={styles.sSub}>Based on your niche and goals. You can swap it anytime inside the Topic Finder.</p>
            <div className={styles.ideaCard}>
              <div className={styles.ideaTag}><Flame size={14} /> Top Pick · {niche} Niche · Low Competition</div>
              <h3 className={styles.ideaTitle}>&quot;AI Side Hustles That Actually Pay $500 a Day in 2026&quot;</h3>
              <div className={styles.ideaStats}>
                <div className={styles.ist}>
                  <b>2.1M</b> est. views
                </div>
                <div className={styles.ist}>
                  <b>$18</b> RPM
                </div>
                <div className={styles.ist}>
                  <b>Low</b> competition
                </div>
                <div className={styles.ist}>
                  <b>9.4 / 10</b> score
                </div>
              </div>
              <div className={styles.ideaBtns}>
                <button
                  type="button"
                  className={`${styles.ib} ${styles.ibOut}`}
                  onClick={() => alert("Finding other viral ideas...")}
                >
                  <RefreshCw size={16} /> Different Idea
                </button>
                <button
                  type="button"
                  className={`${styles.ib} ${styles.ibRed}`}
                  onClick={() => setIdeaConfirmed(true)}
                >
                  {ideaConfirmed ? "<Check size={16} /> Confirmed" : "<PenTool size={16} /> Write Script Now"}
                </button>
              </div>
            </div>
            <div style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
              Workspace Setup Status
            </div>
            <div className={styles.checklist}>
              <div className={styles.ci}>
                <div className={`${styles.ciBox} ${styles.done}`}><Check size={16} /></div>
                <div className={`${styles.ciText} ${styles.done}`}>Profile created</div>
              </div>
              <div className={styles.ci}>
                <div className={`${styles.ciBox} ${styles.done}`}><Check size={16} /></div>
                <div className={`${styles.ciText} ${styles.done}`}>{niche} niche configured</div>
              </div>
              <div className={styles.ci}>
                <div className={`${styles.ciBox} ${styles.done}`}><Check size={16} /></div>
                <div className={`${styles.ciText} ${styles.done}`}>
                  {conn.youtube ? "YouTube channel connected" : "Setup custom goals completed"}
                </div>
              </div>
              <div className={styles.ci}>
                <div className={`${styles.ciBox} ${styles.done}`}><Check size={16} /></div>
                <div className={`${styles.ciText} ${styles.done}`}>AI tuned to your goals</div>
              </div>
              <div className={styles.ci}>
                <div className={`${styles.ciBox} ${ideaConfirmed ? styles.done : styles.pend}`}>
                  {ideaConfirmed ? "<Check size={16} />" : ""}
                </div>
                <div className={`${styles.ciText} ${ideaConfirmed ? styles.done : ""}`}>
                  First video topic confirmed
                </div>
              </div>
            </div>
          </div>

          {/* S6: SUCCESS */}
          <div className={`${styles.screen} ${styles.success} ${cur === 6 ? styles.active : ""}`}>
            <div className={styles.confetti}>🎉 <Rocket size={16} /> <Sparkles size={16} /> <Target size={16} /> <Flame size={16} /></div>
            <div className={styles.sLabel} style={{ textAlign: "center" }}>
              You&apos;re all set!
            </div>
            <h2 className={styles.sTitle} style={{ textAlign: "center", fontSize: "2.2rem" }}>
              Welcome to
              <br />
              AutoTubeOS <Play size={16} />
            </h2>
            <p className={styles.sSub} style={{ textAlign: "center", maxWidth: "420px", margin: "10px auto 24px" }}>
              Your AI-powered YouTube workspace is live. Here&apos;s what&apos;s waiting for you inside:
            </p>
            <div className={styles.launchCard}>
              <div className={styles.lcRow}>
                <div className={styles.lcDot}></div>
                <div className={styles.lcText}>
                  <b>Topic Finder</b> loaded with ideas for your {niche} niche
                </div>
              </div>
              <div className={styles.lcRow}>
                <div className={styles.lcDot}></div>
                <div className={styles.lcText}>
                  First <b>script</b> ready to generate — one click away
                </div>
              </div>
              <div className={styles.lcRow}>
                <div className={styles.lcDot}></div>
                <div className={styles.lcText}>
                  <b>Content Calendar</b> set up for {freq} videos/month
                </div>
              </div>
              <div className={styles.lcRow}>
                <div className={styles.lcDot}></div>
                <div className={styles.lcText}>
                  <b>YouTube Analytics</b> synced — real data, not estimates
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                className={styles.nextBtn}
                style={{ margin: "0 auto", padding: "13px 44px", fontSize: "15px" }}
                onClick={handleFinishSetup}
              >
                Open Dashboard →
              </button>
              <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--muted2)" }}>
                No credit card required · Free for 14 days
              </div>
            </div>
          </div>
        </div>

        {cur < total && (
          <div className={styles.bottom}>
            <button
              className={styles.backBtn}
              onClick={() => go(cur - 1)}
              style={{
                opacity: cur > 1 ? "1" : "0",
                pointerEvents: cur > 1 ? "auto" : "none",
              }}
            >
              ← Back
            </button>
            <div className={styles.hint}>{hints[cur - 1] || ""}</div>
            <button className={styles.nextBtn} onClick={() => go(cur + 1)}>
              {cur === total - 1 ? "Finish Setup <Rocket size={16} />" : "Continue"} <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
