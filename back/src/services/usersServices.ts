import ICreateUserDto from "../dto/ICreateUserDto";

import { createCredential } from "./credentialsServices";
import User from "../entities/User";
import { userModel, credentialModel } from "../repositories";

import Credential from "../entities/Credential";

export const getAllUsersServices = async (): Promise<User[]> => {
  const allUsers: User[] = await userModel.find({
    relations: { appointments: true },
  });
  return allUsers; //traerme de la base de dato la lista de usuario y despues la voy a retornar va a ser await
};

export const getUserByIdServices = async (id: number): Promise<User> => {
  const user: User | null = await userModel.findOne({
    where: { id },
    relations: { appointments: true },
  });
  if (!user) throw new Error("usuario no encontrado");
  return user;
};

export const CreateUserService = async (createUserDto: ICreateUserDto) => {
  const newUser: User = userModel.create(createUserDto);
  await userModel.save(newUser);

  const newCredential: Credential = await createCredential({
    username: createUserDto.username,
    password: createUserDto.password,
  });
  newUser.credential = newCredential;
  await userModel.save(newUser);
  return newUser;
};

export const findUserCredentialId = async (
  credentialId: number,
): Promise<User> => {
  const user: User | null = await userModel.findOneBy({
    credential: { id: credentialId },
  });
  if (!user) throw new Error("Usuario no encontrado");
  return user;
};

export const CheckExistingUserService = async (
  username: string,
  email: string,
): Promise<boolean> => {
  const existingEmail: User | null = await userModel.findOne({
    where: { email },
  });
  const existingUsername: Credential | null = await credentialModel.findOne({
    where: { username },
  });
  if (existingEmail || existingUsername) return true;
  else return false;
};
