import { useState } from "react";
import styles from "./Contact.module.css";
import emailjs from "emailjs-com";
import Swal from "sweetalert2"; // Importar SweetAlert2

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailData = {
      to_email: formData.email,
      name: formData.name,
      message: formData.message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailData,
        import.meta.env.VITE_EMAILJS_USER_ID,
      )
      .then(
        (response) => {
          console.log("¡ÉXITO!", response.status, response.text);
          Swal.fire({
            icon: "success",
            title: "¡Mensaje enviado con éxito!",
            text: "Tu mensaje ha sido enviado correctamente.",
          });
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          setIsLoading(false);
        },
        (err) => {
          console.error("FALLÓ...", err);
          Swal.fire({
            icon: "error",
            title: "Error al enviar el mensaje",
            text: "Hubo un error al enviar tu mensaje. Inténtalo de nuevo.",
          });
          setIsLoading(false);
        },
      );
  };

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.contactContainer}>
        <h1>Contacto</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
        {isLoading && <p className={styles.loadingMessage}>Cargando...</p>}
      </div>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </div>
  );
}

export default Contact;
