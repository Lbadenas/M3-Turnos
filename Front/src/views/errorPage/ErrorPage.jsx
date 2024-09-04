import styles from "./ErrorPage.module.css"; // Asegúrate de ajustar el path si es necesario
import { Link } from "react-router-dom"; // Importa el componente Link

function ErrorPage() {
  return (
    <div className={styles.errorContainer}>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/home" className={styles.errorButton}>
        Volver al Inicio
      </Link>
    </div>
  );
}

export default ErrorPage;
