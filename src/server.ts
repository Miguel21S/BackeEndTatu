
import express, { Application } from 'express';
import 'dotenv/config';
import * as controllers from './controllers/controllers';
import * as userControll from './controllers/userController';
import { AppDataSource } from './database/db';
import { login, registro } from './controllers/authController';

const app: Application = express();
const PORT = process.env.PORT || 9998;
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Hello World!'
    });
});

//URL DE LA CLASE Controller
app.get('/api/users/roles', controllers.getUser);
app.post('/api/roles/users', controllers.crearRoles);
app.get('/api/users/profile', controllers.getUserByEmail);
app.put('/api/users/:id', controllers.updateRoles);
app.delete('/api/users/:id', controllers.deleteUserById);

//URL DE LA CLASE authController
app.post('/api/roles/registro', registro)
app.post('/api/login', login);

//URL DE LA CLASE userController
app.put('/api/users/profile/:id', userControll.getupdateUser);

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
