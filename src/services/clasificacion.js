import pool from '../config/db.js';

export const calcularClasificacion = async (grupo) => {
  const [equipos] = await pool.query(
    'SELECT * FROM equipos WHERE grupo = ?', [grupo]
  );

  const [partidos] = await pool.query(
    'SELECT * FROM partidos WHERE grupo = ? AND jugado = TRUE', [grupo]
  );

  const tabla = equipos.map(equipo => ({
    id: equipo.id,
    nombre: equipo.nombre,
    bandera: equipo.bandera,
    PJ: 0, PG: 0, PE: 0, PP: 0,
    GF: 0, GC: 0, DG: 0, Pts: 0
  }));

  for (const partido of partidos) {
    const local = tabla.find(e => e.id === partido.equipo_local_id);
    const visitante = tabla.find(e => e.id === partido.equipo_visitante_id);

    if (!local || !visitante) continue;

    local.PJ++; visitante.PJ++;
    local.GF += partido.goles_local;
    local.GC += partido.goles_visitante;
    visitante.GF += partido.goles_visitante;
    visitante.GC += partido.goles_local;

    if (partido.goles_local > partido.goles_visitante) {
      local.PG++; local.Pts += 3;
      visitante.PP++;
    } else if (partido.goles_local < partido.goles_visitante) {
      visitante.PG++; visitante.Pts += 3;
      local.PP++;
    } else {
      local.PE++; local.Pts++;
      visitante.PE++; visitante.Pts++;
    }
  }

  tabla.forEach(e => e.DG = e.GF - e.GC);

  tabla.sort((a, b) => b.Pts - a.Pts || b.DG - a.DG || b.GF - a.GF);

  return tabla;
};