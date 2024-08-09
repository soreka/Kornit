import { useState } from "react";
import DashBoard from "./pages/dashboard";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import "./assets/styles/global.css";
import Filters from "./pages/Filters";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route path="/filter" element={<Filters />} />
      </Routes>
    </>
  );
}

export default App;
