function AdminHome() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Services</h2>
          <p className="text-gray-600">Manage all services.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Employees</h2>
          <p className="text-gray-600">Manage employee roster.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Prices</h2>
          <p className="text-gray-600">Coming next.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;