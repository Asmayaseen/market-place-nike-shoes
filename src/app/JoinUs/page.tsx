"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function JoinUs() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    country: "",
    gender: "",
    subscribe: false,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        router.push("/SignIn");
      } else {
        toast.error(data.error || "Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-[380px] max-w-lg p-8 bg-white shadow-lg rounded-md">
        <div className="text-center mb-6">
          <Image src="/assets/Nike.png" alt="Nike Logo" width={64} height={64} className="mx-auto" />
        </div>
        <h1 className="text-xl font-semibold text-center text-gray-800">
          BECOME A NIKE MEMBER
        </h1>
        <p className="text-sm text-center text-gray-600 mt-2">
          Create your Nike Member profile and get first access to the very best
          of Nike products, inspiration, and community.
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email address" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4" onChange={handleChange} required />
          <input type="text" name="firstName" placeholder="First Name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4" onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4" onChange={handleChange} required />
          <input type="date" name="dateOfBirth" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4" onChange={handleChange} required />
          <select name="country" value={formData.country} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 mb-4" onChange={handleChange} required>
            <option value="" disabled>Select Country/Region</option>
            <option value="Pakistan">Pakistan</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
          </select>
          <div className="flex items-center gap-4 mb-4">
            <button type="button" className={`flex-1 py-2 border rounded-md text-center ${formData.gender === "Male" ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`} onClick={() => handleGenderSelect("Male")}>Male</button>
            <button type="button" className={`flex-1 py-2 border rounded-md text-center ${formData.gender === "Female" ? "bg-gray-800 text-white" : "hover:bg-gray-100"}`} onClick={() => handleGenderSelect("Female")}>Female</button>
          </div>
          <label className="flex items-center text-gray-600 text-sm mb-4">
            <input type="checkbox" className="mr-2 rounded accent-black" name="subscribe" checked={formData.subscribe} onChange={handleChange} />
            Sign up for emails to get updates from Nike on products, offers, and your Member benefits.
          </label>
          <p className="text-xs text-gray-500 mb-6 text-center">
            By creating an account, you agree to Nike&apos;s <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Use</a>.
          </p>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
            Join Us
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already a Member? <a href="/SignIn" className="text-black font-medium hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}