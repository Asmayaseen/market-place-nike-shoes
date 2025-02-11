import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId:"iygh418k", // Replace with your project ID
  dataset:"production",       // Replace with your dataset
  apiVersion:"2025-01-18",    // Replace with your desired API version
  useCdn: true,                // Use CDN for faster response
});
