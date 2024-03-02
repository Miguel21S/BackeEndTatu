import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { User } from "./User";
import { Service } from "./Service";

@Entity('appointments')
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

    @ManyToOne(() => Service, (service) => service.appointments)
    @JoinColumn({'name':'services_id'})
    service!: Service;
}
