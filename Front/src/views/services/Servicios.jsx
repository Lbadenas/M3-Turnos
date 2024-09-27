import { useNavigate } from "react-router-dom";
import styles from "../services/Servicios.module.css";
import { useState } from "react";

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

const Servicios = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null); // Estado para el servicio seleccionado

  const handleRegisterRedirect = () => {
    navigate("/"); // Redirecciona a la página de inicio
  };

  const handleServiceClick = (servicio) => {
    setSelectedService(servicio === selectedService ? null : servicio); // Alterna la selección del servicio
  };

  return (
    <div className={styles.background}>
      <div className={styles.serviciosLayout}>
        <div className={styles.serviciosContainer}>
          {servicios.map((servicio) => (
            <div
              className={`${styles.servicio} ${
                selectedService === servicio ? styles.selected : ""
              }`}
              key={servicio.id}
              onClick={() => handleServiceClick(servicio)}
            >
              <img
                src={servicio.imagen}
                alt={servicio.descripcion}
                className={styles.servicioImagen}
              />
              <h3>{servicio.descripcion}</h3>
              <p>Valor: {servicio.valor}</p>
              <p>Servicio: {servicio.servicio}</p>
            </div>
          ))}
        </div>
        <div className={styles.descripcionContainer}>
          <p className={styles.descripcion}>
            ¡Bienvenido a nuestra peluquería! Ofrecemos una variedad de
            servicios para que luzcas increíble. Desde cortes de pelo clásicos
            hasta estilos modernos, nuestros expertos están aquí para darte el
            look que deseas. No te pierdas nuestro exclusivo servicio de corte
            para niños, ¡donde la diversión y el estilo se encuentran!
          </p>

          {/* Imagen entre la descripción y el botón */}
          <img
            src="https://cdn1.treatwell.net/images/view/v2.i8861611.w360.h240.xA21D5F13/"
            alt="Agendar una cita en la peluquería" // Cambia esto por la descripción adecuada
            className={styles.imagenEntre} // Asegúrate de agregar estilos para esta clase
          />

          <button
            onClick={handleRegisterRedirect} // Solo redirecciona
            className={styles.exclusiveButton} // Usar la clase CSS para el estilo
          >
            Este es un servicio exclusivo. ¡Pídelo ahora!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
