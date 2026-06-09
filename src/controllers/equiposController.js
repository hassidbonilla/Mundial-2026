import pool from '../config/db.js';

export const getEquipos = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM equipos ORDER BY grupo, nombre');
  res.json(rows);
};

export const getEquipoById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Equipo no encontrado' });
  res.json(rows[0]);
};

export const createEquipo = async (req, res) => {
  const { nombre, grupo, bandera } = req.body;
  const [result] = await pool.query(
    'INSERT INTO equipos (nombre, grupo, bandera) VALUES (?, ?, ?)',
    [nombre, grupo, bandera]
  );
  res.status(201).json({ id: result.insertId, nombre, grupo, bandera });
};

export const updateEquipo = async (req, res) => {
  const { nombre, grupo, bandera } = req.body;
  await pool.query(
    'UPDATE equipos SET nombre=?, grupo=?, bandera=? WHERE id=?',
    [nombre, grupo, bandera, req.params.id]
  );
  res.json({ mensaje: 'Equipo actualizado' });
};

export const deleteEquipo = async (req, res) => {
  await pool.query('DELETE FROM equipos WHERE id = ?', [req.params.id]);
  res.json({ mensaje: 'Equipo eliminado' });
};