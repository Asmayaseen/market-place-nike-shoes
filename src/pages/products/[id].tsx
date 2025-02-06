import React from "react";
import { GetServerSideProps } from "next";
import { client } from "../../sanity/lib/client";
import { useClerk } from '@clerk/clerk-react';  // Clerk integration

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
}

interface ProductDetailProps {
  product: Product | null;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { user } = useClerk();  // Clerk hook to get user

  if (!user) {
    return <div>Please log in to see product details.</div>;  // Display if user is not authenticated
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.productName}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Add more details here like image, stock, etc. */}
      <button>Add to Cart</button>
    </div>
  );
};

// Server-side data fetching for product details
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;  // Ensure `params` is accessed correctly

  if (!id || typeof id !== "string") {
    return { notFound: true };  // Return 404 if the ID is invalid or not present
  }

  try {
    const product = await client.fetch(
      `*[_type == "product" && _id == $id][0]`, 
      { id }
    );

    if (!product) {
      return { notFound: true };  // Return 404 if no product found
    }

    return {
      props: { product },  // Pass product to the page component
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };  // Return 404 if an error occurs
  }
};

export default ProductDetail;
