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
            src="https://media.istockphoto.com/id/1030251504/es/foto/peluquer%C3%ADa-corte-de-pelo-de-los-clientes-en-el-sal%C3%B3n-de.jpg?s=612x612&w=0&k=20&c=c3ftsfxYy5G6Bq4XxuP_K3r7qf2zyw4UsFeu89CY_LA="
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
