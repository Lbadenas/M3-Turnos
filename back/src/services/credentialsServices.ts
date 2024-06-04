import ICreateCredentialDto from "../dto/ICreateCredentialDto";
import ICredential from "../interfaces/iCredential";

const credentials: ICredential[] = [
  {
    id: 1,
    username: "marge",
    password: "1234",
  },
];
let credentialId: number = 10;

export const createCredential = async (
  createCredentialDto: ICreateCredentialDto
): Promise<ICredential> => {
  const newCredential: ICredential = {
    id: credentialId++,
    username: createCredentialDto.username,
    password: createCredentialDto.password,
  };
  credentials.push();
  return newCredential;
};

export const validateCredential = async (
  validateCredential: ICreateCredentialDto
): Promise<ICredential> => {
  const { username, password } = validateCredential;
  const foundCredential: ICredential | undefined = credentials.find(
    (credential) => credential.username === username
  );
  if (!foundCredential) throw Error("usuario inexistente");
  if (password !== foundCredential?.password)
    throw Error("Contraseña Incorrecta");
  return foundCredential;
};
