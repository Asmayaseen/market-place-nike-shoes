"use client";
import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

// Define the product type
interface Product {
  id: string;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  colors: string[];
  status: string;
  description: string;
  imageUrl: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch data from API using the Datafetch function
  const Datafetch = async () => {
    try {
      const query = await fetch("/api/products");
      const data = await query.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  useEffect(() => {
    Datafetch(); // Call the Datafetch function when component mounts
  }, []);

  const columns: GridColDef[] = [
    { field: 'productName', headerName: 'Product Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'price', headerName: 'Price', type: 'number', width: 120 },
    { field: 'inventory', headerName: 'Stock', type: 'number', width: 120 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'colors', headerName: 'Colors', width: 150 },
    { field: 'imageUrl', headerName: 'Image', width: 150, renderCell: (params) => <img src={params.value} alt="Product" width="50" /> },
  ];

  return (
    <div className="m-10">
      <h2 className="flex items-center font-semibold ml-[10%] mb-2">Products</h2>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      <DataGrid rows={products} columns={columns} />
    </div>
  );
};

export default Products;
