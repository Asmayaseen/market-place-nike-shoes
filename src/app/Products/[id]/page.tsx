import { client } from "@/sanity/lib/client";
import ProductDetailClient from "@/components/ProductDetailClient";

interface PageProps {
  params: { id: string };
}

export default async function ProductDetail({ params }: PageProps) {
  const query = `
    *[_type == "product" && _id == $id][0] {
      _id,
      productName,
      "imageUrl": image.asset->url,
      colors,
      price,
      description
    }
  `;

  const product = await client.fetch(query, { id: params.id });

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailClient product={product} />;
}
