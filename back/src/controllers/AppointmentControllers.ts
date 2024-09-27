import { Request, Response } from "express";
import {
  cancelAppointmentService,
  createAppointmentService,
  getAllAppointmentsServices,
  getAppointmentByIdServices,
} from "../services/appointmentsServices";
import ICreateAppointmentDto from "../dto/ICreateAppointmentDto";
import Appointment from "../entities/Appointment";
import { isWeekend } from "date-fns";

export const getAllappointments = async (req: Request, res: Response) => {
  try {
    const Appointment: Appointment[] = await getAllAppointmentsServices();
    res.status(200).json(Appointment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAppointmentsById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const Appointment: Appointment = await getAppointmentByIdServices(
      Number(id),
    );
    res.status(200).json(Appointment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const schedule = async (
  req: Request<{}, {}, ICreateAppointmentDto>,
  res: Response,
) => {
  try {
    const { date, time, userId, description } = req.body;

    // Validación de fines de semana
    if (isWeekend(date)) {
      return res
        .status(400)
        .json({ message: "La fecha seleccionada es un fin de semana" });
    }

    const newAppointment: Appointment = await createAppointmentService({
      date,
      time,
      userId,
      description,
    });

    res.status(201).json(newAppointment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const cancel = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    await cancelAppointmentService(Number(id));
    res.status(200).json("turno cancelado");
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
