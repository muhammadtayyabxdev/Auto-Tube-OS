'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import styles from '@/styles/not-found.module.css';
import { CreditCard, Flame, PenTool, Phone, Search } from 'lucide-react';

interface Particle {
  id: number;
  left: string;
  dur: string;
  delay: string;
  size: string;
  bg: string;
}

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glitching, setGlitching] = useState(false);

  // Generate randomized floating particles on client-side mount
  useEffect(() => {
    const colors = ['#ff3d3d', '#3b82f6', '#a855f7', '#22c55e'];
    const list: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      dur: `${4 + Math.random() * 8}s`,
      delay: `${Math.random() * 8}s`,
      size: `${2 + Math.random() * 3}px`,
      bg: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(list);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to Help Center with search pre-populated
      router.push(`/help?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleGlitchTrigger = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 200);
  };

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.gridBg}></div>
        <div className={styles.glowCenter}></div>
        <div className={styles.glowLeft}></div>
        <div className={styles.glowRight}></div>

        {/* PARTICLES */}
        <div className={styles.particles}>
          {particles.map((p) => (
            <div
              key={p.id}
              className={styles.particle}
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                background: p.bg,
                // Assign CSS Custom Properties
                ['--dur' as any]: p.dur,
                ['--delay' as any]: p.delay
              }}
            />
          ))}
        </div>

        <div className={styles.content}>
          <div
            className={`${styles.num404} ${glitching ? styles.glitchActive : ''}`}
            onMouseEnter={handleGlitchTrigger}
          >
            <span className={styles.n4a}>4</span>
            <span className={styles.n0}>0</span>
            <span className={styles.n4b}>4</span>
          </div>

          <div className={styles.errorBadge}>
            <div className={styles.bDot}></div> Page not found
          </div>

          <h2 className={styles.errTitle}>
            Looks like this page went
            <br />
            off-script.
          </h2>
          <p className={styles.errSub}>
            The page you're looking for doesn't exist, was moved, or the URL has a typo. Even our AI couldn't find it —
            and it's pretty good at finding things.
          </p>

          <form onSubmit={handleSearchSubmit} className={styles.searchWrap}>
            <input
              className={styles.searchInp}
              placeholder="Search Help Center..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn}>
              <Search size={16} />
            </button>
          </form>

          <div className={styles.actions}>
            <Link href="/" className={styles.btnRed}>
              ← Back to Home
            </Link>
            <Link href="/dashboard" className={styles.btnGhost}>
              Open Dashboard
            </Link>
          </div>

          <div className={styles.quickLinks}>
            <Link href="/dashboard?tab=topics" className={styles.ql}>
              <span className={styles.qlIcon}><Flame size={16} /></span> Topic Finder
            </Link>
            <Link href="/script-generator" className={styles.ql}>
              <span className={styles.qlIcon}><PenTool size={16} /></span> Script Generator
            </Link>
            <Link href="/pricing" className={styles.ql}>
              <span className={styles.qlIcon}><CreditCard size={16} /></span> Pricing
            </Link>
            <Link href="/contact" className={styles.ql}>
              <span className={styles.qlIcon}><Phone size={16} /></span> Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
