import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

interface Props {
  onToken(token: any): any;
  plan?: string;
  price?: number | string;
  disabled: boolean;
}

const style = {
  base: {
    iconColor: "#0E1116",
    fontWeight: "500",
    fontFamily: "system-ui, -apple-system, Helvetica Neue",
    fontSize: "20px",
    fontSmoothing: "antialiased",
  },
};

export const CheckoutForm = ({ onToken, price, disabled }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, token } = await stripe.createToken(cardElement);

      if (!error) {
        await onToken(token);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={"h-42 space-y-3 border-t border-[#2A2A2A] pt-5 pb-3 w-full"}
      style={{ width: "100%" }}
    >
      <div className="text-xl font-semibold" style={{ padding: 10 }}>
        Total{" "}
        {typeof price === "number"
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price / 100)
          : price}
      </div>
      <div className="space-y-4">
        <div style={{ background: "#fff", padding: 5 }}>
          <CardElement
            options={{
              disabled,
              style,
              classes: { focus: "border-blue-400 shadow-md shadow-blue-600" },
            }}
            className={"p-4 bg-white border-2"}
          />
        </div>

        <div style={{ padding: 5 }}>
          <button
            type="submit"
            disabled={disabled}
            className={`font-bold border text-base px-8 md:px-8 rounded-sm md:px-12 md:rounded-sm min-w-[260px] md:min-w-[275px] ${
              disabled ? "text-black" : "border-blue-800 text-blue-800"
            }`}
            style={{ padding: 10 }}
          >
            Start
          </button>
        </div>
      </div>
    </form>
  );
};
