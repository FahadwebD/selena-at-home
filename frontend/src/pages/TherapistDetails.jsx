import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function TherapistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    axios
      .get("https://selena-backend.onrender.com/api/employees")
      .then((res) => {
        const foundTherapist = res.data.find((item) => item._id === id);
        setTherapist(foundTherapist);
      });
  }, [id]);

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-pink-700">
          Loading...
        </h1>
      </div>
    );
  }

  const images =
    therapist.images && therapist.images.length > 0
      ? therapist.images
      : therapist.image
      ? [therapist.image]
      : [];

  return (
    <div className="min-h-screen bg-[#fff8fb] overflow-x-hidden">
      <header className="bg-white/90 backdrop-blur-xl shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
          <Link
            to="/"
            className="text-2xl sm:text-4xl font-bold text-pink-700 text-center"
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div className="w-full max-w-full overflow-hidden">
            {images.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={images.length > 1}
                className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-[330px] sm:h-[520px] lg:h-[700px] bg-pink-100">
                      <img
                        src={image}
                        alt={therapist.name}
                        className="w-full h-full object-cover block"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-[330px] sm:h-[520px] lg:h-[700px] bg-pink-100 rounded-2xl flex items-center justify-center">
                <p className="text-pink-700 font-bold">No image uploaded</p>
              </div>
            )}
          </div>

          <div className="w-full">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#d4af6d] leading-tight mb-4 break-words">
              {therapist.name}
            </h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="border border-orange-300 text-orange-500 px-4 py-2 rounded-full text-sm sm:text-base">
                Age: {therapist.age || "N/A"}
              </span>

              <span className="border border-pink-300 text-pink-500 px-4 py-2 rounded-full text-sm sm:text-base">
                Nationality: {therapist.nationality || "N/A"}
              </span>

              <span className="border border-fuchsia-400 text-fuchsia-600 px-4 py-2 rounded-full text-sm sm:text-base">
                Working Hours: {therapist.startTime || "10:00"} -{" "}
                {therapist.endTime || "16:00"}
              </span>
            </div>

            <div className="space-y-4 text-base sm:text-xl lg:text-2xl leading-relaxed text-gray-800">
              <p>
                Hi, my name is{" "}
                <span className="font-bold text-pink-700">
                  {therapist.name}
                </span>
                .
              </p>

              <p>Welcome to my premium home wellness and massage service.</p>

              <p>
                I specialize in{" "}
                <span className="font-bold text-pink-700">
                  {therapist.speciality || therapist.role}
                </span>
                .
              </p>

              <p>{therapist.description}</p>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl shadow p-5">
                <h3 className="font-bold text-pink-700 mb-3">
                  Profile Details
                </h3>

                <div className="space-y-2 text-gray-700">
                  <p><strong>Height:</strong> {therapist.height || "N/A"}</p>
                  <p><strong>Language:</strong> {therapist.language || "N/A"}</p>
                  <p><strong>Phone:</strong> {therapist.phone || "N/A"}</p>
                  <p><strong>Speciality:</strong> {therapist.speciality || "N/A"}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow p-5">
                <h3 className="font-bold text-pink-700 mb-3">Availability</h3>

                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Status:</strong>{" "}
                    {therapist.isWorkingToday
                      ? "Available Today"
                      : "Not Available Today"}
                  </p>

                  <p>
                    <strong>Working Hours:</strong>{" "}
                    {therapist.startTime || "10:00"} -{" "}
                    {therapist.endTime || "16:00"}
                  </p>

                  <p><strong>Service Area:</strong> Sydney Area</p>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                navigate("/booking", {
                  state: { therapist },
                })
              }
              className="mt-8 sm:mt-10 w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TherapistDetails;