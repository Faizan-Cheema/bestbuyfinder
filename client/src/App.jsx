import "./App.css";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from './Screens/LoginScreen';
import SellForm from "./components/SellForm";
import RegisterScreen from './Screens/RegisterScreen'
import Products from "./Screens/Products";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./Screens/ProductDetail";
import UsedProductDetail from "./Screens/UsedProductDetail";
import Compare from "./Screens/Compare";
import UsedProducts from "./Screens/Used";
import MyAds from "./Screens/MyAds"

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/sell" element={<SellForm />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/productdetails" element={<ProductDetail/>} />
      <Route path="/compare" element={<Compare/>} />
      <Route path="/Used" element={<UsedProducts/>} />
      <Route path="/usedproductdetails" element={<UsedProductDetail/>} />
      <Route path="/register" element={<RegisterScreen/>} />
      <Route path="/my-ads" element={<MyAds/>} />
      
      


      </Routes>
    </>
  );
}

export default App;
