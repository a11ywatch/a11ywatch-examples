import React from "react";
import { PaymentsPlans } from "./plans";
import { SignOnForm } from "./signon-form";
import { AuthProvider, useAuthContext } from "./auth-provider";

const MainApp = () => {
  const { account } = useAuthContext();

  return account.authed ? <PaymentsPlans /> : <SignOnForm />;
};

// wrap in auth provider
export function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
