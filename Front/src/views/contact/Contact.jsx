import { useState, useEffect } from "react";
import styles from "./Contact.module.css";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
          setIsLoading(false);
        },
        (err) => {
          console.error("FAILED...", err);
          alert("Hubo un error al enviar el mensaje.");
          setIsLoading(false);
        },
      );
  };

  // UseEffect para manejar la carga de la imagen de fondo
  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src =
      "https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    backgroundImage.onload = () => {
      setShowForm(true); // Muestra el formulario después de que la imagen esté cargada
    };
  }, []);

  return (
    <div className={styles.backgroundContainer}>
      <div
        className={`${styles.contactContainer} ${showForm ? styles.show : ""}`}
      >
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
