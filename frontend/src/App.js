import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./components/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Filters from "./pages/Filters";
import "./assets/styles/global.css";

function App() {
  const [filter, setFilter] = useState({})
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<DashBoard filter={filter} />} />}
        />
        <Route path="/filter" element={<ProtectedRoute element={<Filters setFilter={setFilter} />} />}/>
      </Routes>
    </>
  );
}

export default App;
