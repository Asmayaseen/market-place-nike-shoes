// pages/api/fetchProducts.js
export async function handler(req, res) {
    try {
      const response = await fetch("https://iygh418k.apicdn.sanity.io/v2025-01-18/data/query/production?query=*%5B_type%20%3D%3D%20%22product%22%5D");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.error.message}`);
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch data", error: error.message });
    }
  }
  