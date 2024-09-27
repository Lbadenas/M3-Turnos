import { useState } from "react";
import styles from "./Contact.module.css";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Crear un objeto con los datos del formulario
    const emailData = {
      to_email: formData.email, // Agregar el correo electrónico del formulario
      name: formData.name,
      message: formData.message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailData, // Usar el objeto con el correo
        import.meta.env.VITE_EMAILJS_USER_ID,
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Mensaje enviado con éxito!");
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          setIsLoading(false);
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Hubo un error al enviar el mensaje.");
          setIsLoading(false);
        },
      );
  };

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.contactContainer}>
        <h1>Contacto</h1>
        <form onSubmit={handleSubmit}>
          {console.log("formData", formData)}

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
