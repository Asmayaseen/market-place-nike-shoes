"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { client } from "@/sanity/lib/client";

// Define types for product data
interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await client.fetch(`*[_type == "product"]{
          _id,
          productName,
          category,
          price,
          image,
          description,
        }`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search query change
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts([]);
      return;
    }
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <header>
      <div className="body-font bg-[#F5F5F5] h-[36px] pt-1">
        <div className="container mx-auto flex justify-between items-center px-6">
          <Image width={24} height={24} src="/assets/Vector.png" alt="Nike Store Icon" />
          <nav className="flex items-center text-sm text-[#111111] space-x-2 md:space-x-6">
            <Link href="/Stores">Find a Store</Link>
            <span className="w-[1px] h-[14px] bg-[#111111]"></span>
            <Link href="/Help">Help</Link>
            <span className="w-[1px] h-[14px] bg-[#111111]"></span>
            <Link href="/JoinUs">Join Us</Link>
            <span className="w-[1px] h-[14px] bg-[#111111]"></span>
            <Link href="/SignIn">Sign In</Link>
            <span className="w-[1px] h-[14px] bg-[#111111]"></span>
            <Link href="/Products">Products</Link>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </div>

      <div className="w-full h-[60px] flex justify-between items-center px-4 font-helvetica bg-[#FFFFFF] shadow-md">
        <Link href="/">
          <Image width={50} height={50} src="/assets/Nike.png" alt="Nike Logo" />
        </Link>

        <nav className="hidden md:flex space-x-6 text-[15px]">
          <Link href="/">New & Featured</Link>
          <Link href="/mens">Men</Link>
          <Link href="/womens">Women</Link>
          <Link href="/kids">Kids</Link>
          <Link href="/sale">Sale</Link>
          <Link href="/SNKRS">SNKRS</Link>
        </nav>

        <div className="hidden md:flex space-x-4 items-center">
          <div className="relative">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-2xl">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-black text-[14px] placeholder:text-gray-500 w-full"
              />
              <IoSearch className="text-black w-[20px] h-[20px]" />
            </div>

            {searchQuery && filteredProducts.length > 0 && (
              <div className="absolute bg-white w-full border border-gray-300 rounded-md shadow-lg mt-2 z-10">
                <ul>
                  {filteredProducts.map((product) => (
                    <li key={product._id} className="px-4 py-2 hover:bg-gray-200">
                      <Link href={`/Products/${product._id}`}>{product.productName}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link href="/WishList">
            <Image src="/assets/Heart.png" alt="Wishlist" width={36} height={36} />
          </Link>
          <Link href="/Bag">
            <Image src="/assets/Bag.png" alt="Shopping Bag" width={36} height={36} />
          </Link>
        </div>
      </div>

      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✖" : "☰"}
      </button>
    </header>
  );
}
