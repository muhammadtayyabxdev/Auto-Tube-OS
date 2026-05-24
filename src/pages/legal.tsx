import Head from 'next/head';
import Link from 'next/link';


import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/legal.module.css';
import { AlertTriangle, BookOpen, CalendarDays, Check, KeyRound, Receipt, RefreshCw } from 'lucide-react';

type DocType = 'terms' | 'privacy';

export default function LegalPage() {
  const [activeDoc, setActiveDoc] = useState<DocType>('terms');
  const [activeSection, setActiveSection] = useState<string>('t1');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const prefix = activeDoc === 'terms' ? 't' : 'p';
    const count = activeDoc === 'terms' ? 10 : 8;

    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -60% 0px', // Compensate for sticky navbar
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    for (let i = 1; i <= count; i++) {
      const el = document.getElementById(`${prefix}${i}`);
      if (el) {
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [activeDoc]);

  return (
    <>
      <Head>
        <title>Terms of Service & Privacy Policy — AutoTube OS</title>
        <meta name="description" content="Read the terms of service, privacy practices, and user agreements for AutoTube OS." />
      </Head>

      <Navbar />
      
      <div className={styles.shell}>
        {/* SIDEBAR */}
        <aside className={styles.docSidebar}>
          <div className={styles.tabSwitch}>
            <button
              className={`${styles.tsBtn} ${activeDoc === 'terms' ? styles.on : ''}`}
              onClick={() => {
                setActiveDoc('terms');
                setActiveSection('t1');
              }}
            >
              Terms
            </button>
            <button
              className={`${styles.tsBtn} ${activeDoc === 'privacy' ? styles.on : ''}`}
              onClick={() => {
                setActiveDoc('privacy');
                setActiveSection('p1');
              }}
            >
              Privacy
            </button>
          </div>

          <div className={styles.tocLabel}>
            {activeDoc === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
          </div>

          {activeDoc === 'terms' ? (
            <div className={styles.tocList}>
              <button
                className={`${styles.tocItem} ${activeSection === 't1' ? styles.active : ''}`}
                onClick={() => scrollTo('t1')}
              >
                1. Acceptance
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 't2' ? styles.active : ''}`}
                onClick={() => scrollTo('t2')}
              >
                2. Eligibility
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 't3' ? styles.active : ''}`}
                onClick={() => scrollTo('t3')}
              >
                3. Your Account
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 't4' ? styles.active : ''}`}
                onClick={() => scrollTo('t4')}
              >
                4. Subscriptions & Billing
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 't5' ? styles.active : ''}`}
                onClick={() => scrollTo('t5')}
              >
                5. Acceptable Use
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 't6' ? styles.active : ''}`}
                onClick={() => scrollTo('t6')}
              >
                6. Intellectual Property
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 't7' ? styles.active : ''}`}
                onClick={() => scrollTo('t7')}
              >
                7. AI-Generated Content
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 't8' ? styles.active : ''}`}
                onClick={() => scrollTo('t8')}
              >
                8. Termination
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 't9' ? styles.active : ''}`}
                onClick={() => scrollTo('t9')}
              >
                9. Disclaimers
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 't10' ? styles.active : ''}`}
                onClick={() => scrollTo('t10')}
              >
                10. Governing Law
              </button>
            </div>
          ) : (
            <div className={styles.tocList}>
              <button
                className={`${styles.tocItem} ${activeSection === 'p1' ? styles.active : ''}`}
                onClick={() => scrollTo('p1')}
              >
                1. Data We Collect
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 'p2' ? styles.active : ''}`}
                onClick={() => scrollTo('p2')}
              >
                2. How We Use Data
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 'p3' ? styles.active : ''}`}
                onClick={() => scrollTo('p3')}
              >
                3. Data Sharing
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 'p4' ? styles.active : ''}`}
                onClick={() => scrollTo('p4')}
              >
                4. Cookies
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 'p5' ? styles.active : ''}`}
                onClick={() => scrollTo('p5')}
              >
                5. Data Retention
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 'p6' ? styles.active : ''}`}
                onClick={() => scrollTo('p6')}
              >
                6. Your Rights
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 'p7' ? styles.active : ''}`}
                onClick={() => scrollTo('p7')}
              >
                7. Security
              </button>
              <button
                className={`${styles.tocItem} ${activeSection === 'p8' ? styles.active : ''}`}
                onClick={() => scrollTo('p8')}
              >
                8. Contact
              </button>
            </div>
          )}

          <div className={styles.updated}>
            <b style={{ color: 'var(--muted)' }}>Last updated:</b>
            <br />
            May 1, 2026
            <br />
            <br />
            Questions?{' '}
            <Link href="/contact" style={{ color: 'var(--red)' }}>
              Contact us
            </Link>
          </div>
        </aside>

        {/* CONTENT */}
        <main className={styles.docContent}>
          {/* TERMS OF SERVICE */}
          <div className={`${styles.docView} ${activeDoc === 'terms' ? styles.active : ''}`}>
            <div className={styles.docHero}>
              <div className={styles.docLabel}>Legal</div>
              <h1 className={styles.docTitle}>Terms of Service</h1>
              <div className={styles.docMeta}>
                <div className={styles.metaItem}>
                  <CalendarDays size={16} /> <b>Effective:</b> May 1, 2026
                </div>
                <div className={styles.metaItem}>
                  <RefreshCw size={16} /> <b>Last updated:</b> May 1, 2026
                </div>
                <div className={styles.metaItem}>
                  <BookOpen size={16} /> <b>Reading time:</b> ~8 minutes
                </div>
              </div>
            </div>

            <div className={styles.summaryBox}>
              <div className={styles.sbTitle} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Receipt size={18} /> Plain English Summary</div>
              <div className={styles.sbItems}>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><Check size={16} /></span> You own everything you create using AutoTubeOS.
                </div>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><Check size={16} /></span> We don't sell your data. Ever.
                </div>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><Check size={16} /></span> You can cancel anytime with no penalty.
                </div>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><Check size={16} /></span> AI-generated content belongs to you, not us.
                </div>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><AlertTriangle size={16} /></span> Don't use the platform to create spam or misleading content.
                </div>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t1"></span>
              <div className={styles.secNum}>Section 01</div>
              <h2 className={styles.secTitle}>Acceptance of Terms</h2>
              <div className={styles.secBody}>
                <p>
                  By accessing or using AutoTubeOS ("the Service"), you agree to be bound by these Terms of Service
                  ("Terms"). If you do not agree to these Terms, do not use the Service.
                </p>
                <p>
                  These Terms apply to all users of the Service, including visitors, registered users, and paying
                  subscribers. AutoTubeOS is operated by AutoTubeOS Ltd. ("we," "us," or "our"), registered in Pakistan.
                </p>
                <div className={styles.highlightBox}>
                  <div className={styles.hbLabel}>Important</div>By creating an account, you confirm that you have read,
                  understood, and agreed to these Terms and our Privacy Policy.
                </div>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t2"></span>
              <div className={styles.secNum}>Section 02</div>
              <h2 className={styles.secTitle}>Eligibility</h2>
              <div className={styles.secBody}>
                <p>
                  You must be at least 16 years old to use AutoTubeOS. If you are under 18, you represent that you have
                  your parent or guardian's permission to use the Service.
                </p>
                <p>
                  By using the Service, you represent and warrant that you have the legal capacity to enter into a
                  binding agreement and that all registration information you provide is accurate and truthful.
                </p>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t3"></span>
              <div className={styles.secNum}>Section 03</div>
              <h2 className={styles.secTitle}>Your Account</h2>
              <div className={styles.secBody}>
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all
                  activities that occur under your account. You agree to notify us immediately of any unauthorized
                  access.
                </p>
                <p>
                  You may not share your account with others or create multiple accounts to circumvent plan limits. Each
                  account is for one individual or one organization only.
                </p>
                <div className={styles.infoBox}>
                  We recommend using a strong, unique password and enabling two-factor authentication from your account
                  settings.
                </div>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t4"></span>
              <div className={styles.secNum}>Section 04</div>
              <h2 className={styles.secTitle}>Subscriptions & Billing</h2>
              <div className={styles.secBody}>
                <p>
                  AutoTubeOS offers free and paid subscription plans. Paid plans are billed monthly or annually, as
                  selected at the time of purchase. All prices are in USD unless otherwise stated.
                </p>
                <ul>
                  <li>
                    <strong>Free trial:</strong> 14 days, no credit card required. After 14 days, you are automatically
                    moved to the Free plan unless you upgrade.
                  </li>
                  <li>
                    <strong>Cancellation:</strong> You may cancel at any time. Your access continues until the end of the
                    current billing period. No refunds for partial periods.
                  </li>
                  <li>
                    <strong>Refunds:</strong> We offer a 7-day money-back guarantee on your first paid subscription.
                    Contact us within 7 days of your first charge.
                  </li>
                  <li>
                    <strong>Price changes:</strong> We will notify you at least 30 days before any price change takes
                    effect. You may cancel before the new price applies.
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t5"></span>
              <div className={styles.secNum}>Section 05</div>
              <h2 className={styles.secTitle}>Acceptable Use</h2>
              <div className={styles.secBody}>
                <p>You agree not to use AutoTubeOS to:</p>
                <ul>
                  <li>Generate misleading, deceptive, or fraudulent content</li>
                  <li>Create content that violates YouTube's Terms of Service or Community Guidelines</li>
                  <li>
                    Produce spam, bulk content designed to manipulate search rankings, or AI-generated content farms with
                    no editorial oversight
                  </li>
                  <li>Harass, defame, or target individuals</li>
                  <li>Circumvent or attempt to circumvent platform limits</li>
                  <li>Resell or sublicense access to the Service without written permission</li>
                </ul>
                <p>We reserve the right to suspend accounts that violate these terms without prior notice.</p>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t6"></span>
              <div className={styles.secNum}>Section 06</div>
              <h2 className={styles.secTitle}>Intellectual Property</h2>
              <div className={styles.secBody}>
                <p>
                  <strong>Your content:</strong> You retain full ownership of all content you create using AutoTubeOS,
                  including scripts, video ideas, and any other outputs generated through the platform.
                </p>
                <p>
                  <strong>Our platform:</strong> The AutoTubeOS platform, including its software, design, models, and
                  branding, is owned by us and protected by applicable intellectual property laws. You may not copy,
                  modify, or distribute any part of the platform without written permission.
                </p>
                <p>
                  <strong>Feedback:</strong> If you submit feedback or suggestions, you grant us a non-exclusive,
                  royalty-free license to use that feedback to improve the Service.
                </p>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t7"></span>
              <div className={styles.secNum}>Section 07</div>
              <h2 className={styles.secTitle}>AI-Generated Content</h2>
              <div className={styles.secBody}>
                <p>AutoTubeOS uses AI to generate content including scripts, ideas, and recommendations. You understand and agree that:</p>
                <ul>
                  <li>
                    AI-generated content may contain inaccuracies, and you are responsible for reviewing and verifying all
                    outputs before publishing.
                  </li>
                  <li>We do not guarantee that AI-generated content is original, unique, or free from similarity to other content.</li>
                  <li>You own the outputs you generate, but we make no warranty regarding copyright status or fitness for any particular purpose.</li>
                </ul>
                <div className={styles.highlightBox}>
                  <div className={styles.hbLabel}>Your Responsibility</div>Always review AI-generated content before
                  publishing. You are responsible for ensuring your videos comply with YouTube's policies and applicable
                  laws.
                </div>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t8"></span>
              <div className={styles.secNum}>Section 08</div>
              <h2 className={styles.secTitle}>Termination</h2>
              <div className={styles.secBody}>
                <p>
                  You may terminate your account at any time from your account settings. We may suspend or terminate
                  your account if you violate these Terms, engage in fraudulent activity, or if we discontinue the
                  Service.
                </p>
                <p>
                  Upon termination, your right to access the Service ceases immediately. You may export your data within
                  30 days of termination. After 30 days, your data may be permanently deleted.
                </p>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t9"></span>
              <div className={styles.secNum}>Section 09</div>
              <h2 className={styles.secTitle}>Disclaimers & Limitation of Liability</h2>
              <div className={styles.secBody}>
                <p>
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE UPTIME, ACCURACY OF
                  AI OUTPUTS, OR SPECIFIC RESULTS FROM USING THE SERVICE.
                </p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR LIABILITY TO YOU IS LIMITED TO THE AMOUNT YOU PAID US IN
                  THE 12 MONTHS PRECEDING THE CLAIM.
                </p>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="t10"></span>
              <div className={styles.secNum}>Section 10</div>
              <h2 className={styles.secTitle}>Governing Law</h2>
              <div className={styles.secBody}>
                <p>
                  These Terms are governed by the laws of Pakistan. Any disputes shall be resolved through binding
                  arbitration in Lahore, Pakistan, except where prohibited by applicable law.
                </p>
                <p>
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in
                  full force and effect.
                </p>
                <div className={styles.infoBox}>
                  Questions about these Terms? Email us at{' '}
                  <a href="mailto:legal@autotubeos.com" style={{ color: 'var(--red)' }}>
                    legal@autotubeos.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PRIVACY POLICY */}
          <div className={`${styles.docView} ${activeDoc === 'privacy' ? styles.active : ''}`}>
            <div className={styles.docHero}>
              <div className={styles.docLabel}>Legal</div>
              <h1 className={styles.docTitle}>Privacy Policy</h1>
              <div className={styles.docMeta}>
                <div className={styles.metaItem}>
                  <CalendarDays size={16} /> <b>Effective:</b> May 1, 2026
                </div>
                <div className={styles.metaItem}>
                  <RefreshCw size={16} /> <b>Last updated:</b> May 1, 2026
                </div>
                <div className={styles.metaItem}>
                  <BookOpen size={16} /> <b>Reading time:</b> ~6 minutes
                </div>
              </div>
            </div>

            <div className={styles.summaryBox}>
              <div className={styles.sbTitle}><KeyRound size={16} /> Privacy at a Glance</div>
              <div className={styles.sbItems}>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><Check size={16} /></span> We never sell your personal data to third parties.
                </div>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><Check size={16} /></span> Your YouTube data is only used to power your workspace — never shared.
                </div>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><Check size={16} /></span> You can request deletion of all your data at any time.
                </div>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><Check size={16} /></span> We use industry-standard encryption for all data at rest and in transit.
                </div>
                <div className={styles.sbItem}>
                  <span className={styles.sbIcon}><AlertTriangle size={16} /></span> We use cookies and analytics to improve the product experience.
                </div>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="p1"></span>
              <div className={styles.secNum}>Section 01</div>
              <h2 className={styles.secTitle}>Data We Collect</h2>
              <div className={styles.secBody}>
                <p>We collect the following categories of data:</p>
                <ul>
                  <li>
                    <strong>Account data:</strong> Name, email address, password (hashed), and workspace name provided
                    during registration.
                  </li>
                  <li>
                    <strong>Usage data:</strong> Features used, content generated, session duration, and click patterns
                    within the product.
                  </li>
                  <li>
                    <strong>YouTube data:</strong> If you connect your YouTube channel, we access subscriber count, view
                    statistics, and video metadata — only what is necessary to power the dashboard. We do not access
                    private videos or post on your behalf.
                  </li>
                  <li>
                    <strong>Payment data:</strong> Billing information is processed by Stripe. We do not store full card
                    numbers.
                  </li>
                  <li>
                    <strong>Device data:</strong> Browser type, operating system, IP address, and language preference.
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="p2"></span>
              <div className={styles.secNum}>Section 02</div>
              <h2 className={styles.secTitle}>How We Use Your Data</h2>
              <div className={styles.secBody}>
                <p>We use your data to:</p>
                <ul>
                  <li>Operate and improve the AutoTubeOS platform</li>
                  <li>Personalize AI recommendations based on your niche and goals</li>
                  <li>Send transactional emails (receipts, account alerts, security notifications)</li>
                  <li>Send product update emails (you can unsubscribe anytime)</li>
                  <li>Detect and prevent abuse, fraud, and security threats</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <div className={styles.highlightBox}>
                  <div className={styles.hbLabel}>We Do Not</div>Sell your data, use your content to train AI models
                  without consent, or share your YouTube data with advertisers.
                </div>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="p3"></span>
              <div className={styles.secNum}>Section 03</div>
              <h2 className={styles.secTitle}>Data Sharing</h2>
              <div className={styles.secBody}>
                <p>We share data only with trusted service providers who help us operate the platform:</p>
                <ul>
                  <li>
                    <strong>Stripe</strong> — payment processing
                  </li>
                  <li>
                    <strong>AWS / Cloudflare</strong> — hosting and CDN infrastructure
                  </li>
                  <li>
                    <strong>Anthropic / OpenAI</strong> — AI model APIs (your prompts may be processed but are not used
                    for training)
                  </li>
                  <li>
                    <strong>Postmark</strong> — transactional email delivery
                  </li>
                </ul>
                <p>
                  All third-party providers are contractually required to keep your data confidential and use it only for
                  the services they provide to us.
                </p>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="p4"></span>
              <div className={styles.secNum}>Section 04</div>
              <h2 className={styles.secTitle}>Cookies</h2>
              <div className={styles.secBody}>
                <p>We use cookies and similar technologies for:</p>
                <ul>
                  <li>
                    <strong>Essential cookies:</strong> Required for authentication and session management. Cannot be
                    disabled.
                  </li>
                  <li>
                    <strong>Analytics cookies:</strong> Help us understand how users interact with the product (via
                    PostHog). Can be disabled in settings.
                  </li>
                  <li>
                    <strong>Preference cookies:</strong> Remember your settings like theme and language preference.
                  </li>
                </ul>
                <p>You can manage cookie preferences from your account settings or browser settings at any time.</p>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="p5"></span>
              <div className={styles.secNum}>Section 05</div>
              <h2 className={styles.secTitle}>Data Retention</h2>
              <div className={styles.secBody}>
                <p>We retain your data for as long as your account is active. If you delete your account:</p>
                <ul>
                  <li>Your personal data is deleted within 30 days</li>
                  <li>Anonymized usage data may be retained for analytics purposes</li>
                  <li>Billing records are retained for 7 years as required by law</li>
                </ul>
                <p>You can request an export of all your data at any time from Settings → Privacy → Export Data.</p>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="p6"></span>
              <div className={styles.secNum}>Section 06</div>
              <h2 className={styles.secTitle}>Your Rights</h2>
              <div className={styles.secBody}>
                <p>Depending on your location, you may have the right to:</p>
                <ul>
                  <li>
                    <strong>Access:</strong> Request a copy of all personal data we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete data
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal data ("right to be forgotten")
                  </li>
                  <li>
                    <strong>Portability:</strong> Receive your data in a machine-readable format
                  </li>
                  <li>
                    <strong>Objection:</strong> Object to processing of your data for marketing purposes
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, email us at{' '}
                  <a href="mailto:privacy@autotubeos.com" style={{ color: 'var(--red)' }}>
                    privacy@autotubeos.com
                  </a>{' '}
                  or use the Privacy section in your account settings.
                </p>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="p7"></span>
              <div className={styles.secNum}>Section 07</div>
              <h2 className={styles.secTitle}>Security</h2>
              <div className={styles.secBody}>
                <p>We implement industry-standard security measures including:</p>
                <ul>
                  <li>AES-256 encryption for data at rest</li>
                  <li>TLS 1.3 for all data in transit</li>
                  <li>Regular third-party security audits</li>
                  <li>SOC 2 Type II compliance (in progress)</li>
                  <li>Two-factor authentication available for all accounts</li>
                </ul>
                <div className={styles.infoBox}>
                  Found a security vulnerability? Please report it responsibly to{' '}
                  <a href="mailto:security@autotubeos.com" style={{ color: 'var(--red)' }}>
                    security@autotubeos.com
                  </a>
                  . We investigate all reports within 48 hours.
                </div>
              </div>
            </div>

            <div className={styles.docSection}>
              <span className={styles.secAnchor} id="p8"></span>
              <div className={styles.secNum}>Section 08</div>
              <h2 className={styles.secTitle}>Contact & Updates</h2>
              <div className={styles.secBody}>
                <p>
                  For privacy-related questions or requests, contact our Privacy Team at{' '}
                  <a href="mailto:privacy@autotubeos.com" style={{ color: 'var(--red)' }}>
                    privacy@autotubeos.com
                  </a>
                  .
                </p>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of significant changes via
                  email and an in-app banner at least 14 days before changes take effect. Continued use of the Service
                  after that date constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
