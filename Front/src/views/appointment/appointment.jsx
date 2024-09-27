import { useEffect } from "react";
import axios from "axios";
import CardTurnos from "../../components/appointments/CardAppointments";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAppointments } from "../../redux/userSlice";
import styles from "./appointment.module.css"; // Asegúrate de que esta ruta es correcta

const GETUSERBYID_URL = "http://localhost:3000/users/";
const POSTCANCEL_URL = "http://localhost:3000/appointments/cancel/";

export default function Appointment() {
  const actualUserID = useSelector(
    (state) => state.actualUser.userData?.user?.id,
  );
  const login = useSelector((state) => state.actualUser.userData?.login);
  const appointments =
    useSelector((state) => state.actualUser.userAppointments) || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirección si no está logueado
  useEffect(() => {
    if (!login) {
      navigate("/home");
    }
  }, [login, navigate]);

  useEffect(() => {
    if (actualUserID) {
      axios
        .get(`${GETUSERBYID_URL}${actualUserID}`)
        .then((response) => response.data)
        .then((actualUser) => {
          // Filtra las citas canceladas antes de almacenarlas en el estado
          const activeAppointments = actualUser.appointments.filter(
            (appointment) => appointment.status === "active",
          );
          dispatch(setUserAppointments(activeAppointments));
        })
        .catch((error) => console.log(error.message));
    }
  }, [actualUserID, dispatch]);

  const handleAppointmentCancel = (appointmentId) => {
    axios
      .put(POSTCANCEL_URL + appointmentId)
      .then((response) => response.data)
      .then((data) => {
        console.log("Appointment cancelled:", data); // Depuración
        // Filtra las citas canceladas
        const updatedAppointments = appointments.filter(
          (appointment) => appointment.id !== appointmentId,
        );
        dispatch(setUserAppointments(updatedAppointments)); // Actualiza el estado
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <div className={styles.container}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <CardTurnos
              key={appointment.id}
              id={appointment.id}
              date={appointment.date}
              time={appointment.time}
              userId={appointment.userId}
              status={appointment.status}
              description={appointment.description}
              handleAppointmentCancel={handleAppointmentCancel}
              className={styles.card}
            />
          ))
        ) : (
          <div className={styles.overlay}>
            <div className={styles.noAppointmentsContainer}>
              <p className={styles.noAppointments}>No tienes reservas.</p>
              <img
                src="https://titulae.es/wp-content/uploads/2021/11/grado-superior-peluqueria.jpg"
                alt="No hay reservas"
                className={styles.noAppointmentsImage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
