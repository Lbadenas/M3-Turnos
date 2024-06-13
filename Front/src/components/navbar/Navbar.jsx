import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.png";
import styles from "../navbar/Navbar.module.css";
import { useSelector } from "react-redux";

export default function Navbar() {
  const login = useSelector((state) => state.actualUser.userData.login);

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

        {login && (
          <Link to="/appointment">
            <span>RESERVAS</span>
          </Link>
        )}

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
