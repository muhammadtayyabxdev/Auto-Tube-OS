'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/affiliate-dashboard.module.css';

export default function AffiliateDashboard() {
  const [period, setPeriod] = useState<string>('30d');
  const [copied, setCopied] = useState<boolean>(false);
  const [qrOpen, setQrOpen] = useState<boolean>(false);
  const [payoutRequested, setPayoutRequested] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://autotubeos.com/?ref=ahmed_k_2024');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayoutRequest = () => {
    setPayoutRequested(true);
    setTimeout(() => {
      alert('Your payout request for $246.90 has been submitted! It will be reviewed and processed by the 1st of the month.');
      setPayoutRequested(false);
    }, 500);
  };

  return (
    <div className={styles.app}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTAINER */}
      <div className={styles.main}>
        {/* TOPBAR */}
        <div className={styles.topbar}>
          <div className={styles.tbTitle}>Affiliate Overview</div>
          <div className={styles.tbPeriod}>
            {['7d', '30d', '90d', 'All'].map((p) => (
              <div
                key={p}
                className={`${styles.tpBtn} ${period === p ? styles.on : ''}`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </div>
            ))}
          </div>
          <button className={styles.payoutBtn} onClick={handlePayoutRequest}>
            {payoutRequested ? 'Processing...' : 'Request Payout — $246.90'}
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className={styles.content}>
          {/* STATS TILES */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.scLabel}>Total Earned</div>
              <div className={styles.scVal} style={{ color: 'var(--green)' }}>
                $1,284
              </div>
              <div className={`${styles.scDelta} ${styles.up}`}>↑ +$246 this month</div>
              <div className={styles.scMini}>
                <div className={styles.scBar} style={{ height: '30%' }}></div>
                <div className={styles.scBar} style={{ height: '45%' }}></div>
                <div className={styles.scBar} style={{ height: '40%' }}></div>
                <div className={styles.scBar} style={{ height: '60%' }}></div>
                <div className={`${styles.scBar} ${styles.hi}`} style={{ height: '85%' }}></div>
                <div className={`${styles.scBar} ${styles.hi}`} style={{ height: '100%' }}></div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.scLabel}>Active Referrals</div>
              <div className={styles.scVal}>32</div>
              <div className={`${styles.scDelta} ${styles.up}`}>↑ +5 this month</div>
              <div className={styles.scMini}>
                <div className={styles.scBar} style={{ height: '25%' }}></div>
                <div className={styles.scBar} style={{ height: '35%' }}></div>
                <div className={styles.scBar} style={{ height: '50%' }}></div>
                <div className={styles.scBar} style={{ height: '65%' }}></div>
                <div className={`${styles.scBar} ${styles.hi}`} style={{ height: '80%' }}></div>
                <div className={`${styles.scBar} ${styles.hi}`} style={{ height: '100%' }}></div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.scLabel}>Link Clicks</div>
              <div className={styles.scVal}>2,841</div>
              <div className={`${styles.scDelta} ${styles.up}`}>↑ 18% vs last month</div>
              <div className={styles.scMini}>
                <div className={styles.scBar} style={{ height: '40%' }}></div>
                <div className={styles.scBar} style={{ height: '55%' }}></div>
                <div className={styles.scBar} style={{ height: '45%' }}></div>
                <div className={styles.scBar} style={{ height: '70%' }}></div>
                <div className={`${styles.scBar} ${styles.hi}`} style={{ height: '90%' }}></div>
                <div className={`${styles.scBar} ${styles.hi}`} style={{ height: '100%' }}></div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.scLabel}>Conversion Rate</div>
              <div className={styles.scVal}>4.2%</div>
              <div className={`${styles.scDelta} ${styles.dn}`}>↓ -0.3% vs last month</div>
              <div className={styles.scMini}>
                <div className={`${styles.scBar} ${styles.hi}`} style={{ height: '100%' }}></div>
                <div className={styles.scBar} style={{ height: '80%' }}></div>
                <div className={styles.scBar} style={{ height: '90%' }}></div>
                <div className={styles.scBar} style={{ height: '75%' }}></div>
                <div className={styles.scBar} style={{ height: '85%' }}></div>
                <div className={styles.scBar} style={{ height: '80%' }}></div>
              </div>
            </div>
          </div>

          {/* SHARE LINK SECTION */}
          <div className={styles.linkCard}>
            <div style={{ fontSize: '12px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>Your Link</div>
            <div className={styles.linkVal}>https://autotubeos.com/?ref=ahmed_k_2024</div>
            <button className={styles.linkBtn} onClick={handleCopyLink}>
              {copied ? '✓ Copied!' : 'Copy Link'}
            </button>
            <div
              className={styles.linkQr}
              title="QR Code"
              onClick={() => setQrOpen(!qrOpen)}
              style={{ position: 'relative' }}
            >
              📱
              {qrOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    background: 'var(--s2)',
                    border: '1px solid var(--border)',
                    padding: '12px',
                    borderRadius: '8px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                    zIndex: 10,
                    textAlign: 'center',
                    minWidth: '150px',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      background: '#fff',
                      margin: '0 auto 8px',
                      padding: '8px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Simulated QR Code Layout */}
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `radial-gradient(var(--bg) 20%, transparent 20%), 
                                          radial-gradient(var(--bg) 20%, transparent 20%)`,
                        backgroundSize: '10px 10px',
                        backgroundPosition: '0 0, 5px 5px',
                        backgroundColor: '#eee',
                        border: '2px solid #000',
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text)' }}>Scan to preview link</span>
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE GRID: CHART & PAYOUTS */}
          <div className={styles.midGrid}>
            {/* EARNINGS CHART */}
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                Monthly Earnings <span className={styles.cardAction}>Full report →</span>
              </div>
              <div className={styles.barChart}>
                <div className={styles.bcBar} style={{ height: '25%' }} title="Dec: $98"></div>
                <div className={styles.bcBar} style={{ height: '32%' }} title="Jan: $124"></div>
                <div className={styles.bcBar} style={{ height: '45%' }} title="Feb: $168"></div>
                <div className={styles.bcBar} style={{ height: '52%' }} title="Mar: $192"></div>
                <div className={styles.bcBar} style={{ height: '62%' }} title="Apr: $226"></div>
                <div className={`${styles.bcBar} ${styles.hi}`} style={{ height: '100%' }} title="May: $246"></div>
              </div>
              <div className={styles.bcLabels}>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </div>

            {/* PAYOUTS HISTORY */}
            <div className={styles.card}>
              <div className={styles.cardTitle}>
                Payout History <span className={styles.cardAction}>Download CSV</span>
              </div>
              <div className={styles.payoutRow}>
                <div>
                  <div className={styles.prMonth}>May 2026</div>
                  <div className={styles.prRefs}>32 active referrals</div>
                </div>
                <div className={styles.prAmount}>$246.90</div>
                <div className={`${styles.prStatus} ${styles.pending}`}>Pending</div>
              </div>
              <div className={styles.payoutRow}>
                <div>
                  <div className={styles.prMonth}>April 2026</div>
                  <div className={styles.prRefs}>27 active referrals</div>
                </div>
                <div className={styles.prAmount}>$226.40</div>
                <div className={`${styles.prStatus} ${styles.paid}`}>Paid</div>
              </div>
              <div className={styles.payoutRow}>
                <div>
                  <div className={styles.prMonth}>March 2026</div>
                  <div className={styles.prRefs}>22 active referrals</div>
                </div>
                <div className={styles.prAmount}>$192.00</div>
                <div className={`${styles.prStatus} ${styles.paid}`}>Paid</div>
              </div>
              <div className={styles.payoutRow}>
                <div>
                  <div className={styles.prMonth}>February 2026</div>
                  <div className={styles.prRefs}>18 active referrals</div>
                </div>
                <div className={styles.prAmount}>$168.30</div>
                <div className={`${styles.prStatus} ${styles.paid}`}>Paid</div>
              </div>
              <div className={styles.payoutRow}>
                <div>
                  <div className={styles.prMonth}>January 2026</div>
                  <div className={styles.prRefs}>14 active referrals</div>
                </div>
                <div className={styles.prAmount}>$124.60</div>
                <div className={`${styles.prStatus} ${styles.paid}`}>Paid</div>
              </div>
            </div>
          </div>

          {/* REFERRALS LIST CARD */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              Recent Referrals <span className={styles.cardAction}>View all 32 →</span>
            </div>
            <div className={styles.refTable}>
              <div className={styles.refRow}>
                <div className={styles.refAv}>SR</div>
                <div className={styles.refName}>Sara R.</div>
                <div className={`${styles.refPlan} ${styles.planAgency}`}>Agency</div>
                <div className={styles.refComm}>$29.70/mo</div>
                <div className={`${styles.refStatus} ${styles.stActive}`}>Active</div>
              </div>
              <div className={styles.refRow}>
                <div className={styles.refAv}>JL</div>
                <div className={styles.refName}>James L.</div>
                <div className={`${styles.refPlan} ${styles.planPro}`}>Pro</div>
                <div className={styles.refComm}>$8.70/mo</div>
                <div className={`${styles.refStatus} ${styles.stActive}`}>Active</div>
              </div>
              <div className={styles.refRow}>
                <div className={styles.refAv}>MZ</div>
                <div className={styles.refName}>Mariam Z.</div>
                <div className={`${styles.refPlan} ${styles.planPro}`}>Pro</div>
                <div className={styles.refComm}>$8.70/mo</div>
                <div className={`${styles.refStatus} ${styles.stTrial}`}>Trial</div>
              </div>
              <div className={styles.refRow}>
                <div className={styles.refAv}>AK</div>
                <div className={styles.refName}>Ali K.</div>
                <div className={`${styles.refPlan} ${styles.planAgency}`}>Agency</div>
                <div className={styles.refComm}>$29.70/mo</div>
                <div className={`${styles.refStatus} ${styles.stActive}`}>Active</div>
              </div>
              <div className={styles.refRow}>
                <div className={styles.refAv}>FH</div>
                <div className={styles.refName}>Fatima H.</div>
                <div className={`${styles.refPlan} ${styles.planFree}`}>Free</div>
                <div className={styles.refComm}>$0/mo</div>
                <div className={`${styles.refStatus} ${styles.stTrial}`}>Trial</div>
              </div>
              <div className={styles.refRow}>
                <div className={styles.refAv}>TK</div>
                <div className={styles.refName}>Tariq K.</div>
                <div className={`${styles.refPlan} ${styles.planPro}`}>Pro</div>
                <div className={styles.refComm}>—</div>
                <div className={`${styles.refStatus} ${styles.stChurned}`}>Churned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
