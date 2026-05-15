import { useEffect, useState } from "react";
import axios from "axios";

function BookingsAdmin() {
  const API = "http://localhost:5000/api/bookings";

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get(API);
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const approveBooking = async (id) => {
    await axios.put(`${API}/${id}/approve`);
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");

    if (!confirmDelete) return;

    await axios.delete(`${API}/${id}`);
    fetchBookings();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Manage Bookings</h1>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow p-6 border"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-pink-700">
                  {booking.customerName}
                </h2>

                <p className="text-gray-600">
                  Phone: {booking.phone}
                </p>
              </div>

              <span
                className={
                  booking.status === "Approved"
                    ? "bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold"
                    : "bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold"
                }
              >
                {booking.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-gray-700 mb-5">
              <p>
                <strong>Therapist:</strong> {booking.therapistName}
              </p>

              <p>
                <strong>Service:</strong> {booking.serviceName}
              </p>

              <p>
                <strong>Date:</strong> {booking.bookingDate}
              </p>

              <p>
                <strong>Time:</strong> {booking.bookingTime}
              </p>

              <p className="md:col-span-2">
                <strong>Address:</strong> {booking.address}
              </p>

              <p className="md:col-span-2">
                <strong>Note:</strong> {booking.note || "No note"}
              </p>
            </div>

            <div className="flex gap-3">
              {booking.status !== "Approved" && (
                <button
                  onClick={() => approveBooking(booking._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-bold"
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => deleteBooking(booking._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <p className="text-gray-500 text-center">
            No bookings found.
          </p>
        )}
      </div>
    </div>
  );
}

export default BookingsAdmin;