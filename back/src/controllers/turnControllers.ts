import { Request, Response } from "express";
import ITurn from "../interfaces/iturn";
import {
  cancelTurnService,
  createTurnService,
  getAllTurnsServices,
  getTurnByIdServices,
} from "../services/turnsServices";
import ICreateTurnDto from "../dto/ICreateTurnDto";

export const getAllTurns = async (req: Request, res: Response) => {
  try {
    const turns: ITurn[] = await getAllTurnsServices();
    res.status(200).json(turns);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTurnsById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const turn: ITurn = await getTurnByIdServices(Number(id));
    res.status(200).json(turn);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const schedule = async (
  req: Request<{}, {}, ICreateTurnDto>,
  res: Response
) => {
  try {
    const { date, time, userId, description } = req.body;
    const newTurn: ITurn = await createTurnService({
      date,
      time,
      userId,
      description,
    });
    res.status(201).json(newTurn);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const cancel = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  try {
    const { id } = req.params;
    await cancelTurnService(Number(id));
    res.status(200).json("turno cancelado");
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
