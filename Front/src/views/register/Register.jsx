import { useState } from "react";
import axios from "axios";
import styles from "../register/Register.module.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const POSTUSER_URL = "https://m3-turnos.onrender.com/users/register";

function Register() {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  // ESTADOS
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});

  // VALIDACIONES
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
    if (!name) errors.name = "Por favor, ingresa un nombre";
    if (!email) errors.email = "Por favor, ingresa un correo electrónico";
    else {
      if (!emailRegExp.test(email))
        errors.email = "Por favor, ingresa un correo electrónico válido";
    }
    if (!birthdate)
      errors.birthdate = "Por favor, ingresa una fecha de nacimiento";
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
        errors.birthdate = "Solo mayores de 18 años";
      }
    }
    if (!nDni) errors.nDni = "Por favor, ingresa un número de DNI";
    if (!username) errors.username = "Por favor, ingresa un nombre de usuario";
    if (!password) errors.password = "Por favor, ingresa una contraseña";
    if (confirmPassword !== password)
      errors.confirmPassword = "Las contraseñas no coinciden";
    return errors;
  };

  // HANDLERS
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
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: data.message,
        });
        setUser(initialState);
        setErrors({});

        // Redirigir a / después de un registro exitoso
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || error.message,
        });
      });
  };

  const handleReset = (event) => {
    event.preventDefault();
    setUser(initialState);
    setErrors({});
  };

  const handleBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  const formData = [
    { label: "Nombre", name: "name", type: "text" },
    { label: "Nombre de usuario", name: "username", type: "text" },
    { label: "Contraseña", name: "password", type: "password" },
    {
      label: "Confirmar contraseña",
      name: "confirmPassword",
      type: "password",
    },
    { label: "Correo electrónico", name: "email", type: "email" },
    { label: "Fecha de nacimiento", name: "birthdate", type: "date" },
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
        <div>
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
          <button className={styles.botonregistro} onClick={handleBack}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
