import ICreateCredentialDto from "../dto/ICreateCredentialDto";
import IValidateCredentialDto from "../dto/IValidateCredentialDto";
import Credential from "../entities/Credential";
import { credentialModel } from "../repositories";

// const credentials: ICredential[] = [
//   {
//     id: 1,
//     username: "marge",
//     password: "1234",
//   },
// ];
// let credentialId: number = 10;

export const createCredential = async (
  createCredentialDto: ICreateCredentialDto
): Promise<Credential> => {
  // verificar que no exista el email
  // esta funcion crea una  nueva credencial en la base de datos
  const newCredential: Credential = credentialModel.create(createCredentialDto);
  await credentialModel.save(newCredential);
  return newCredential;
};

export const validateCredential = async (
  validateCredential: IValidateCredentialDto
): Promise<Credential> => {
  const { username, password } = validateCredential;
  const foundCredential: Credential | null = await credentialModel.findOneBy({
    username,
  });
  if (!foundCredential) throw Error("credenciales incorrectas");
  if (password !== foundCredential?.password)
    throw Error("Contraseña Incorrecta");
  return foundCredential;
};
