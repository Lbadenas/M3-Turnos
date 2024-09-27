import { useEffect, useState } from "react"; // Agregamos useState
import axios from "axios";
import CardTurnos from "../../components/appointments/CardAppointments";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserAppointments } from "../../redux/userSlice";
import styles from "./appointment.module.css"; // Asegúrate de que esta ruta es correcta
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importa la localización en español

const GETUSERBYID_URL = "http://localhost:3000/users/";
const POSTCANCEL_URL = "http://localhost:3000/appointments/cancel/";

export default function Appointment() {
  const actualUserID = useSelector(
    (state) => state.actualUser.userData?.user?.id,
  );
  const login = useSelector((state) => state.actualUser.userData?.login);
  const appointments =
    useSelector((state) => state.actualUser.userAppointments) || [];

  const [error, setError] = useState(null); // Estado para manejar errores

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirección si no está logueado
  useEffect(() => {
    if (!login) {
      navigate("/home");
    }
  }, [login, navigate]);

  // Función para verificar si es fin de semana
  const isWeekend = (date) => {
    const day = date.getDay(); // Devuelve 0 (domingo) a 6 (sábado)
    return day === 0 || day === 6; // Retorna verdadero si es domingo (0) o sábado (6)
  };

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
        .catch((error) => {
          console.log(error.message);
          setError("Error al cargar las citas. Intenta de nuevo más tarde.");
        });
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
      .catch((error) => {
        console.log(error.message);
        setError("Error al cancelar la cita. Intenta de nuevo más tarde.");
      });
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convierte la cadena a un objeto Date
    // Formatea la fecha y la hora local usando date-fns
    return format(date, "dd/MM/yyyy HH:mm", { locale: es }); // Cambia "HH:mm" a "hh:mm a" para formato de 12 horas si es necesario
  };

  return (
    <div>
      <div className={styles.container}>
        {error && <p className={styles.error}>{error}</p>}{" "}
        {/* Mensaje de error */}
        <div className={styles.appointmentsGrid}>
          {/* Contenedor para las tarjetas */}
          {appointments.length > 0 ? (
            appointments.map((appointment) => {
              const appointmentDate = new Date(appointment.date);
              if (isWeekend(appointmentDate)) {
                console.log(
                  `La cita para ${appointment.date} es un fin de semana`,
                );
                // Aquí podrías hacer algo específico si es fin de semana, como mostrar un mensaje
              }

              return (
                <CardTurnos
                  key={appointment.id}
                  id={appointment.id}
                  date={formatDate(appointment.date)} // Formatea la fecha y la hora aquí
                  time={appointment.time}
                  userId={appointment.userId}
                  status={appointment.status}
                  description={appointment.description}
                  handleAppointmentCancel={handleAppointmentCancel}
                  className={styles.card} // Asegúrate de que la clase está aplicada
                />
              );
            })
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
    </div>
  );
}
