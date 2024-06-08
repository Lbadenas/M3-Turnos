import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Credential from "./Credential";
import Appointment from "./Appointment";

@Entity({ name: "users" })
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  birthdate!: string;

  @Column()
  nDni!: string;

  //* CREDENTIAL 1 : 1 User
  @OneToOne(() => Credential)
  @JoinColumn()
  credential!: Credential;

  //*  User 1 : N TURNS
  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments!: Appointment[];
}

export default User;
