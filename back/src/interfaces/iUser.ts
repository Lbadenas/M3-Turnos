// Implementar las interfaces de las entidades con las que estaremos trabajando.
// User
// id: ID numérico que identifica al usuario.
// name: nombre completo del usuario.
// email: dirección de email del usuario.
// birthdate: fecha de nacimiento.
// nDni: número de DNI o identificación.
// credentialsId: ID de las credenciales, referencia al par de credenciales que posee el usuario.

interface Iuser {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  nDni: string;
  credentialId: number;
}

export default Iuser;
