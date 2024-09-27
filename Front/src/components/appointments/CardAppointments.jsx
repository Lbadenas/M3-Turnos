import PropTypes from "prop-types";
import styles from "../appointments/CardAppointments.module.css";
import logo from "../../assets/logo.png";

export default function CardTurnos({
  id,
  date,
  time,
  userId,
  status,
  description,
  handleAppointmentCancel,
}) {
  if (!date || !time || typeof userId !== "number" || !status || !description) {
    console.error("Error: Faltan o son incorrectas las props en CardTurnos");
    return null;
  }

  const appointmentDate = new Date(date);
  const formDate = `${appointmentDate.getDate()} / ${
    appointmentDate.getMonth() + 1
  } / ${appointmentDate.getFullYear()}`;

  const handleClick = () => {
    const confirmCancel = window.confirm(
      `¿Desea cancelar el turno del día ${formDate} a las ${time}?`,
    );
    if (confirmCancel) {
      handleAppointmentCancel(id);
    }
  };
  return (
    <div className={styles.turnosContainer}>
      {/* Aquí podrías mapear a través de tus datos si tienes varios turnos */}
      <div className={styles.CardTurnos}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.datos}>
          <span>{date}</span>
          <span>{time}</span>
          <span>{description}</span>
          {status === "active" ? (
            <span className={styles.active} onClick={handleClick}>
              Activo
            </span>
          ) : (
            <span className={styles.cancelled}>Cancelado</span>
          )}
        </div>
      </div>
      {/* Repite el bloque CardTurnos para más tarjetas */}
    </div>
  );
}

CardTurnos.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleAppointmentCancel: PropTypes.func.isRequired,
};
