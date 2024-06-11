import { useEffect, useState } from "react";
import axios from "axios";
import CardTurnos from "../../components/appointments/CardAppointments";

const GETAPPOINTMENTSURL = "http://localhost:3000/appointments";

export default function Appointment() {
  const [appointment, setAppointments] = useState([]);
  useEffect(() => {
    axios
      .get(GETAPPOINTMENTSURL)
      .then((response) => response.data)
      .then((AppointmentsFromDB) => setAppointments(AppointmentsFromDB));
  }, []);
  console.log(appointment);
  return (
    <div>
      <h1>MIS RESERVAS</h1>
      {appointment.length > 0 &&
        appointment.map((appoinment) => (
          <CardTurnos
            key={appoinment.id}
            id={appoinment.id}
            date={appoinment.date}
            time={appoinment.time}
            userId={appoinment.userId}
            status={appoinment.status}
            description={appoinment.description}
          />
        ))}
    </div>
  );
}
