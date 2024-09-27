import ICreateAppointmentDto from "../dto/ICreateAppointmentDto";
import Appointment from "../entities/Appointment";
import User from "../entities/User";
import IAppointment, { IStatus } from "../interfaces/iAppointment";
import { appointmentModel, userModel } from "../repositories";
import { isWeekend } from "date-fns"; // Importa isWeekend de date-fns

let appointments: IAppointment[] = [
  {
    id: 1,
    date: "03/06/2024",
    time: "14:00hs",
    userId: 1,
    status: IStatus.ACTIVE,
    description: "esto es un turno para cortarme el pelo",
  },
];

let id: number = 10;

export const getAllAppointmentsServices = async (): Promise<Appointment[]> => {
  const allTAppointments: Appointment[] = await appointmentModel.find();
  return allTAppointments; //traerme de la base de dato la lista de usuario y despues la voy a retornar va a ser await
};

export const getAppointmentByIdServices = async (
  id: number,
): Promise<Appointment> => {
  const appointment: Appointment | null = await appointmentModel.findOneBy({
    id: id,
  });
  if (!appointment) throw new Error("No existe el turno");
  return appointment;
};

export const createAppointmentService = async (
  createAppointmentDto: ICreateAppointmentDto,
): Promise<Appointment> => {
  const { date, userId } = createAppointmentDto;

  // Verifica si la fecha es un sábado o domingo
  const appointmentDate = new Date(date);
  if (isWeekend(appointmentDate)) {
    throw new Error(
      "No se pueden programar citas los fines de semana (sábado y domingo).",
    );
  }

  // Verifica si el usuario existe
  const user: User | null = await userModel.findOneBy({ id: userId });
  if (!user) throw new Error("usuario inexistente");

  // Crea la cita
  const newAppointment: Appointment | null =
    appointmentModel.create(createAppointmentDto);
  await appointmentModel.save(newAppointment);

  // Asocia la cita con el usuario
  newAppointment.user = user;
  await appointmentModel.save(newAppointment);

  return newAppointment;
};

export const cancelAppointmentService = async (id: number): Promise<void> => {
  const appointment: Appointment | null = await appointmentModel.findOneBy({
    id: id,
  });
  if (!appointment) throw new Error("turno inexistente");
  appointment.status = "cancelled";
  await appointmentModel.save(appointment);
};
