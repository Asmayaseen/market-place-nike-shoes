"use client";
import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";


interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: string;
  itemsCount: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch data from orders API
  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns: GridColDef[] = [
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "orderDate", headerName: "Order Date", width: 180 },
    { field: "totalAmount", headerName: "Total Amount", type: "number", width: 150 },
    { field: "itemsCount", headerName: "Items Count", type: "number", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  return (
    <div className="m-10">
      <h2 className="flex items-center font-semibold ml-[10%] mb-2">Orders</h2>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      <DataGrid rows={orders} columns={columns} />
    </div>
  );
};

export default Orders;
