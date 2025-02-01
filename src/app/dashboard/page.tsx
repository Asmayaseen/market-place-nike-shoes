"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Define types for stats and chart data
interface Stats {
  orders: number;
  users: number;
  products: number;
}

interface ChartData {
  name: string;
  orders: number;
}

const DashboardPage = () => {
  const { isSignedIn } = useAuth();

  // Define state with proper types
  const [stats, setStats] = useState<Stats>({ orders: 0, users: 0, products: 0 });
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Fake Stats Data (Replace with API later)
    setStats({ orders: 120, users: 45, products: 300 });
    setChartData([
      { name: "Jan", orders: 30 },
      { name: "Feb", orders: 50 },
      { name: "Mar", orders: 80 },
      { name: "Apr", orders: 120 },
    ]);
  }, []);

  if (!isSignedIn) {
    return <p className="text-center mt-10 text-red-500">Please login to access the dashboard.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg">📦 Orders: {stats.orders}</div>
        <div className="p-4 bg-green-500 text-white rounded-lg">👤 Users: {stats.users}</div>
        <div className="p-4 bg-purple-500 text-white rounded-lg">🛒 Products: {stats.products}</div>
      </div>

      {/* Sales Chart */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">📊 Sales Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
