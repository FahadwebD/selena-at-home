import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">SAT HOME</h1>

        <nav className="space-y-4">
          <Link to="/admin" className="block hover:text-blue-400">
            Dashboard
          </Link>

          <Link to="/admin/services" className="block hover:text-blue-400">
            Services
          </Link>

          <Link to="/admin/employees" className="block hover:text-blue-400">
            Employees / Roster
          </Link>
          <Link to="/admin/bookings" className="block hover:text-blue-400">
  Bookings
</Link>
<Link to="/admin/prices" className="block hover:text-pink-400">
  Pricing
</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;