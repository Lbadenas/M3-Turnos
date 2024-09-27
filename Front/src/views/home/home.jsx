import styles from "../home/home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.welcomeText}>
          ¡Bienvenido a la Experiencia de Belleza Definitiva!
        </h1>
        <p className={styles.description}>
          En nuestro salón, no solo cuidamos tu cabello, sino que realzamos tu
          estilo y personalidad. Desde cortes vanguardistas hasta tratamientos
          exclusivos, estamos aquí para hacer que te sientas espectacular.
          ¡Descubre la magia de una transformación que va más allá de lo
          estético!
        </p>
        {/* Imagen como tarjeta dentro de la descripción, ahora debajo del texto */}
        <div className={styles.imageCard}>
          <img
            src="https://img.freepik.com/foto-gratis/hombre-guapo-cortando-barba-salon-peluqueria_1303-20932.jpg?w=1380&t=st=1727393130~exp=1727393730~hmac=3c53d293ae220c8924dadfdd219ac5065f770e4d761217a326b823799861473c"
            alt="Corte de cabello"
            className={styles.image}
          />
        </div>
        <Link to="/appointmentsform">
          <button className={styles.button}>¡Reserva tu estilo!</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
