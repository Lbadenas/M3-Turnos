import { Link } from "react-router-dom";
import styles from "../landing/Landing.module.css";

function Landing() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.landingContainer}>
        <h1 className={styles.landingTitle}>Bienvenid@</h1>
        <h2 className={styles.landingSubtitle}>
          ¿Es tu primera vez en nuestra app?
        </h2>
        <div className={styles.buttonContainer}>
          <Link to="/register" className={styles.button}>
            Registrarse
          </Link>
        </div>
        <h2 className={styles.landingSubtitle}>¿Ya tienes una cuenta?</h2>
        <div className={styles.buttonContainer}>
          <Link to="/login" className={styles.button}>
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
