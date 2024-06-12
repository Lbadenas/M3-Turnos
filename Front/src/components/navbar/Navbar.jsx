import { Link, useLocation } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.png";
import styles from "../navbar/Navbar.module.css";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.links}>
        <Link to="/home">
          <span>HOME</span>
        </Link>

        <Link to="/service">
          <span>SERVICIOS</span>
        </Link>

        {pathname !== "/" &&
        pathname !== "/login" &&
        pathname !== "/register" ? (
          <Link to="/appointment">
            <span>RESERVAR</span>
          </Link>
        ) : null}

        <Link to="/contact">
          <span>CONTACTO</span>
        </Link>
      </div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
    </div>
  );
}
