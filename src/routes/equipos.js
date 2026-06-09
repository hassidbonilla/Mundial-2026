import express from 'express';
import { getEquipos, getEquipoById, createEquipo, updateEquipo, deleteEquipo } from '../controllers/equiposController.js';

const router = express.Router();

router.get('/', getEquipos);
router.get('/:id', getEquipoById);
router.post('/', createEquipo);
router.put('/:id', updateEquipo);
router.delete('/:id', deleteEquipo);

export default router;