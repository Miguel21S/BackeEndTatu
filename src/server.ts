
import express, { Application } from 'express';
import 'dotenv/config';
import * as controllers from './controllers/controllers';
import { AppDataSource } from './database/db';

const app: Application = express();
const PORT = process.env.PORT || 9998;
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Hello World!'
    });
});

app.get('/api/users', controllers.getRoles);
app.post('/api/roles', controllers.crearRoles);
app.put('/api/users/profile/:id', controllers.updateRoles);
app.delete('/api/users/:id', controllers.deleteRoles);

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
    })
    .catch(error => {
        console.log(error)
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// await queryRunner.createTable(
//     new Table({
//         name: "appointments",
//         columns: [
//             {
//                 name: "id",
//                 type: "int",
//                 isPrimary: true,
//                 isGenerated: true,
//                 generationStrategy: "increment"
//             },
//             {
//                 name: "appointments_date",
//                 type: "timestamp",
//                 isNullable: false,
//             },
//             {
//                 name: "user_id",
//                 type: "int",
//                 isNullable: false,
//             },
//             {
//                 name: "service_id",
//                 type: "int",
//                 isNullable: false,
//             }
//         ],
//         foreignKeys: [
//             {
//                 columnNames: ["user_id"],
//                 referencedTableName: "users",
//                 referencedColumnNames: ["id"],
//                 onDelete: "CASCADE"
//             },
//             {
//                 columnNames: ["service_id"],
//                 referencedTableName: "services",
//                 referencedColumnNames: ["id"],
//                 onDelete: "CASCADE"
//             }
//         ]
//     }),
//     true
// );

//               await queryRunner.createTable(
        //     new Table({
        //         name: "services",
        //         columns: [
        //             {
        //                 name: "id",
        //                 type: "int",
        //                 isPrimary: true,
        //                 isGenerated: true,
        //                 generationStrategy: "increment",
        //             },
        //             {
        //                 name: "service_name",
        //                 type: "varchar",
        //                 length: "255",
        //                 isNullable: false
        //             },
        //             {
        //                 name: "description",
        //                 type: "test",
        //                 length: "255"
        //             },
        //             {
        //                 name: "created_at",
        //                 type: "timestamp",
        //                 default: "CURRENT_TIMESTAMP"
        //             },
        //             {
        //                 name: "updated_at",
        //                 type: "timestamp",
        //                 default: "CURRENT_TIMESTAMP"
        //             }
        //         ]
        //     })
        // )