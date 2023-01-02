import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  AuditForm,
  AuditList,
  AuditProvider,
  SignOnForm,
  useA11yWatchContext,
} from "@a11ywatch/react-a11ywatch-js";

const AuditApp = () => {
  const { account } = useA11yWatchContext();

  return account.authed ? (
    <AuditProvider>
      <AuditForm />
      <AuditList />
    </AuditProvider>
  ) : (
    <SignOnForm />
  );
};

export default function Audit() {
  return (
    <>
      <Head>
        <title>A11yWatch Audit Example</title>
        <meta name="description" content="Audit example A11yWatch." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Audit Page</p>
        </div>
        <AuditApp />
      </main>
    </>
  );
}
