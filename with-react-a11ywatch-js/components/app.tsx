import React, { useEffect } from "react";
import {
  SignOnForm,
  PaymentsPlans,
  StripeProvider,
  CheckoutForm,
  useA11yWatchContext,
  PaymentsProvider,
} from "@a11ywatch/react-a11ywatch-js";
import Link from "next/link";

const Payments = () => {
  const { account } = useA11yWatchContext();

  useEffect(() => {
    // do something with account on change
    console.log(account);
  }, [account]);

  return (
    <div className="space-y-2">
      <div className="text-xl">Welcome {account.email}</div>
      <PaymentsPlans />
      <StripeProvider>
        <CheckoutForm />
      </StripeProvider>

      <div>
        <Link href={"/profile"} className={"text-blue-600"}>
          Profile
        </Link>
        <Link href={"/audit"} className={"text-blue-600 ml-2"}>
          Audit
        </Link>
      </div>
    </div>
  );
};

const MainApp = () => {
  const { account } = useA11yWatchContext();

  return account.authed ? (
    <PaymentsProvider>
      <Payments />
    </PaymentsProvider>
  ) : (
    <SignOnForm />
  );
};

// wrap in auth provider
export function App() {
  return <MainApp />;
}
