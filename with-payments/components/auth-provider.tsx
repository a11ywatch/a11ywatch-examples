"use client";

import {
  createContext,
  useContext,
  FC,
  useState,
  PropsWithChildren,
} from "react";

const defaultAccount = {
  activeSubscription: false,
  authed: false,
  email: "",
  jwt: "",
  role: 0,
};

const AppContext = createContext({
  account: defaultAccount,
  setAccountType: (_x: typeof defaultAccount) => {},
});

export const AuthProviderBase = AppContext.Provider;

export const AuthProviderWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [account, setAccountType] = useState<{
    activeSubscription: boolean;
    authed: boolean;
    email: string;
    jwt: string;
    role: number;
  }>({
    activeSubscription: false,
    authed: false,
    email: "",
    jwt: "",
    role: 0,
  });

  return (
    <AuthProviderBase value={{ account, setAccountType }}>
      {children}
    </AuthProviderBase>
  );
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <AuthProviderWrapper>{children}</AuthProviderWrapper>;
};

export function useAuthContext() {
  return useContext(AppContext);
}
