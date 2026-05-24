import Head from 'next/head';


import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/styles/contact.module.css";
import { Briefcase, CalendarDays, Check, Clock, Globe, Handshake, Mail, MailOpen, MessageCircle, Play, Wrench, Zap } from 'lucide-react';

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

const Linkedin = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

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
      <Head>
        <title>Contact Us — AutoTube OS</title>
        <meta name="description" content="Have questions or need custom integrations? Speak directly with our Pakistani and global team members." />
      </Head>

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
          <div className={styles.coIcon}><Wrench size={16} /></div>
          <div className={styles.coTitle}>Support</div>
          <p className={styles.coSub}>Bug reports, account issues, billing questions, or anything technical.</p>
          <div className={styles.coTime}><Zap size={16} /> Avg reply: 2 hours</div>
        </div>

        <div
          className={`${styles.coCard} ${contactType === 'sales' ? styles.active : ""}`}
          onClick={() => setContactType('sales')}
        >
          <div className={styles.coIcon}><Briefcase size={16} /></div>
          <div className={styles.coTitle}>Sales & Agency</div>
          <p className={styles.coSub}>Custom pricing, white-label, enterprise plans, or bulk seat inquiries.</p>
          <div className={styles.coTime}><CalendarDays size={16} /> Avg reply: 4 hours</div>
        </div>

        <div
          className={`${styles.coCard} ${contactType === 'partner' ? styles.active : ""}`}
          onClick={() => setContactType('partner')}
        >
          <div className={styles.coIcon}><Handshake size={16} /></div>
          <div className={styles.coTitle}>Partnerships</div>
          <p className={styles.coSub}>Affiliate program, integrations, press inquiries, or co-marketing opportunities.</p>
          <div className={styles.coTime}><MailOpen size={16} /> Avg reply: 1 business day</div>
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
                Send Message
              </button>
            </form>
          ) : (
            <div className={styles.successMsg}>
              <div className={styles.successIcon}><Check size={16} /></div>
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
              <div className={styles.infoIcon}><Mail size={16} /></div>
              <div>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoVal}>
                  <a href="mailto:hello@autotubeos.com">hello@autotubeos.com</a>
                </div>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}><Twitter size={16} /></div>
              <div>
                <div className={styles.infoLabel}>Twitter / X</div>
                <div className={styles.infoVal}>
                  <a href="#">@AutoTubeOS</a>
                </div>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}><Globe size={16} /></div>
              <div>
                <div className={styles.infoLabel}>Location</div>
                <div className={styles.infoVal}>Lahore, Pakistan (Remote Team)</div>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoIcon}><Clock size={16} /></div>
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
                <span className={styles.slIcon}><Twitter size={16} /></span>
                <span className={styles.slName}>Twitter / X</span>
                <span className={styles.slHandle}>@AutoTubeOS</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.slIcon}><Play size={16} /></span>
                <span className={styles.slName}>YouTube</span>
                <span className={styles.slHandle}>AutoTubeOS</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.slIcon}><MessageCircle size={16} /></span>
                <span className={styles.slName}>Discord Community</span>
                <span className={styles.slHandle}>1.2K members</span>
              </a>
              <a href="#" className={styles.socialLink}>
                <span className={styles.slIcon}><Linkedin size={16} /></span>
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
