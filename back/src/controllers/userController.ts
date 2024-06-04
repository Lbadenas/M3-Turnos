import { Request, Response } from "express";
import Iuser from "../interfaces/iUser";
import {
  CreateUserService,
  findUserCredentialId,
  getAllUsersServices,
  getUserByIdServices,
} from "../services/usersServices";
import ICreateUserDto from "../dto/ICreateUserDto";
import ICreateCredentialDto from "../dto/ICreateCredentialDto";
import ICredential from "../interfaces/iCredential";
import { validateCredential } from "../services/credentialsServices";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: Iuser[] = await getAllUsersServices();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserByID = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user: Iuser = await getUserByIdServices(Number(id));
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const registerUsers = async (
  req: Request<{}, {}, ICreateUserDto>,
  res: Response
) => {
  try {
    const { name, email, birthdate, nDni, username, password } = req.body;
    const newUser: Iuser = await CreateUserService({
      name,
      email,
      birthdate,
      nDni,
      username,
      password,
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (
  req: Request<{}, {}, ICreateCredentialDto>,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    const crendetial: ICredential = await validateCredential({
      username,
      password,
    });
    const user = await findUserCredentialId(crendetial.id);
    res.status(200).json({ login: true, user });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
