import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/dashboard";
import Login from "./components/Login";
import NotificationBox from "./components/Notification"; // Import NotificationBox
import Filters from "./pages/Filters";
import "./assets/styles/global.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route path="/filter" element={<Filters />} />
        <Route path="/notifications" element={<NotificationBox />} /> {/* Add route for NotificationBox */}
      </Routes>
    </>
  );
}

export default App;
