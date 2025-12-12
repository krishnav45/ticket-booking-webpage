import React, { createContext, useState, useEffect } from "react";

interface Show {
  id: number;
  name: string;
  start_time: string;
  total_seats: number;
  available_seats: number;
}

interface Booking {
  id: number;
  show_id: number;
  seats: number;
  status: string;
}

interface AppContextType {
  shows: Show[];
  bookings: Booking[];
  fetchShows: () => void;
  fetchBookings: () => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchShows = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/shows");
      const data = await res.json();
      setShows(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/booking");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchShows();
    fetchBookings();
  }, []);

  return (
    <AppContext.Provider value={{ shows, bookings, fetchShows, fetchBookings }}>
      {children}
    </AppContext.Provider>
  );
};
