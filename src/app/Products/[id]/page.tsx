import { client } from "@/sanity/lib/client";
import ProductDetailClient from "@/components/ProductDetailClient";

// This function will be called server-side to fetch the product data
async function fetchProductData(id: string) {
  const query = `
    *[_type == "product" && _id == "${id}"][0] {
      _id,
      productName,
      "imageUrl": image.asset->url,
      colors,
      price,
      description
    }
  `;
  const product = await client.fetch(query);
  return product;
}

// Server-side component for product details page
export default async function ProductDetail({ params }: { params: { id: string } }) {
  // Await the params first to ensure it's available
  const { id } = await params; // Correctly await params

  const product = await fetchProductData(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailClient product={product} />;
}
