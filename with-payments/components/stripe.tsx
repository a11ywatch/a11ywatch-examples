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
          // fetch the A11yWatch Stripe client key for stripe
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_A11YWATCH_API}/api/client-key`
          );
          const json = await res.json();

          if (json?.data?.client_secret) {
            const stripeObject = await loadStripe(json.data.client_secret);
            if (stripeObject) {
              setStripe(stripeObject);
            }
          } else {
            console.error(
              json?.message ?? "Issue with stripe secret. Rate limits may be applied."
            );
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
