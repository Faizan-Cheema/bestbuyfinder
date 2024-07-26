import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Navbar from './Navbar';

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      // Fetch products for the current user
      fetch(`http://localhost:5000/api/searchNewProductByUserId?uid=${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            // Handle API errors
            setError(data.error);
          } else {
            setProducts(data);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setError('Failed to fetch products.');
          setLoading(false);
        });
    } else {
      // Handle the case where the user ID is not present
      console.log('No user ID found in local storage.');
      setLoading(false);
    }
  }, [userId]);

  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/api/deleteNewProductById?pid=${productId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProducts(products.filter(product => product._id !== productId));
        } else {
          console.error('Error deleting product:', data.error);
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="product-list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p> // Display error message
        ) : products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="product-item">
              <Link to={`/usedproductdetails?pid=${product._id}`}>
                <ProductCard
                  name={product.name}
                  price={`Rs. ${product.price}`} // Display price with Rs. prefix
                  website={product.source}
                  imgSrc={product.image}
                  rating={product.rating}
                  reviews={product.numReviews}
                />
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="delete-button mt-2 px-4 py-2 text-sm rounded-full font-bold text-[#000] border-2 border-[#000] bg-[#000] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#000]"
              >
                <span className="text-white hover:text-[#000]">Delete Ad</span>
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProducts;
