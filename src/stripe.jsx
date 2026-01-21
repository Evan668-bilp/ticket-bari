// import { loadStripe } from '@stripe/stripe-js';

// export const stripePromise = loadStripe(process.env.pk_test_51Sm5r9JuUHC958EA923iRzLCNFn5RlL0fvVoSCtr8nOpYrwQm4luQ9Ap18eXD4cD45oMdpDWl8OeM09MchgHMyme00QsIkQP8y);




import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
