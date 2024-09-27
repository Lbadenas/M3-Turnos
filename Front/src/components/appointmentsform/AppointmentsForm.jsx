import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2"; // Importa SweetAlert2
import styles from "../appointmentsform/AppointmentsForm.module.css";

const POSTAPPOINTMENT_URL = "http://localhost:3000/appointments/schedule";

// Opciones de corte de cabello
const haircutOptions = [
  {
    id: 1,
    imagen:
      "https://manmedicalinstitute.com/wp-content/uploads/2021/04/mejores-cortes-pelo-segun-rostro.jpg",
    descripcion: "Corte de Pelo Clásico",
    valor: "$20",
    servicio: "Corte de Pelo Clásico",
  },
  {
    id: 2,
    imagen:
      "https://www.shutterstock.com/image-photo/closeup-portrait-handsome-smiling-young-600nw-1687157521.jpg",
    descripcion: "Corte de Pelo Moderno",
    valor: "$25",
    servicio: "Corte de Pelo Moderno",
  },
  {
    id: 3,
    imagen:
      "https://img.freepik.com/foto-gratis/hombre-barbudo-rubio-positivo-vestido-camisa-cuadros-chaqueta-denim-posando-fondo-gris-vineta_613910-11758.jpg?t=st=1727395511~exp=1727399111~hmac=851af1a945c36b80777f77359a310a3c42774e9f541016c5043d245d973eb583&w=1380",
    descripcion: "Corte de Pelo con Estilo",
    valor: "$30",
    servicio: "Corte de Pelo con Estilo",
  },
  {
    id: 4,
    imagen:
      "https://img.freepik.com/foto-gratis/nino-alto-angulo-cortandose-pelo-salon_23-2149870379.jpg",
    descripcion: "Corte de Pelo para Niños",
    valor: "$15",
    servicio: "Corte de Pelo para Niños",
  },
];

export default function AppointmentForm() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.actualUser?.userData?.user?.id);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const initialState = {
    date: "",
    hours: "09",
    minutes: "00",
    description: "",
  };

  const [appointment, setAppointment] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateAppointment = ({ date, description }) => {
    const errors = {};
    if (!date) {
      errors.date = "Ingresar una fecha";
    } else if (isWeekend(date)) {
      errors.date = "La fecha seleccionada es un fin de semana";
    }
    if (!description) {
      errors.description = "Seleccionar un servicio";
    }
    return errors;
  };

  const isWeekend = (date) => {
    const day = new Date(date).getDay();
    return day === 6 || day === 0; // 6 = Sábado, 0 = Domingo
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));

    if (name === "date" && isWeekend(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "La fecha seleccionada es un fin de semana",
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.date;
        return newErrors;
      });
    }

    const newErrors = validateAppointment({ ...appointment, [name]: value });
    setErrors(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAppointment = {
      date: appointment.date,
      time: `${appointment.hours}:${appointment.minutes}`,
      description: appointment.description,
      userId,
    };

    const validationErrors = validateAppointment(newAppointment);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // No continuar si hay errores
    }

    axios
      .post(POSTAPPOINTMENT_URL, newAppointment)
      .then(({ data }) => {
        Swal.fire({
          title: "Reserva Creada",
          text: `La reserva fue creada con éxito para ${data.state} a las ${data.time}.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setAppointment(initialState);
        navigate("/appointment");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: `Error ${error.response?.data?.error || "desconocido"}`,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      });
  };

  const validateHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
  const validateMinutes = ["00", "30"];

  const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getFourteenDaysAhead = () => {
    const today = new Date();
    const fourteenDaysAhead = new Date(today);
    fourteenDaysAhead.setDate(fourteenDaysAhead.getDate() + 13);
    return fourteenDaysAhead.toISOString().split("T")[0];
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.AppointmentForm}>
        <h2>Nueva Reserva</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              min={getTomorrow()}
              max={getFourteenDaysAhead()}
              value={appointment.date}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.date && <span className={styles.error}>{errors.date}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="time" className={styles.label}>
              Horario
            </label>
            <select
              id="hours"
              name="hours"
              value={appointment.hours}
              onChange={handleChange}
              className={styles.select}
            >
              {validateHours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select
              id="minutes"
              name="minutes"
              value={appointment.minutes}
              onChange={handleChange}
              className={styles.select}
            >
              {validateMinutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Seleccionar Servicio
            </label>
            <select
              id="description"
              name="description"
              value={appointment.description}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Seleccione un servicio</option>
              {haircutOptions.map((option) => (
                <option key={option.id} value={option.descripcion}>
                  {option.descripcion} - {option.valor}
                </option>
              ))}
            </select>
            {errors.description && (
              <span className={styles.error}>{errors.description}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className={styles.button}
          >
            Reservar
          </button>
        </form>
      </div>
    </div>
  );
}
