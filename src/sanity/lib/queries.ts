import { groq } from 'next-sanity'
import { client } from './client' // Yeh apne client.ts se import karna hai

// Query for all products
export const allProducts = groq`*[_type == "product"]`;

// Query for first four products
export const four = groq`*[_type == "product"][0..3]`;

// Function to fetch all products
export const getAllProducts = async () => {
  const query = groq`
    *[_type == "product"]{
      _id,
      title,
      price,
      colors,
      imageUrl
    }
  `;
  
  // Fetching products using the query
  const products = await client.fetch(query);

  return products;
};
