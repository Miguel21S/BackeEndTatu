import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role";
import { Appointment } from "./Appointment";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({'name': 'name'})
    name!: string;

    @Column({'name': 'lastname'})
    lastname!: string;

    @Column({'name': 'email'})
    email!: string;

    @Column({'name': 'password'})
    password!: string;

    @Column({'name': 'role_id'})
    role_id!: number;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({'name': 'role_id'})
    role!: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user_id)
    appointments!: Appointment[];
}
