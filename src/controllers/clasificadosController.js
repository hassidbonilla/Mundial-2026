import { getClasificados } from '../services/clasificados.js';

export const getClasificadosRonda32 = async (req, res) => {
  try {
    const resultado = await getClasificados();
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};