// src/pages/api/products/[id].tsx
import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../sanity/lib/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    // Sanity se product fetch karna
    const product = await client.fetch(
      `*[_type == "product" && _id == $id][0]`,
      { id }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Product data return karna
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product data" });
  }
}
