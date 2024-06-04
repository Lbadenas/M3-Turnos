import Iuser from "../interfaces/iUser";
import ICreateUserDto from "../dto/ICreateUserDto";
import ICredential from "../interfaces/iCredential";
import { createCredential } from "./credentialsServices";

const users: Iuser[] = [
  {
    id: 1,
    name: "Marge",
    email: "marge@gmail.com",
    birthdate: "1980-01-01",
    nDni: "34989887",
    credentialId: 1,
  },
];

let id: number = 10;

export const getAllUsersServices = async (): Promise<Iuser[]> => {
  const allUsers: Iuser[] = users;
  return allUsers; //traerme de la base de dato la lista de usuario y despues la voy a retornar va a ser await
};

export const getUserByIdServices = async (id: number) => {
  const user: Iuser | undefined = users.find((user) => user.id === id); /// aca tengo que buscar en la base de dato
  if (!user) throw new Error("usuario no encontrado");
  return user;
};

export const CreateUserService = async (createUserDto: ICreateUserDto) => {
  const newCredential: ICredential = await createCredential({
    username: createUserDto.username,
    password: createUserDto.password,
  });
  //*newcredential id = 10
  const newUser: Iuser = {
    id: id++,
    name: createUserDto.name,
    email: createUserDto.email,
    birthdate: createUserDto.birthdate,
    nDni: createUserDto.nDni,
    credentialId: newCredential.id,
  };
  users.push(newUser);
  return newUser;
};

export const findUserCredentialId = async (credentialId: Number) => {
  const user: Iuser | undefined = users.find(
    (user) => user.id === credentialId
  );
  //verificar si  !user
  return user;
};
