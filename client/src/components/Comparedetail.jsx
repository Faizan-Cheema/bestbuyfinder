import React from 'react';

const Comparedetail = ({ product, onClose }) => {

  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      stars.push(
        <span key={i} className={`fa fa-star ${i < rating ? 'text-black' : 'text-gray-300'}`}></span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-gray-300 h-20"></div>
      <div className="flex flex-col md:flex-row px-4 md:px-20 py-8">
        <img
          className="md:pl-12 md:h-96 w-full md:w-auto object-cover"
          src={product.image || '/src/images/default.jpg'}
          alt={product.name}
        />
        <div className="bg-gray-50 md:pl-12 flex-1 p-8 md:p-0">
          <h1 className="text-3xl font-bold pt-4">{product.name}</h1>

          <div className="flex items-center pt-4">
            {renderStars(product.rating)}
            <p className="pl-2">({product.numReviews} reviews)</p>
          </div>

          <h2 className="text-2xl font-semibold pt-4">Rs. {product.price}</h2>

          <h3 className="text-xl font-semibold pt-4">Description</h3>
          <div className="w-full md:w-96 pt-2">
            <p>{product.description}</p>
          </div>

          <div className="flex items-center pt-4">
            <h3 className="text-lg font-semibold">Source:</h3>
            <p className="pl-2 pt-1">{product.source}</p>
          </div>

          <p className="pt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              <a href={product.url}>Buy Now</a>
            </button>
          </p>
        </div>
      </div>

      <button
        className="fixed top-4 right-4 text-gray-500 hover:text-gray-800"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Comparedetail;
