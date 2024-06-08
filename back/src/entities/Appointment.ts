import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity({ name: "appoitnments" })
class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  time!: string;

  @Column()
  userId!: number;

  @Column({ default: "active" })
  status!: String;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.appointments)
  user!: User;
}

export default Appointment;
