import { useState } from "react";
import Register from "../register/Register";
import Login from "../login/Login";
import styles from "../landing/Landing.module.css";

function Landing() {
  const [showForm, setShowForm] = useState(null); // Estado para controlar qué formulario se muestra

  const handleFormSwitch = (formType) => {
    setShowForm(formType); // Cambiamos el estado según el formulario a mostrar
  };

  return (
    <div className={styles.homeContainer}>
      {/* Video de fondo */}
      <div className={styles.videoBackground}>
        <video autoPlay muted loop>
          <source
            src="https://cdn.pixabay.com/video/2019/12/07/29917-383980366_large.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      {/* Contenedor para la landing page y formularios */}
      <div
        className={`${styles.landingContainer} ${
          showForm ? styles.hidden : ""
        }`}
      >
        {!showForm && (
          <>
            <h1 className={styles.landingTitle}>Bienvenid@</h1>
            <h2 className={styles.landingSubtitle}>
              ¿Es tu primera vez en nuestra app?
            </h2>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => handleFormSwitch("register")}
                className={styles.button}
              >
                Registrarse
              </button>
            </div>
            <h2 className={styles.landingSubtitle}>¿Ya tienes una cuenta?</h2>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => handleFormSwitch("login")}
                className={styles.button}
              >
                Iniciar Sesión
              </button>
            </div>
          </>
        )}
      </div>

      {/* Formularios */}
      {showForm === "register" && <Register />}
      {showForm === "login" && <Login />}
    </div>
  );
}

export default Landing;
