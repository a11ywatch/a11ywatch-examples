# with-payments

An example using [A11yWatch](https://a11ywatch.com) infrastructure to manage external accounts. This project uses `nextjs` a react framework.

## Getting Started

If you are running locally make sure to start the A11yWatch suite or set the env `NEXT_PUBLIC_A11YWATCH_API` in [next.config.js](./next.config.js) to the production app.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## About

You can integrate with A11yWatch and manage your own external payment usage dynamically without having to interact with the UI.
This project shows how to use the A11yWatch API to build your own payment system using Stripe that can upgarde and downgrade a user
account for improved API limits.

## Integration steps

1. First sign on or register a new account from the form.
2. Next send payment via authenticated user.
3. Use new JWT to access API and profit.

## The Process

The exact steps to replicate the example are:

1. [auth-provider](./components/auth-provider.tsx) - A react provider to share authentication state across the [app](./components/app.tsx).
1. [signon-form](./components/signon-form.tsx) - A form to authenticate the user to A11yWatch. The fetch client needs to set the `Content-Type` to `application/json` header for all `POST` request.
1. [payment-plans](./components/plans.tsx) - The payment plans and information to display from A11yWatch. This component fetches the plans from the API.
1. [stripe-provider](./components/stripe.tsx) - The stripe provider to get the valid Stripe key from A11yWatch.
1. [stripe-checkout](./components/checkout.tsx) - The checkout component for payment submissions via react stripe. The component takes a prop called `onToken` that submits to the A11yWatch API once resolved. The [payment-plans](./components/plans.tsx) component passes the `onToken` prop in this example.

You can technically replace `NEXT_PUBLIC_A11YWATCH_API` with any valid A11yWatch instance whether self hosted or using the A11yWatch.com infrastructure.

## Notes

Once you submit the first payment for a user you can upgrade the account without needing to use Stripe on the client. You can use the `stripeID` property to determine if an account has a valid stripe attachment. The stripeID can be used to manage the account externally as well.

## Todo

1. cancel subscription form