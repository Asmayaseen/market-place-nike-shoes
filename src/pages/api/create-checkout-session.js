// pages/api/create-checkout-session.js
import { stripe } from "stripe";

const stripeSecretKey = "your-secret-key"; // Apne secret key ko use karo
const stripeInstance = new stripe(stripeSecretKey);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: req.body.cart.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [item.imageUrl],
            },
            unit_amount: item.price * 100, // Price ko cents mein convert karo
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: "Error creating checkout session" });
    }
  }
}
