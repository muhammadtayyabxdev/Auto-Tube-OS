import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/press.module.css';
import { ArrowDown, ClipboardList, FileText, Newspaper, Package, Phone } from 'lucide-react';

interface BrandAsset {
  icon: string;
  name: string;
  sub: string;
  bg?: string;
}

interface FactRow {
  label: string;
  value: string;
}

interface CoverageItem {
  pub: string;
  headline: string;
  date: string;
}

export default function PressPage() {
  const brandAssets: BrandAsset[] = [
    {
      icon: '🔴⬛',
      name: 'Logo Pack',
      sub: 'SVG, PNG — Dark & Light · All sizes',
      bg: 'var(--bg)',
    },
    {
      icon: '<Palette size={16} />',
      name: 'Brand Colors & Fonts',
      sub: 'Hex codes, Poppins font',
      bg: 'var(--s3)',
    },
    {
      icon: '<Smartphone size={16} />',
      name: 'Product Screenshots',
      sub: 'Dashboard, mobile · 24 images',
      bg: 'var(--s3)',
    },
    {
      icon: '<Play size={16} />',
      name: 'Product Demo Video',
      sub: '60s overview · MP4, WebM',
      bg: 'var(--s3)',
    },
  ];

  const documents: BrandAsset[] = [
    {
      icon: '<BarChart3 size={16} />',
      name: 'Press Release — May 2026',
      sub: 'Latest announcement · PDF',
      bg: 'var(--s3)',
    },
    {
      icon: '<TrendingUp size={16} />',
      name: 'Creator Case Study',
      sub: 'Real results from 5 users',
      bg: 'var(--s3)',
    },
  ];

  const factSheet: FactRow[] = [
    { label: 'Founded', value: '2024, Lahore, Pakistan' },
    { label: 'Category', value: 'Creator Tools / AI SaaS' },
    { label: 'Users', value: '1,200+ active creators' },
    { label: 'Countries', value: '40+' },
    { label: 'Team size', value: '7 (fully remote)' },
    { label: 'Funding', value: 'Bootstrapped & profitable' },
    { label: 'Pricing', value: 'Free / $29 / $99 per month' },
    { label: 'Website', value: 'autotubeos.com' },
  ];

  const coverage: CoverageItem[] = [
    {
      pub: 'Product Hunt',
      headline: '"AutoTubeOS is #2 Product of the Day with 800 signups in 48 hours"',
      date: 'January 15, 2026',
    },
    {
      pub: 'Creator Economy Weekly',
      headline: '"The AI tool replacing 7 apps for faceless YouTube creators"',
      date: 'March 8, 2026',
    },
    {
      pub: 'The Hustle',
      headline: '"How a Pakistani founder built a profitable creator tool without VC"',
      date: 'April 22, 2026',
    },
    {
      pub: 'Morning Brew',
      headline: '"AutoTubeOS is the Notion for YouTube automation agencies"',
      date: 'May 2, 2026',
    },
  ];

  return (
    <>
      <Navbar />

      <div className={styles.hero}>
        <div className={styles.gridBg}></div>
        <div className={styles.heroInner}>
          <div className={styles.hLabel}>Press & Media Kit</div>
          <div className={styles.hTitle}>
            Everything you need
            <br />
            to cover AutoTubeOS.
          </div>
          <div className={styles.hSub}>
            Logos, screenshots, fact sheet, and press contact — all in one place.
          </div>
          <div className={styles.pressGrid}>
            <div>
              <div className={styles.assetTitle}><Package size={16} /> Brand Assets</div>
              {brandAssets.map((asset, index) => (
                <div key={index} className={styles.assetCard}>
                  <div className={styles.acIcon} style={{ background: asset.bg }}>
                    {asset.icon}
                  </div>
                  <div>
                    <div className={styles.acName}>{asset.name}</div>
                    <div className={styles.acSub}>{asset.sub}</div>
                  </div>
                  <button className={styles.dlBtn}><ArrowDown size={16} /> Download</button>
                </div>
              ))}

              <div className={styles.assetTitle} style={{ marginTop: '24px' }}>
                <FileText size={16} /> Documents
              </div>
              {documents.map((doc, index) => (
                <div key={index} className={styles.assetCard}>
                  <div className={styles.acIcon} style={{ background: doc.bg }}>
                    {doc.icon}
                  </div>
                  <div>
                    <div className={styles.acName}>{doc.name}</div>
                    <div className={styles.acSub}>{doc.sub}</div>
                  </div>
                  <button className={styles.dlBtn}><ArrowDown size={16} /> Download</button>
                </div>
              ))}
            </div>
            <div>
              <div className={styles.factSheet}>
                <div className={styles.fsTitle}><ClipboardList size={16} /> Company Fact Sheet</div>
                {factSheet.map((row, index) => (
                  <div key={index} className={styles.fsRow}>
                    <div className={styles.fsLbl}>{row.label}</div>
                    <div className={styles.fsVal}>{row.value}</div>
                  </div>
                ))}
              </div>
              <div className={styles.pressContact}>
                <div className={styles.pcTitle}><Phone size={16} /> Press Contact</div>
                <div className={styles.pcSub}>
                  For media inquiries, interviews, and partnerships. We respond within 4 hours on
                  weekdays.
                </div>
                <div style={{ fontSize: '13px', color: 'var(--red)', fontWeight: 600 }}>
                  press@autotubeos.com
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted2)', marginTop: '5px' }}>
                  Ahmed K. · Founder & CEO · @AutoTubeOS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.coverageSection}>
        <div style={{ fontFamily: 'var(--fh)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
          <Newspaper size={16} /> Press Coverage
        </div>
        <div className={styles.covGrid}>
          {coverage.map((item, index) => (
            <div key={index} className={styles.covCard}>
              <div className={styles.covPub}>{item.pub}</div>
              <div className={styles.covHeadline}>{item.headline}</div>
              <div className={styles.covDate}>{item.date}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
