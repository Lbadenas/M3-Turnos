import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.socialIcons}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook"
            className={styles.icon}
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="Instagram"
            className={styles.icon}
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="data:image/png;base64,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"
            alt="Twitter"
            className={styles.icon}
          />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg"
            alt="LinkedIn"
            className={styles.icon}
          />
        </a>
      </div>
      <p className={styles.footerText}>
        © 2024 Peluqueria. Página con finalidad de estudio.
      </p>
    </footer>
  );
}

export default Footer;
