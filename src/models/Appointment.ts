import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({'name': 'appointments_date'})
    appointments_date!: Date;

    @Column({'name': 'user_id'})
    user_id!: number;

    @Column({'name': 'services_id'})
    services_id!: number;

    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({'name': 'user_id'})
    user!: User;
}
