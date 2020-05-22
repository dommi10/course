const stripe = require("stripe")("sk_test_abcIsRNezunnwVafUhdiG524");

module.exports = {
  payment: async function (req, res) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: "usd",
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: "accept_a_payment" },
      });
      res.json({ paymentIntent });
      // res.json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
      console.log(error);
    }
  },
  charge: async function (req, res) {
    try {
      const token = req.body.stripeToken; // Using Express

      const charge = await stripe.charges.create({
        amount: 999,
        currency: "usd",
        description: "Example charge",
        source: token,
      });
      res.json({ charge });
    } catch (error) {
      console.log(error);
      res.status(403).json({ error: "error" });
    }
  },
};
