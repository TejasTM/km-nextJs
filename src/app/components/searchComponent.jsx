import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = ({ apiUrl, onDataReceived }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        try {
            //Example of url and query for brands only
            // const response = await axios.get(`${apiUrl}?brand=${query}`);

            // Universal query search on the basis of any keyword in the object 
            const response = await axios.get(`${apiUrl}?q=${query}`);
            onDataReceived(response.data); // Pass the data back to the parent component
            console.log(onDataReceived, "onDataReceived")
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

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
    const handleChange = (event) => {
        setQuery(event.target.value);
    };
    return (
        <>
            <div className="flex items-center space-x-2 my-4 mx-2">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search..."
                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none"
                >
                    Search
                </button>
            </div>
            
        </>
    )
}
export default SearchComponent