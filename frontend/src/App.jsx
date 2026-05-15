import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TherapistDetails from "./pages/TherapistDetails";
import Booking from "./pages/Booking";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import ServicesAdmin from "./pages/admin/services/ServicesAdmin";
import EmployeesAdmin from "./pages/admin/employees/EmployeesAdmin";
import BookingsAdmin from "./pages/admin/bookings/BookingsAdmin";
import PricesAdmin from "./pages/admin/prices/PricesAdmin";
import JobApplication from "./pages/JobApplication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/therapist/:id" element={<TherapistDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/job-application" element={<JobApplication />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="employees" element={<EmployeesAdmin />} />
          <Route path="bookings" element={<BookingsAdmin />} />
          <Route path="prices" element={<PricesAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;