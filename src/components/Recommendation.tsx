import React from 'react';
import Image from 'next/image'; // Import Image component from next/image

export default function Recommendation() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h3 className="text-lg font-bold mt-12 mb-4">You Might Also Like</h3>
        <div className="flex gap-12 overflow-x-scroll md:overflow-x-hidden">
          {/* Product 1 */}
          <div className="flex-shrink-0 w-48 ml-8">
            <Image
              src="/assets/Shoe1.png"
              alt="Air Jordan"
              width={200} // Add width and height for optimization
              height={192}
              className="w-full h-48 object-cover rounded-md border"
            />
            <h4 className="font-semibold mt-2">Air Jordan 1 Mid SE Craft</h4>
            <p className="text-gray-500">Men&apos;s Shoes</p>
            <p className="font-bold">MRP: ₹ 12,295.00</p>
          </div>

          {/* Product 2 */}
          <div className="flex-shrink-0 w-48">
            <Image
              src="/assets/Shirt.png"
              alt="Air Jordan"
              width={200}
              height={192}
              className="w-full h-48 object-cover rounded-md border"
            />
            <h4 className="font-semibold mt-2">Air Jordan 1 Mid SE Craft</h4>
            <p className="text-gray-500">Men&apos;s Shoes</p>
            <p className="font-bold">MRP: ₹ 12,295.00</p>
          </div>

          {/* Product 3 */}
          <div className="flex-shrink-0 w-48">
            <Image
              src="/assets/Shoe2.png"
              alt="Air Jordan"
              width={200}
              height={192}
              className="w-full h-48 object-cover rounded-md border"
            />
            <h4 className="font-semibold mt-2">Air Jordan 1 Mid SE Craft</h4>
            <p className="text-gray-500">Men&apos;s Shoes</p>
            <p className="font-bold">MRP: ₹ 12,295.00</p>
          </div>

          {/* Product 4 */}
          <div className="flex-shrink-0 w-48">
            <Image
              src="/assets/Shirt2.png"
              alt="Air Jordan"
              width={200}
              height={192}
              className="w-full h-48 object-cover rounded-md border"
            />
            <h4 className="font-semibold mt-2">Air Jordan 1 Mid SE Craft</h4>
            <p className="text-gray-500">Men&apos;s Shoes</p>
            <p className="font-bold">MRP: ₹ 12,295.00</p>
          </div>

          {/* Product 5 */}
          <div className="flex-shrink-0 w-48">
            <Image
              src="/assets/Shoes.png"
              alt="Air Jordan"
              width={200}
              height={192}
              className="w-full h-48 object-cover rounded-md border"
            />
            <h4 className="font-semibold mt-2">Air Jordan 1 Mid SE Craft</h4>
            <p className="text-gray-500">Men&apos;s Shoes</p>
            <p className="font-bold">MRP: ₹ 12,295.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
