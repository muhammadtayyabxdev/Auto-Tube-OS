import Head from 'next/head';


import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/password-reset.module.css";
import { Check, Eye, EyeOff, Key, Lock, Mail, X } from 'lucide-react';
import { useSignIn } from "@clerk/nextjs";

export default function PasswordReset() {
  const router = useRouter();
  const { signIn } = useSignIn();
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [strength, setStrength] = useState({ pct: 0, color: "#ff3d3d", label: "Enter a password" });
  const [matchMsg, setMatchMsg] = useState<{ text: React.ReactNode; color: string }>({ text: "", color: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

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
        setMatchMsg({ text: <><Check size={16} /> Passwords match</>, color: "var(--green)" });
      } else {
        setMatchMsg({ text: <><X size={16} /> Do not match</>, color: "var(--red)" });
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
      setMatchMsg({ text: <><Check size={16} /> Passwords match</>, color: "var(--green)" });
    } else {
      setMatchMsg({ text: <><X size={16} /> Do not match</>, color: "var(--red)" });
    }
  };

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;
    setErrorMsg("");
    setLoading(true);

    try {
      const createResult = await signIn.create({
        identifier: email,
      });

      if (createResult.error) {
        setErrorMsg(createResult.error.message || "Failed to initiate password reset.");
        return;
      }

      const sendResult = await signIn.resetPasswordEmailCode.sendCode();
      if (sendResult.error) {
        setErrorMsg(sendResult.error.message || "Failed to send reset code.");
      } else {
        setStep(2);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!signIn) return;
    setErrorMsg("");
    try {
      const result = await signIn.resetPasswordEmailCode.sendCode();
      if (result.error) {
        setErrorMsg(result.error.message || "Failed to resend code.");
      } else {
        alert("Verification code has been resent to your email.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to resend code.");
    }
  };

  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;
    if (!newPw || newPw !== confirmPw) {
      setMatchMsg({ text: <><X size={16} /> Passwords do not match</>, color: "var(--red)" });
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      // First verify the code
      const verifyResult = await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });

      if (verifyResult.error) {
        setErrorMsg(verifyResult.error.message || "Invalid or expired code. Please try again.");
      } else {
        // Then submit the new password
        const submitResult = await signIn.resetPasswordEmailCode.submitPassword({
          password: newPw,
        });

        if (submitResult.error) {
          setErrorMsg(submitResult.error.message || "Failed to update password.");
        } else if (signIn.status === "complete") {
          const finalizeResult = await signIn.finalize();
          if (finalizeResult.error) {
            setErrorMsg(finalizeResult.error.message || "Failed to finalize session.");
          } else {
            setStep(4);
          }
        } else {
          setErrorMsg(`Reset status is ${signIn.status}. Additional steps may be required.`);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Head>
        <title>Reset Password — AutoTube OS</title>
        <meta name="description" content="Securely reset your AutoTube OS creator account password." />
      </Head>

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
                  disabled={loading}
                />
              </div>
              {errorMsg && step === 1 && (
                <div style={{ color: "var(--red)", fontSize: "13px", marginBottom: "14px", textAlign: "center" }}>
                  {errorMsg}
                </div>
              )}
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Sending Code..." : "Send Verification Code"}
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
                We sent a verification code to{" "}
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
                  onClick={handleResendCode}
                >
                  click here to resend
                </span>
                .
              </div>
              {errorMsg && step === 2 && (
                <div style={{ color: "var(--red)", fontSize: "13px", marginBottom: "14px", textAlign: "center" }}>
                  {errorMsg}
                </div>
              )}
              <button className={`${styles.submitBtn} ${styles.blue}`} onClick={() => setStep(3)}>
                I got the code, continue
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
                <label className={styles.fieldLabel}>Verification Code</label>
                <input
                  className={styles.inp}
                  type="text"
                  placeholder="Enter the 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
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
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.eye}
                    onClick={() => setShowNewPw(!showNewPw)}
                  >
                    {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
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
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.eye}
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                  >
                    {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {matchMsg.text && (
                  <div style={{ fontSize: "11px", marginTop: "4px", color: matchMsg.color }}>
                    {matchMsg.text}
                  </div>
                )}
              </div>
              {errorMsg && step === 3 && (
                <div style={{ color: "var(--red)", fontSize: "13px", marginBottom: "14px", textAlign: "center" }}>
                  {errorMsg}
                </div>
              )}
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
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
                Go to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
