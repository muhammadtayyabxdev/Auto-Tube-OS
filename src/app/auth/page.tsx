"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/auth.module.css";
import { Eye, Star } from 'lucide-react';

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
            <div className={styles.stars}><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /></div>
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
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle" }}>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </span> Google
              </button>
              <button type="button" className={styles.oauthBtn}>
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle" }}>
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </span> Twitter
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
                  {showSignInPw ? "🙈" : "<Eye size={16} />"}
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
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle" }}>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </span> Google
              </button>
              <button type="button" className={styles.oauthBtn}>
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: "middle" }}>
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </span> Twitter
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
                  {showSignUpPw ? "🙈" : "<Eye size={16} />"}
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
