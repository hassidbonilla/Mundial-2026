import { calcularClasificacion } from '../services/clasificacion.js';

export const getClasificacion = async (req, res) => {
  try {
    const grupo = req.params.grupo.toUpperCase();
    const tabla = await calcularClasificacion(grupo);
    res.json({ grupo, tabla });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};