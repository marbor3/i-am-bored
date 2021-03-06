import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import dashboardReducer, {
  createDashboardIniitalState,
} from "../../src/state/DashboardReducer";
import useEventsDataSource from "../../src/components/dashboard/Dashboard.dataSource";
import { useRouter } from "next/router";
import FullEvent from "../../src/elements/fullevent/FullEvent";

export default function Event({ page }) {
  const router = useRouter();
  const { slug } = router.query;
  // TODO, fetch just one event
  const [events] = useEventsDataSource(page);
  const event = events?.get(slug);
  console.log(event);

  return (
    <div className={styles.container}>
      <Head>
        <title>Events</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {event ? <FullEvent {...event} /> : null}
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          this is the footer
        </a>
      </footer>
    </div>
  );
}
