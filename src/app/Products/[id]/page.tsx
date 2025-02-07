
import { client } from "@/sanity/lib/client";
import ProductDetailClient from "@/components/ProductDetailClient";

interface PageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function ProductDetail({ params }: PageProps) {
  console.log("Params received:", params); // Debugging ke liye

  if (!params?.id) {
    return <div>Invalid product ID</div>;
  }

  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    productName,
    "imageUrl": image.asset->url,
    colors,
    price,
    description
  }`;

  try {
    const product = await client.fetch(query, { id: params.id });

    if (!product) {
      return <div>Product not found</div>;
    }

    return <ProductDetailClient product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <div>Something went wrong. Please try again later.</div>;
  }
}
