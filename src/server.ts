
import express, { Application } from 'express';
import 'dotenv/config';
import * as controllers from './controllers/controllers';
import * as userControll from './controllers/userController';
import { AppDataSource } from './database/db';
import { login, register, registerAdministradores } from './controllers/authController';
import { auth } from './middlewares/auth';
import { isSuperAdmin } from './middlewares/isSuperAdmin';

const app: Application = express();
const PORT = process.env.PORT || 9998;
app.use(express.json());

// app.get('/api', (req, res) => {
//     res.json({
//         success: true,
//         message: 'Hello World!'
//     });
// });

//URL DE LA CLASE Controller
app.get('/api/users', auth, isSuperAdmin, controllers.getUser);
app.post('/api/roles/users',auth, controllers.crearRoles);
app.get('/api', auth, isSuperAdmin, controllers.getUserByEmail);
app.put('/api/users/:id', auth, isSuperAdmin, controllers.updateRoles);
app.delete('/api/users/:id', auth, isSuperAdmin, controllers.deleteUserById);
app.post('/api/services', auth, isSuperAdmin, controllers.crearServicio);
app.put('/api/services/:id', auth, isSuperAdmin, controllers.editarServicio);

//URL DE LA CLASE authController
app.post('/api/auth/register', register)
app.post('/api/auth/superadmin', auth, isSuperAdmin, registerAdministradores);
app.post('/api/auth/login', login);

//URL DE LA CLASE userController
app.put('/api/users/profile', userControll.getupdateUser);
// app.post('/api/appointments', userControll.Appointments);

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
