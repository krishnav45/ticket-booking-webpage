import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import "./ShowList.css";


<div className="banner">
  <h1>Book Your Favorite Shows 🎉</h1>
  <p>Enjoy hassle-free ticket booking with MyTicketApp</p>
</div>

const ShowList: React.FC = () => {
  const { shows } = useContext(AppContext);

  return (
    <div className="showlist-container">
      {shows.length === 0 ? (
        <p>No shows available</p>
      ) : (
        <div className="show-grid">
          {shows.map(show => (
            <div key={show.id} className="show-card">
              <div className="show-image">
                🎬
              </div>
              <div className="show-info">
                <h3>{show.name}</h3>
                <p><strong>Start:</strong> {show.start_time}</p>
                <p><strong>Available Seats:</strong> {show.available_seats}</p>
              </div>
              <Link to={`/booking/${show.id}`}>
                <button className="book-now-btn">Book Now</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowList;
