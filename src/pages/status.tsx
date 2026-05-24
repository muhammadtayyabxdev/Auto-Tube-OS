import Head from 'next/head';


import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/status.module.css';
import { AlertTriangle, Check, MailOpen } from 'lucide-react';

interface ServiceItemProps {
  name: string;
  uptime: string;
  degradedIndex?: number; // 0-indexed, which bar is orange (e.g. 28)
  downIndex?: number;
  status: 'Operational' | 'Degraded Performance' | 'Major Outage';
}

function UptimeBars({ degradedIndex, downIndex }: { degradedIndex?: number; downIndex?: number }) {
  const bars = Array.from({ length: 30 });
  return (
    <div className={styles.ubRow}>
      {bars.map((_, idx) => {
        let barClass = styles.ub;
        if (idx === degradedIndex) {
          barClass = `${styles.ub} ${styles.deg}`;
        } else if (idx === downIndex) {
          barClass = `${styles.ub} ${styles.dn}`;
        }
        return <div key={idx} className={barClass} />;
      })}
    </div>
  );
}

function ServiceItem({ name, uptime, degradedIndex, downIndex, status }: ServiceItemProps) {
  const getBadgeClass = () => {
    if (status === 'Operational') return `${styles.badge} ${styles.bOp}`;
    if (status === 'Degraded Performance') return `${styles.badge} ${styles.bDeg}`;
    return `${styles.badge} ${styles.bDn}`;
  };

  return (
    <div className={styles.svcRow}>
      <div className={styles.svcLeft}>
        <div className={styles.svcName}>{name}</div>
        <div className={styles.svcUptime}>{uptime}</div>
      </div>
      <div className={styles.svcRight}>
        <UptimeBars degradedIndex={degradedIndex} downIndex={downIndex} />
        <span className={getBadgeClass()}>{status}</span>
      </div>
    </div>
  );
}

export default function StatusPage() {
  const [email, setEmail] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('May 20, 2026 at 14:32 PKT');

  useEffect(() => {
    // Simulate periodic auto-refresh timestamp
    const interval = setInterval(() => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      setLastUpdated(`Just now (refreshed at ${now.toLocaleTimeString(undefined, options)})`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setToastVisible(true);
    setEmail('');
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  return (
    <>
      <Head>
        <title>System Status — AutoTube OS</title>
        <meta name="description" content="Real-time system uptime metrics, API status, and server responsiveness report." />
      </Head>

      <Navbar />

      <div className={styles.hero}>
        <div className={styles.overall}>
          <div className={styles.osDot}></div>
          <div className={styles.osText}>All Systems Operational</div>
        </div>
        <h1 className={styles.hTitle}>AutoTubeOS System Status</h1>
        <p className={styles.hSub}>Real-time status for all AutoTubeOS services and infrastructure.</p>
        <div className={styles.updated}>Last updated: {lastUpdated} · Auto-refreshes every 60s</div>
      </div>

      <div className={styles.section}>
        <div className={styles.svcGroup}>
          <div className={styles.grpTitle}>Core Platform</div>
          <ServiceItem name="Dashboard & App" uptime="99.98% uptime (90d)" status="Operational" />
          <ServiceItem name="Authentication" uptime="100% uptime (90d)" status="Operational" />
          <ServiceItem name="API" uptime="99.95% uptime (90d)" status="Operational" />
        </div>

        <div className={styles.svcGroup}>
          <div className={styles.grpTitle}>AI Services</div>
          <ServiceItem name="Script Generator" uptime="99.91% uptime (90d)" status="Operational" />
          <ServiceItem name="Topic Finder" uptime="99.88% uptime (90d)" status="Operational" />
          <ServiceItem name="Shorts Repurposer" uptime="98.7% uptime (90d)" degradedIndex={28} status="Degraded Performance" />
          <ServiceItem name="AI Agents (Beta)" uptime="99.5% uptime (30d)" status="Operational" />
        </div>

        <div className={styles.svcGroup}>
          <div className={styles.grpTitle}>Infrastructure</div>
          <div className={styles.svcRow}>
            <div className={styles.svcLeft}>
              <div className={styles.svcName}>Database (PostgreSQL)</div>
            </div>
            <div className={styles.svcRight}>
              <span className={`${styles.badge} ${styles.bOp}`}>Operational</span>
            </div>
          </div>
          <div className={styles.svcRow}>
            <div className={styles.svcLeft}>
              <div className={styles.svcName}>CDN (Cloudflare)</div>
            </div>
            <div className={styles.svcRight}>
              <span className={`${styles.badge} ${styles.bOp}`}>Operational</span>
            </div>
          </div>
          <div className={styles.svcRow}>
            <div className={styles.svcLeft}>
              <div className={styles.svcName}>Email Delivery (Postmark)</div>
            </div>
            <div className={styles.svcRight}>
              <span className={`${styles.badge} ${styles.bOp}`}>Operational</span>
            </div>
          </div>
          <div className={styles.svcRow}>
            <div className={styles.svcLeft}>
              <div className={styles.svcName}>Payments (Stripe)</div>
            </div>
            <div className={styles.svcRight}>
              <span className={`${styles.badge} ${styles.bOp}`}>Operational</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.incSection}>
        <h2 className={styles.secTitle}>Recent Incidents</h2>
        <div className={styles.incCard}>
          <div className={styles.incHeader}>
            <div className={styles.incName} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} style={{ color: 'var(--amber)' }} /> Shorts Repurposer — Degraded Performance
            </div>
            <span className={styles.incInvestigating}>Investigating</span>
          </div>
          <div className={styles.tl}>
            <div className={styles.tlItem}>
              <div className={styles.tlTime}>14:32 PKT</div>
              <div>Issue identified — clip detection returning slower results. Engineers investigating.</div>
            </div>
            <div className={styles.tlItem}>
              <div className={styles.tlTime}>14:15 PKT</div>
              <div>Increased error rates detected. Monitoring in progress.</div>
            </div>
          </div>
        </div>

        <div className={styles.incCard}>
          <div className={styles.incHeader}>
            <div className={styles.incName}>Elevated script generation latency</div>
            <span className={styles.incResolved}>Resolved</span>
          </div>
          <div className={styles.tl}>
            <div className={styles.tlItem}>
              <div className={styles.tlTime}>May 18 · 11:02</div>
              <div>Resolved — Groq API rate limits caused 3–5s delays. Fallback to Gemini activated and cleared.</div>
            </div>
            <div className={styles.tlItem}>
              <div className={styles.tlTime}>May 18 · 10:45</div>
              <div>Users reporting slow script generation. Investigating API provider latency.</div>
            </div>
          </div>
        </div>

        <div className={styles.noInc} style={{ marginTop: '12px' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}><Check size={16} /></div>
          <div style={{ fontSize: '13px', color: 'var(--muted)' }}>No other incidents in the past 90 days.</div>
        </div>
      </div>

      <section className={styles.subSection}>
        <h3 className={styles.subTitle}><MailOpen size={16} /> Get status notifications</h3>
        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
          We'll email you when incidents are created, updated, or resolved.
        </div>
        <form onSubmit={handleSubscribe} className={styles.subRow}>
          <input
            className={styles.subInp}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.subBtn}>
            Subscribe
          </button>
        </form>
      </section>

      <Footer />

      {/* TOAST NOTIFICATION */}
      <div className={`${styles.toast} ${toastVisible ? styles.show : ''}`}>
        <Check size={16} /> Subscribed to status updates!
      </div>
    </>
  );
}
