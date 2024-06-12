import { useState } from "react";
import axios from "axios";
import styles from "../register/Register.module.css";
import logo from "../../assets/logo.png";

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const POSTUSER_URL = "http://localhost:3000/users/register";

function Register() {
  const initialState = {
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  //* ESTADOS
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});

  //* VALIDACIONES
  const validateUser = ({
    name,
    email,
    birthdate,
    nDni,
    username,
    password,
    confirmPassword,
  }) => {
    const errors = {};

    if (!name) errors.name = "Ingresar un nombre";
    if (!email) errors.email = "Ingresar un email";
    else {
      if (!emailRegExp.test(email)) errors.email = "Ingresar un email válido";
    }

    if (!birthdate) errors.birthdate = "Ingresar una fecha de nacimiento";
    else {
      const today = new Date();
      const birthDate = new Date(birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        errors.birthdate = "mayores de 18 unicamente";
      }
    }

    if (!nDni) errors.nDni = "Ingresar un número de DNI";
    if (!username) errors.username = "Ingresar un nombre de usuario";
    if (!password) errors.password = "Ingresar una contraseña";
    if (confirmPassword !== password)
      errors.confirmPassword = "La contraseña no coincide";

    return errors;
  };

  //*handlers

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    setErrors(validateUser(updatedUser));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateUser(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userData = {
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      nDni: user.nDni,
      username: user.username,
      password: user.password,
    };

    axios
      .post(POSTUSER_URL, userData)
      .then(({ data }) => {
        console.log(data);
        alert(data.message);
        setUser(initialState);
        setErrors({});
      })
      .catch((error) => alert(error.message));
  };

  const handleReset = (event) => {
    event.preventDefault();
    setUser(initialState);
    setErrors({});
  };

  const formData = [
    { label: "Nombre", name: "name", type: "text" },
    { label: "Username", name: "username", type: "text" },
    { label: "Password", name: "password", type: "password" },
    {
      label: "Confirmar Contraseña",
      name: "confirmPassword",
      type: "password",
    },
    { label: "Correo", name: "email", type: "email" },
    { label: "Fecha De Nacimiento", name: "birthdate", type: "date" },
    { label: "Número de DNI", name: "nDni", type: "text" },
  ];

  return (
    <div className={styles.registrocontainer}>
      <img src={logo} alt="logo" className={styles.logo} />
      <h2 className={styles.registroh2}>Registro</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        {formData.map(({ label, name, type }) => (
          <div key={name}>
            <label>{label}</label>
            <input
              className={styles.inputregistro}
              id={name}
              name={name}
              type={type}
              value={user[name]}
              placeholder={`Ingresar ${label.toLowerCase()}`}
              onChange={handleChange}
            />
            {errors[name] && (
              <span style={{ color: "red" }}>{errors[name]}</span>
            )}
          </div>
        ))}
        <button
          className={styles.botonregistro}
          type="submit"
          disabled={
            Object.keys(errors).some((key) => errors[key]) ||
            Object.values(user).some((value) => value === "")
          }
        >
          Registrar
        </button>

        <button className={styles.botonregistro} onClick={handleReset}>
          Limpiar
        </button>
      </form>
    </div>
  );
}

export default Register;
