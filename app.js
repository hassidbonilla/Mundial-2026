import express from 'express';
import dotenv from 'dotenv';
import equiposRouter from './src/routes/equipos.js';
import partidosRouter from './src/routes/partidos.js';
import simulacionRouter from './src/routes/simulacion.js';
import clasificacionRouter from './src/routes/clasificacion.js';
import clasificadosRouter from './src/routes/clasificados.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ mensaje: '⚽ API Mundial 2026 funcionando!' });
});

app.use('/equipos', equiposRouter);
app.use('/partidos', partidosRouter);
app.use('/simular', simulacionRouter);
app.use('/clasificacion', clasificacionRouter);
app.use('/clasificados', clasificadosRouter);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});