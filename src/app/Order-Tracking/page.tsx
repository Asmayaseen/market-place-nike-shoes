"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TrackingData {
  status_description: string;
  carrier_detail: {
    name: string;
  };
  estimated_delivery_date: string | null;
}

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [carrierCode, setCarrierCode] = useState<string>("ups"); // Default UPS
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTrackOrder = async () => {
    if (!trackingNumber.trim()) {
      toast.error("Please enter a tracking number!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/track-order?trackingNumber=${trackingNumber}&carrierCode=${carrierCode}`);
      const data = await response.json();

      if (data.error) {
        toast.error("Invalid tracking number or carrier.");
      } else {
        setTrackingData(data);
      }
    } catch (error: unknown) {
      toast.error(`Something went wrong: ${(error as Error).message || "Please try again."}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Track Your Order</h1>

        {/* Tracking Number Input */}
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter Tracking Number"
          className="w-full p-3 border border-gray-300 rounded-md mb-2"
        />

        {/* Carrier Dropdown */}
        <select
          value={carrierCode}
          onChange={(e) => setCarrierCode(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        >
          <option value="ups">UPS</option>
          <option value="fedex">FedEx</option>
          <option value="usps">USPS</option>
        </select>

        {/* Track Order Button */}
        <button
          onClick={handleTrackOrder}
          className="w-full p-3 bg-blue-600 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Tracking..." : "Track Order"}
        </button>
      </div>

      {/* Display Tracking Data */}
      {trackingData && (
        <div className="bg-white p-6 mt-4 rounded-md shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Tracking Details</h2>
          <p><strong>Status:</strong> {trackingData.status_description}</p>
          <p><strong>Shipped via:</strong> {trackingData.carrier_detail.name}</p>
          <p><strong>Estimated Delivery:</strong> {trackingData.estimated_delivery_date || "N/A"}</p>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default OrderTracking;
