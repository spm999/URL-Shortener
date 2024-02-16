import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AboutUs from './components/AboutUs/AboutUs';
import Contact from './components/Contact/Contact';
import Home2 from './components/Home2/Home2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:userId" element={<Home2/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/:userId/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
