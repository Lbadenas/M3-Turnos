import { useState } from "react";
import axios from "axios";
import styles from "../login/Login.module.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";

const LOGIN_URL = "http://localhost:3000/users/login";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    username: "",
    password: "",
  };

  //* ESTADOS
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  //* VALIDACIONES
  const validateUser = ({ username, password }) => {
    const errors = {};

    if (!username) errors.username = "ingresar un username";
    if (!password) errors.password = "ingresar un password";

    return errors;
  };

  //*handlers

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setErrors(validateUser({ ...user, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username: user.username,
      password: user.password,
    };
    axios
      .post(LOGIN_URL, userData)
      .then(({ data }) => {
        dispatch(setUserData(data));
        alert("usuario logeado");
        setUser(initialState);
        navigate("/home");
      })
      .catch((error) => alert(error?.response?.data?.message));
  };

  const formData = [
    { label: "Username", name: "username", type: "text" },
    { label: "Password", name: "password", type: "password" },
  ];

  return (
    <div className={styles.formulario}>
      <img src={logo} alt="logo" className={styles.logo} />
      <h2 className={styles.letradelogin}>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        {formData.map(({ label, name, type }) => (
          <div key={name}>
            <label>{label}</label>
            <input
              className={styles.input}
              id={name}
              name={name}
              type={type}
              value={user[name]}
              placeholder={`ingresar ${label.toLowerCase()}`}
              onChange={handleChange}
            />
            {errors[name] && (
              <span style={{ color: "red" }}>{errors[name]}</span>
            )}
          </div>
        ))}
        <button
          className={styles.boton}
          type="submit"
          disabled={
            Object.keys(errors).some((key) => errors[key]) ||
            Object.values(user).some((value) => value === "")
          }
        >
          inicia sesion
        </button>
      </form>
    </div>
  );
}

export default Login;
