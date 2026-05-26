import Head from 'next/head';


import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/email-verify.module.css";
import { Check, Lightbulb, Mail } from 'lucide-react';
import { useSignUp } from "@clerk/nextjs";

export default function EmailVerify() {
  const router = useRouter();
  const { signUp } = useSignUp();
  
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [verifying, setVerifying] = useState(false);

  const displayEmail = signUp?.emailAddress || (router.query.email as string) || "your email";

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const startResend = async () => {
    if (!signUp) return;
    setErrorMsg("");
    try {
      const result = await signUp.verifications.sendEmailCode();
      if (result.error) {
        setErrorMsg(result.error.message || "Failed to resend code.");
      } else {
        setTimer(60);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to resend code.");
    }
  };

  const handleOtpChange = (val: string, idx: number) => {
    // Only allow single characters/digits
    const char = val.slice(-1);
    const newOtp = [...otp];
    newOtp[idx] = char;
    setOtp(newOtp);

    // Focus next input if a value was entered
    if (char && idx < 5) {
      const nextInp = document.getElementById(`otp-${idx + 1}`) as HTMLInputElement;
      nextInp?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const prevInp = document.getElementById(`otp-${idx - 1}`) as HTMLInputElement;
      prevInp?.focus();
    }
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!signUp) return;
    setErrorMsg("");
    setVerifying(true);

    try {
      const verifyResult = await signUp.verifications.verifyEmailCode({
        code: otp.join(""),
      });

      if (verifyResult.error) {
        setErrorMsg(verifyResult.error.message || "Invalid or expired code. Please try again.");
      } else if (signUp.status === "complete") {
        const finalizeResult = await signUp.finalize();
        if (finalizeResult.error) {
          setErrorMsg(finalizeResult.error.message || "Failed to finalize session.");
        } else {
          setVerified(true);
        }
      } else {
        setErrorMsg(`Sign up status is ${signUp.status}. Additional steps may be required.`);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid or expired code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };


  const allFilled = otp.every((char) => char !== "");

  return (
    <>
      <Head>
        <title>Email Verification — AutoTube OS</title>
        <meta name="description" content="Verify your email address to unlock early waitlist access and 50% discount for life." />
      </Head>
      <div className={styles.bg}>
        <div className={styles.grid}></div>
        <div className={styles.glow}></div>
      </div>

      <div className={styles.topNav}>
        <Link href="/" className={styles.logo}>
          AutoTube<span>OS</span>
        </Link>
      </div>

      <div className={styles.shell}>
        {/* PENDING */}
        {!verified ? (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.ringWrap}>
                <svg className={styles.ringSvg} width="80" height="80" viewBox="0 0 80 80">
                  <circle className={styles.ringBg} cx="40" cy="40" r="34" />
                  <circle className={styles.ringFill} cx="40" cy="40" r="34" />
                </svg>
                <div className={styles.ringText}><Mail size={16} /></div>
              </div>
              <h2 className={styles.cardTitle}>Verify your email</h2>
              <p className={styles.cardSub}>
                We sent a verification link to <strong style={{ color: "var(--text)" }}>{displayEmail}</strong>.
                Click the link to activate your account.
              </p>
            </div>
            <form onSubmit={handleVerify} className={styles.cardBody}>
              <div style={{ fontSize: "12px", color: "var(--muted2)", textAlign: "center", marginBottom: "12px" }}>
                Or enter the 6-digit code from the email
              </div>
              <div className={styles.otpRow}>
                {otp.map((char, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    className={styles.otpInp}
                    maxLength={1}
                    value={char}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    disabled={verifying}
                    style={{
                      borderColor: allFilled ? "var(--green-border)" : undefined,
                    }}
                  />
                ))}
              </div>
              <div className={styles.resendRow}>
                {timer > 0 ? (
                  <span>Resend code in {timer}s</span>
                ) : (
                  <span>
                    Didn&apos;t get it?{" "}
                    <span className={styles.resendLink} onClick={startResend}>
                      Resend code
                    </span>
                  </span>
                )}
              </div>
              {errorMsg && (
                <div style={{ color: "var(--red)", fontSize: "13px", marginBottom: "14px", textAlign: "center" }}>
                  {errorMsg}
                </div>
              )}
              <button type="submit" className={styles.submitBtn} disabled={verifying}>
                {verifying ? "Verifying..." : "Verify Email"}
              </button>
              <div
                style={{
                  marginTop: "12px",
                  padding: "12px",
                  background: "var(--s2)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "var(--muted)",
                }}
              >
                <Lightbulb size={16} /> Check your spam folder. Link/code expires in 24 hours.
              </div>
            </form>
          </div>
        ) : (
          /* VERIFIED */
          <div className={styles.card}>
            <div className={styles.cardBody} style={{ padding: "40px 32px", textAlign: "center" }}>
              <div className={styles.checkmark}><Check size={16} /></div>
              <h2 style={{ fontFamily: "var(--fh)", fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px" }}>
                Email verified!
              </h2>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px" }}>
                Your account is active. Welcome to AutoTubeOS!
              </p>
              <div
                style={{
                  background: "var(--s2)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "14px",
                  margin: "0 0 20px",
                  textAlign: "left",
                }}
              >
                <div style={{ fontSize: "12px", color: "var(--muted2)", marginBottom: "8px" }}>
                  What happens next:
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div><Check size={16} /> 14-day free trial started</div>
                  <div><Check size={16} /> Workspace created</div>
                  <div><Check size={16} /> Welcome email sent</div>
                </div>
              </div>
              <button
                className={`${styles.submitBtn} ${styles.green}`}
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
