import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { BsFillFilterCircleFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import { useWishList } from "@/components/WishList";

type Product = {
  _id: string;
  productName: string;
  imageUrl: string;
  colors?: string[];
  price: number;
};

export default function Mens() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { wishList, addToWishList, removeFromWishList } = useWishList();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product" && category == "Sales"]{
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
        if (fetchedProducts.length === 0) {
          setError("No products found in the Sales category.");
        } else {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        <div className="flex w-full items-center justify-center mt-10 text-center">
          <Image
            src={"/assets/outofstock.jpg"}
            width={400}
            height={400}
            alt={"Out of Stock"}
            className="mb-4"
          />
          <p className="text-xl font-semibold">{error}</p>
        </div>
      ) : (
        <main className="w-full lg:w-3/4 p-6">
          <div className="flex justify-between items-center mb-4">
            {!isSidebarOpen && (
              <button
                className="lg:hidden bg-gray-800 text-white p-2 rounded-full"
                onClick={toggleSidebar}
              >
                <BsFillFilterCircleFill />
              </button>
            )}
            <h2 className="text-xl font-semibold">Sort By</h2>
            <button className="text-gray-600">Hide Filters</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-md shadow-sm hover:shadow-lg transition"
              >
                <Link href={`/Products/${product._id}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.productName}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover mb-4 rounded"
                  />
                </Link>
                <h3 className="text-lg font-medium truncate">{product.productName}</h3>
                <p className="text-gray-500">{product.colors?.join(", ")}</p>
                <p className="text-gray-900 font-semibold">MRP: ${product.price}</p>
                <button
                  className="mt-2 text-xl"
                  onClick={(e) => {
                    e.stopPropagation();  // Prevent link from being clicked
                    toggleWishList(product);
                  }}
                >
                  {wishList.some((item) => item.id === product._id) ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart className="text-gray-400 hover:text-red-500 transition" />
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
