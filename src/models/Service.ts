import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";

@Entity('services')
export class Service extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({'name': 'service_name'})
    service_name!: string;

    @Column({'name': 'description'})
    description!: string;

    @OneToMany(() => Appointment, (appointment) => appointment.services_id)
    appointments!: Appointment[];

}
