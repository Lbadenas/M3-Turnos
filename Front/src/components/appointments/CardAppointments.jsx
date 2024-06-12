import PropTypes from "prop-types";
import styles from "../appointments/CardAppointments.module.css";
import logo from "../../assets/logo.png";

export default function CardTurnos({
  date,
  time,
  userId,
  status,
  description,
}) {
  if (!date || !time || typeof userId !== "number" || !status || !description) {
    console.error("Error: Faltan o son incorrectas las props en CardTurnos");
    return null;
  }

  return (
    <div className={styles.turnosContainer}>
      <div className={styles.CardTurnos}>
        <img src={logo} alt="logo" />
        <div className={styles.datos}>
          {" "}
          <span>{date}</span>
          <span>{time}</span>
          <span>{status}</span>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
}

CardTurnos.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
