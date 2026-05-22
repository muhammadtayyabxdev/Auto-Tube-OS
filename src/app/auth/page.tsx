"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/auth.module.css";

export default function Auth() {
  const router = useRouter();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [showSignInPw, setShowSignInPw] = useState(false);
  const [showSignUpPw, setShowSignUpPw] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ pct: 0, color: "#ff3d3d" });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (!val) {
      setStrength({ pct: 0, color: "#ff3d3d" });
      return;
    }
    let score = 0;
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const pct = Math.min((score / 4) * 100, 100);
    const colors = ["#ff3d3d", "#f59e0b", "#f59e0b", "#22c55e", "#22c55e"];
    setStrength({ pct, color: colors[score] || "#ff3d3d" });
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login, redirect to Dashboard
    router.push("/dashboard");
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful sign up, redirect to Onboarding
    router.push("/onboarding");
  };

  return (
    <div className={styles.shell}>
      {/* LEFT PANEL */}
      <div className={styles.left}>
        <div className={styles.leftGrid}></div>
        <div className={styles.leftGlow}></div>
        <div className={styles.leftGlow2}></div>
        <div className={styles.leftTop}>
          <Link href="/" className={styles.logo}>
            AutoTube<span>OS</span>
          </Link>
        </div>
        <div className={styles.leftContent}>
          <div className={styles.leftTag}>Trusted by 1,200+ creators</div>
          <h1 className={styles.leftTitle}>
            Your YouTube channel.
            <br />
            On autopilot.
          </h1>
          <p className={styles.leftSub}>
            Stop juggling 7 tools. Run your entire YouTube automation workflow — from viral ideas to published videos — inside one AI-powered workspace.
          </p>
          <div className={styles.statsMini}>
            <div className={styles.statM}>
              <div className={styles.statMNum}>73%</div>
              <div className={styles.statMLbl}>Time saved per video</div>
            </div>
            <div className={styles.statM}>
              <div className={styles.statMNum}>3×</div>
              <div className={styles.statMLbl}>More output per month</div>
            </div>
            <div className={styles.statM}>
              <div className={styles.statMNum}>$0</div>
              <div className={styles.statMLbl}>Extra tools needed</div>
            </div>
          </div>
        </div>
        <div className={styles.leftBottom}>
          <div className={styles.testi}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.testiText}>
              &quot;I run 3 channels and AutoTubeOS replaced every other tool in my stack. The script generator alone saves me 4 hours a week.&quot;
            </p>
            <div className={styles.testiAuthor}>
              <div className={styles.tAv}>JL</div>
              <div>
                <div className={styles.tName}>James L.</div>
                <div className={styles.tRole}>YouTube Agency · 12 clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.right}>
        <div className={styles.formWrap}>
          <div className={styles.formLogo}>
            AutoTube<span>OS</span>
          </div>
          <div className={styles.tabRow}>
            <button
              className={`${styles.tab} ${tab === "signin" ? styles.on : ""}`}
              onClick={() => setTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`${styles.tab} ${tab === "signup" ? styles.on : ""}`}
              onClick={() => setTab("signup")}
            >
              Create Account
            </button>
          </div>

          {/* SIGN IN */}
          <form
            onSubmit={handleSignInSubmit}
            className={`${styles.pwScreen} ${tab === "signin" ? styles.active : ""}`}
          >
            <h2 className={styles.formTitle}>Welcome back</h2>
            <p className={styles.formSub}>Sign in to your workspace</p>
            <div className={styles.oauthRow}>
              <button type="button" className={styles.oauthBtn}>
                <span className={styles.oauthIcon}>G</span> Google
              </button>
              <button type="button" className={styles.oauthBtn}>
                <span className={styles.oauthIcon}>𝕏</span> Twitter
              </button>
            </div>
            <div className={styles.dividerRow}>
              <div className={styles.dividerLine}></div>
              <div className={styles.dividerText}>or continue with email</div>
              <div className={styles.dividerLine}></div>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input className={styles.inp} type="email" placeholder="you@example.com" required />
            </div>
            <div className={styles.field}>
              <div className={styles.fieldRow}>
                <label className={styles.fieldLabel} style={{ margin: 0 }}>
                  Password
                </label>
                <Link href="/password-reset" className={styles.forgot}>
                  Forgot password?
                </Link>
              </div>
              <div className={styles.inpWrap}>
                <input
                  className={styles.inp}
                  type={showSignInPw ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <span
                  className={styles.inpIcon}
                  onClick={() => setShowSignInPw(!showSignInPw)}
                >
                  {showSignInPw ? "🙈" : "👁"}
                </span>
              </div>
            </div>
            <button type="submit" className={styles.submitBtn}>
              Sign In →
            </button>
            <div className={styles.formNote}>
              Don&apos;t have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setTab("signup"); }}>
                Create one free
              </a>
            </div>
          </form>

          {/* SIGN UP */}
          <form
            onSubmit={handleSignUpSubmit}
            className={`${styles.pwScreen} ${tab === "signup" ? styles.active : ""}`}
          >
            <h2 className={styles.formTitle}>Start for free</h2>
            <p className={styles.formSub}>14-day trial · No credit card needed</p>
            <div className={styles.oauthRow}>
              <button type="button" className={styles.oauthBtn}>
                <span className={styles.oauthIcon}>G</span> Google
              </button>
              <button type="button" className={styles.oauthBtn}>
                <span className={styles.oauthIcon}>𝕏</span> Twitter
              </button>
            </div>
            <div className={styles.dividerRow}>
              <div className={styles.dividerLine}></div>
              <div className={styles.dividerText}>or continue with email</div>
              <div className={styles.dividerLine}></div>
            </div>
            <div className={styles.field} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <label className={styles.fieldLabel}>First Name</label>
                <input className={styles.inp} placeholder="Ahmed" required />
              </div>
              <div>
                <label className={styles.fieldLabel}>Last Name</label>
                <input className={styles.inp} placeholder="Khan" required />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input className={styles.inp} type="email" placeholder="you@example.com" required />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Password</label>
              <div className={styles.inpWrap}>
                <input
                  className={styles.inp}
                  type={showSignUpPw ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <span
                  className={styles.inpIcon}
                  onClick={() => setShowSignUpPw(!showSignUpPw)}
                >
                  {showSignUpPw ? "🙈" : "👁"}
                </span>
              </div>
              {password && (
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{ width: `${strength.pct}%`, backgroundColor: strength.color }}
                  ></div>
                </div>
              )}
            </div>
            <button type="submit" className={styles.submitBtn}>
              Create Free Account →
            </button>
            <div className={styles.termsNote}>
              By signing up you agree to our{" "}
              <Link href="/legal" style={{ color: "var(--red)" }}>
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/legal" style={{ color: "var(--red)" }}>
                Privacy Policy
              </Link>
            </div>
            <div className={styles.formNote} style={{ marginTop: "8px" }}>
              Already have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setTab("signin"); }}>
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
