import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useWishList } from "@/components/WishList";
import Image from "next/image";

type Product = {
  _id: string;
  productName: string;
  imageUrl: string;
  colors?: string[];
  price: number;
};

export default function SNKRS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { wishList, addToWishList, removeFromWishList } = useWishList();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && category in ["Men's Shoes", "Women's Shoes", "Men's Running Shoes"]]{
          _id,
          productName,
          category,
          price,
          inventory,
          colors,
          status,
          "imageUrl": image.asset->url,
          description
        }`;
        const fetchedProducts = await client.fetch(query);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const toggleWishList = (product: Product) => {
    if (wishList.some((item) => item.id === product._id)) {
      removeFromWishList(product._id);
      toast.info("Removed from your wish list.");
    } else {
      addToWishList({
        id: product._id,
        name: product.productName,
        price: product.price,
        imageUrl: product.imageUrl,
      });
      toast.success("Added to your wish list!");
    }
  };

  return (
    <>
      <ToastContainer />
      {error ? (
        <div className="flex w-full items-center justify-center mt-10">
          <Image
            src="/assets/Out_Of_Stock.jpg"
            width={500}
            height={500}
            alt="Out of Stock"
            className="mb-4"
            priority
          />
        </div>
      ) : (
        <main className="w-full lg:w-3/4 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border p-4">
                <Link href={`/Products/${product._id}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.productName}
                    width={300} 
                    height={300} 
                    className="w-full mb-4 object-cover"
                    priority
                  />
                </Link>
                <h3 className="text-lg font-medium">{product.productName}</h3>
                <p className="text-gray-500">{product.colors?.join(", ")}</p>
                <p className="text-gray-900">MRP: ₹ {product.price}</p>
                <button
                  className="relative top-2 right-2 text-xl"
                  onClick={() => toggleWishList(product)}
                >
                  {wishList.some((item) => item.id === product._id) ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart className="text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </main>
      )}
    </>
  );
}
