import express from 'express';
import { getClasificadosRonda32 } from '../controllers/clasificadosController.js';

const router = express.Router();

router.get('/', getClasificadosRonda32);

export default router;