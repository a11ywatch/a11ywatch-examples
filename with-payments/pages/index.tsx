import Head from "next/head";
import styles from "../styles/Home.module.css";
import { App } from "../components/app";

export default function Home() {
  return (
    <>
      <Head>
        <title>A11yWatch Account Management App</title>
        <meta
          name="description"
          content="Manage user accounts externally with A11yWatch."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            A11yWatch integrate payments and account management
          </p>
        </div>

        <div className={styles.center}>
          <App />
        </div>
      </main>
    </>
  );
}
