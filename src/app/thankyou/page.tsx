'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/thankyou.module.css';

export default function ThankYouPage() {
  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.gridBg}></div>
        <div className={styles.glow}></div>
        <div className={styles.inner}>
          <div className={styles.confetti}>🎉 🚀 ✨ 🎯</div>
          <div className={styles.badge}>✓ Payment Confirmed</div>
          <h1 className={styles.title}>
            Welcome to
            <br />
            <em>AutoTubeOS Pro!</em>
          </h1>
          <p className={styles.sub}>
            Your account is active and your 14-day trial clock has stopped. You're now on Pro — here's everything you
            just unlocked.
          </p>

          <div className={styles.planCard}>
            <div className={styles.pcHeader}>
              <div className={styles.pcPlan}>🚀 Pro Plan</div>
              <div className={styles.pcBadge}>✓ Active</div>
            </div>
            <div className={styles.pcItems}>
              <div className={styles.pcItem}>
                <b>Unlimited</b> topic ideas & scripts
              </div>
              <div className={styles.pcItem}>
                <b>3</b> channel workspaces
              </div>
              <div className={styles.pcItem}>
                Shorts Repurposer — <b>10/month</b>
              </div>
              <div className={styles.pcItem}>
                Competitor Intelligence & Retention Optimizer
              </div>
              <div className={styles.pcItem}>
                Content Calendar + Priority Support
              </div>
            </div>
          </div>

          <div className={styles.btns}>
            <Link href="/dashboard" className={styles.btnGreen}>
              Open Dashboard →
            </Link>
            <button 
              className={styles.btnGhost}
              onClick={() => alert('Receipt downloaded as PDF!')}
            >
              View Receipt
            </button>
          </div>

          <div className={styles.meta}>
            <span>📧 Receipt sent to ahmed@example.com</span>
            <span>📅 Next billing: June 1, 2026</span>
            <span>💳 Visa •••• 4242</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
