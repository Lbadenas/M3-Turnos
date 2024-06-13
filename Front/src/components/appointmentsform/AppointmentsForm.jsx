import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../appointmentsform/AppointmentsForm.module.css";

const POSTAPPOINTMENT_URL = "http://localhost:3000/appointments/schedule";

export default function AppointmentForm() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.actualUser?.userData?.user?.id);

  useEffect(() => {
    if (!userId) {
      navigate("/home");
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
    if (!date) errors.date = "Ingresar una fecha";
    else if (isWeekend(date))
      errors.date = "La fecha seleccionada es un fin de semana";
    if (!description) errors.description = "Ingresar descripción";
    else if (description.length < 5)
      errors.description = "Descripción de al menos 5 caracteres";
    else if (description.length > 25)
      errors.description = "Descripción de no más de 25 caracteres";
    return errors;
  };

  const isWeekend = (date) => {
    const day = new Date(date).getDay();
    return day === 6 || day === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));

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
      return;
    }

    axios
      .post(POSTAPPOINTMENT_URL, newAppointment)
      .then(({ data }) => {
        alert(`Ha sido creada la reserva ${data.state}, hora ${data.time}`);
        setAppointment(initialState);
        navigate("/appointments");
      })
      .catch((error) => {
        alert(`Error ${error.response.data.error}`);
      });
  };

  const validateHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
  const validateMinutes = ["00", "30"];

  function getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  function getFourteenDaysAhead() {
    const today = new Date();
    const fourteenDaysAhead = new Date(today);
    fourteenDaysAhead.setDate(fourteenDaysAhead.getDate() + 13);
    return fourteenDaysAhead.toISOString().split("T")[0];
  }

  return (
    <div className={styles.AppointmentForm}>
      <h2>Nueva Reserva</h2>
      <br />
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
            Descripción
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={appointment.description}
            placeholder="Ingresar descripción"
            onChange={handleChange}
            className={styles.input}
          />
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
  );
}
