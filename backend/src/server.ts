import express from 'express';
import cors from 'cors';
import artistasRoutes from './routes/artistasRoutes';

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/artistas', artistasRoutes);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost: ${puerto}`);
});