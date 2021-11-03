/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51JrfWpHnTp5rTBTLu2uVE7Mkd5wc278M15QKm7oelYmxSCO187bZ7FJuwBAfJDIhaCyQDzriGKGvSHlNEL4Q252u00GdrbMbb8'
  );
  try {
    // 1) Get checkout-session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2)
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }

  // 2) Create checkout form + charge CB
};
