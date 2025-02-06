import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../sanity/lib/client";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-01-27.acacia' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Product ID is missing or invalid." });
  }

  try {
    // Fetch product data from Sanity
    const product = await client.fetch(
      `*[_type == "product" && _id == $id][0]`,
      { id }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create Stripe PaymentIntent for the product
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.price * 100, // amount in cents
      currency: 'usd',
      description: product.productName,
    });

    // Respond with the Stripe client secret for frontend use
    res.status(200).json({ clientSecret: paymentIntent.client_secret, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing payment" });
  }
}
