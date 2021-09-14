import Head from 'next/head';
import Image from 'next/image';
import Dashboard from '../src/components/dashboard/Dashboard';
import Location from '../src/components/location/Location';

import styles from '../styles/Home.module.css';

export default function Home({ page }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Events</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Location />
        <Dashboard />
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
          this is the footer
        </a>
      </footer>
    </div>
  );
}
