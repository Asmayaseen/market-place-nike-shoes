"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

// Define types for order details
interface FormData {
  firstName: string;
  lastName: string;
  address: string;
}

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  formData: FormData;
  cart: CartItem[];
  orderId: string;
}

const OrderTracking = () => {
  const [orderIdInput, setOrderIdInput] = useState<string>("");  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderIdInput(e.target.value);
  };

  const handleTrackOrder = () => {
    setIsTracking(true);
  };

  useEffect(() => {
    if (isTracking) {
      const savedOrderDetails = sessionStorage.getItem("orderDetails");

      if (savedOrderDetails) {
        try {
          const parsedDetails: OrderDetails = JSON.parse(savedOrderDetails);
          
          if (parsedDetails.orderId === orderIdInput) {
            setOrderDetails(parsedDetails);
            setIsModalOpen(true);
          } else {
            setOrderDetails(null);
            toast.error("Order ID not found! Please check and try again.");
          }
        } catch (error) {
          console.error("Error parsing order details:", error);
          toast.error("Error fetching order details.");
        }
      } else {
        toast.error("No order details found!");
      }

      setIsTracking(false);
    }
  }, [isTracking, orderIdInput]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-lg">
        <div className="text-center mb-3">
          <Image
            src="/assets/Nike.png"
            alt="Nike Logo"
            width={64}
            height={64}
            priority
            className="mx-auto"
          />
          <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
        </div>

        {/* Order ID Input Form */}
        <div className="mb-4">
          <input
            type="text"
            value={orderIdInput}
            onChange={handleOrderIdChange}
            placeholder="Enter your Order ID"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-gray-500"
          />
          <button
            onClick={handleTrackOrder}
            className="mt-4 w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Track Order
          </button>
        </div>

        {/* Modal for displaying order details */}
        {isModalOpen && orderDetails && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-96 shadow-lg">
              <h3 className="font-bold text-xl mb-4">Order Details</h3>
              <p><strong>Name:</strong> {orderDetails.formData.firstName} {orderDetails.formData.lastName}</p>
              <p><strong>Address:</strong> {orderDetails.formData.address}</p>
              <ul className="mb-4">
                <strong>Order Items:</strong>
                {orderDetails.cart.map((item, index) => (
                  <li key={index}>
                    {item.name} (x{item.quantity}) - Rs {item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total: Rs {orderDetails.cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}</strong>
              </p>
              <div className="mt-4 text-center">
                <button
                  onClick={closeModal}
                  className="w-full p-4 bg-red-600 text-white rounded-3xl hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default OrderTracking;
