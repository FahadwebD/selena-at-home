import { useEffect, useState } from "react";
import axios from "axios";

function EmployeesAdmin() {
  const API = "https://selena-backend.onrender.com/api/employees";

  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    description: "",
    age: "",
    nationality: "",
    language: "",
    height: "",
    phone: "",
    speciality: "",
    images: [],
    startTime: "10:00",
    endTime: "16:00",
  });

  const fetchEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      description: "",
      age: "",
      nationality: "",
      language: "",
      height: "",
      phone: "",
      speciality: "",
      images: [],
      startTime: "10:00",
      endTime: "16:00",
    });

    setEditingId(null);
  };

  const submitEmployee = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("role", form.role);
      formData.append("description", form.description);
      formData.append("age", form.age);
      formData.append("nationality", form.nationality);
      formData.append("language", form.language);
      formData.append("height", form.height);
      formData.append("phone", form.phone);
      formData.append("speciality", form.speciality);
      formData.append("startTime", form.startTime);
      formData.append("endTime", form.endTime);

      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }

      if (editingId) {
        await axios.put(`${API}/${editingId}`, formData);
        alert("Therapist updated");
      } else {
        if (form.images.length === 0) {
          alert("Please select at least one image");
          return;
        }

        await axios.post(API, formData);
        alert("Therapist added");
      }

      resetForm();
      fetchEmployees();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
      
    }
  };

  const editEmployee = (employee) => {
    setEditingId(employee._id);

    setForm({
      name: employee.name || "",
      role: employee.role || "",
      description: employee.description || "",
      age: employee.age || "",
      nationality: employee.nationality || "",
      language: employee.language || "",
      height: employee.height || "",
      phone: employee.phone || "",
      speciality: employee.speciality || "",
      images: [],
      startTime: employee.startTime || "10:00",
      endTime: employee.endTime || "16:00",
    });
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Delete this therapist?");
    if (!confirmDelete) return;

    await axios.delete(`${API}/${id}`);
    fetchEmployees();
  };

  const toggleWorkingStatus = async (id) => {
    await axios.put(`${API}/${id}/toggle-working`);
    fetchEmployees();
  };

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        Manage Therapists
      </h1>

      <form
        onSubmit={submitEmployee}
        className="bg-white p-4 sm:p-6 rounded-xl shadow mb-8 grid gap-4"
      >
        <h2 className="text-2xl font-bold text-pink-700">
          {editingId ? "Edit Therapist" : "Add Therapist"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Therapist name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Role / Service Type"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          />

          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />

          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Nationality"
            value={form.nationality}
            onChange={(e) =>
              setForm({ ...form, nationality: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Language"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
          />

          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Height"
            value={form.height}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
          />

          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Speciality"
            value={form.speciality}
            onChange={(e) =>
              setForm({ ...form, speciality: e.target.value })
            }
          />
        </div>

        <textarea
          className="border p-3 rounded-lg"
          placeholder="Therapist full description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
          rows="6"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Start Time</label>

            <input
              className="border p-3 rounded-lg w-full"
              type="time"
              value={form.startTime}
              onChange={(e) =>
                setForm({ ...form, startTime: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">End Time</label>

            <input
              className="border p-3 rounded-lg w-full"
              type="time"
              value={form.endTime}
              onChange={(e) =>
                setForm({ ...form, endTime: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Upload Therapist Photos
          </label>

          <input
            className="border p-3 rounded-lg w-full"
            type="file"
            multiple
            onChange={(e) =>
              setForm({
                ...form,
                images: Array.from(e.target.files),
              })
            }
          />

          {editingId && (
            <p className="text-sm text-gray-500 mt-2">
              Leave empty to keep existing photos. Select new photos to replace
              old ones.
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-bold"
          >
            {editingId ? "Update Therapist" : "Add Therapist"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="bg-white p-5 rounded-xl shadow border"
          >
            <img
  src={employee.images?.[0]}
  alt={employee.name}
  className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-pink-300"
/>

            <h3 className="text-xl font-bold">{employee.name}</h3>

            <p className="text-pink-700 font-semibold mb-2">
              {employee.role}
            </p>

            <p className="text-gray-600 mb-2 line-clamp-3">
              {employee.description}
            </p>

            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <p>
                <strong>Age:</strong> {employee.age || "N/A"}
              </p>
              <p>
                <strong>Nationality:</strong> {employee.nationality || "N/A"}
              </p>
              <p>
                <strong>Language:</strong> {employee.language || "N/A"}
              </p>
              <p>
                <strong>Height:</strong> {employee.height || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {employee.phone || "N/A"}
              </p>
              <p>
                <strong>Speciality:</strong> {employee.speciality || "N/A"}
              </p>
              <p>
                <strong>Working Hours:</strong>{" "}
                {employee.startTime || "10:00"} - {employee.endTime || "16:00"}
              </p>
            </div>

            <p className="mb-4">
              Status:{" "}
              <span
                className={
                  employee.isWorkingToday
                    ? "text-green-700 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {employee.isWorkingToday ? "Active Today" : "Not Active Today"}
              </span>
            </p>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => editEmployee(employee)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteEmployee(employee._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>

              <button
                onClick={() => toggleWorkingStatus(employee._id)}
                className={
                  employee.isWorkingToday
                    ? "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    : "bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                }
              >
                {employee.isWorkingToday ? "Active Today" : "Not Active Today"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No therapist added yet.
        </p>
      )}
    </div>
  );
}

export default EmployeesAdmin;