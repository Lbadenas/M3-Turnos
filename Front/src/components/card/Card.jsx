import Servicios from "../../views/servicios/servicios";

const serviciosData = [
  {
    title: "Servicio de Corte",
    description: "Descripción del servicio de corte de cabello...",
    imageUrl: "https://example.com/corte1.jpg", // URL de la imagen del servicio de corte
  },
  {
    title: "Servicio de Coloración",
    description: "Descripción del servicio de coloración de cabello...",
    imageUrl: "https://example.com/coloracion.jpg", // URL de la imagen del servicio de coloración
  },
  {
    title: "Servicio de Peinado",
    description: "Descripción del servicio de peinado de cabello...",
    imageUrl: "https://example.com/peinado.jpg", // URL de la imagen del servicio de peinado
  },
  {
    title: "Tratamiento Capilar",
    description: "Descripción del tratamiento capilar...",
    imageUrl: "https://example.com/tratamiento.jpg", // URL de la imagen del tratamiento capilar
  },
];

function Servicios() {
  return (
    <div>
      <h1>Bienvenido a nuestra peluquería</h1>
      <Servicios servicios={serviciosData} />
    </div>
  );
}

export default Servicios;
