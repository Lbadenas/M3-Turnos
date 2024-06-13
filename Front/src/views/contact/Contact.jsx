import styles from "../contact/Contact.module.css";

function Contact() {
  return (
    <div className={styles.contactContainer}>
      <h1>Contacto</h1>
      <div className={styles.contactDetails}>
        <p>
          <strong>Dirección:</strong> Calle Falsa 123
        </p>
        <p>
          <strong>Teléfono:</strong> +1 234 567 890
        </p>
        <p>
          <strong>Email:</strong> info@tuempresa.com
        </p>
      </div>
    </div>
  );
}

export default Contact;
