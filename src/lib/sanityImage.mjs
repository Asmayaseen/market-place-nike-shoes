// lib/sanityImage.ts (or lib/sanity.ts)

import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'iygh418k', // Replace with your actual project ID
  dataset: 'production',        // Replace with your actual dataset
  useCdn: true,                 // Optional: Use CDN for faster performance
});
