// components/SearchBar.tsx

import { useState } from 'react';
import { client } from '../lib/sanityImage.mjs'; // Sanity client import

interface SearchBarProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setQuery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]); // To store search results

  // Function to fetch search results from Sanity
  const handleSearch = async () => {
    const query = `*[_type == "product" && name match $searchTerm]{
      name,
      price,
      description,
      image
    }`;

    try {
      const res = await client.fetch(query, { searchTerm: `*${searchTerm}*` });
      setResults(res);
      setQuery(searchTerm); // Update parent component query state
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="flex items-center justify-center my-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="p-2 border rounded-lg w-64"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
      >
        Search
      </button>

      {/* Display search results */}
      <div className="mt-4">
        {results.length > 0 ? (
          results.map((product) => (
            <div key={product._id} className="border-b py-2">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
