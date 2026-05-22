"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/password-reset.module.css";
import { Check, Key, Lock, Mail } from 'lucide-react';

export default function PasswordReset() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [strength, setStrength] = useState({ pct: 0, color: "#ff3d3d", label: "Enter a password" });
  const [matchMsg, setMatchMsg] = useState({ text: "", color: "" });

  const checkStr = (val: string) => {
    setNewPw(val);
    if (!val) {
      setStrength({ pct: 0, color: "#ff3d3d", label: "Enter a password" });
      return;
    }
    let s = 0;
    if (val.length >= 8) s++;
    if (val.length >= 12) s++;
    if (/[A-Z]/.test(val)) s++;
    if (/[0-9]/.test(val)) s++;
    if (/[^A-Za-z0-9]/.test(val)) s++;

    const colors = ["#ff3d3d", "#f59e0b", "#f59e0b", "#22c55e", "#22c55e"];
    const labels = ["Too weak", "Weak", "Fair", "Strong", "Very strong"];
    const pct = Math.min((s / 4) * 100, 100);
    setStrength({ pct, color: colors[s], label: labels[s] });

    if (confirmPw) {
      if (val === confirmPw) {
        setMatchMsg({ text: "<Check size={16} /> Passwords match", color: "var(--green)" });
      } else {
        setMatchMsg({ text: "<X size={16} /> Do not match", color: "var(--red)" });
      }
    }
  };

  const handleConfirmChange = (val: string) => {
    setConfirmPw(val);
    if (!val) {
      setMatchMsg({ text: "", color: "" });
      return;
    }
    if (newPw === val) {
      setMatchMsg({ text: "<Check size={16} /> Passwords match", color: "var(--green)" });
    } else {
      setMatchMsg({ text: "<X size={16} /> Do not match", color: "var(--red)" });
    }
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPw || newPw !== confirmPw) {
      setMatchMsg({ text: "<X size={16} /> Passwords do not match", color: "var(--red)" });
      return;
    }
    setStep(4);
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.grid}></div>
        <div className={styles.glow}></div>
      </div>

      <div className={styles.topNav}>
        <Link href="/" className={styles.logo}>
          AutoTube<span>OS</span>
        </Link>
        <Link href="/auth" className={styles.backLink}>
          ← Back to Login
        </Link>
      </div>

      <div className={styles.shell}>
        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleStep1} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconWrap} ${styles.iconRed}`}><Key size={16} /></div>
              <div className={styles.steps}>
                <div className={`${styles.sDot} ${styles.active}`}></div>
                <div className={styles.sDot}></div>
                <div className={styles.sDot}></div>
              </div>
              <h2 className={styles.cardTitle}>Forgot your password?</h2>
              <p className={styles.cardSub}>
                Enter your email and we&apos;ll send you a reset link within 60 seconds.
              </p>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Email Address</label>
                <input
                  className={styles.inp}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn}>
                Send Reset Link →
              </button>
            </div>
            <div className={styles.cardFooter}>
              <Link href="/auth">← Back to login</Link>
            </div>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconWrap} ${styles.iconBlue}`}><Mail size={16} /></div>
              <div className={styles.steps}>
                <div className={`${styles.sDot} ${styles.done}`}></div>
                <div className={`${styles.sDot} ${styles.active}`}></div>
                <div className={styles.sDot}></div>
              </div>
              <h2 className={styles.cardTitle}>Check your inbox</h2>
              <p className={styles.cardSub}>
                We sent a reset link to{" "}
                <strong style={{ color: "var(--text)" }}>{email || "you@example.com"}</strong>. Expires in
                15 minutes.
              </p>
            </div>
            <div className={styles.cardBody}>
              <div
                style={{
                  background: "var(--s2)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "16px",
                  fontSize: "13px",
                  color: "var(--muted)",
                }}
              >
                Check your spam folder, or{" "}
                <span
                  style={{ color: "var(--red)", cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => setStep(2)}
                >
                  click here to resend
                </span>
                .
              </div>
              <button className={`${styles.submitBtn} ${styles.blue}`} onClick={() => setStep(3)}>
                I got the link, continue →
              </button>
            </div>
            <div className={styles.cardFooter}>
              <a href="#" onClick={(e) => { e.preventDefault(); setStep(1); }}>
                ← Use a different email
              </a>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleStep3} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={`${styles.iconWrap} ${styles.iconRed}`}><Lock size={16} /></div>
              <div className={styles.steps}>
                <div className={`${styles.sDot} ${styles.done}`}></div>
                <div className={`${styles.sDot} ${styles.done}`}></div>
                <div className={`${styles.sDot} ${styles.active}`}></div>
              </div>
              <h2 className={styles.cardTitle}>Set new password</h2>
              <p className={styles.cardSub}>Choose a strong password you haven&apos;t used before.</p>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>New Password</label>
                <div className={styles.inpWrap}>
                  <input
                    className={styles.inp}
                    type={showNewPw ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={newPw}
                    onChange={(e) => checkStr(e.target.value)}
                    style={{ paddingRight: "40px" }}
                    required
                  />
                  <button
                    type="button"
                    className={styles.eye}
                    onClick={() => setShowNewPw(!showNewPw)}
                  >
                    {showNewPw ? "🙈" : "<Eye size={16} />"}
                  </button>
                </div>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{ width: `${strength.pct}%`, backgroundColor: strength.color }}
                  ></div>
                </div>
                <div className={styles.strengthLabel} style={{ color: strength.color }}>
                  {strength.label}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Confirm Password</label>
                <div className={styles.inpWrap}>
                  <input
                    className={styles.inp}
                    type={showConfirmPw ? "text" : "password"}
                    placeholder="Repeat password"
                    value={confirmPw}
                    onChange={(e) => handleConfirmChange(e.target.value)}
                    style={{ paddingRight: "40px" }}
                    required
                  />
                  <button
                    type="button"
                    className={styles.eye}
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                  >
                    {showConfirmPw ? "🙈" : "<Eye size={16} />"}
                  </button>
                </div>
                {matchMsg.text && (
                  <div style={{ fontSize: "11px", marginTop: "4px", color: matchMsg.color }}>
                    {matchMsg.text}
                  </div>
                )}
              </div>
              <button type="submit" className={styles.submitBtn}>
                Reset Password →
              </button>
            </div>
          </form>
        )}

        {/* DONE */}
        {step === 4 && (
          <div className={styles.card}>
            <div className={styles.cardBody} style={{ padding: "36px", textAlign: "center" }}>
              <div className={styles.checkmark}><Check size={16} /></div>
              <h2 className={styles.cardTitle} style={{ marginBottom: "8px" }}>
                Password reset!
              </h2>
              <p className={styles.cardSub} style={{ marginBottom: "20px" }}>
                Your password has been updated. You can now log in.
              </p>
              <button
                className={`${styles.submitBtn} ${styles.green}`}
                onClick={() => router.push("/auth")}
              >
                Go to Login →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
