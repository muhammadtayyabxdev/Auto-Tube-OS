import Head from 'next/head';


import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/auth.module.css";
import { Star, Eye, EyeOff, Check, Circle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSignIn, useSignUp } from "@clerk/nextjs";

export default function Auth() {
  const router = useRouter();
  const { loading } = useAuth(false); // requireAuth = false: redirects to dashboard/previous target if already logged in
  
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [showSignInPw, setShowSignInPw] = useState(false);
  const [showSignUpPw, setShowSignUpPw] = useState(false);
  
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  
  const [signUpEmail, setSignUpEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [strength, setStrength] = useState({ pct: 0, color: "#ff3d3d" });

  const pwRules = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "One number", test: (p: string) => /[0-9]/.test(p) },
    { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

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

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;
    setAuthError("");
    setAuthLoading(true);

    try {
      const result = await signIn.create({
        identifier: signInEmail,
        password: signInPassword,
      });

      if (result.error) {
        setAuthError(result.error.message || "Invalid email or password. Please try again.");
      } else if (signIn.status === "complete") {
        const finalizeResult = await signIn.finalize();
        if (finalizeResult.error) {
          setAuthError(finalizeResult.error.message || "Failed to finalize session.");
        } else {
          const dest = (router.query.redirect as string) || "/dashboard";
          router.push(dest);
        }
      } else {
        setAuthError(`Sign in status is ${signIn.status}. Additional steps may be required.`);
      }
    } catch (err: any) {
      setAuthError(err.message || "An unexpected error occurred.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;
    setAuthError("");
    setAuthLoading(true);

    try {
      const createResult = await signUp.create({
        emailAddress: signUpEmail,
        password,
        firstName,
        lastName,
      });

      if (createResult.error) {
        setAuthError(createResult.error.message || "Failed to create account. Please check your information.");
      } else {
        const sendResult = await signUp.verifications.sendEmailCode();
        if (sendResult.error) {
          setAuthError(sendResult.error.message || "Failed to send verification email.");
        } else {
          const redirectParam = router.query.redirect ? `?redirect=${encodeURIComponent(router.query.redirect as string)}` : '';
          router.push(`/email-verify?email=${encodeURIComponent(signUpEmail)}${redirectParam}`);
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to create account.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleOAuthSignIn = async (strategy: "oauth_google" | "oauth_twitter" | "oauth_facebook") => {
    if (!signIn) return;
    setAuthError("");
    try {
      const redirectUrl = window.location.origin + "/sso-callback";
      const redirectCallbackUrl = window.location.origin + ((router.query.redirect as string) || "/dashboard");
      
      const result = await signIn.sso({
        strategy,
        redirectUrl,
        redirectCallbackUrl,
      });
      
      if (result.error) {
        setAuthError(result.error.message || "OAuth redirect failed.");
      }
    } catch (err: any) {
      setAuthError(err.message || "OAuth redirect failed.");
    }
  };



  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#07080c',
        color: '#eef0f6',
        fontFamily: 'sans-serif'
      }}>
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#ff3d3d" style={{ marginBottom: '16px' }}>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="3">
              <circle strokeOpacity=".1" cx="18" cy="18" r="18" stroke="#ffffff"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
        <div style={{ fontSize: '12px', color: '#a0aec0', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Verifying Session...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <linearGradient id="starHalfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="60%" stopColor="var(--red)" stopOpacity="1" />
            <stop offset="60%" stopColor="rgba(255, 61, 61, 0.05)" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
      <Head>
        <title>Sign In / Sign Up — AutoTube OS</title>
        <meta name="description" content="Access your AutoTube OS workspace and automate your YouTube content pipeline." />
      </Head>

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
            <div className={styles.stars}>
              <Star size={16} stroke="var(--red)" fill="var(--red)" strokeWidth={1.5} />
              <Star size={16} stroke="var(--red)" fill="var(--red)" strokeWidth={1.5} />
              <Star size={16} stroke="var(--red)" fill="var(--red)" strokeWidth={1.5} />
              <Star size={16} stroke="var(--red)" fill="var(--red)" strokeWidth={1.5} />
              <Star size={16} stroke="var(--red)" fill="url(#starHalfGrad)" strokeWidth={1.5} />
            </div>
            <p className={styles.testiText}>
              &quot;I run 3 channels and AutoTubeOS replaced every other tool in my stack. The script generator alone saves me 4 hours a week.&quot;
            </p>
            <div className={styles.testiAuthor}>
              <div className={styles.tAv}>
                <img src="/james_avatar.png" alt="James L." style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
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
              <button type="button" className={styles.oauthBtn} onClick={() => handleOAuthSignIn("oauth_google")} disabled={authLoading}>
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </span> Google
              </button>
              <button type="button" className={styles.oauthBtn} onClick={() => handleOAuthSignIn("oauth_facebook")} disabled={authLoading}>
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </span> Facebook
              </button>
              <button type="button" className={styles.oauthBtn} onClick={() => handleOAuthSignIn("oauth_twitter")} disabled={authLoading}>
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg">
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
              <input
                className={styles.inp}
                type="email"
                placeholder="you@example.com"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
                disabled={authLoading}
              />
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
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  required
                  disabled={authLoading}
                />
                <span
                  className={styles.inpIcon}
                  onClick={() => setShowSignInPw(!showSignInPw)}
                >
                  {showSignInPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              </div>
            </div>
            {authError && tab === "signin" && (
              <div style={{ color: "var(--red)", fontSize: "13px", marginBottom: "14px", textAlign: "center" }}>
                {authError}
              </div>
            )}
            <button type="submit" className={styles.submitBtn} disabled={authLoading}>
              {authLoading ? "Signing in..." : "Sign In"}
            </button>
            <div className={styles.formNote}>
              Don&apos;t have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setTab("signup"); setAuthError(""); }}>
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
              <button type="button" className={styles.oauthBtn} onClick={() => handleOAuthSignIn("oauth_google")} disabled={authLoading}>
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </span> Google
              </button>
              <button type="button" className={styles.oauthBtn} onClick={() => handleOAuthSignIn("oauth_facebook")} disabled={authLoading}>
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </span> Facebook
              </button>
              <button type="button" className={styles.oauthBtn} onClick={() => handleOAuthSignIn("oauth_twitter")} disabled={authLoading}>
                <span className={styles.oauthIcon}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg">
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
                <input
                  className={styles.inp}
                  placeholder="Ahmed"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={authLoading}
                />
              </div>
              <div>
                <label className={styles.fieldLabel}>Last Name</label>
                <input
                  className={styles.inp}
                  placeholder="Khan"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={authLoading}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input
                className={styles.inp}
                type="email"
                placeholder="you@example.com"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
                disabled={authLoading}
              />
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
                  disabled={authLoading}
                />
                <span
                  className={styles.inpIcon}
                  onClick={() => setShowSignUpPw(!showSignUpPw)}
                >
                  {showSignUpPw ? <EyeOff size={16} /> : <Eye size={16} />}
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
            {password && (
              <div className={styles.pwRulesCard}>
                <div className={styles.pwRulesTitle}>Password requirements</div>
                <div className={styles.pwRulesList}>
                  {pwRules.map((rule) => {
                    const passed = rule.test(password);
                    return (
                      <div key={rule.label} className={`${styles.pwRule} ${passed ? styles.pwRulePass : ""}`}>
                        <span className={styles.pwRuleIcon}>
                          {passed
                            ? <Check size={11} strokeWidth={3} />
                            : <Circle size={9} strokeWidth={2} />}
                        </span>
                        {rule.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {authError && tab === "signup" && (
              <div style={{ color: "var(--red)", fontSize: "13px", marginBottom: "14px", textAlign: "center" }}>
                {authError}
              </div>
            )}
            <button type="submit" className={styles.submitBtn} disabled={authLoading}>
              {authLoading ? "Creating Account..." : "Create Free Account"}
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
              <a href="#" onClick={(e) => { e.preventDefault(); setTab("signin"); setAuthError(""); }}>
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
