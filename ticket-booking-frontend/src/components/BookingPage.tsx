import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { bookSeats } from "../api/api";
import SeatGrid from "./SeatGrid";
import "./BookingPage.css"; // new CSS file

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { shows, fetchShows, bookings } = useContext(AppContext);
  const navigate = useNavigate();

  const showId = id ? parseInt(id, 10) : 0;
  const show = shows.find(s => s.id === showId);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  if (!show) return <p>Loading show details...</p>;

  const seatsPerRow = 8;
  const numRows = Math.ceil(show.total_seats / seatsPerRow);

  const allSeats: string[] = [];
  for (let row = 0; row < numRows; row++) {
    for (let col = 1; col <= seatsPerRow; col++) {
      const seatNumber = row * seatsPerRow + col;
      if (seatNumber <= show.total_seats) {
        allSeats.push(`${String.fromCharCode(65 + row)}${col}`);
      }
    }
  }

  const bookedSeats: string[] = [];
  bookings
    .filter(b => b.show_id === show.id)
    .forEach(b => {
      let remainingSeats = b.seats;
      for (const seat of allSeats) {
        if (!bookedSeats.includes(seat) && remainingSeats > 0) {
          bookedSeats.push(seat);
          remainingSeats--;
        }
      }
    });

  const availableSeatsCount = show.total_seats - bookedSeats.length;

  const handleSelectSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBook = async () => {
    if (selectedSeats.length === 0) return alert("Select at least one seat");

    try {
      const res = await bookSeats(show.id, selectedSeats.length);
      if (res.error) {
        alert(res.error);
      } else {
        alert(`Booking confirmed for ${selectedSeats.length} seats`);
        setSelectedSeats([]);
        fetchShows();
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed due to network/server error");
    }
  };

  return (
    <div className="booking-container">
      <div className="show-info">
        <h2>{show.name}</h2>
        <p><strong>Start Time:</strong> {show.start_time}</p>
        <p><strong>Available Seats:</strong> {availableSeatsCount}</p>

        <div className="legend">
          <div><span className="seat available"></span> Available</div>
          <div><span className="seat selected"></span> Selected</div>
          <div><span className="seat booked"></span> Booked</div>
        </div>
      </div>

      <div className="seat-grid-wrapper">
        <SeatGrid
          rows={numRows}
          cols={seatsPerRow}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
          onSelect={handleSelectSeat}
        />
      </div>

      <button className="book-btn" onClick={handleBook}>
        Book Selected Seats ({selectedSeats.length})
      </button>
    </div>
  );
};

export default BookingPage;
