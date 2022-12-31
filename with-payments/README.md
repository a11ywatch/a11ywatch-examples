# with-payments

An example using A11yWatch infrastructure to manage external accounts. This project uses `nextjs` a react framework.

## Getting Started

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
2. send payment via authenticated user.
3. use new JWT to access API and profit.

## Todo

At the moment we need to split the auth and payment step into two steps in the UI.

1. Top level provider to take auth token and display payment view
