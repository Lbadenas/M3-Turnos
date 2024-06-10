import { useEffect, useState } from "react";
import axios from "axios";
import CardTurnos from "../../components/appointments/CardAppointments";

const GETAPPOINTMENTSURL = "http://localhost:3000/appointments";

export default function Appointment() {
  const [appointment, setAppointments] = useState([]);
  useEffect(() => {
    axios
      .get(GETAPPOINTMENTSURL)
      .then((response) => console.log(response.data))
      .then((AppointmentsFromDB) => setAppointments(AppointmentsFromDB));
  }, []);

  return (
    <div>
      <h1>MIS RESERVAS</h1>
      {appointment.map((appointment) => (
        <CardTurnos
          key={appointment.id}
          id={appointment.id}
          date={appointment.date}
          userId={appointment.userId}
          status={appointment.status}
          description={appointment.description}
        />
      ))}
    </div>
  );
}
