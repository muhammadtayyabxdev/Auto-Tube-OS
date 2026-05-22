'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/affiliate.module.css';
import { BarChart3, DollarSign, FileText, Gem, Image as ImageIcon, Link2, Megaphone, Palette, Rocket, Star, Video, Heart, Sprout, Check } from 'lucide-react';

const Twitter = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

export default function Affiliate() {
  // Calculator state variables
  const [refs, setRefs] = useState<number>(10);
  const [plan, setPlan] = useState<number>(29);
  const [retention, setRetention] = useState<number>(80);

  // Calculated earnings
  const [earnings, setEarnings] = useState({
    steady: 696,
    m1: 87,
    m3: 246,
    m6: 464,
    y1: 5568,
  });

  // Calculate whenever parameters change
  useEffect(() => {
    const comm = 0.30;
    const monthly = refs * plan * comm;
    const ret = retention / 100;

    const steady = Math.round(monthly * ret * 10);
    const m1 = Math.round(monthly);
    const m3 = Math.round(steady * 0.35);
    const m6 = Math.round(steady * 0.66);
    const y1 = Math.round(steady * 8);

    setEarnings({
      steady,
      m1,
      m3,
      m6,
      y1,
    });
  }, [refs, plan, retention]);

  // Form submission state
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    social: '',
    promo: '',
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.gridBg}></div>
        <div className={styles.glow}></div>
        <div className={styles.heroInner}>
          <div className={styles.hBadge}><Heart size={14} style={{ fill: 'var(--accent)', color: 'var(--accent)', verticalAlign: 'middle', marginRight: '6px' }} /> Affiliate Program · Open to Everyone</div>
          <h1 className={styles.hTitle}>
            Earn <em>30% recurring</em><br />commission. Forever.
          </h1>
          <p className={styles.hSub}>
            Refer creators to AutoTubeOS and earn 30% of every payment — every month — for as long as they stay subscribed. No cap, no expiry.
          </p>
          <button
            onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
            className={styles.formSubmitBtn}
            style={{ display: 'inline-block', width: 'auto', padding: '13px 36px', fontSize: '15px', borderRadius: '12px' }}
          >
            Apply to Join →
          </button>
          <div style={{ marginTop: '14px', fontSize: '13px', color: 'var(--muted2)' }}>
            Free to join · Instant approval · Paid monthly via PayPal or Wise
          </div>
        </div>
      </div>

      {/* CALCULATOR */}
      <div style={{ padding: '0 6%', position: 'relative', zIndex: 1 }}>
        <div className={styles.calcCard}>
          <div className={styles.calcTitle}><DollarSign size={16} /> Estimate Your Monthly Earnings</div>
          <div className={styles.calcRow}>
            <div className={styles.calcItem}>
              <div className={styles.calcLabel}>Referrals / Month</div>
              <div className={styles.calcControl}>
                <span className={styles.calcNum}>{refs}</span>
                <input
                  type="range"
                  className={styles.calcSlider}
                  min="1"
                  max="200"
                  value={refs}
                  onChange={(e) => setRefs(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className={styles.calcItem}>
              <div className={styles.calcLabel}>Avg Plan</div>
              <div className={styles.calcControl} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <select
                  className={styles.calcSelect}
                  value={plan}
                  onChange={(e) => setPlan(parseInt(e.target.value))}
                >
                  <option value={29}>Pro — $29/mo</option>
                  <option value={99}>Agency — $99/mo</option>
                  <option value={64}>Pro Annual — $19/mo</option>
                </select>
              </div>
            </div>
            <div className={styles.calcItem}>
              <div className={styles.calcLabel}>Retention Rate</div>
              <div className={styles.calcControl}>
                <span className={styles.calcNum}>{retention}%</span>
                <input
                  type="range"
                  className={styles.calcSlider}
                  min="40"
                  max="95"
                  value={retention}
                  onChange={(e) => setRetention(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className={styles.calcResult}>
            <div className={styles.crLabel}>Your monthly recurring commission</div>
            <div className={styles.crAmount}>${earnings.steady.toLocaleString()}</div>
            <div className={styles.crPeriod}>per month after 12 months</div>
            <div className={styles.crBreakdown}>
              <div className={styles.crItem}>Month 1: <b>${earnings.m1.toLocaleString()}</b></div>
              <div className={styles.crItem}>Month 3: <b>${earnings.m3.toLocaleString()}</b></div>
              <div className={styles.crItem}>Month 6: <b>${earnings.m6.toLocaleString()}</b></div>
              <div className={styles.crItem}>Year 1 total: <b>${earnings.y1.toLocaleString()}</b></div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className={styles.howSection} style={{ paddingTop: '80px' }}>
        <div className={styles.secLabel}>How It Works</div>
        <div className={styles.secTitle}>4 steps to your first commission</div>
        <div className={styles.stepsRow}>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>1</div>
            <div className={styles.stepIcon}><FileText size={16} /></div>
            <div className={styles.stepName}>Apply</div>
            <div className={styles.stepDesc}>Fill out the form below. Instant approval for creators with any audience size.</div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>2</div>
            <div className={styles.stepIcon}><Link2 size={16} /></div>
            <div className={styles.stepName}>Get Your Link</div>
            <div className={styles.stepDesc}>Access your unique affiliate link and marketing assets from your dashboard.</div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>3</div>
            <div className={styles.stepIcon}><Megaphone size={16} /></div>
            <div className={styles.stepName}>Share</div>
            <div className={styles.stepDesc}>Share on YouTube, Twitter, newsletters, Discord, or anywhere your audience hangs out.</div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>4</div>
            <div className={styles.stepIcon}><DollarSign size={16} /></div>
            <div className={styles.stepName}>Get Paid</div>
            <div className={styles.stepDesc}>Earn 30% recurring every month. Paid on the 1st via PayPal, Wise, or bank transfer.</div>
          </div>
        </div>
      </div>

      {/* TIERS */}
      <div className={styles.tiersSection}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className={styles.secLabel}>Commission Tiers</div>
          <div className={styles.secTitle}>More referrals = higher commission</div>
        </div>
        <div className={styles.tiersGrid}>
          <div className={styles.tierCard}>
            <div className={styles.tierIcon}><Sprout size={16} /></div>
            <div className={styles.tierName}>Starter</div>
            <div className={styles.tierReq}>0–10 active referrals</div>
            <div className={styles.tierPct}>30%</div>
            <div className={styles.tierLabel}>recurring commission</div>
            <div className={styles.tierPerks}>
              <div className={styles.tierPerk}>Affiliate dashboard access</div>
              <div className={styles.tierPerk}>Marketing assets pack</div>
              <div className={styles.tierPerk}>Monthly payouts</div>
            </div>
          </div>
          <div className={`${styles.tierCard} ${styles.featured}`}>
            <div className={styles.tierBadge}><Star size={14} /> Most Affiliates</div>
            <div className={styles.tierIcon}><Rocket size={16} /></div>
            <div className={styles.tierName}>Growth</div>
            <div className={styles.tierReq}>11–50 active referrals</div>
            <div className={styles.tierPct} style={{ color: 'var(--purple)' }}>35%</div>
            <div className={styles.tierLabel}>recurring commission</div>
            <div className={styles.tierPerks}>
              <div className={styles.tierPerk}>Everything in Starter</div>
              <div className={styles.tierPerk}>Priority support</div>
              <div className={styles.tierPerk}>Custom landing page</div>
              <div className={styles.tierPerk}>Co-marketing opportunities</div>
            </div>
          </div>
          <div className={styles.tierCard}>
            <div className={styles.tierIcon}><Gem size={16} /></div>
            <div className={styles.tierName}>Elite</div>
            <div className={styles.tierReq}>50+ active referrals</div>
            <div className={styles.tierPct}>40%</div>
            <div className={styles.tierLabel}>recurring commission</div>
            <div className={styles.tierPerks}>
              <div className={styles.tierPerk}>Everything in Growth</div>
              <div className={styles.tierPerk}>Dedicated account manager</div>
              <div className={styles.tierPerk}>Bi-weekly payouts</div>
              <div className={styles.tierPerk}>Exclusive product previews</div>
              <div className={styles.tierPerk}>Revenue share on upsells</div>
            </div>
          </div>
        </div>
      </div>

      {/* ASSETS */}
      <div className={styles.assetsSection}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className={styles.secLabel}>Marketing Assets</div>
          <div className={styles.secTitle}>Everything you need to promote</div>
        </div>
        <div className={styles.assetsGrid}>
          <div className={styles.assetCard}>
            <div className={styles.assetPreview} style={{ background: 'linear-gradient(135deg,#0a0f20,#131830)' }}><ImageIcon size={16} /></div>
            <div className={styles.assetName}>YouTube Thumbnails</div>
            <div className={styles.assetDesc}>Ready-made thumbnails for review videos, comparison videos, and tutorials.</div>
            <button className={styles.assetBtn}>Download Pack</button>
          </div>
          <div className={styles.assetCard}>
            <div className={styles.assetPreview} style={{ background: 'linear-gradient(135deg,#0f1a0a,#131a10)' }}><Video size={16} /></div>
            <div className={styles.assetName}>Demo Videos</div>
            <div className={styles.assetDesc}>30s and 2-minute demo clips you can embed in your content.</div>
            <button className={styles.assetBtn}>Download Videos</button>
          </div>
          <div className={styles.assetCard}>
            <div className={styles.assetPreview} style={{ background: 'linear-gradient(135deg,#1a0a0a,#1f1010)' }}><FileText size={16} /></div>
            <div className={styles.assetName}>Email Swipe Copy</div>
            <div className={styles.assetDesc}>3 proven email sequences for newsletter affiliates. Copy and send.</div>
            <button className={styles.assetBtn}>Download Copy</button>
          </div>
          <div className={styles.assetCard}>
            <div className={styles.assetPreview} style={{ background: 'linear-gradient(135deg,#100a1a,#18102a)' }}><Twitter size={16} /></div>
            <div className={styles.assetName}>Twitter/X Thread</div>
            <div className={styles.assetDesc}>Pre-written thread templates that drive clicks without feeling spammy.</div>
            <button className={styles.assetBtn}>Download Threads</button>
          </div>
          <div className={styles.assetCard}>
            <div className={styles.assetPreview} style={{ background: 'linear-gradient(135deg,#0a1520,#0f1a28)' }}><Palette size={16} /></div>
            <div className={styles.assetName}>Banner Ads</div>
            <div className={styles.assetDesc}>Web banners in all standard sizes for blog/website placement.</div>
            <button className={styles.assetBtn}>Download Banners</button>
          </div>
          <div className={styles.assetCard}>
            <div className={styles.assetPreview} style={{ background: 'linear-gradient(135deg,#0a1a10,#0f2015)' }}><BarChart3 size={16} /></div>
            <div className={styles.assetName}>Case Study PDF</div>
            <div className={styles.assetDesc}>A shareable PDF showing real creator results with AutoTubeOS.</div>
            <button className={styles.assetBtn}>Download PDF</button>
          </div>
        </div>
      </div>

      {/* SIGN UP FORM */}
      <div id="signup" className={styles.signupContainer}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className={styles.secLabel}>Apply Now</div>
          <div className={styles.secTitle}>Join the affiliate program</div>
          <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Instant approval. No minimum audience required.</p>
        </div>
        <div className={styles.formCard}>
          <form onSubmit={handleApply}>
            <div className={styles.formGrid}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>First Name</label>
                <input
                  required
                  type="text"
                  className={styles.formInput}
                  placeholder="Ahmed"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Last Name</label>
                <input
                  required
                  type="text"
                  className={styles.formInput}
                  placeholder="Khan"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                required
                type="email"
                className={styles.formInput}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Your Website / YouTube / Social</label>
              <input
                required
                type="text"
                className={styles.formInput}
                placeholder="youtube.com/c/yourchannel"
                value={formData.social}
                onChange={(e) => setFormData({ ...formData, social: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>How will you promote AutoTubeOS?</label>
              <textarea
                required
                className={styles.formTextarea}
                placeholder="YouTube reviews, newsletter, Twitter threads, Discord community…"
                value={formData.promo}
                onChange={(e) => setFormData({ ...formData, promo: e.target.value })}
              ></textarea>
            </div>
            <button
              type="submit"
              className={styles.formSubmitBtn}
              style={submitted ? { backgroundColor: 'var(--green)' } : {}}
            >
              {submitted ? <><Check size={16} /> Application submitted!</> : "Apply Now — It's Free →"}
            </button>
          </form>
          <p style={{ fontSize: '11px', color: 'var(--muted2)', textAlign: 'center', marginTop: '12px' }}>
            Instant approval · First payout within 30 days
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className={styles.faqSection}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className={styles.secTitle}>Frequently Asked</div>
        </div>
        
        <div className={`${styles.faqItem} ${openFaq === 0 ? styles.open : ''}`} onClick={() => toggleFaq(0)}>
          <div className={styles.faqQ}>
            When do I get paid? <div className={styles.faqIcon}>+</div>
          </div>
          <div className={styles.faqA}>
            Payouts happen on the 1st of every month for commissions earned in the previous month. Minimum payout is $50. We pay via PayPal, Wise, or bank transfer.
          </div>
        </div>

        <div className={`${styles.faqItem} ${openFaq === 1 ? styles.open : ''}`} onClick={() => toggleFaq(1)}>
          <div className={styles.faqQ}>
            How long does the cookie last? <div className={styles.faqIcon}>+</div>
          </div>
          <div className={styles.faqA}>
            90 days. If someone clicks your link and subscribes within 90 days, you get the commission — even if they don&apos;t sign up immediately.
          </div>
        </div>

        <div className={`${styles.faqItem} ${openFaq === 2 ? styles.open : ''}`} onClick={() => toggleFaq(2)}>
          <div className={styles.faqQ}>
            Do I need to be an AutoTubeOS user? <div className={styles.faqIcon}>+</div>
          </div>
          <div className={styles.faqA}>
            No, but we highly recommend it. Affiliates who use the product themselves convert at 3× the rate of those who don&apos;t. We offer all affiliates a free Pro account.
          </div>
        </div>

        <div className={`${styles.faqItem} ${openFaq === 3 ? styles.open : ''}`} onClick={() => toggleFaq(3)}>
          <div className={styles.faqQ}>
            What happens if a referral cancels? <div className={styles.faqIcon}>+</div>
          </div>
          <div className={styles.faqA}>
            You stop earning for that user. But you keep all commissions already paid. Our average subscriber stays for 8+ months, so the lifetime value per referral is solid.
          </div>
        </div>

        <div className={`${styles.faqItem} ${openFaq === 4 ? styles.open : ''}`} onClick={() => toggleFaq(4)}>
          <div className={styles.faqQ}>
            Can I use paid ads to promote my affiliate link? <div className={styles.faqIcon}>+</div>
          </div>
          <div className={styles.faqA}>
            Yes, with one exception — you cannot bid on our brand keywords (&quot;AutoTubeOS&quot;) in Google/Bing ads. Everything else, including YouTube ads, Facebook, TikTok, is allowed.
          </div>
        </div>
      </div>

      <div className={styles.ctaStrip}>
        <div className={styles.ctaGlow}></div>
        <h2>Start earning today.</h2>
        <p>Join 200+ affiliates already earning recurring income by sharing AutoTubeOS with their audience.</p>
        <button
          className={styles.ctaBtn}
          onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Apply to Join — It&apos;s Free →
        </button>
      </div>

      <Footer />
    </>
  );
}
