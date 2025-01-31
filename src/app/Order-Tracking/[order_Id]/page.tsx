"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import the required CSS
import Image from "next/image"; // Import the Image component

const OrderTracking = () => {
  const [orderIdInput, setOrderIdInput] = useState<string>(""); // State to store inputted order ID
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isTracking, setIsTracking] = useState(false); // State to manage tracking action

  const handleOrderIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderIdInput(e.target.value); // Update input value
  };

  const handleTrackOrder = () => {
    if (!orderIdInput.trim()) {
      toast.error("Please enter a valid Order ID!"); // Error toast if input is empty
      return;
    }
    setIsTracking(true); // Start tracking order when the button is clicked
  };

  useEffect(() => {
    if (isTracking) {
      const savedOrderDetails = sessionStorage.getItem("orderDetails");
      if (savedOrderDetails) {
        const { formData, cart, orderId } = JSON.parse(savedOrderDetails);
        if (orderId === orderIdInput) {
          setOrderDetails({ formData, cart, orderId });
          setIsModalOpen(true); // Open the modal with order details
        } else {
          setOrderDetails(null); // Reset if no matching order
          toast.error("Order ID not found! Please check and try again."); // Show error toast
        }
      }
      setIsTracking(false); // Reset tracking state after processing
    }
  }, [isTracking, orderIdInput]);

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-lg">
        <div className="text-center mb-6">
          {/* Replace <img> with <Image> */}
          <Image
            className="w-[50px] h-[50px] object-contain"
            width={50}
            height={50}
            src="/assets/Nike.png"
            alt="Nike Logo"
            style={{ width: "auto", height: "auto" }} // Add this to maintain aspect ratio
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
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleTrackOrder}
            className="mt-4 w-full p-3 bg-black text-white rounded-lg"
          >
            Track Order
          </button>
        </div>
      </div>

      {/* Modal for displaying order details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-11/12 md:w-96">
            <h3 className="font-bold text-xl mb-4">Order Details</h3>
            <p>
              <strong>Name:</strong> {orderDetails?.formData.firstName}{" "}
              {orderDetails?.formData.lastName}
            </p>
            <p>
              <strong>Address:</strong> {orderDetails?.formData.address}
            </p>
            <ul className="mb-4">
              <strong>Order Items:</strong>
              {orderDetails?.cart.map((item: any, index: number) => (
                <li key={index}>
                  {item.name} (x{item.quantity}) - Rs{" "}
                  {item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p>
              <strong>
                Total: Rs
                {orderDetails?.cart.reduce(
                  (total: number, item: any) =>
                    total + item.price * item.quantity,
                  0
                )}
              </strong>
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="w-full p-4 bg-red-600 text-white rounded-3xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default OrderTracking;
