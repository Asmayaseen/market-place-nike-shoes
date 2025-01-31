import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { trackingNumber, carrierCode } = req.query;

  if (!trackingNumber || !carrierCode) {
    return res.status(400).json({ error: "Tracking number and carrier code are required" });
  }

  try {
    const response = await fetch(`https://api.shipengine.com/v1/tracking?carrier_code=${carrierCode}&tracking_number=${trackingNumber}`, {
      headers: {
        "API-Key": process.env.NEXT_PUBLIC_SHIPENGINE_API_KEY as string,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tracking data");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
