// ============================================================
//  CLASSIFICAÇÃO & CHAVEAMENTO AUTOMÁTICO
//  Critérios FIFA 2026 (ordem oficial)
// ============================================================

const Classificacao = (() => {

  function calcStats(gi) {
    const grupo = GRUPOS[gi];
    const stats = grupo.times.map((_, i) => ({
      idx: i, j: 0, v: 0, e: 0, d: 0, gm: 0, gc: 0, sg: 0, pts: 0,
      cd_pts: {}, cd_sg: {}, cd_gm: {},
    }));
    const resultados = Storage.getResultados();

    grupo.jogos.forEach((jogo, ji) => {
      const key = `g${gi}_j${ji}`;
      const r = resultados[key];
      if (r == null || r.g1 === '' || r.g2 === '' || r.g1 == null) return;
      const g1 = parseInt(r.g1), g2 = parseInt(r.g2);
      if (isNaN(g1) || isNaN(g2)) return;
      const t1 = jogo.t1, t2 = jogo.t2;

      stats[t1].j++; stats[t2].j++;
      stats[t1].gm += g1; stats[t1].gc += g2;
      stats[t2].gm += g2; stats[t2].gc += g1;
      stats[t1].sg = stats[t1].gm - stats[t1].gc;
      stats[t2].sg = stats[t2].gm - stats[t2].gc;

      if (g1 > g2) {
        stats[t1].v++; stats[t1].pts += 3; stats[t2].d++;
      } else if (g1 < g2) {
        stats[t2].v++; stats[t2].pts += 3; stats[t1].d++;
      } else {
        stats[t1].e++; stats[t1].pts++;
        stats[t2].e++; stats[t2].pts++;
      }

      // Confronto direto
      [t1, t2].forEach(t => {
        const opp = t === t1 ? t2 : t1;
        if (stats[t].cd_pts[opp] == null) stats[t].cd_pts[opp] = 0;
        if (stats[t].cd_sg[opp]  == null) stats[t].cd_sg[opp]  = 0;
        if (stats[t].cd_gm[opp]  == null) stats[t].cd_gm[opp]  = 0;
      });
      if (g1 > g2)      { stats[t1].cd_pts[t2] += 3; }
      else if (g2 > g1) { stats[t2].cd_pts[t1] += 3; }
      else              { stats[t1].cd_pts[t2] += 1; stats[t2].cd_pts[t1] += 1; }
      stats[t1].cd_sg[t2] += (g1 - g2);
      stats[t2].cd_sg[t1] += (g2 - g1);
      stats[t1].cd_gm[t2] += g1;
      stats[t2].cd_gm[t1] += g2;
    });

    return [...stats].sort((a, b) => compararTimes(a, b));
  }

  function compararTimes(a, b) {
    if (b.pts !== a.pts) return b.pts - a.pts;
    // Confronto direto
    const cdPtsA = a.cd_pts[b.idx] ?? 0;
    const cdPtsB = b.cd_pts[a.idx] ?? 0;
    if (cdPtsB !== cdPtsA) return cdPtsB - cdPtsA;
    const cdSgA = a.cd_sg[b.idx] ?? 0;
    const cdSgB = b.cd_sg[a.idx] ?? 0;
    if (cdSgB !== cdSgA) return cdSgB - cdSgA;
    const cdGmA = a.cd_gm[b.idx] ?? 0;
    const cdGmB = b.cd_gm[a.idx] ?? 0;
    if (cdGmB !== cdGmA) return cdGmB - cdGmA;
    // Geral
    if (b.sg !== a.sg) return b.sg - a.sg;
    if (b.gm !== a.gm) return b.gm - a.gm;
    return 0;
  }

  function getClassificado(grupLetra, pos) {
    const gi = GRUPOS.findIndex(g => g.letra === grupLetra);
    if (gi < 0) return null;
    const ranking = calcStats(gi);
    const t = GRUPOS[gi].times[ranking[pos - 1]?.idx];
    return t || null;
  }

  function getMelhoresTerceiros() {
    const terceiros = GRUPOS.map((g, gi) => {
      const ranking = calcStats(gi);
      const tIdx = ranking[2]?.idx;
      if (tIdx == null) return null;
      const s = ranking[2];
      return { grupo: g.letra, time: g.times[tIdx], ...s };
    }).filter(Boolean);
    terceiros.sort((a, b) =>
      b.pts - a.pts || b.sg - a.sg || b.gm - a.gm
    );
    return terceiros.slice(0, 8);
  }

  function getClassificados32() {
    const result = {};
    GRUPOS.forEach(g => {
      result[`1${g.letra}`] = getClassificado(g.letra, 1);
      result[`2${g.letra}`] = getClassificado(g.letra, 2);
    });
    const melhores3 = getMelhoresTerceiros();
    melhores3.forEach((t, i) => { result[`T${i + 1}`] = t.time; });
    return result;
  }

  // ============================================================
  //  STATUS MATEMÁTICO
  // ============================================================
function getStatusMatematico(gi) {
  const grupo = GRUPOS[gi];
  const resultados = Storage.getResultados();
  const stats = calcStats(gi);

  const jogosRestantes = grupo.times.map(() => 0);
  grupo.jogos.forEach((jogo, ji) => {
    const key = `g${gi}_j${ji}`;
    const r = resultados[key];
    const jogado = r?.g1 != null && r?.g2 != null &&
                   r.g1 !== '' && r.g2 !== '';
    if (!jogado) {
      jogosRestantes[jogo.t1]++;
      jogosRestantes[jogo.t2]++;
    }
  });

  const grupoFechado = jogosRestantes.every(j => j === 0);

  const classificados1 = new Set();
  const classificados2 = new Set();
  const classificados3 = new Set();
  const eliminados      = new Set();

  if (grupoFechado) {
    // Grupo fechado: posições definitivas
    stats.forEach((s, pos) => {
      const ti = s.idx;
      if (pos === 0) classificados1.add(ti);
      if (pos === 1) classificados2.add(ti);
      if (pos === 2) classificados3.add(ti);
      if (pos >= 2)  eliminados.add(ti);
    });
    return { classificados1, classificados2, classificados3, eliminados, grupoFechado };
  }

  // ── GRUPO ABERTO ──
  stats.forEach((s, pos) => {
    const ti     = s.idx;
    const maxPts = s.pts + jogosRestantes[ti] * 3;
    const ptsDo2 = stats[1]?.pts ?? 0;
    const ptsDo3 = stats[2]?.pts ?? 0;

    // ── 1º GARANTIDO ──
    // Ninguém pode ter MAIS pontos que o líder
    if (pos === 0) {
      const alguemSupera = stats.slice(1).some(outro =>
        (outro.pts + jogosRestantes[outro.idx] * 3) > s.pts
      );
      if (!alguemSupera) classificados1.add(ti);
    }

    // ── ELIMINADO ──
    // Antes da 3ª rodada, só marca ✗ se não pode mais chegar nem ao 3º lugar
    // (porque o 3º pode se classificar como melhor 3º entre os grupos)
    if (pos >= 3) {
      // 4º lugar: verifica se pode alcançar o 3º em pontos
      if (maxPts < ptsDo3) {
        // Não alcança nem o 3º em pontos → eliminado de qualquer classificação
        eliminados.add(ti);
      } else if (maxPts === ptsDo3) {
        // Empata em pontos com o 3º atual, mas já perdeu o confronto direto
        const cdPts4vs3 = s.cd_pts[stats[2].idx] ?? 0;
        const cdPts3vs4 = stats[2].cd_pts[ti] ?? 0;
        if (cdPts4vs3 < cdPts3vs4) {
          // Perdeu o confronto direto e não tem mais jogos entre eles
          const jogoEntreElesRestante = grupo.jogos.some((jogo, ji) => {
            const r = resultados[`g${gi}_j${ji}`];
            const jogado = r?.g1 != null && r?.g2 != null && r.g1 !== '' && r.g2 !== '';
            return !jogado && (
              (jogo.t1 === ti && jogo.t2 === stats[2].idx) ||
              (jogo.t2 === ti && jogo.t1 === stats[2].idx)
            );
          });
          if (!jogoEntreElesRestante) eliminados.add(ti);
        }
      }
    }

    // 3º lugar: verifica se pode alcançar o 2º em pontos
    // Mas NUNCA elimina o 3º antes do grupo fechar
    // (porque pode ser melhor 3º entre todos os grupos)
    if (pos === 2) {
      // Só elimina do top 2 se não alcança matematicamente
      // Mas não marca como ✗ — apenas deixa sem cor de classificado
      // O ✗ para o 3º só vem quando o grupo fecha
    }

    // Caso especial: 4º que empataria em pontos com o 2º mas
    // já perdeu o confronto direto e não tem mais esse jogo pela frente
    if (pos === 3) {
      if (maxPts === ptsDo2 && !eliminados.has(ti)) {
        const cdPts4vs2 = s.cd_pts[stats[1].idx] ?? 0;
        const cdPts2vs4 = stats[1].cd_pts[ti] ?? 0;
        if (cdPts4vs2 < cdPts2vs4) {
          const jogoEntreElesRestante = grupo.jogos.some((jogo, ji) => {
            const r = resultados[`g${gi}_j${ji}`];
            const jogado = r?.g1 != null && r?.g2 != null && r.g1 !== '' && r.g2 !== '';
            return !jogado && (
              (jogo.t1 === ti && jogo.t2 === stats[1].idx) ||
              (jogo.t2 === ti && jogo.t1 === stats[1].idx)
            );
          });
          if (!jogoEntreElesRestante) eliminados.add(ti);
        }
      }
    }
  });

  return { classificados1, classificados2, classificados3, eliminados, grupoFechado };
}

  return {
    calcStats,
    compararTimes,
    getClassificado,
    getMelhoresTerceiros,
    getClassificados32,
    getStatusMatematico,
  };

})();