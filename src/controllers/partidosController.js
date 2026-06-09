import pool from '../config/db.js';

export const getPartidos = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT p.id, p.grupo, p.jugado,
      e1.nombre AS local, e2.nombre AS visitante,
      p.goles_local, p.goles_visitante
    FROM partidos p
    JOIN equipos e1 ON p.equipo_local_id = e1.id
    JOIN equipos e2 ON p.equipo_visitante_id = e2.id
    ORDER BY p.grupo
  `);
  res.json(rows);
};

export const getPartidosByGrupo = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT p.id, p.grupo, p.jugado,
      e1.nombre AS local, e2.nombre AS visitante,
      p.goles_local, p.goles_visitante
    FROM partidos p
    JOIN equipos e1 ON p.equipo_local_id = e1.id
    JOIN equipos e2 ON p.equipo_visitante_id = e2.id
    WHERE p.grupo = ?
    ORDER BY p.id
  `, [req.params.grupo.toUpperCase()]);
  res.json(rows);
};