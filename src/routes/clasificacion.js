import express from 'express';
import { getClasificacion } from '../controllers/clasificacionController.js';

const router = express.Router();

router.get('/:grupo', getClasificacion);

export default router;