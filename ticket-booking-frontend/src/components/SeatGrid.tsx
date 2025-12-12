import React from "react";

interface SeatGridProps {
  rows: number;
  cols: number;
  bookedSeats: string[];
  selectedSeats: string[];
  onSelect: (seatLabel: string) => void;
}

const SeatGrid: React.FC<SeatGridProps> = ({ rows, cols, bookedSeats, selectedSeats, onSelect }) => {
  const getSeatLabel = (row: number, col: number) => {
    return `${String.fromCharCode(65 + row)}${col + 1}`;
  };

  const seats = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => getSeatLabel(row, col))
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {seats.map((rowSeats, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", gap: "5px" }}>
          {rowSeats.map(seat => {
            const isBooked = bookedSeats.includes(seat);
            const isSelected = selectedSeats.includes(seat);
            return (
              <div
                key={seat}
                onClick={() => !isBooked && onSelect(seat)}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: isBooked ? "gray" : isSelected ? "green" : "lightblue",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: isBooked ? "not-allowed" : "pointer",
                  borderRadius: 5,
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {seat}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;
