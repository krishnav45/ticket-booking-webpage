import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ShowList from "./components/ShowList";
import BookingPage from "./components/BookingPage";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ShowList />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AppProvider>
  );
};

export default App;
