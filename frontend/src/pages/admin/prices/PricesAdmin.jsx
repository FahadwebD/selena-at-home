import { useEffect, useState } from "react";
import axios from "axios";

function PricesAdmin() {
  const API = "http://localhost:5000/api/prices";

  const [prices, setPrices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    duration: "",
    price: "",
    description: "",
    isPopular: false,
  });

  const fetchPrices = async () => {
    const res = await axios.get(API);
    setPrices(res.data);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const submitPrice = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await axios.put(`${API}/${editingId}`, data);
        alert("Price updated");
      } else {
        await axios.post(API, data);
        alert("Price added");
      }

      setForm({
        title: "",
        duration: "",
        price: "",
        description: "",
        isPopular: false,
      });

      setEditingId(null);
      fetchPrices();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const editPrice = (item) => {
    setEditingId(item._id);

    setForm({
      title: item.title,
      duration: item.duration,
      price: item.price,
      description: item.description,
      isPopular: item.isPopular,
    });
  };

  const deletePrice = async (id) => {
    const confirmDelete = window.confirm("Delete this price?");
    if (!confirmDelete) return;

    await axios.delete(`${API}/${id}`);
    fetchPrices();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Manage Pricing</h1>

      <form
        onSubmit={submitPrice}
        className="bg-white p-6 rounded-2xl shadow mb-8 grid gap-4"
      >
        <h2 className="text-2xl font-bold text-pink-700">
          {editingId ? "Edit Price" : "Add Price"}
        </h2>

        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Service title, e.g. Relax Massage"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Duration, e.g. 60 Minutes"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        />

        <input
          className="border p-3 rounded-lg"
          type="number"
          placeholder="Price, e.g. 80"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <textarea
          className="border p-3 rounded-lg"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isPopular}
            onChange={(e) =>
              setForm({ ...form, isPopular: e.target.checked })
            }
          />
          Mark as popular
        </label>

        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-bold">
          {editingId ? "Update Price" : "Add Price"}
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {prices.map((item) => (
          <div
            key={item._id}
            className={
              item.isPopular
                ? "bg-pink-700 text-white p-6 rounded-2xl shadow"
                : "bg-white p-6 rounded-2xl shadow"
            }
          >
            {item.isPopular && (
              <p className="bg-white text-pink-700 inline-block px-3 py-1 rounded-full font-bold mb-3">
                Popular
              </p>
            )}

            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p className="mb-2">{item.duration}</p>
            <p className="text-4xl font-bold mb-4">${item.price}</p>
            <p className="mb-5">{item.description}</p>

            <button
              onClick={() => editPrice(item)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>

            <button
              onClick={() => deletePrice(item._id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {prices.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No pricing added yet.
        </p>
      )}
    </div>
  );
}

export default PricesAdmin;