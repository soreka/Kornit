import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./components/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Filters from "./pages/Filters";
import "./assets/styles/global.css";
import DashBoard from "./pages/dashboard";

function App() {
  const [filter, setFilter] = useState({})
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<DashBoard filter={filter} setFilter={setFilter} />} />}
        />
        <Route path="/filter" element={<ProtectedRoute element={<Filters setFilter={setFilter} filter={filter} />} />} />
      </Routes>
    </>
  );
}

export default App;
