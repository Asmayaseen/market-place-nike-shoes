"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { client } from "@/sanity/lib/client";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(`*[_type == "product"]{
        _id,
        productName,
        category,
        price,
        image,
        description
      }`);
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProducts(products.filter((product) => product.productName.toLowerCase().includes(query)));
  };

  return (
    <>
      {/* Top Header */}
      <header className="body-font bg-[#F5F5F5] h-[36px] pt-1">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-6">
          <div className="flex items-center">
            <Image src="/assets/Vector.png" alt="Icon" width={24} height={24} />
          </div>
          <nav className="flex flex-wrap items-center text-sm text-[#111111] space-x-2 md:space-x-6">
            <Link href="/Stores">Find a Store</Link>
            <Link href="/Help">Help</Link>
            <Link href="/JoinUs">Join Us</Link>
            <Link href="/SignIn">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Main Header */}
      <header className="w-full h-[60px] flex justify-between items-center px-4 bg-[#FFFFFF]">
        {/* Logo */}
        <Link href="/">
          <Image src="/assets/Nike.png" alt="Nike Logo" width={50} height={50} />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex ml-44 space-x-4 text-[15px]">
          {['New & Featured', 'Men', 'Women', 'Kids', 'Sale', 'SNKRS'].map((item) => (
            <Link key={item} href={`/${item.replace(/ & /g, '').toLowerCase()}`}>{item}</Link>
          ))}
        </nav>

        {/* Search & Wishlist */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center gap-[10px] px-[15px] py-[5px] border border-gray-300 rounded-2xl">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="bg-transparent outline-none text-black text-[14px] placeholder:text-gray-500 w-full"
              />
              <IoSearch className="text-black w-[20px] h-[20px]" />
            </div>
            {searchQuery && filteredProducts.length > 0 && (
              <div className="absolute bg-white w-full border border-gray-300 rounded-md shadow-lg mt-2 z-10">
                <ul>
                  {filteredProducts.map((product) => (
                    <li key={product._id} className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
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

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-[80px] left-0 w-full bg-white shadow-md md:hidden">
            <nav className="flex flex-col items-center space-y-4 p-4">
              {['New & Featured', 'Men', 'Women', 'Kids', 'Sale', 'SNKRS'].map((item) => (
                <Link key={item} href={`/${item.replace(/ & /g, '').toLowerCase()}`}>{item}</Link>
              ))}
              <div className="flex flex-col items-center space-y-2 mt-4">
                <div className="relative">
                  <div className="flex items-center gap-[10px] px-[15px] py-[5px] border border-gray-300 rounded-2xl">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="bg-transparent outline-none text-black text-[14px] placeholder:text-gray-500 w-full"
                    />
                    <IoSearch className="text-black w-[20px] h-[20px]" />
                  </div>
                  {searchQuery && filteredProducts.length > 0 && (
                    <div className="absolute bg-white w-full border border-gray-300 rounded-md shadow-lg mt-2 z-10">
                      <ul>
                        {filteredProducts.map((product) => (
                          <li key={product._id} className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
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
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
