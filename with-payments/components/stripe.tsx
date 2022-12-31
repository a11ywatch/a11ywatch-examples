import { memo, PropsWithChildren, useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Load stripe Elements
export const StripProviderWrapper = ({ children }: PropsWithChildren) => {
  const [stripePromise, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    if (!stripePromise) {
      (async () => {
        try {
          // fetch the A11yWatch client key for stripe
          const res = await fetch("https://api.a11ywatch.com/api/client-key");
          const json = await res.json();
          const stripeObject = await loadStripe(json.data.client_secret);
          if (stripeObject) {
            setStripe(stripeObject);
          }
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [stripePromise]);

  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export const StripeProvider = memo(StripProviderWrapper);
