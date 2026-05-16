import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function JobApplication() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    age: "",
    workRights: "",
    experience: "",
    availability: "",
    message: "",
    images: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("address", form.address);
      formData.append("age", form.age);
      formData.append("workRights", form.workRights);
      formData.append("experience", form.experience);
      formData.append("availability", form.availability);
      formData.append("message", form.message);

      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }

      await axios.post("https://selena-backend.onrender.com/api/jobs", formData);

      alert("Job application submitted successfully");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900 overflow-x-hidden">
      <header className="bg-white/90 backdrop-blur-xl shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold text-pink-700 text-center sm:text-left"
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

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8">
          <div className="text-center mb-8">
            <p className="uppercase tracking-[3px] sm:tracking-[5px] text-pink-600 font-semibold mb-3 text-sm sm:text-base">
              Join Selena At Home
            </p>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-700 mb-4">
              Job Application
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Apply to work with Selena At Home. Submit your details,
              experience and photos for review.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <div className="sm:col-span-2">
              <label className="block font-semibold mb-2">
                Full Name
              </label>

              <input
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Phone Number
              </label>

              <input
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="text"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Email Address
              </label>

              <input
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-2">
                Address / Suburb
              </label>

              <input
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="text"
                placeholder="Your address"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Age
              </label>

              <input
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="text"
                placeholder="Your age"
                value={form.age}
                onChange={(e) =>
                  setForm({ ...form, age: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Work Rights / Visa
              </label>

              <input
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="text"
                placeholder="Visa or work rights"
                value={form.workRights}
                onChange={(e) =>
                  setForm({
                    ...form,
                    workRights: e.target.value,
                  })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-2">
                Experience
              </label>

              <textarea
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Describe your experience"
                value={form.experience}
                onChange={(e) =>
                  setForm({
                    ...form,
                    experience: e.target.value,
                  })
                }
                rows="4"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-2">
                Availability
              </label>

              <textarea
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Your availability"
                value={form.availability}
                onChange={(e) =>
                  setForm({
                    ...form,
                    availability: e.target.value,
                  })
                }
                rows="3"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-2">
                Additional Message
              </label>

              <textarea
                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Write additional details"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                rows="4"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold mb-2">
                Upload Multiple Photos
              </label>

              <input
                className="w-full border border-gray-300 p-4 rounded-xl bg-white"
                type="file"
                multiple
                onChange={(e) =>
                  setForm({
                    ...form,
                    images: Array.from(e.target.files),
                  })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <button className="w-full bg-pink-600 hover:bg-pink-700 transition text-white py-4 rounded-xl font-bold text-lg shadow-xl">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-6 px-4">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          Selena At Home
        </h3>

        <p>Professional Massage & Wellness Service</p>
      </footer>
    </div>
  );
}

export default JobApplication;