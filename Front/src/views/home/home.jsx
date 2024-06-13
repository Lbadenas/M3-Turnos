import styles from "../home/home.module.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.overlay}></div>
      <h1 className={styles.welcomeText}>Bienvenido a nuestra peluquería</h1>
      <p className={styles.description}>
        En nuestra peluquería te ofrecemos los mejores servicios para el cuidado
        y estilo de tu cabello. ¡Déjanos transformar tu look!
      </p>
      <Link to="/register">
        <button className={styles.button}>Registrarse</button>
      </Link>
    </div>
  );
}

export default Home;
