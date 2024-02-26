
import express, { Application } from 'express';
import 'dotenv/config';

const app: Application = express();
const PORT = process.env.PORT || 9998;
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Hello World!'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});