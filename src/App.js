import React from "react";
import Headers from "./components/jsFile/Header";
import Headers1 from "./components/jsFile/Header1";
import Home from "./components/jsFile/Home";
import Product from "./components/jsFile/Product";
import Sales from "./components/jsFile/Sales";
import AdminDashboard from "./components/jsFile/AdminDashboard";
import Footer from "./components/jsFile/Footer";
import Contact from "./components/jsFile/Contact";
import FAQ from "./components/jsFile/Faq";
import About from "./components/jsFile/About";
import Auth from "./components/jsFile/Auth";
import Header from './components/jsFile/Header';
// import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ContainerPage from "./components/jsFile/index" 
function App() {
  // const refresh = () => window.location.reload(true)

  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loggedInFun = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      
      <Routes>
        <Route exact path="/" element={<ContainerPage />} >
        <Route exact path="dashboard" element={<Home />} />
        <Route exact path="contact" element={<Contact />} />
        <Route exact path="faq" element={<FAQ />} />
        <Route exact path="sales" element={<Sales />} />
        <Route exact path="adminDashboard" element={<AdminDashboard />} />
        <Route exact path="about" element={<About />} />
        <Route exact path="product" element={<Product />} />
        <Route exact path="login" element={<Auth />} />
        </Route>
      </Routes>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
