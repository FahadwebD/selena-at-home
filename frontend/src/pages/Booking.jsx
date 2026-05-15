import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedTherapistFromPage = location.state?.therapist || null;

  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(
    selectedTherapistFromPage
  );

  const [bookings, setBookings] = useState([]);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    bookingTime: "",
    duration: "60",
    note: "",
  });

  const timeToMinutes = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  };

  const minutesToTime = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const isTimeAvailable = () => {
    if (!selectedTherapist || !form.bookingTime) return false;

    const duration = Number(form.duration);

    const therapistStart = timeToMinutes(selectedTherapist.startTime || "10:00");
    const therapistEnd = timeToMinutes(selectedTherapist.endTime || "16:00");

    const selectedStart = timeToMinutes(form.bookingTime);
    const selectedEnd = selectedStart + duration;

    const currentTime = getCurrentTime();

    if (selectedStart < currentTime) {
      return false;
    }

    if (selectedStart < therapistStart || selectedEnd > therapistEnd) {
      return false;
    }

    const hasOverlap = bookings.some((booking) => {
      const existingStart = timeToMinutes(booking.bookingTime);
      const existingEnd = timeToMinutes(booking.endTime);

      return selectedStart < existingEnd && selectedEnd > existingStart;
    });

    return !hasOverlap;
  };

  const getEndTimePreview = () => {
    if (!form.bookingTime) return "";

    const start = timeToMinutes(form.bookingTime);
    const end = start + Number(form.duration);

    return minutesToTime(end);
  };

  const fetchBookings = async (therapistId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/therapist/${therapistId}/times`
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees/today").then((res) => {
      setTherapists(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedTherapist) {
      fetchBookings(selectedTherapist._id);

      setForm((prev) => ({
        ...prev,
        bookingTime: "",
      }));
    }
  }, [selectedTherapist]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTherapist) {
      alert("Please select a therapist first");
      return;
    }

    if (!form.bookingTime) {
      alert("Please select start time");
      return;
    }

    if (!isTimeAvailable()) {
      alert("This time is not available. Please choose another time.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        ...form,
        duration: Number(form.duration),
        therapistId: selectedTherapist._id,
        therapistName: selectedTherapist.name,
        serviceName: selectedTherapist.role,
      });

      alert("Booking submitted successfully. We will contact you soon.");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900 overflow-x-hidden">
      <header className="bg-white/90 backdrop-blur-xl shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold text-pink-700"
          >
            Selena At Home
          </Link>

          <Link
            to="/"
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full font-semibold text-sm sm:text-base"
          >
            Back Home
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-10 sm:mb-12">
          <p className="uppercase tracking-[3px] sm:tracking-[5px] text-pink-600 font-semibold mb-3 text-sm sm:text-base">
            Today's Massage Booking
          </p>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-700 mb-4">
            Book Available Therapist Today
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Select a therapist, choose duration, and pick your preferred start
            time. The system will block past time, outside working hours, and
            already-booked time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow p-5 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-2xl font-bold text-pink-700 mb-4">
                Booking Rules
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Phone:</strong> 0400 000 000
                </p>

                <p>
                  <strong>Service Area:</strong> Sydney and nearby suburbs
                </p>

                <p>
                  <strong>Minimum Duration:</strong> 30 minutes
                </p>

                <p>
                  <strong>Maximum Duration:</strong> 2 hours
                </p>
              </div>

              {selectedTherapist && (
                <div className="mt-6 bg-pink-50 p-4 rounded-2xl">
                  <h3 className="font-bold text-pink-700 mb-2">
                    Selected Therapist
                  </h3>

                  <p className="font-semibold">{selectedTherapist.name}</p>

                  <p>
                    Working: {selectedTherapist.startTime || "10:00"} -{" "}
                    {selectedTherapist.endTime || "16:00"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow p-5 sm:p-8 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-6">
                Choose Therapist Working Today
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                {therapists.map((therapist) => (
                  <div
                    key={therapist._id}
                    onClick={() => setSelectedTherapist(therapist)}
                    className={
                      selectedTherapist?._id === therapist._id
                        ? "border-4 border-pink-600 bg-pink-50 rounded-2xl p-5 cursor-pointer"
                        : "border border-gray-200 bg-white rounded-2xl p-5 cursor-pointer hover:shadow-lg"
                    }
                  >
                    <img
                      src={`http://localhost:5000/uploads/${therapist.images?.[0]}`}
                      alt={therapist.name}
                      className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-pink-200"
                    />

                    <h3 className="text-xl font-bold">{therapist.name}</h3>

                    <p className="text-pink-700 font-semibold">
                      {therapist.role}
                    </p>

                    <p className="text-gray-700 font-semibold mt-2">
                      Working: {therapist.startTime || "10:00"} -{" "}
                      {therapist.endTime || "16:00"}
                    </p>

                    {selectedTherapist?._id === therapist._id && (
                      <p className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold text-center">
                        Selected
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {therapists.length === 0 && (
                <p className="text-gray-500 text-center">
                  No therapist is available today.
                </p>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow p-5 sm:p-8 grid gap-5"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-pink-700">
                Your Booking Details
              </h2>

              <input
                type="text"
                placeholder="Your Full Name"
                value={form.customerName}
                onChange={(e) =>
                  setForm({ ...form, customerName: e.target.value })
                }
                className="border p-4 rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="border p-4 rounded-xl"
                required
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold mb-2 text-pink-700">
                    Duration
                  </label>

                  <select
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    className="border p-4 rounded-xl w-full"
                    required
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-2 text-pink-700">
                    Start Time
                  </label>

                  <input
                    type="time"
                    step="1800"
                    value={form.bookingTime}
                    onChange={(e) =>
                      setForm({ ...form, bookingTime: e.target.value })
                    }
                    className="border p-4 rounded-xl w-full"
                    required
                  />
                </div>
              </div>

              {form.bookingTime && (
                <div
                  className={
                    isTimeAvailable()
                      ? "bg-green-50 text-green-700 p-4 rounded-xl font-semibold"
                      : "bg-red-50 text-red-700 p-4 rounded-xl font-semibold"
                  }
                >
                  {isTimeAvailable()
                    ? `Available: ${form.bookingTime} - ${getEndTimePreview()}`
                    : "Not available. Time may be past, outside working hours, or already booked."}
                </div>
              )}

              {bookings.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h3 className="font-bold text-gray-700 mb-2">
                    Already Booked Times
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {bookings.map((booking) => (
                      <span
                        key={booking._id}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {booking.bookingTime} - {booking.endTime}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                placeholder="Optional note / Preferred service / Special request"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="border p-4 rounded-xl"
                rows="4"
              />

              <button className="bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-bold text-lg">
                Submit Booking Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Booking;