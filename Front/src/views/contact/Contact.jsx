import { useState } from "react";
import styles from "../contact/Contact.module.css";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true); // Establecer el estado de carga a verdadero

    console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log("Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log("User ID:", import.meta.env.VITE_EMAILJS_USER_ID);
    console.log("Form Data:", formData);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
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
          setIsLoading(false); // Establecer el estado de carga a falso
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Hubo un error al enviar el mensaje.");
          setIsLoading(false); // Establecer el estado de carga a falso
        },
      );
  };

  return (
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
          disabled={isLoading} // Deshabilitar el botón cuando esté cargando
        >
          {isLoading ? "Enviando..." : "Enviar Mensaje"}
        </button>
      </form>
      {isLoading && <p className={styles.loadingMessage}>Cargando...</p>}{" "}
      {/* Mostrar mensaje de carga */}
    </div>
  );
}

export default Contact;
