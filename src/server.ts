
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