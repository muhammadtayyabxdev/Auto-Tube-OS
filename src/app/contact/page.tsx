'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/contact.module.css";

type ContactType = 'support' | 'sales' | 'partner';

export default function Contact() {
  const [contactType, setContactType] = useState<ContactType>('support');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // first open by default

  const formTitles = {
    support: "Send us a message",
    sales: "Talk to Sales",
    partner: "Partner with Us"
  };

  const formSubtitles = {
    support: "Our support team reads every message and responds within 2 hours on weekdays.",
    sales: "Tell us about your team size and we'll put together a custom plan.",
    partner: "Tell us about the partnership you have in mind."
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
  };

  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.gridBg}></div>
        <div className={styles.glow}></div>
        <div className={styles.heroInner}>
          <div className={styles.hLabel}>Get in Touch</div>
          <h1 className={styles.hTitle}>
            We&apos;re real people.<br />We actually reply.
          </h1>
          <p className={styles.hSub}>
            Whether you have a product question, need help with your account, or want to partner with us — we&apos;re here.
          </p>
        </div>
      </div>

      {/* CONTACT OPTIONS */}
      <div className={styles.contactOptions}>
        <div
          className={`${styles.coCard} ${contactType === 'support' ? styles.active : ""}`}
          onClick={() => setContactType('support')}
        >
          <div className={styles.coIcon}>🛠️</div>
          <div className={styles.coTitle}>Support</div>
          <p className={styles.coSub}>Bug reports, account issues, billing questions, or anything technical.</p>
          <div className={styles.coTime}>⚡ Avg reply: 2 hours</div>
        </div>

        <div
          className={`${styles.coCard} ${contactType === 'sales' ? styles.active : ""}`}
          onClick={() => setContactType('sales')}
        >
          <div className={styles.coIcon}>💼</div>
          <div className={styles.coTitle}>Sales & Agency</div>
          <p className={styles.coSub}>Custom pricing, white-label, enterprise plans, or bulk seat inquiries.</p>
          <div className={styles.coTime}>📅 Avg reply: 4 hours</div>
        </div>

        <div
          className={`${styles.coCard} ${contactType === 'partner' ? styles.active : ""}`}
          onClick={() => setContactType('partner')}
        >
          <div className={styles.coIcon}>🤝</div>
          <div className={styles.coTitle}>Partnerships</div>
          <p className={styles.coSub}>Affiliate program, integrations, press inquiries, or co-marketing opportunities.</p>
          <div className={styles.coTime}>📬 Avg reply: 1 business day</div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className={styles.mainLayout}>
        {/* FORM CARD */}
        <div className={styles.formCard}>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <h2 className={styles.formTitle}>{formTitles[contactType]}</h2>
              <p className={styles.formSub}>{formSubtitles[contactType]}</p>

              <div className={`${styles.field} ${styles.row2}`}>
                <div>
                  <label className={styles.fieldLabel}>First Name</label>
                  <input className={styles.inp} placeholder="Ahmed" required />
                </div>
                <div>
                  <label className={styles.fieldLabel}>Last Name</label>
                  <input className={styles.inp} placeholder="Khan" required />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel}>Email</label>
                <input className={styles.inp} type="email" placeholder="you@example.com" required />
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel}>Topic</label>
                <select className={styles.selectInp} defaultValue="Technical Issue / Bug">
                  <option>Technical Issue / Bug</option>
                  <option>Billing & Subscription</option>
                  <option>Feature Request</option>
                  <option>Account Access</option>
                  <option>Agency / Custom Plan</option>
                  <option>Partnership Inquiry</option>
                  <option>Press / Media</option>
                  <option>Other</option>
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel}>Message</label>
                <textarea
                  className={styles.inp}
                  placeholder="Describe your question or issue in as much detail as you can. The more context, the faster we can help."
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Message <span>→</span>
              </button>
            </form>
          ) : (
            <div className={styles.successMsg}>
              <div className={styles.successIcon}>✅</div>
              <h3 className={styles.successTitle}>Message sent!</h3>
              <p className={styles.successSub}>
                We&apos;ll get back to you at your email within 2 hours. Check your inbox (and spam, just in case).
              </p>
              <button className={styles.submitBtn} style={{ margin: "24px auto 0" }} onClick={resetForm}>
                Send Another
              </button>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className={styles.contactSidebar}>
          <div className={styles.sbInfo}>
            <h3 className={styles.sbInfoTitle}>Contact Details</h3>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}>📧</div>
              <div>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoVal}>
                  <a href="mailto:hello@autotubeos.com">hello@autotubeos.com</a>
                </div>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}>🐦</div>
              <div>
                <div className={styles.infoLabel}>Twitter / X</div>
                <div className={styles.infoVal}>
                  <a href="#">@AutoTubeOS</a>
                </div>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}>🌍</div>
              <div>
                <div className={styles.infoLabel}>Location</div>
                <div className={styles.infoVal}>Lahore, Pakistan (Remote Team)</div>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}>⏰</div>
              <div>
                <div className={styles.infoLabel}>Support Hours</div>
                <div className={styles.infoVal}>Mon–Fri, 9am–6pm PKT</div>
              </div>
            </div>
          </div>

          <div className={styles.statusCard}>
            <div className={styles.statusHeader}>
              <div className={styles.statusDot}></div>
              <div>
                <div className={styles.statusTitle}>All Systems Operational</div>
                <div className={styles.statusSub}>Updated 4 minutes ago</div>
              </div>
            </div>
            <div className={styles.statusItems}>
              <div className={styles.stItem}>
                <span className={styles.stLabel}>Dashboard</span>
                <span className={`${styles.stBadge} ${styles.stOp}`}>Operational</span>
              </div>
              <div className={styles.stItem}>
                <span className={styles.stLabel}>Script Generator</span>
                <span className={`${styles.stBadge} ${styles.stOp}`}>Operational</span>
              </div>
              <div className={styles.stItem}>
                <span className={styles.stLabel}>Topic Finder</span>
                <span className={`${styles.stBadge} ${styles.stOp}`}>Operational</span>
              </div>
              <div className={styles.stItem}>
                <span className={styles.stLabel}>Shorts Repurposer</span>
                <span className={`${styles.stBadge} ${styles.stDeg}`}>Degraded</span>
              </div>
              <div className={styles.stItem}>
                <span className={styles.stLabel}>Analytics Sync</span>
                <span className={`${styles.stBadge} ${styles.stOp}`}>Operational</span>
              </div>
            </div>
          </div>

          <div className={styles.socialCard}>
            <h3 className={styles.socialTitle}>Find us on</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <span className={styles.slIcon}>🐦</span>
                <span className={styles.slName}>Twitter / X</span>
                <span className={styles.slHandle}>@AutoTubeOS</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.slIcon}>▶️</span>
                <span className={styles.slName}>YouTube</span>
                <span className={styles.slHandle}>AutoTubeOS</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.slIcon}>💬</span>
                <span className={styles.slName}>Discord Community</span>
                <span className={styles.slHandle}>1.2K members</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.slIcon}>in</span>
                <span className={styles.slName}>LinkedIn</span>
                <span className={styles.slHandle}>AutoTubeOS</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ MINI */}
      <div className={styles.faqMini}>
        <div className={styles.faqInner}>
          <h2 className={styles.faqTitle}>Quick Answers</h2>

          <div className={`${styles.faqItem} ${openFaqIndex === 0 ? styles.open : ""}`} onClick={() => toggleFaq(0)}>
            <div className={styles.faqQ}>
              How quickly do you respond to support tickets? <div className={styles.faqIcon}>+</div>
            </div>
            <p className={styles.faqA}>
              Pro and Agency users get responses within 2 hours on weekdays. Free plan users within 24 hours. We never use bots — every reply comes from a real team member.
            </p>
          </div>

          <div className={`${styles.faqItem} ${openFaqIndex === 1 ? styles.open : ""}`} onClick={() => toggleFaq(1)}>
            <div className={styles.faqQ}>
              Can I request a live demo or onboarding call? <div className={styles.faqIcon}>+</div>
            </div>
            <p className={styles.faqA}>
              Yes — Agency plan users get a dedicated onboarding call. Pro users can book a 15-minute walkthrough via the link in their welcome email. Free users can access our recorded video walkthroughs.
            </p>
          </div>

          <div className={`${styles.faqItem} ${openFaqIndex === 2 ? styles.open : ""}`} onClick={() => toggleFaq(2)}>
            <div className={styles.faqQ}>
              I found a bug. How should I report it? <div className={styles.faqIcon}>+</div>
            </div>
            <p className={styles.faqA}>
              Use the contact form above and select &quot;Technical Issue / Bug&quot; — include your browser, what you were doing, and a screenshot if possible. We prioritize bug reports and typically patch critical issues same-day.
            </p>
          </div>

          <div className={`${styles.faqItem} ${openFaqIndex === 3 ? styles.open : ""}`} onClick={() => toggleFaq(3)}>
            <div className={styles.faqQ}>
              Do you have an affiliate or referral program? <div className={styles.faqIcon}>+</div>
            </div>
            <p className={styles.faqA}>
              Yes! We pay 30% recurring commission for every paying user you refer. Use the contact form with &quot;Partnership Inquiry&quot; selected and we&apos;ll send you your affiliate link within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
