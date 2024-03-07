
import 'dotenv/config';
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Roles1708988550093 } from './migrations/1708988550093-roles';
import { Users1709066205859 } from './migrations/1709066205859-users';
import { Services1709070844619 } from './migrations/1709070844619-services';
import { Appointments1709073378814 } from './migrations/1709073378814-appointments';
import { Role } from '../models/Role';
import { User } from '../models/User';
import { Appointment } from '../models/Appointment';
import { Service } from '../models/Service';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.BD_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3308,
    username: process.env.DB_USER || "raiz",
    password: process.env.DB_PASSWORD || "4785",
    database: process.env.DB_DATABASE || "tatus",

    entities: [Role, User, Appointment, Service],
    migrations:[Roles1708988550093, Users1709066205859, Services1709070844619, Appointments1709073378814],
    synchronize: false,
    logging: false,
})