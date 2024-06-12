import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h1>bienvenid@</h1>
      <h2>¿es tu primera vez en nuestra app?</h2>
      <Link to="/register">
        <button>Registrarse</button>
      </Link>
      <h2>¿ya tienes una cuenta?</h2>
      <Link to="/login">
        <button>Registrarse</button>
      </Link>
    </div>
  );
}

export default Landing;
