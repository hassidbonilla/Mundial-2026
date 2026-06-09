import express from 'express';
import { simular } from '../controllers/simulacionController.js';

const router = express.Router();

router.post('/', simular);

export default router;