'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/navbar.module.css';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const pathname = router.pathname;
  const isHome = pathname === '/' || pathname === '';
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
      <Link href="/" className={styles.navLogo} onClick={closeMenu}>
        AutoTube<span>OS</span>
      </Link>
      
      {/* HAMBURGER TRIGGER */}
      <button 
        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>

      <ul className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
        <li>
          <Link href={isHome ? "#features" : "/#features"} onClick={closeMenu}>Features</Link>
        </li>
        <li>
          <Link href={isHome ? "#workflow" : "/#workflow"} onClick={closeMenu}>How It Works</Link>
        </li>
        <li>
          <Link href="/pricing" onClick={closeMenu}>Pricing</Link>
        </li>
        <li>
          <Link href="/about" onClick={closeMenu}>About</Link>
        </li>
        <li>
          <Link href="/blog" onClick={closeMenu}>Blog</Link>
        </li>
        <li className={styles.mobileCtaLi}>
          <Link href="/auth" className={styles.navCtaMobile} onClick={closeMenu}>
            Get Started
          </Link>
        </li>
      </ul>
      
      <Link href="/auth" className={styles.navCta}>
        Get Started
      </Link>
    </nav>
  );
}

