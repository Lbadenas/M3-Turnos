// Appointment:
// id: ID numérico que identifica al turno.
// date: fecha para la cual fue reservado el turno.
// time: hora para la cual fue reservado el turno.
// userId: ID del usuario que agendó el turno, referencia al usuario
// status: status actual del turno, que puede ser “active” o “cancelled”.

export enum IStatus {
  ACTIVE = "active",
  CANCELLED = "cancelled",
}

interface ITurn {
  id: number;
  date: string;
  time: string;
  userId: number;
  status: IStatus;
  description: string;
}

export default ITurn;
