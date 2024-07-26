import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming `formData` is the state containing your form inputs
      const response = await axios.post("http://localhost:5000/api/login", formData);
  
      // The response data is already in JSON format
      const { userId } = response.data;
  
      // Store user ID in local storage
      localStorage.setItem('userId', userId);
  
      // Redirect to home page or another part of your app
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };
  

  const handleclick = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full shadow-md px-6 py-6 rounded-md">
        <h1 className="text-3xl font-bold italic mb-6 text-center">Best Buy Finder</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleclick}
            className="text-gray-500 hover:text-gray-700 font-semibold mb-4 w-full"
          >
            Sign Up
          </button>
          <button
            type="submit"
            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
