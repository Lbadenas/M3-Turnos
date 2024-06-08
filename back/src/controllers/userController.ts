import { Request, Response } from "express";

import {
  CreateUserService,
  findUserCredentialId,
  getAllUsersServices,
  getUserByIdServices,
} from "../services/usersServices";
import ICreateUserDto from "../dto/ICreateUserDto";
import ICreateCredentialDto from "../dto/ICreateCredentialDto";

import { validateCredential } from "../services/credentialsServices";
import User from "../entities/User";
import Credential from "../entities/Credential";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsersServices();
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
    const user: User = await getUserByIdServices(Number(id));
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
    const newUser: User = await CreateUserService({
      name,
      email,
      birthdate,
      nDni,
      username,
      password,
    });
    res.status(201).json({ message: "usuario creado con exito" });
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
    const crendetial: Credential = await validateCredential({
      username,
      password,
    });
    const user: User | null = await findUserCredentialId(crendetial.id);
    res.status(200).json({ login: true, user });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
