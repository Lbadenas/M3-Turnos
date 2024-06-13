import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Appointment from "./views/appointment/appointment";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Home from "./views/home/home";
import Landing from "./views/landing/Landing";
import ErrorPage from "./views/errorPage/ErrorPage";
import AppointmentForm from "./components/appointmentsform/AppointmentsForm";
import Contact from "./views/contact/Contact";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointmentsform" element={<AppointmentForm />} />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
export default App;
