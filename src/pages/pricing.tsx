import Head from 'next/head';


import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/pricing.module.css";
import { Check, Globe, Lock, X, Zap } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // Open first FAQ by default

  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  return (
    <>
      <Head>
        <title>Simple & Flexible Pricing — AutoTube OS</title>
        <meta name="description" content="Choose the best plan to systemize your YouTube growth. Basic Free, Pro, and Agency tiers." />
      </Head>

      <Navbar />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.gridBg}></div>
        <div className={styles.glowTop}></div>
        <div className={styles.badge}>
          <div className={styles.bdot}></div> 14-day free trial · No credit card required
        </div>
        <h1>
          One workspace.<br /><em>One simple price.</em>
        </h1>
        <p>Stop paying for 7 separate tools. Run your entire YouTube automation workflow from one place.</p>

        <div className={styles.toggleWrap}>
          <div
            className={`${styles.togOpt} ${!isAnnual ? styles.on : ""}`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </div>
          <div
            className={`${styles.togOpt} ${isAnnual ? styles.on : ""}`}
            onClick={() => setIsAnnual(true)}
          >
            Annual
          </div>
          <div className={styles.togSave}>Save 35%</div>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className={styles.cardsRow}>
        {/* FREE */}
        <div className={styles.planCard}>
          <div className={styles.planTier}>Free</div>
          <div className={styles.planPrice}>
            <sup>$</sup>
            <span>0</span>
            <span className={styles.per}>/mo</span>
          </div>
          <p className={styles.planDesc}>Perfect for exploring the platform and testing your first ideas.</p>
          <Link href="/auth" className={`${styles.planBtn} ${styles.btnGhost}`}>
            Get Started Free
          </Link>
          <div className={styles.divider}></div>
          <div className={styles.featLabel}>What&apos;s included</div>
          <div className={styles.feats}>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>5 topic ideas / month</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>3 scripts / month</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>1 channel workspace</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>Basic topic finder</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>Community access</div>
            </div>
            <div className={`${styles.featRow} ${styles.excluded}`}>
              <div className={`${styles.check} ${styles.n}`}>—</div>
              <div>Shorts Repurposer</div>
            </div>
            <div className={`${styles.featRow} ${styles.excluded}`}>
              <div className={`${styles.check} ${styles.n}`}>—</div>
              <div>Competitor Intelligence</div>
            </div>
            <div className={`${styles.featRow} ${styles.excluded}`}>
              <div className={`${styles.check} ${styles.n}`}>—</div>
              <div>Retention Optimizer</div>
            </div>
            <div className={`${styles.featRow} ${styles.excluded}`}>
              <div className={`${styles.check} ${styles.n}`}>—</div>
              <div>Team Collaboration</div>
            </div>
          </div>
        </div>

        {/* PRO */}
        <div className={`${styles.planCard} ${styles.featured}`}>
          <div className={styles.popularBadge}>Most Popular</div>
          <div className={styles.planTier}>Pro</div>
          <div className={styles.planPrice}>
            <sup>$</sup>
            <span>{isAnnual ? 19 : 29}</span>
            {isAnnual && <span className={styles.originalPrice}>$29</span>}
            <span className={styles.per}>/mo</span>
          </div>
          <p className={styles.planDesc}>For serious faceless creators who want to scale without burning out.</p>
          <Link href="/auth" className={`${styles.planBtn} ${styles.btnRed}`}>
            Start 14-Day Free Trial
          </Link>
          <div className={styles.divider}></div>
          <div className={styles.featLabel}>Everything in Free, plus</div>
          <div className={styles.feats}>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.r}`}><Check size={16} /></div>
              <div>Unlimited topic ideas</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.r}`}><Check size={16} /></div>
              <div>Unlimited scripts</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.r}`}><Check size={16} /></div>
              <div>3 channel workspaces</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.r}`}><Check size={16} /></div>
              <div>Shorts Repurposer <span style={{ fontSize: "11px", color: "var(--muted)" }}>(10/mo)</span></div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.r}`}><Check size={16} /></div>
              <div>Competitor Intelligence</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.r}`}><Check size={16} /></div>
              <div>Retention Optimizer</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.r}`}><Check size={16} /></div>
              <div>Content Calendar</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.r}`}><Check size={16} /></div>
              <div>Thumbnail Idea Engine</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.r}`}><Check size={16} /></div>
              <div>Priority support</div>
            </div>
            <div className={`${styles.featRow} ${styles.excluded}`}>
              <div className={`${styles.check} ${styles.n}`}>—</div>
              <div>Team collaboration</div>
            </div>
            <div className={`${styles.featRow} ${styles.excluded}`}>
              <div className={`${styles.check} ${styles.n}`}>—</div>
              <div>White-label reports</div>
            </div>
          </div>
        </div>

        {/* AGENCY */}
        <div className={styles.planCard}>
          <div className={styles.planTier}>Agency</div>
          <div className={styles.planPrice}>
            <sup>$</sup>
            <span>{isAnnual ? 64 : 99}</span>
            <span className={styles.per}>/mo</span>
          </div>
          <p className={styles.planDesc}>For teams and agencies managing multiple channels and clients at scale.</p>
          <Link href="/contact" className={`${styles.planBtn} ${styles.btnGhost}`}>
            Contact Sales
          </Link>
          <div className={styles.divider}></div>
          <div className={styles.featLabel}>Everything in Pro, plus</div>
          <div className={styles.feats}>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>Unlimited channels</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>Unlimited Shorts repurposing</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>Team collaboration <span style={{ fontSize: "11px", color: "var(--muted)" }}>(10 seats)</span></div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>Client approval workflows</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>White-label reports</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>Custom AI prompt presets</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>Dedicated onboarding call</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>SLA & priority uptime</div>
            </div>
            <div className={`${styles.featRow} ${styles.included}`}>
              <div className={`${styles.check} ${styles.y}`}><Check size={16} /></div>
              <div>API access <span style={{ fontSize: "11px", color: "var(--muted)" }}>(coming soon)</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* LOGOS STRIP */}
      <div className={styles.logosStrip}>
        <div className={styles.lsLabel}>Replaces your entire tool stack</div>
        <div className={styles.lsRow}>
          <span className={styles.lsChip}>ChatGPT</span>
          <span className={styles.lsChip}>Canva</span>
          <span className={styles.lsChip}>Notion</span>
          <span className={styles.lsChip}>TubeBuddy</span>
          <span className={styles.lsChip}>ElevenLabs</span>
          <span className={styles.lsChip}>VidIQ</span>
          <span className={styles.lsChip}>CapCut</span>
        </div>
      </div>

      {/* COMPARISON TABLE */}
      <div className={styles.compareSection}>
        <div className={styles.compareTitle}>Full Feature Comparison</div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th style={{ width: "42%" }}>Feature</th>
                <th>Free</th>
                <th style={{ color: "var(--red)" }}>Pro</th>
                <th>Agency</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tGroup}><td colSpan={4}>Content Creation</td></tr>
              <tr><td className={styles.tHighlight}>Topic Finder</td><td>5 / mo</td><td className={styles.checkR}>Unlimited</td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>Script Generator</td><td>3 / mo</td><td className={styles.checkR}>Unlimited</td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>Script Formats</td><td>2 formats</td><td>12 formats</td><td>12 formats</td></tr>
              <tr><td className={styles.tHighlight}>Thumbnail Idea Engine</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkR}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>Retention Optimizer</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkR}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>

              <tr className={styles.tGroup}><td colSpan={4}>Growth & SEO</td></tr>
              <tr><td className={styles.tHighlight}>Competitor Intelligence</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkR}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>SEO Optimizer</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkR}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>Trending Topic Alerts</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkR}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>

              <tr className={styles.tGroup}><td colSpan={4}>Repurposing</td></tr>
              <tr><td className={styles.tHighlight}>Shorts Repurposer</td><td className={styles.checkN}><X size={18} /></td><td>10 / mo</td><td className={styles.checkR}>Unlimited</td></tr>
              <tr><td className={styles.tHighlight}>Auto Clip Detection</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkR}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>Multi-platform Export</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkR}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>

              <tr className={styles.tGroup}><td colSpan={4}>Workflow & Team</td></tr>
              <tr><td className={styles.tHighlight}>Channel Workspaces</td><td>1</td><td>3</td><td className={styles.checkR}>Unlimited</td></tr>
              <tr><td className={styles.tHighlight}>Content Calendar</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkR}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>Team Seats</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkN}><X size={18} /></td><td>10 seats</td></tr>
              <tr><td className={styles.tHighlight}>Client Approval Flow</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>White-label Reports</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkY}><Check size={16} /></td></tr>

              <tr className={styles.tGroup}><td colSpan={4}>Support</td></tr>
              <tr><td className={styles.tHighlight}>Community Access</td><td className={styles.checkY}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>Priority Support</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkR}><Check size={16} /></td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>Dedicated Onboarding</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkY}><Check size={16} /></td></tr>
              <tr><td className={styles.tHighlight}>API Access</td><td className={styles.checkN}><X size={18} /></td><td className={styles.checkN}><X size={18} /></td><td>Coming soon</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>

        <div className={`${styles.faqItem} ${openFaqIndex === 0 ? styles.open : ""}`} onClick={() => toggleFaq(0)}>
          <div className={styles.faqQ}>
            Do I need a credit card to start the free trial? <div className={styles.faqIcon}>+</div>
          </div>
          <p className={styles.faqA}>
            Nope. Your 14-day free trial starts the moment you sign up — no credit card, no commitment. You only enter payment details if you decide to upgrade.
          </p>
        </div>

        <div className={`${styles.faqItem} ${openFaqIndex === 1 ? styles.open : ""}`} onClick={() => toggleFaq(1)}>
          <div className={styles.faqQ}>
            Can I cancel anytime? <div className={styles.faqIcon}>+</div>
          </div>
          <p className={styles.faqA}>
            Yes, completely. Cancel anytime from your account settings with zero friction — no cancellation fees, no &quot;speak to retention&quot; runaround. Your access continues until the end of your billing period.
          </p>
        </div>

        <div className={`${styles.faqItem} ${openFaqIndex === 2 ? styles.open : ""}`} onClick={() => toggleFaq(2)}>
          <div className={styles.faqQ}>
            What happens when I hit my free plan limits? <div className={styles.faqIcon}>+</div>
          </div>
          <p className={styles.faqA}>
            You&apos;ll get a clear notification before hitting limits, not a surprise wall. When you hit them, you can upgrade to Pro in one click — your data and workspace stay intact.
          </p>
        </div>

        <div className={`${styles.faqItem} ${openFaqIndex === 3 ? styles.open : ""}`} onClick={() => toggleFaq(3)}>
          <div className={styles.faqQ}>
            Is the annual plan billed upfront? <div className={styles.faqIcon}>+</div>
          </div>
          <p className={styles.faqA}>
            Yes, annual plans are billed once per year. You get a 35% discount compared to monthly billing, which works out to significant savings over the year.
          </p>
        </div>

        <div className={`${styles.faqItem} ${openFaqIndex === 4 ? styles.open : ""}`} onClick={() => toggleFaq(4)}>
          <div className={styles.faqQ}>
            Do you offer discounts for students or early-stage creators? <div className={styles.faqIcon}>+</div>
          </div>
          <p className={styles.faqA}>
            Yes — we have a Creator Scholarship program for channels under 1,000 subscribers. Reach out to our support team and we&apos;ll sort you out with a discounted rate.
          </p>
        </div>

        <div className={`${styles.faqItem} ${openFaqIndex === 5 ? styles.open : ""}`} onClick={() => toggleFaq(5)}>
          <div className={styles.faqQ}>
            What AI models power AutoTubeOS? <div className={styles.faqIcon}>+</div>
          </div>
          <p className={styles.faqA}>
            We use a combination of frontier models from Anthropic and OpenAI, along with proprietary fine-tuned models trained specifically on high-performing YouTube content. You get the best of all of them, automatically.
          </p>
        </div>

        <div className={`${styles.faqItem} ${openFaqIndex === 6 ? styles.open : ""}`} onClick={() => toggleFaq(6)}>
          <div className={styles.faqQ}>
            I run a YouTube agency. Is there custom pricing? <div className={styles.faqIcon}>+</div>
          </div>
          <p className={styles.faqA}>
            Absolutely. If you&apos;re managing 10+ channels or need custom seats, integrations, or white-labeling beyond the Agency plan, contact our sales team for a custom quote.
          </p>
        </div>
      </div>

      {/* CTA STRIP */}
      <div className={styles.ctaStrip}>
        <div className={styles.ctaGlow}></div>
        <h2>Start building your channel system today.</h2>
        <p>Join 1,200+ creators already on the waitlist. Early members lock in 50% off forever.</p>
        <div className={styles.ctaBtns}>
          <Link href="/auth" className={styles.ctaMain}>
            Start Free Trial
          </Link>
          <Link href="/dashboard" className={styles.ctaSec}>
            See the Dashboard
          </Link>
        </div>
        <div className={styles.trustRow}>
          <div className={styles.trustItem}><Lock size={20} /> No credit card</div>
          <div className={styles.trustItem}><Check size={16} /> Cancel anytime</div>
          <div className={styles.trustItem}><Zap size={16} /> 14-day free trial</div>
          <div className={styles.trustItem}><Globe size={16} /> Works for any niche</div>
        </div>
      </div>

      <Footer />
    </>
  );
}
