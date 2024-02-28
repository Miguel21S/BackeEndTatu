
import express, { Application } from 'express';
import 'dotenv/config';
import * as controllers from './controllers/controllers';
import * as userControll from './controllers/userController';
import { AppDataSource } from './database/db';
import { registro } from './controllers/authController';

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
app.get('/api/profile/roles/users', controllers.getRoles);
app.post('/api/roles/users', controllers.crearRoles);

//URL DE LA CLASE authController
app.post('/api/roles/registro', registro)

//URL DE LA CLASE userController
app.get('/api/users', userControll.getUser);
app.put('/api/users/profile/:id', userControll.updateUser);
app.delete('/api/users/:id', userControll.deleteRoles);

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
