import React, { useState } from 'react';
import axios from 'axios';
import ProductlistCard from './ProductlistCard';
import Comparedetail from './Comparedetail';

const ProductComparison = () => {
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [suggestionsA, setSuggestionsA] = useState([]);
  const [suggestionsB, setSuggestionsB] = useState([]);
  const [selectedProductA, setSelectedProductA] = useState(null);
  const [selectedProductB, setSelectedProductB] = useState(null);

  const fetchProductSuggestions = async (searchTerm, setSuggestions) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/searchproduct?search=${searchTerm}`);
      setSuggestions(response.data.slice(0, 5)); // Limit to 5 suggestions
    } catch (error) {
      console.error("Error fetching product suggestions:", error);
    }
  };

  const handleSearchA = (e) => {
    const searchTerm = e.target.value;
    setSearchA(searchTerm);
    fetchProductSuggestions(searchTerm, setSuggestionsA);
  };

  const handleSearchB = (e) => {
    const searchTerm = e.target.value;
    setSearchB(searchTerm);
    fetchProductSuggestions(searchTerm, setSuggestionsB);
  };

  const handleProductClick = (product, side) => {
    if (side === 'A') {
      setSelectedProductA(product);
      setSuggestionsA([]);
      setSearchA('');
    } else if (side === 'B') {
      setSelectedProductB(product);
      setSuggestionsB([]);
      setSearchB('');
    }
  };

  return (
    <div className="bg-gray-200 p-5 min-h-screen w-screen">
      <div className="flex flex-col lg:flex-row justify-center items-start mt-5 w-full">
        {/* A DIV */}
        <div className="text-center mx-5 relative w-full lg:w-1/2">
          <input
            type="text"
            placeholder="Search Product A"
            value={searchA}
            onChange={handleSearchA}
            className="p-2 border border-gray-400 rounded-full w-full lg:w-1/2"
          />
          {suggestionsA.length > 0 && (
            <div className="absolute top-0 left-0 bg-white border border-gray-400 mt-1 rounded-lg w-full z-10">
              {suggestionsA.map((product) => (
                <ProductlistCard
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  website={product.source}
                  imgSrc={product.image}
                  rating={product.rating}
                  reviews={product.numReviews}
                  onClick={() => handleProductClick(product, 'A')}
                />
              ))}
            </div>
          )}
          {selectedProductA && (
            <div className={`mt-2 ${suggestionsA.length > 0 ? 'hidden' : 'block'}`}>
              <Comparedetail product={selectedProductA} onClose={() => setSelectedProductA(null)} />
            </div>
          )}
        </div>

        {/* B DIV */}
        <div className="text-center mx-5 relative w-full lg:w-1/2 mt-5 lg:mt-0">
          <input
            type="text"
            placeholder="Search Product B"
            value={searchB}
            onChange={handleSearchB}
            className="p-2 border border-gray-400 rounded-full w-full lg:w-1/2"
          />
          {suggestionsB.length > 0 && (
            <div className="absolute top-0 left-0 bg-white border border-gray-400 mt-1 rounded-lg w-full z-10">
              {suggestionsB.map((product) => (
                <ProductlistCard
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  website={product.source}
                  imgSrc={product.image}
                  rating={product.rating}
                  reviews={product.numReviews}
                  onClick={() => handleProductClick(product, 'B')}
                />
              ))}
            </div>
          )}
          {selectedProductB && (
            <div className={`mt-2 ${suggestionsB.length > 0 ? 'hidden' : 'block'}`}>
              <Comparedetail product={selectedProductB} onClose={() => setSelectedProductB(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
