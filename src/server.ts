
//////////////////////          IMPORTACIÓN DE LAS DEPENDENCIAS Y DE LOS FICHEROS
import express, { Application } from 'express';
import 'dotenv/config';
import * as userController from './controllers/userController';
import * as rolesController from './controllers/roleControllers';
import * as appointsController from './controllers/appointmenstControllers';
import * as servicesController from './controllers/serviceControllers';
import { AppDataSource } from './database/db';
import { login, register, registerAdministradores } from './controllers/authController';
import { auth } from './middlewares/auth';
import { isSuperAdmin } from './middlewares/isSuperAdmin';
import { isUser } from './middlewares/isUser';

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

//URL DE LA CLASE authController
app.post('/api/auth/register', register)
app.post('/api/auth/superadmin', auth, isSuperAdmin, registerAdministradores);
app.post('/api/auth/login', login);

////////////////   URL DE LAS CLASES ROLES
app.post('/api/roles/users',auth, rolesController.createRoles);
app.put('/api/users/:id', auth, isSuperAdmin, rolesController.updateRoles);
app.delete('/api/role/:id', auth, isSuperAdmin, rolesController.deleteRole);

//URL DE LA CLASE userController
app.get('/api/users/profile', auth, userController.myPerfil);
app.get('/api/users', auth, isSuperAdmin, userController.getUser);
app.get('/api', auth, isSuperAdmin, userController.getUserByEmail);
app.put('/api/users/profile/:id', auth, isUser, userController.getupdateUser);
app.delete('/api/users/:id', auth, isSuperAdmin, userController.deleteUserById);

//////////////////////// URL DE LOS SERVICIOS
app.post('/api/services', auth, isSuperAdmin, servicesController.createServicio);
app.get('/api/services', auth, servicesController.getServices);
app.put('/api/services/:id', auth, isSuperAdmin, servicesController.updateServicio);
app.delete('/api/services/:id', auth, isSuperAdmin, servicesController.deleteServicio);

/////////////    URL DE LOS APPOINTMENTS
app.post('/api/appointments', auth, isUser, appointsController.createAppointments);
app.get('/api/appointments', auth, appointsController.myAppointments);
app.get('/api/appointments/:id', auth, isUser, appointsController.searchAppointmentsPorId);
app.put('/api/appointments', auth, appointsController.updateAppointments);

//////////////    INIALIZACIÓN DE LA CONEXIÓN CON LA BASE DE DATOS
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
