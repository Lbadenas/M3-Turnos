import PropTypes from "prop-types";
import Swal from "sweetalert2"; // Importa SweetAlert2
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
  const formDate = appointmentDate.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const handleClick = () => {
    Swal.fire({
      title: `¿Desea cancelar el turno del día ${formDate} a las ${time}?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAppointmentCancel(id); // Cancela el turno
        // Muestra el mensaje de éxito
        Swal.fire({
          title: "Turno cancelado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  return (
    <div className={styles.turnosContainer}>
      <div className={styles.CardTurnos}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.datos}>
          <span>{formDate}</span>
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
