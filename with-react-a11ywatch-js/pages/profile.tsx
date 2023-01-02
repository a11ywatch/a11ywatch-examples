import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { App } from "../components/app";
import {
  A11yWatchProvider,
  SignOnForm,
  useA11yWatchContext,
} from "@a11ywatch/react-a11ywatch-js";

const ProfileApp = () => {
  const { account, setAccountType } = useA11yWatchContext();
  const router = useRouter();

  const onLogoutEvent = async () => {
    setAccountType({
      activeSubscription: false,
      authed: false,
      email: "",
      jwt: "",
      role: 0,
    });

    await router.push("/");
  };

  return account.authed ? (
    <div>
      Email: {account.email}
      <div>
        <div className="py-2">Logout Account?</div>
        <button
          onClick={onLogoutEvent}
          className={"p-4 border rounded text-red-600"}
        >
          Logout
        </button>
      </div>
    </div>
  ) : (
    <SignOnForm />
  );
};

export default function Profile() {
  return (
    <>
      <Head>
        <title>A11yWatch Account Management App</title>
        <meta name="description" content="Profile page A11yWatch." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Profile Page</p>
        </div>
        <ProfileApp />
      </main>
    </>
  );
}
