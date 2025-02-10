import { groq } from 'next-sanity';

// Fetch all products
export const getAllProducts = groq`*[_type == "product"]{
  _id,
  title,
  price,
  "image": images[0].asset->url,
  description,
  category,
  stock
}`;

// Fetch a single product by ID
export const getProductById = groq`*[_type == "product" && _id == $id][0]`;

// Fetch products by category
export const getProductsByCategory = groq`*[_type == "product" && category == $category]`;

// Fetch all orders (if using orders in Sanity)
export const getAllOrders = groq`*[_type == "order"]{
  _id,
  userId,
  totalAmount,
  status,
  paymentMethod,
  items[]
}`;

// Fetch user details by ID (if users are stored in Sanity)
export const getUserById = groq`*[_type == "user" && _id == $id][0]`;

// Fetch all categories
export const getAllCategories = groq`*[_type == "category"]{ _id, title }`;

// Fetch featured products (if using a featured flag in schema)
export const getFeaturedProducts = groq`*[_type == "product" && featured == true]`;

// Fetch products with discounts
export const getDiscountedProducts = groq`*[_type == "product" && discountPercentage > 0]`;

// Fetch latest products (assuming you have a _createdAt field)
export const getLatestProducts = groq`*[_type == "product"] | order(_createdAt desc)[0...10]`;

// Fetch all customers (if storing customers in Sanity)
export const getAllCustomers = groq`*[_type == "customer"]{
  _id,
  name,
  email,
  phone,
  address
}`;

// Fetch a single customer by ID
export const getCustomerById = groq`*[_type == "customer" && _id == $id][0]`;

// Fetch orders for a specific customer
export const getCustomerOrders = groq`*[_type == "order" && userId == $userId]{
  _id,
  totalAmount,
  status,
  paymentMethod,
  items[]
}`;

// Fetch wishlist for a specific customer
export const getCustomerWishlist = groq`*[_type == "wishlist" && userId == $userId]{
  _id,
  items[]
}`;