import PropTypes from "prop-types";
import styles from "../appointments/CardAppointments.module.css";
import logo from "../../assets/logo.png";

// Lista de servicios
const servicios = [
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

export default function CardTurnos({
  id,
  date,
  time,
  userId,
  status,
  description,
  servicio, // Añadir servicio como prop
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

  // Encontrar el servicio correspondiente
  const servicioSeleccionado = servicios.find((s) => s.servicio === servicio);

  return (
    <div className={styles.turnosContainer}>
      <div className={styles.CardTurnos}>
        <img src={logo} alt="logo" />
        <div className={styles.datos}>
          <span>{formDate}</span>
          <span>{time}</span>
          <span>{description}</span>
          {servicioSeleccionado && (
            <div className={styles.servicioCard}>
              <img
                src={servicioSeleccionado.imagen}
                alt={servicioSeleccionado.descripcion}
              />
              <span>{servicioSeleccionado.descripcion}</span>
              <span>{servicioSeleccionado.valor}</span>
            </div>
          )}
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
  servicio: PropTypes.string.isRequired, // Incluir servicio en propTypes
  handleAppointmentCancel: PropTypes.func.isRequired,
};
