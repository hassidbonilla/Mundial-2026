import express from 'express';
import { getPartidos, getPartidosByGrupo } from '../controllers/partidosController.js';

const router = express.Router();

router.get('/', getPartidos);
router.get('/grupo/:grupo', getPartidosByGrupo);

export default router;