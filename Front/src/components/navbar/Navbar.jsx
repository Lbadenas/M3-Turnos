import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.jpg";
import styles from "../navbar/Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.links}>
        <span>HOME</span>
        <span>SERVICIOS</span>
        <span>RESERVAR</span>
        <span>CONTACTO</span>
      </div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
    </div>
  );
}
