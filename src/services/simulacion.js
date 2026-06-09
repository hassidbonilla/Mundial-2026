import pool from '../config/db.js';

export const simularFaseGrupos = async () => {
  const [partidos] = await pool.query(
    'SELECT * FROM partidos WHERE jugado = FALSE'
  );

  for (const partido of partidos) {
    const goles_local = Math.floor(Math.random() * 5);
    const goles_visitante = Math.floor(Math.random() * 5);

    await pool.query(
      'UPDATE partidos SET goles_local = ?, goles_visitante = ?, jugado = TRUE WHERE id = ?',
      [goles_local, goles_visitante, partido.id]
    );
  }

  return { mensaje: `✅ ${partidos.length} partidos simulados correctamente` };
};