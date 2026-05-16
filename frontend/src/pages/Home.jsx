import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Home() {
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [prices, setPrices] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios.get("https://selena-backend.onrender.com/api/services").then((res) => {
      setServices(res.data);
    });

    axios.get("https://selena-backend.onrender.com/api/employees/today").then((res) => {
      setEmployees(res.data);
    });

    axios.get("https://selena-backend.onrender.com/api/prices").then((res) => {
      setPrices(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900 overflow-x-hidden">
     <header className="bg-white/90 backdrop-blur-xl shadow-md fixed top-0 left-0 w-full z-[9999]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
    <div className="flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl sm:text-3xl font-bold text-pink-700"
      >
        Selena At Home
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex gap-6 font-medium">
        <a href="#home" className="hover:text-pink-700">
          Home
        </a>

        <a href="#services" className="hover:text-pink-700">
          Services
        </a>

        <a href="#roster" className="hover:text-pink-700">
          Therapists
        </a>

        <a href="#price" className="hover:text-pink-700">
          Pricing
        </a>

        <Link to="/booking" className="hover:text-pink-700">
          Booking
        </Link>

        <Link
          to="/job-application"
          className="hover:text-pink-700"
        >
          Jobs
        </Link>
      </nav>

      {/* Mobile Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden text-3xl text-pink-700"
      >
        ☰
      </button>
    </div>

    {/* Mobile Transparent Menu */}
    {/* Mobile Floating Menu */}
{menuOpen && (
 <div className="fixed top-24 left-4 right-4 lg:hidden z-[9999]">
  <div className="bg-black/80 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-2xl">
    <nav className="flex flex-col gap-3 font-semibold">
      <a
        href="#home"
        onClick={() => setMenuOpen(false)}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition"
      >
        Home
      </a>

      <a
        href="#services"
        onClick={() => setMenuOpen(false)}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition"
      >
        Services
      </a>

      <a
        href="#roster"
        onClick={() => setMenuOpen(false)}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition"
      >
        Therapists
      </a>

      <a
        href="#price"
        onClick={() => setMenuOpen(false)}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition"
      >
        Pricing
      </a>

      <Link
        to="/booking"
        onClick={() => setMenuOpen(false)}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition"
      >
        Booking
      </Link>

      <Link
        to="/job-application"
        onClick={() => setMenuOpen(false)}
        className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition"
      >
        Jobs
      </Link>
    </nav>
  </div>
</div>
)}
  </div>
</header>
      <section
        id="home"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden py-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://s3.pictorem.com/images/collection/F/FT4ASF9QOP/900_Alessandrodellatorre_sexy_girl_young_sensual_woman_bw_7.jpg')",
          }}
        ></div>

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[3px] sm:tracking-[6px] text-pink-300 mb-4 font-semibold text-sm sm:text-base">
             At a luxurious private house in
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white">
              Bankstown <span className="text-pink-400">Erotic Sensual</span>
              <br />
              Massage
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
              Selena At Home We are excited to announce our grand opening!

Private entry is also available.

Welcome everyone! Enjoy your stay!

Open from 10 AM to 8 PM.

See you soon! 
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="text-center bg-pink-600 hover:bg-pink-700 transition px-6 sm:px-8 py-4 rounded-full font-bold text-base sm:text-lg shadow-2xl text-white"
              >
                Book Now
              </a>

              <a
                href="#price"
                className="text-center border border-white hover:bg-white hover:text-black transition px-6 sm:px-8 py-4 rounded-full font-bold text-base sm:text-lg text-white"
              >
                View Pricing
              </a>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 xl:p-8 rounded-3xl shadow-2xl max-w-sm">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgHn_dZaKlWNVA1BU7GwYPJaq920lMOkP-rw&s"
                alt="massage"
                className="rounded-2xl mb-6 h-[360px] xl:h-[420px] w-full object-cover"
              />

              <h3 className="text-2xl xl:text-3xl font-bold text-white mb-3">
                Escort Available
              </h3>

              <p className="text-gray-200 mb-6">
                Escort services with experienced Girls and
                luxury spa-style treatment.
              </p>

              <Link
                to="/booking"
                className="block text-center w-full bg-pink-500 hover:bg-pink-600 transition text-white py-4 rounded-xl font-bold text-lg"
              >
                Reserve Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Massage Services
        </h2>

        <p className="text-center text-gray-600 mb-10 sm:mb-12">
          Professional wellness and massage services for your comfort.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 sm:p-5"
            >
              <img
                src={`https://selena-backend.onrender.com/api/uploads/${service.image}`}
                alt={service.name}
                className="w-full h-52 sm:h-56 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-pink-700">
                {service.name}
              </h3>

              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section> */}

      <section id="roster" className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Available Therapists Today
          </h2>

          <p className="text-center text-gray-600 mb-10 sm:mb-12">
            View therapist profiles to learn more about their experience and services.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {employees.map((employee) => (
              <div
                key={employee._id}
                className="bg-pink-50 rounded-2xl shadow p-4 sm:p-6 text-center hover:shadow-xl lg:hover:scale-105 transition overflow-hidden"
              >
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 2500 }}
                  pagination={{ clickable: true }}
                  loop={employee.images?.length > 1}
                  className="rounded-2xl overflow-hidden mb-4"
                >
                  {employee.images?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`https://selena-backend.onrender.com/api/uploads/${image}`}
                        alt={employee.name}
                        className="w-full h-56 sm:h-72 object-cover bg-pink-100"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <h3 className="text-xl font-bold">{employee.name}</h3>

                <p className="text-pink-700 font-semibold">{employee.role}</p>

                <p className="text-gray-600 mt-2 mb-4">
                  Available for home massage today.
                </p>

                <Link
                  to={`/therapist/${employee._id}`}
                  className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full font-semibold"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {employees.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No therapist is marked available today.
            </p>
          )}
        </div>
      </section>

      <section id="price" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Massage Pricing
        </h2>

        <p className="text-center text-gray-600 mb-10 sm:mb-12">
          Choose the perfect massage package for your comfort.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {prices.map((item) => (
            <div
              key={item._id}
              className={
                item.isPopular
                  ? "bg-pink-700 text-white p-6 sm:p-8 rounded-2xl shadow text-center lg:scale-105"
                  : "bg-white p-6 sm:p-8 rounded-2xl shadow text-center"
              }
            >
              {item.isPopular && (
                <p className="bg-white text-pink-700 inline-block px-4 py-1 rounded-full font-bold mb-4">
                  Popular
                </p>
              )}

              <h3
                className={
                  item.isPopular
                    ? "text-xl sm:text-2xl font-bold mb-4"
                    : "text-xl sm:text-2xl font-bold mb-4 text-pink-700"
                }
              >
                {item.title}
              </h3>

              <p className="text-3xl sm:text-4xl font-bold mb-4">
                ${item.price}
              </p>

              <p className={item.isPopular ? "text-white" : "text-gray-600"}>
                {item.duration}
              </p>

              <p
                className={
                  item.isPopular ? "text-white mt-3" : "text-gray-600 mt-3"
                }
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {prices.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No pricing added yet.
          </p>
        )}
      </section>

      <section
        id="booking"
        className="bg-gradient-to-r from-pink-600 to-rose-700 text-white py-16 sm:py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Book Your Massage Session Today
          </h2>

          <p className="mb-8 text-base sm:text-lg">
            Experience professional wellness therapy in the comfort of your own home.
          </p>

          <Link
            to="/booking"
            className="inline-block bg-white text-pink-700 px-8 sm:px-10 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition"
          >
            Contact For Booking
          </Link>
        </div>
      </section>

      <section id="feedback" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          Customer Feedback
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow">
            <p className="text-gray-600 mb-4">
              “Amazing service and very professional therapist. Highly recommended.”
            </p>
            <h4 className="font-bold text-pink-700">Sarah M.</h4>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow">
            <p className="text-gray-600 mb-4">
              “Very relaxing experience at home. Booking was easy and smooth.”
            </p>
            <h4 className="font-bold text-pink-700">Daniel K.</h4>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow">
            <p className="text-gray-600 mb-4">
              “Professional massage therapist and excellent customer service.”
            </p>
            <h4 className="font-bold text-pink-700">Emma J.</h4>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-14 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
    <div>
      <h3 className="text-3xl font-extrabold text-[#d4af6d] mb-4">
        Selena At Home
      </h3>

      <p className="text-gray-300 leading-relaxed">
        Premium massage and wellness experience designed for relaxation,
        comfort, luxury, and private professional service in Sydney.
      </p>
    </div>

    <div>
      <h4 className="text-xl font-bold text-pink-500 mb-4">
        Location
      </h4>

      <div className="space-y-3 text-gray-300">
        <p>38 Restwell Street, Bankstown</p>

        <p>5 minute walk from Bankstown Station</p>

        <p>No parking available</p>
      </div>
    </div>

    <div>
      <h4 className="text-xl font-bold text-pink-500 mb-4">
        Contact
      </h4>

      <div className="space-y-3 text-gray-300">
        <p>Phone: 0485 533 880</p>

        <p>Available Daily</p>

        <p>Professional Home Wellness Service</p>
      </div>
    </div>

    <div>
      <h4 className="text-xl font-bold text-pink-500 mb-4">
        WeChat
      </h4>

      <div className="bg-white rounded-2xl p-3 w-44 h-44 flex items-center justify-center shadow-xl">
        {/* Replace image path with your QR image */}
        <img
          src="https://lolaathome.com.au/wp-content/uploads/2022/03/Image_20240926161044-520x705-1.jpg"
          alt="WeChat QR"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <p className="text-gray-400 text-sm mt-3">
        Scan QR code to contact via WeChat
      </p>
    </div>
  </div>

  <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-sm">
    © 2026 Selena At Home. All Rights Reserved.
  </div>
</footer>
    </div>
  );
}

export default Home;