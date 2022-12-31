import { PropsWithChildren, useEffect, useState } from "react";
import { CheckoutForm } from "./checkout";
import { Token } from "@stripe/stripe-js";
import { StripeProvider } from "./stripe";
import { useAuthContext } from "./auth-provider";

type PaymentPlan = {
  title: string;
  details: string[];
  cost: string;
  costYearly: string;
  pageCount: number;
};

interface Plans {
  lPlans: PaymentPlan[];
  hPlans: PaymentPlan[];
  feats: string[];
}

export const PaymentsPlans = ({ children }: PropsWithChildren) => {
  const { setAccountType, account } = useAuthContext();
  const [paymentPlans, setPaymentPlans] = useState<Plans | null>(null);
  const [highPlan, setHighPlan] = useState<boolean>(false);
  const [yearly, setYearly] = useState<boolean>(false);
  const [selectedPlan, setSelected] = useState<number>(0);

  const plans =
    paymentPlans && (highPlan ? paymentPlans.hPlans : paymentPlans.lPlans);
  const selected = plans && plans[selectedPlan];

  useEffect(() => {
    if (!paymentPlans) {
      (async () => {
        try {
          // fetch the paymentPlans for A11yWatch
          const res = await fetch("https://api.a11ywatch.com/api/plans");
          const json = await res.json();

          if (json) {
            setPaymentPlans(json.data);
          }
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [paymentPlans]);

  const onToken = async (token: Token) => {
    const body = {
      stripeToken: token, // the stripe token with payment info
      yearly, // is yearly plan
      paymentPlan: selected?.title ?? "L1", // the selected plan
    };
    // send token plus account information to account upgrade
    try {
      // fetch the paymentPlans for A11yWatch
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_A11YWATCH_API}/api/upgrade`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.jwt}`, // set the auth token from login
          },
        }
      );
      const json = await res.json();
      const user = json?.data;

      if (user) {
        setAccountType({
          authed: true,
          email: user.email,
          jwt: user.jwt,
          role: user.role,
          activeSubscription: user.activeSubscription,
        });
      } else {
        alert(json?.message ?? "Error with API.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onToggleHighPlan = () => setHighPlan((x) => !x);

  const onToggleYearly = () => setYearly((x) => !x);

  return (
    <div>
      <div style={{ padding: 10, fontSize: "1.4rem" }}>
        Welcome: {account.email}
      </div>
      {paymentPlans ? (
        <div>
          <div>Features</div>

          <ul style={{ margin: 10 }}>
            {paymentPlans.feats.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>

          <div>Plans</div>

          <ul style={{ margin: 10 }}>
            {plans &&
              plans.map((item, i) => {
                const onSetPlan = () => setSelected(i);

                return (
                  <button
                    key={i}
                    onClick={onSetPlan}
                    style={{
                      padding: "1rem",
                      border:
                        selected?.title === item.title
                          ? "2px solid #fff"
                          : undefined,
                    }}
                  >
                    <div>{item.title}</div>
                    <div>{yearly ? item.costYearly : item.cost}</div>
                    <div>{item.details[0]}</div>
                  </button>
                );
              })}
          </ul>
        </div>
      ) : null}

      <div style={{ padding: "0.4rem" }}>
        <button onClick={onToggleHighPlan}>Toggle High Plans</button>
        <button onClick={onToggleYearly}>Switch Yearly</button>
      </div>

      <StripeProvider>
        <CheckoutForm
          price={yearly ? selected?.costYearly : selected?.cost}
          onToken={onToken}
          disabled={false}
        />
      </StripeProvider>

      {children}
    </div>
  );
};
