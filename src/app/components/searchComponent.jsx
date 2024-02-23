import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = ({ apiUrl, onDataReceived }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${apiUrl}?brand=${query}`);
            const data = response.data;
            onDataReceived(data); // Pass the data back to the parent component
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
// Universal query search on the basis of any keyword in the object 
            // const response = await axios.get(`${apiUrl}?q=${query}`);
    //example for the above search component in backend for setting queries
    {/* 
    the query should be like this for postgre Db
     SELECT *
        FROM products
        WHERE id ILIKE '%search_query%'
        OR brand ILIKE '%search_query%'
         OR model ILIKE '%search_query%'
        OR image ILIKE '%search_query%'
        OR price ILIKE '%search_query%';

   the query should be like this for mongo Db 
    const searchResults = await Product.find({
     $or: [
        { id: { $regex: query, $options: 'i' } }, // Search by id
        { brand: { $regex: query, $options: 'i' } }, // Search by brand
        { model: { $regex: query, $options: 'i' } }, // Search by model
        { image: { $regex: query, $options: 'i' } }, // Search by image
        { price: { $regex: query, $options: 'i' } } // Search by price
        ]
    });

   for this object
   {
      "id": "1",
      "brand": "Apple",
      "model": "iPhone 13",
      "image": "https://example.com/iphone13.jpg",
      "price": 999.99
    }
*/}
    
    return (
        <>
            <div className="w-1/2">
                
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input  
                    type="search"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                    <button 
                     onClick={handleSearch} 
                     className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                        </button>
                </div>
            </div>

        </>
    )
}
export default SearchComponent