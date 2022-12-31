import "@a11ywatch/react-a11ywatch-js/css/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
