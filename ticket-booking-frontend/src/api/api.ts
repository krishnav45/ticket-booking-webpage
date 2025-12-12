const BASE_URL = "https://ticket-booking-webpage.onrender.com";

export const createShow = async (name: string, start_time: string, total_seats: number) => {
  const res = await fetch(`${BASE_URL}/admin/create-show`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, start_time, total_seats }),
  });
  return res.json();
};

export const bookSeats = async (showId: number, seats: number) => {
  const res = await fetch(`${BASE_URL}/booking/book/${showId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seats }),
  });
  return res.json();
};

// 🔥 NEW — DELETE SHOW
export const deleteShow = async (id: number) => {
  const res = await fetch(`${BASE_URL}/admin/delete-show/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

// 🔥 NEW — UPDATE SHOW
export const updateShow = async (
  id: number,
  name: string,
  start_time: string,
  total_seats: number
) => {
  const res = await fetch(`${BASE_URL}/admin/update-show/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, start_time, total_seats }),
  });
  return res.json();
};
