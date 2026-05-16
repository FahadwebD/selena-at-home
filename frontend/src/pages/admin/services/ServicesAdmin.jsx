import { useEffect, useState } from "react";
import axios from "axios";

function ServicesAdmin() {
  const API = "https://selena-backend.onrender.com/api/services";

  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
  });

  const fetchServices = async () => {
    const res = await axios.get(API);
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const submitService = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await axios.put(`${API}/${editingId}`, formData);
        alert("Service updated");
      } else {
        if (!form.image) {
          alert("Please select an image");
          return;
        }

        await axios.post(API, formData);
        alert("Service added");
      }

      setForm({
        name: "",
        description: "",
        image: null,
      });

      setEditingId(null);
      fetchServices();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const editService = (service) => {
    setEditingId(service._id);
    setForm({
      name: service.name,
      description: service.description,
      image: null,
    });
  };

  const deleteService = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchServices();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Manage Services</h1>

      <form onSubmit={submitService} className="bg-white p-6 rounded-xl shadow mb-8 grid gap-4">
        <h2 className="text-2xl font-bold">
          {editingId ? "Edit Service" : "Add Service"}
        </h2>

        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Service name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <textarea
          className="border p-3 rounded-lg"
          placeholder="Service description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          className="border p-3 rounded-lg"
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-5 rounded-xl shadow">
            <img
              src={`https://selena-backend.onrender.com/api/uploads/${service.image}`}
              alt={service.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>

            <button
              onClick={() => editService(service)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>

            <button
              onClick={() => deleteService(service._id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesAdmin;