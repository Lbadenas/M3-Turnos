import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Appointment from "./views/appointment/appointment";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Home from "./views/home/home";
import Landing from "./views/landing/Landing";
import ErrorPage from "./views/errorPage/ErrorPage";
import AppointmentForm from "./components/appointmentsform/AppointmentsForm";
import Contact from "./views/contact/Contact";
import Servicios from "./views/services/Servicios";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Footer from "./components/footer/Footer";

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div>
      <Navbar />

      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <div>
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/service" element={<Servicios />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/appointmentsform" element={<AppointmentForm />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>

            <Footer />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
