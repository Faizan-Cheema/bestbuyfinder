import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function ProductlistCard({ name, price, website, imgSrc, rating, reviews, onClick }) {
  // Truncate the name to 40 characters with ellipsis if necessary
  const truncateName = (name) => {
    if (name.length >40) {
      return name.slice(0, 40) + '...';
    }
    return name;
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star text-black"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-black"></i>);
      }
    }
    return stars;
  };

  return (

    <>

    <div className="flex border p-4 m-4 rounded-lg shadow-lg" onClick={onClick}>
      
      <img src={imgSrc} alt={name} className="w-24 h-20 object-cover rounded-lg mr-4" />
      <div className="flex flex-col justify-between w-full">
        <div>
          <h1 className="text-lg font-bold mb-2">{truncateName(name)}</h1>
          <p className="mb-2">{website}</p>
          <p className="text-xl font-semibold mb-2">Rs. {price}</p>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex items-center">
            {renderStars()}
          </div>
          <p className="ml-2 text-gray-600">({reviews})</p>
        </div>
      </div>
    </div>
    </>
    
   
  );
}

export default ProductlistCard;
