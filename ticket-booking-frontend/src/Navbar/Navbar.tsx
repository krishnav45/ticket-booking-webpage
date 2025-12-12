import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">🎬 MyTicketApp</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
