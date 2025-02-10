// pages/api/fetchProducts.js
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await fetch(
      "https://iygh418k.apicdn.sanity.io/v2025-01-18/data/query/production?query=*%5B_type%20%3D%3D%20%22product%22%5D"
    );
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${data.error?.message || "Unknown error"}`);
    }

    // ✅ Correctly returning Sanity's 'result' array
    res.status(200).json(data.result);
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch data", error: error.message });
  }
}
