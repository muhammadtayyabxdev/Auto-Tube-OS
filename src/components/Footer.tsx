import Link from 'next/link';
import styles from '@/styles/footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.logo}>
        AutoTube<span>OS</span>
      </Link>
      <p>&copy; {new Date().getFullYear()} AutoTube OS. All rights reserved.</p>
      <div className={styles.footerLinks}>
        <Link href="/legal">Privacy & Terms</Link>
        <Link href="/careers">Careers</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/changelog">Changelog</Link>
        <Link href="/status">Status</Link>
      </div>
    </footer>
  );
}
