import React, { useEffect } from "react";
import {
  A11yWatchProvider,
  SignOnForm,
  PaymentsPlans,
  StripeProvider,
  CheckoutForm,
  useA11yWatchContext,
} from "@a11ywatch/react-a11ywatch-js";

const Payments = () => {
  const { account } = useA11yWatchContext();

  useEffect(() => {
    // do something with account on change
    console.log(account)
  }, [account])

  return (
    <div className="space-y-2">
      <div className="text-xl">Welcome {account.email}</div>
      <PaymentsPlans />
      <StripeProvider>
        <CheckoutForm />
      </StripeProvider>
    </div>
  );
};

const MainApp = () => {
  const { account } = useA11yWatchContext();

  return account.authed ? <Payments /> : <SignOnForm />;
};

// wrap in auth provider
export function App() {
  return (
    <A11yWatchProvider>
      <MainApp />
    </A11yWatchProvider>
  );
}
