# with-a11ywatch-react-forms

An example using [A11yWatch](https://a11ywatch.com) infrastructure to manage external accounts. This project uses `nextjs` a react framework.

## Getting Started

If you are running locally make sure to start the A11yWatch suite or set the env `NEXT_PUBLIC_A11YWATCH_API` in [next.config.js](./next.config.js) to the production app.
You can set the env `NEXT_PUBLIC_A11YWATCH_API` to determine what API instance of A11yWatch to target ex: `NEXT_PUBLIC_A11YWATCH_API=http://localhost:3280`.

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
account for improved API limits. The example wraps the A11yWatchProvider in the [`_app.tsx`](./components/app.tsx) file for app wide usage.

## Integration steps

1. First sign on or register a new account from the form.
2. Next send payment via authenticated user.
3. Use new JWT to access API and profit.

You can technically replace `NEXT_PUBLIC_A11YWATCH_API` with any valid A11yWatch instance whether self hosted or using the A11yWatch.com infrastructure.

## Notes

Once you submit the first payment for a user you can upgrade the account without needing to use Stripe on the client. You can use the `stripeID` property to determine if an account has a valid stripe attachment. The stripeID can be used to manage the account externally as well.

## Todo

1. cancel subscription form