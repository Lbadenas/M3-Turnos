import ICreateTurnDto from "../dto/ICreateTurnDto";
import ITurn from "../interfaces/iturn";
import { IStatus } from "../interfaces/iturn";

let turns: ITurn[] = [
  {
    id: 1,
    date: "03/06/2024",
    time: "14:00hs",
    userId: 1,
    status: IStatus.ACTIVE,
    description: "esto es un turno para depilarme las bolas",
  },
];

let id: number = 10;

export const getAllTurnsServices = async (): Promise<ITurn[]> => {
  const allTurns: ITurn[] = turns;
  return allTurns; //traerme de la base de dato la lista de usuario y despues la voy a retornar va a ser await
};

export const getTurnByIdServices = async (id: number) => {
  const turn: ITurn | undefined = turns.find((turn) => turn.id === id); /// aca tengo que buscar en la base de dato
  if (!turn) throw new Error("No existe el turno");
  return turn;
};

export const createTurnService = async (createTurnDto: ICreateTurnDto) => {
  //*newcredential id = 10
  const newTurn: ITurn = {
    id: id++,
    date: createTurnDto.date,
    time: createTurnDto.time,
    userId: createTurnDto.userId,
    status: IStatus.ACTIVE,
    description: createTurnDto.description,
  };
  turns.push(newTurn);
  return newTurn;
};

export const cancelTurnService = async (id: number) => {
  turns = turns.map((turn: ITurn) => {
    if (turn.userId === id) {
      turn.status = IStatus.CANCELLED;
    }
    return turn;
  });
};
