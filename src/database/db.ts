
import 'dotenv/config';
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Roles1708988550093 } from './migrations/1708988550093-roles';
import { Users1709066205859 } from './migrations/1709066205859-users';
import { Services1709070844619 } from './migrations/1709070844619-services';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3310,
    username: "root",
    password: "2345",
    database: "gestion_de_citas",
    entities: [],
    migrations:[Roles1708988550093, Users1709066205859, Services1709070844619],
    synchronize: false,
    logging: false,
})