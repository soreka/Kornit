import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./components/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Filters from "./pages/Filters";
import "./assets/styles/global.css";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="/filter" element={<ProtectedRoute element={Filters} />}/>
      </Routes>
    </>
  );
}

export default App;
