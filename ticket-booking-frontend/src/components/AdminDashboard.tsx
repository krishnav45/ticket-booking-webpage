import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { createShow as apiCreateShow, deleteShow, updateShow } from "../api/api";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const { shows, fetchShows } = useContext(AppContext);

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [totalSeats, setTotalSeats] = useState(40);

  // For editing a show
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchShows();
  }, []);

  const handleSubmit = async () => {
    if (!name || !startTime || totalSeats <= 0)
      return alert("Fill all fields correctly");

    if (editId === null) {
      // CREATE MODE
      await apiCreateShow(name, startTime, totalSeats);
      alert("Show created successfully!");
    } else {
      // EDIT MODE
      await updateShow(editId, name, startTime, totalSeats);
      alert("Show updated successfully!");
      setEditId(null);
    }

    setName("");
    setStartTime("");
    setTotalSeats(40);
    fetchShows();
  };

  const handleEdit = (show: any) => {
    setEditId(show.id);
    setName(show.name);
    setStartTime(show.start_time);
    setTotalSeats(show.total_seats);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this show?")) {
      await deleteShow(id);
      fetchShows();
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-form">
        <input
          type="text"
          placeholder="Show Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="datetime-local"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total Seats"
          value={totalSeats}
          onChange={e => setTotalSeats(+e.target.value)}
          min={1}
        />

        <button onClick={handleSubmit}>
          {editId === null ? "Create Show" : "Update Show"}
        </button>
      </div>

      <div className="show-list">
        {shows.length === 0 ? (
          <p>No shows created yet.</p>
        ) : (
          shows.map(show => (
            <div key={show.id} className="show-card">
              <h4>{show.name}</h4>
              <p><strong>Start:</strong> {show.start_time}</p>
              <p><strong>Total Seats:</strong> {show.total_seats}</p>
              <p><strong>Available Seats:</strong> {show.available_seats}</p>

              <div className="admin-actions">
                <button className="edit-btn" onClick={() => handleEdit(show)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(show.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
