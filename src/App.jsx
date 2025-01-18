import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/aboutUs/AboutUs";
import ApiContext from "./components/services/apiContext/ApiContext";
import "./App.css";

function App() {
  return (
    <ApiContext>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
        <Footer />
      </Router>
    </ApiContext>
  );
}

export default App;
