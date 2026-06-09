import { simularFaseGrupos } from '../services/simulacion.js';

export const simular = async (req, res) => {
  try {
    const resultado = await simularFaseGrupos();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};