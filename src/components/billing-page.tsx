"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { client } from "@/sanity/lib/client";
import toast from "react-hot-toast";
import AuthGuard from "./AuthGuard";
import { urlFor } from "@/sanity/lib/image";

// Define Product Type
interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: any;
}

// Stripe Initialization
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BillingPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});

  // Fetch Cart Items from Local Storage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartData);

    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const errors = Object.fromEntries(
      Object.entries(formValues).map(([key, value]) => [key, !value])
    );
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all the fields");
      return;
    }

    try {
      // Step 1: Create Order in Sanity
      const orderData = {
        _type: "order",
        ...formValues,
        cartItems: cartItems.map((item) => ({
          _type: "reference",
          _ref: item._id,
        })),
        total,
        discount,
        orderDate: new Date().toISOString(),
      };

      const orderResponse = await client.create(orderData);
      if (!orderResponse) throw new Error("Failed to create order in Sanity");

      // Step 2: Proceed with Stripe Checkout
      const stripe = await stripePromise;
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems, formValues, total }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create checkout session");
      }

      const { id } = await response.json();
      await stripe?.redirectToCheckout({ sessionId: id });
    } catch (error: any) {
      toast.error(error.message || "An error occurred while processing your request.");
      console.error(error);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="mt-10 max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 py-3.5">
            <Link href="/cart" className="text-gray-600 hover:text-black text-sm">
              Cart
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Checkout</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 py-3 border-b">
                <div className="w-16 h-16 rounded overflow-hidden">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-sm">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Billing Form */}
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-medium mb-6">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(formValues).map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    placeholder={`Enter your ${field}`}
                    value={formValues[field as keyof typeof formValues]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {formErrors[field] && (
                    <p className="text-red-500 text-sm">{field} is required</p>
                  )}
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="py-4 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal:</span> <span>${subtotal}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Discount:</span> <span>-${discount}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Shipping:</span> <span className="text-gray-600">Free</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Total:</span> <span>${total}</span>
              </div>
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
