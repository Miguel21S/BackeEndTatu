
import express, { Application } from 'express';
import 'dotenv/config';
import * as controllers from './controllers/controllers';

const app: Application = express();
const PORT = process.env.PORT || 9998;
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Hello World!'
    });
});

app.get('/api/roles', controllers.getRoles);
app.post('/api/roles', controllers.crearRoles);
app.put('/api/roles', controllers.updateRoles);
app.delete('/api/roles', controllers.deleteRoles);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});