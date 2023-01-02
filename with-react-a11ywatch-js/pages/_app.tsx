import "@a11ywatch/react-a11ywatch-js/css/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { A11yWatchProvider } from "@a11ywatch/react-a11ywatch-js";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <A11yWatchProvider persist>
      <Component {...pageProps} />
    </A11yWatchProvider>
  );
}
