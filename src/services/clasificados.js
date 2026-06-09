import pool from '../config/db.js';
import { calcularClasificacion } from './clasificacion.js';

export const getClasificados = async () => {
  const grupos = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  
  const primeros = [];
  const segundos = [];
  const terceros = [];

  for (const grupo of grupos) {
    const tabla = await calcularClasificacion(grupo);
    if (tabla.length >= 1) primeros.push({ ...tabla[0], grupo });
    if (tabla.length >= 2) segundos.push({ ...tabla[1], grupo });
    if (tabla.length >= 3) terceros.push({ ...tabla[2], grupo });
  }

  // Ordenar terceros y tomar los 8 mejores
  terceros.sort((a, b) => b.Pts - a.Pts || b.DG - a.DG || b.GF - a.GF);
  const mejoresTerceros = terceros.slice(0, 8);

  return {
    primeros,
    segundos,
    mejoresTerceros,
    total_clasificados: primeros.length + segundos.length + mejoresTerceros.length
  };
};