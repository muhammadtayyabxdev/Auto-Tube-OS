import Head from 'next/head';
import Link from 'next/link';


import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/cookie.module.css';
import { Check, Lightbulb, X, Cookie } from 'lucide-react';

export default function CookieBannerPage() {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // States for banner closings / opacities
  const [standardOpacity, setStandardOpacity] = useState<number>(1);
  const [detailedOpacity, setDetailedOpacity] = useState<number>(1);
  const [fixedVisible, setFixedVisible] = useState<boolean>(true);

  // States for detailed categories toggles
  const [analyticsOn, setAnalyticsOn] = useState<boolean>(true);
  const [marketingOn, setMarketingOn] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  return (
    <>
      <Head>
        <title>Cookie Policy — AutoTube OS</title>
        <meta name="description" content="Read our policy outlining how we use cookies and caching to optimize your dashboard speed." />
      </Head>

      <Navbar />

      <div className={styles.page}>
        <h1 className={styles.pageTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cookie size={28} style={{ color: 'var(--red)' }} />
          Cookie Banner Variants
        </h1>
        <p className={styles.pageSub}>
          Four GDPR-compliant cookie consent styles. Copy the HTML and drop into any page. All fully functional with
          accept/decline/settings logic.
        </p>

        {/* VARIANT 1 */}
        <div className={styles.variantBlock}>
          <div className={styles.demoLabel}>Variant 1 — Standard Banner</div>
          <div className={styles.cb} style={{ opacity: standardOpacity }}>
            <div className={styles.cbIcon}>
              <Cookie size={24} style={{ color: 'var(--red)' }} />
            </div>
            <div className={styles.cbContent}>
              <div className={styles.cbTitle}>We use cookies</div>
              <div className={styles.cbText}>
                We use cookies to improve your experience, analyze traffic, and serve personalized content. By clicking
                "Accept All", you agree to our <Link href="/legal">Cookie Policy</Link> and{' '}
                <Link href="/legal">Privacy Policy</Link>.
              </div>
              <div className={styles.cbBtns}>
                <button
                  className={styles.btnAccept}
                  onClick={() => triggerToast('All cookies accepted!')}
                >
                  Accept All
                </button>
                <button
                  className={styles.btnDecline}
                  onClick={() => triggerToast('Essential cookies only.')}
                >
                  Essential Only
                </button>
                <button 
                  className={styles.btnSettings}
                  onClick={() => triggerToast('Cookie settings opened.')}
                >
                  Cookie Settings
                </button>
              </div>
            </div>
            <button 
              className={styles.cbClose} 
              onClick={() => setStandardOpacity(standardOpacity === 1 ? 0.3 : 1)}
              title="Toggle banner opacity"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* VARIANT 2 */}
        <div className={styles.variantBlock}>
          <div className={styles.demoLabel}>Variant 2 — Detailed with Categories</div>
          <div className={styles.cbDetailed} style={{ opacity: detailedOpacity }}>
            <div className={styles.cbTop}>
              <div className={styles.cbIcon}>
                <Cookie size={24} style={{ color: 'var(--red)' }} />
              </div>
              <div className={styles.cbContent}>
                <div className={styles.cbTitle}>Cookie Preferences</div>
                <div className={styles.cbText} style={{ marginBottom: 0 }}>
                  Choose which cookies you allow. Essential cookies are required for the site to work.
                </div>
              </div>
              <button 
                className={styles.cbClose} 
                onClick={() => setDetailedOpacity(detailedOpacity === 1 ? 0.3 : 1)}
                title="Toggle banner opacity"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className={styles.catGrid}>
              <div className={styles.catCard}>
                <div className={styles.catHeader}>
                  <span className={styles.catName}>Essential</span>
                  <span className={styles.catReq}>Required</span>
                </div>
                <div className={styles.catDesc}>Login, security, and core functionality. Cannot be disabled.</div>
              </div>

              <div className={styles.catCard}>
                <div className={styles.catHeader}>
                  <span className={styles.catName}>Analytics</span>
                  <div
                    className={`${styles.toggle} ${analyticsOn ? styles.on : ''}`}
                    onClick={() => setAnalyticsOn(!analyticsOn)}
                  >
                    <div className={styles.toggleThumb}></div>
                  </div>
                </div>
                <div className={styles.catDesc}>Helps us understand how you use the product.</div>
              </div>

              <div className={styles.catCard}>
                <div className={styles.catHeader}>
                  <span className={styles.catName}>Marketing</span>
                  <div
                    className={`${styles.toggle} ${marketingOn ? styles.on : ''}`}
                    onClick={() => setMarketingOn(!marketingOn)}
                  >
                    <div className={styles.toggleThumb}></div>
                  </div>
                </div>
                <div className={styles.catDesc}>Personalized ads and retargeting.</div>
              </div>
            </div>

            <div className={styles.cbBtns}>
              <button
                className={styles.btnAccept}
                onClick={() => triggerToast(`Preferences saved! Analytics: ${analyticsOn ? 'ON' : 'OFF'}, Marketing: ${marketingOn ? 'ON' : 'OFF'}`)}
              >
                Save Preferences
              </button>
              <button
                className={`${styles.btnAccept} ${styles.green}`}
                onClick={() => {
                  setAnalyticsOn(true);
                  setMarketingOn(true);
                  triggerToast('All cookies accepted!');
                }}
              >
                Accept All
              </button>
              <button
                className={styles.btnDecline}
                onClick={() => {
                  setAnalyticsOn(false);
                  setMarketingOn(false);
                  triggerToast('Essential cookies only.');
                }}
              >
                Decline All
              </button>
            </div>
          </div>
        </div>

        {/* VARIANT 3 */}
        <div className={styles.variantBlock}>
          <div className={styles.demoLabel}>Variant 3 — Compact Pill (Minimal)</div>
          <div className={styles.cbCompact}>
            <span className={styles.ccText}>
              We use cookies. <Link href="/legal">Learn more</Link>
            </span>
            <button
              className={styles.btnAccept}
              style={{ padding: '5px 14px', fontSize: '11px' }}
              onClick={() => triggerToast('Accepted!')}
            >
              OK
            </button>
            <button
              className={styles.btnDecline}
              style={{ padding: '5px 10px', fontSize: '11px' }}
              onClick={() => triggerToast('Declined.')}
            >
              Decline
            </button>
          </div>
        </div>

        {/* VARIANT 4 */}
        {fixedVisible && (
          <div className={styles.variantBlock}>
            <div className={styles.demoLabel}>Variant 4 — Bottom Fixed Bar (dark glass)</div>
            <div className={styles.cbFixedDemo}>
              <div className={styles.cbIcon}>
                <Cookie size={24} style={{ color: 'var(--red)' }} />
              </div>
              <div className={styles.cbContent}>
                <div className={styles.cbTitle}>Your privacy, your choice.</div>
                <div className={styles.cbText}>
                  We use essential cookies to keep AutoTubeOS running, and optional analytics cookies to improve it.{' '}
                  <Link href="/legal">Read our Cookie Policy</Link>.
                </div>
                <div className={styles.cbBtns}>
                  <button
                    className={styles.btnAccept}
                    onClick={() => triggerToast('All accepted!')}
                  >
                    Accept All
                  </button>
                  <button
                    className={styles.btnDecline}
                    onClick={() => triggerToast('Essential only.')}
                  >
                    Essential Only
                  </button>
                  <button 
                    className={styles.btnSettings}
                    onClick={() => triggerToast('Preferences managed.')}
                  >
                    Manage Preferences
                  </button>
                </div>
              </div>
              <button 
                className={styles.cbClose} 
                onClick={() => setFixedVisible(false)}
                title="Hide Banner"
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--muted2)' }}>
              <Lightbulb size={16} /> In production, this variant sits fixed at the bottom of the viewport.
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* TOAST SYSTEM */}
      <div className={`${styles.toast} ${toastVisible ? styles.show : ''}`}>
        <Check size={16} /> {toastMessage}
      </div>
    </>
  );
}
