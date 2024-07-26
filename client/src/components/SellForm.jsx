import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SellForm.css";

function SellForm() {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productLocation: "",
    phoneNumber: "",
    productPhotos: [],
  });

  const userId = localStorage.getItem('userId');


  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const updatedPhotos = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(updatedPhotos);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !formData.productName ||
      !formData.productPrice ||
      !formData.productDescription ||
      !formData.productLocation ||
      !formData.phoneNumber ||
      images.length === 0
    ) {
      alert("Please fill in all fields and upload at least one photo.");
      return;
    }

    const form = new FormData();
    form.append("productName", formData.productName);
    form.append("productPrice", formData.productPrice);
    form.append("productDescription", formData.productDescription);
    form.append("productLocation", formData.productLocation);
    form.append("phoneNumber", formData.phoneNumber);
    form.append('user_id', userId);
    images.forEach((image) => {
      form.append("productPhotos", image);
    });

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post("http://localhost:5000/api/newProduct", form, config);
      alert("Product added successfully");
      navigate("/", { state: response.data });
    } catch (error) {
      console.error(error);
      alert("There was an error adding the product.");
    }
  };

  return (
    <div>
      <div className="pt-2.5 bg-gray-200 h-20 flex items-center justify-center">
        <h2 className="text-3xl font-bold">Post Your Ad</h2>
      </div>
      <div className="bg-gray-50 px-6 md:px-36 lg:px-48">
        <h2 className="text-3xl font-bold pt-6 pb-6">Add Some Details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="productName" className="text-2xl">
            Product Name:
          </label>
          <input
            className="pb-4 mb-6"
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />

          <label htmlFor="productPrice" className="text-2xl ">
            Price: (PKR)
          </label>
          <input
            className="pb-4 mb-6"
            type="text"
            id="productPrice"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />

          <label htmlFor="productDescription" className="text-2xl">
            Description:
          </label>
          <textarea
            className="pb-4 mb-6 text-xl pt-2 pl-2"
            id="productDescription"
            name="productDescription"
            rows="4"
            value={formData.productDescription}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="productPhotos" className="text-2xl">
            Upload Photos:
          </label>
          <div className="upload-container">
            <label htmlFor="productPhotos" className="custom-file-upload">
              Choose Images
            </label>
            <input
              id="productPhotos"
              name="productPhotos"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <div className="image-preview-container">
            {imagePreviews.map((src, index) => (
              <div key={index} className="image-preview-wrapper">
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="image-preview"
                />
                <button
                  type="button"
                  className="remove-image-button"
                  onClick={() => removeImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <label htmlFor="productLocation" className="text-2xl">
            Location:
          </label>
          <input
            className="pb-4 mb-6"
            type="text"
            id="productLocation"
            name="productLocation"
            value={formData.productLocation}
            onChange={handleChange}
            required
          />

          <label htmlFor="phoneNumber" className="text-2xl">
            Phone No:
          </label>
          <input
            className="pb-4 mb-6"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <input
            type="submit"
            value="Publish"
            className="pb-6 font-bold text-xl"
          />
        </form>
      </div>
    </div>
  );
}

export default SellForm;
