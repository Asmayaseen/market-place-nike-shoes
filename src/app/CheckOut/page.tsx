
"use client";
import React, { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import Image from "next/image";

export default function CheckOut() {
    const { cart } = useCart();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        pan: "",
        address: "",
    });
    const [orderId, setOrderId] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.phone ||
            !formData.pan ||
            !formData.address
        ) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        if (cart.length === 0) {
            toast.error("Your cart is empty. Please add items to your cart.");
            return;
        }

        const generatedOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
        setOrderId(generatedOrderId);
        setShowDialog(true);

        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

        const orderDetails = {
            orderId: generatedOrderId,
            customer: formData,
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            totalAmount,
        };

        try {
            await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            toast.success("Order successfully saved in Sanity!");
        } catch (error) {
            console.error("Sanity migration error:", error);
            toast.error("Failed to save order in Sanity.");
        }

        sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails));

        const emailContent = {
            ...formData,
            orderId: generatedOrderId,
            cart: cart.map(item => `${item.name} (Qty: ${item.quantity})`).join(", "),
        };

        emailjs
            .send(
                process.env.NEXT_PUBLIC_YOUR_SERVICE_ID!,
                process.env.NEXT_PUBLIC_YOUR_TEMPLATE_ID!,
                emailContent,
                process.env.NEXT_PUBLIC_YOUR_USER_ID!
            )
            .then(() => {
                toast.success("Order confirmation sent to your email!");
            })
            .catch((error) => {
                console.error("Email send error:", error);
                toast.error("Failed to send confirmation email.");
            });
    };

    const handleTrackOrder = () => {
        router.push(`/Order-Tracking/${orderId}`);
    };

    return (
        <div className="min-h-screen bg-[#FFFFFF] p-6">
            <div className="flex flex-col lg:flex-row justify-center max-w-7xl mx-auto gap-8">
                <div className="bg-white w-full lg:w-[440px] p-6">
                    <h1 className="text-[21px] font-medium mb-4">How would you like to get your order?</h1>
                    <p className="text-[#757575] mb-6">
                        Customs regulation for India require a copy of the recipient&apos;s KYC...
                    </p>

                    <div className="mb-6">
                        <button className="w-full p-4 border border-gray-300 rounded-lg flex items-center justify-start">
                            <Image
                                src="/assets/Delivery.png"
                                alt="Delivery"
                                width={24}
                                height={24}
                                className="rounded-md border mr-4"
                            />
                            <span className="font-medium">Deliver it</span>
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <span className="text-[21px] font-medium text-[#111111]">Enter your name and address:</span>

                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="p-4 border rounded-md w-full"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="p-4 border rounded-md w-full"
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="p-4 border rounded-md w-full"
                        />

                        <h2 className="text-lg font-medium mb-4">What&apos;s your contact information?</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="p-4 border rounded-md w-full"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="p-4 border rounded-md w-full"
                        />

                        <h2 className="text-lg font-medium mb-4">What&apos;s your PAN?</h2>
                        <input
                            type="text"
                            placeholder="PAN"
                            name="pan"
                            value={formData.pan}
                            onChange={handleInputChange}
                            className="p-4 border rounded-md w-full"
                        />

                        <button className="w-full p-4 bg-[#111111] text-white rounded-3xl">Continue</button>
                    </form>
                </div>

                <div className="bg-white w-full lg:w-[320px] p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    <ul className="space-y-6">
                        {cart.map((item) => (
                            <li key={item.id} className="flex items-center">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={128}
                                    height={128}
                                    className="rounded-md border mr-4"
                                />
                                <div>
                                    <p className="font-normal text-[13px]">{item.name}</p>
                                    <p className="text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <hr className="my-6" />
                    <div className="text-lg font-medium flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                    </div>
                    <div className="text-lg font-medium flex justify-between">
                        <span>Delivery:</span>
                        <span>Free</span>
                    </div>
                    <div className="text-xl font-bold flex justify-between mt-4">
                        <span>Total:</span>
                        <span>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {showDialog && orderId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md w-[400px]">
                        <h2>Your Order ID: {orderId}</h2>
                        <button onClick={handleTrackOrder} className="w-full p-4 bg-[#111111] text-white rounded-3xl">
                            Track Order
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
