import styles from "../home/home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.overlay}></div>
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
      </div>
      <Link to="/appointmentsform">
        <button className={styles.button}>¡Reserva tu estilo!</button>
      </Link>
    </div>
  );
}

export default Home;
