// src/utils/sanityClient.ts
import sanityClient from "@sanity/client";

// Sanity client setup
export const client = sanityClient({
  projectId: "iygh418k",  // Replace with your Sanity project ID
  dataset: "production",         // Replace with your Sanity dataset name (usually 'production')
  useCdn: true,                  // Use Sanity's CDN for faster queries (enable caching)
});

