// ============================================================
//  COPA 2026 — APP PRINCIPAL
// ============================================================

const CORES_GRUPOS = [
  '#66BB6A','#3949AB','#43A047','#3F51B5',
  '#4CAF50','#3F51B5','#66BB6A','#3949AB',
  '#43A047','#3F51B5','#4CAF50','#283593',
];

const CORES_MM = {
  '32avos':  ['#66BB6A','#3949AB','#43A047','#3F51B5','#4CAF50','#3F51B5','#66BB6A','#3949AB',
               '#43A047','#3F51B5','#4CAF50','#283593','#66BB6A','#3949AB','#43A047','#3F51B5'],
  'oitavas': ['#66BB6A','#3949AB','#43A047','#3F51B5','#4CAF50','#3949AB','#43A047','#3F51B5'],
  'quartas': ['#66BB6A','#3949AB','#43A047','#3F51B5'],
  'semis':   ['#66BB6A','#3949AB'],
  '3lugar':  ['#C9A800'],
  'final':   ['#C9A800'],
};

// ============================================================
//  BANDEIRINHAS
// ============================================================
function renderBandeirinhas() {
  const cores = ['#FFE866','#66BB6A','#3949AB'];
  const makeRow = id => {
    const el = document.getElementById(id);
    if (!el) return;
    let html = '';
    for (let i = 0; i < 60; i++) {
      html += `<span class="bandeirinha" style="background:${cores[i % cores.length]}"></span>`;
    }
    el.innerHTML = html;
  };
  makeRow('bandeirinhas-top');
  makeRow('bandeirinhas-bot');
}

// ============================================================
//  TABS
// ============================================================
function mostrarTab(aba) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${aba}`)?.classList.add('active');
  document.querySelector(`.tab-btn[data-tab="${aba}"]`)?.classList.add('active');
  Storage.setAbaAtiva(aba);
  if (aba === 'chaveamento') renderChaveamento();
}

// ============================================================
//  RENDERIZAR GRUPOS
// ============================================================
function renderGrupos() {
  const container = document.getElementById('grupos-grid');
  if (!container) return;
  container.innerHTML = '';
  const resultados = Storage.getResultados();

  GRUPOS.forEach((grupo, gi) => {
    const cor = CORES_GRUPOS[gi];
    const card = document.createElement('div');
    card.className = 'grupo-card';
    card.id = `grupo-card-${gi}`;

    const flags = grupo.times.map(t =>
      `<span title="${t.nome}">${t.flag}</span>`
    ).join('');

    card.innerHTML = `
      <div class="grupo-header" style="background:${cor}">
        <span class="grupo-letra-badge">G${grupo.letra}</span>
        <span class="grupo-titulo-txt">GRUPO ${grupo.letra}</span>
        <div class="grupo-flags">${flags}</div>
        <button class="btn-limpar-grupo" onclick="limparGrupo(${gi})" title="Limpar Placar - grupo ${grupo.letra}">✕</button>
      </div>`;

    let jogosHtml = `<table class="jogos-table">`;
    grupo.jogos.forEach((jogo, ji) => {
      const key = `g${gi}_j${ji}`;
      const r = resultados[key];
      const v1 = r?.g1 ?? '';
      const v2 = r?.g2 ?? '';
      const t1 = grupo.times[jogo.t1];
      const t2 = grupo.times[jogo.t2];
      jogosHtml += `
        <tr>
          <td class="placar-cell" colspan="3">
            <div class="jogo-meta">${jogo.data} · ${jogo.hora} · ${jogo.local}</div>
            <div class="jogo-linha">
              <span class="jogo-time right">
                <span class="nome-time" title="${t1.nome}">${t1.nome}</span>
                ${t1.flag}
              </span>
              <div class="placar-wrap">
                <input type="number" min="0" max="99" class="placar-campo"
                  id="g${gi}_j${ji}_1" value="${v1}"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,2);onPlacarChange(${gi},${ji})">
                <span class="placar-vs">×</span>
                <input type="number" min="0" max="99" class="placar-campo"
                  id="g${gi}_j${ji}_2" value="${v2}"
                  oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,2);onPlacarChange(${gi},${ji})">
              </div>
              <span class="jogo-time left">
                ${t2.flag}
                <span class="nome-time" title="${t2.nome}">${t2.nome}</span>
              </span>
              <button class="btn-limpar-jogo-grupo"
                onclick="limparJogoGrupo(${gi},${ji})"
                title="Limpar Placar">✕</button>
            </div>
          </td>
        </tr>`;
    });
    jogosHtml += `</table>`;
    card.innerHTML += jogosHtml;

    const classifHtml = `
      <div class="classif-wrap" style="border-color:${cor}">
        <div class="classif-head" style="background:${cor}">
          <span>#</span>
          <span>Seleção</span>
          <span>J</span>
          <span>V</span>
          <span>E</span>
          <span>D</span>
          <span>SG</span>
          <span>PTS</span>
        </div>
        <div id="classif-rows-${gi}">
          ${grupo.times.map((t, ti) => `
            <div class="classif-row-item" id="classif-${gi}-${ti}">
              <span class="c-pos"  id="cpos-${gi}-${ti}">${ti+1}</span>
              <span class="c-nome">${t.flag} ${t.nome}</span>
              <span class="c-num"  id="cj-${gi}-${ti}">0</span>
              <span class="c-num"  id="cv-${gi}-${ti}">0</span>
              <span class="c-num"  id="ce-${gi}-${ti}">0</span>
              <span class="c-num"  id="cd-${gi}-${ti}">0</span>
              <span class="c-num"  id="csg-${gi}-${ti}">0</span>
              <span class="c-pts"  id="cpts-${gi}-${ti}">0</span>
            </div>`).join('')}
        </div>
      </div>`;
    card.innerHTML += classifHtml;

    container.appendChild(card);
    atualizarClassif(gi);
  });
}

// ============================================================
//  PLACAR CHANGE
// ============================================================
function onPlacarChange(gi, ji) {
  const v1 = document.getElementById(`g${gi}_j${ji}_1`)?.value;
  const v2 = document.getElementById(`g${gi}_j${ji}_2`)?.value;
  const key = `g${gi}_j${ji}`;

  if (v1 !== '' && v2 !== '') {
    Storage.setResultado(key, v1, v2);
    atualizarClassif(gi);
    rodarChaveamentoCompleto();
  } else {
    Storage.setResultado(key, v1 === '' ? null : v1, v2 === '' ? null : v2);
    atualizarClassif(gi);
  }
}

// ============================================================
//  ATUALIZAR CLASSIFICAÇÃO
// ============================================================
function atualizarClassif(gi) {
  const ranking = Classificacao.calcStats(gi);
  const { classificados1, classificados2, classificados3, eliminados, grupoFechado } =
    Classificacao.getStatusMatematico(gi);
  const rows = document.getElementById(`classif-rows-${gi}`);
  if (!rows) return;

  ranking.forEach((s, pos) => {
    const ti   = s.idx;
    const row  = document.getElementById(`classif-${gi}-${ti}`);
    const cpos = document.getElementById(`cpos-${gi}-${ti}`);
    if (!row || !cpos) return;

    cpos.textContent = pos + 1;
    document.getElementById(`cj-${gi}-${ti}`).textContent   = s.j;
    document.getElementById(`cv-${gi}-${ti}`).textContent   = s.v;
    document.getElementById(`ce-${gi}-${ti}`).textContent   = s.e;
    document.getElementById(`cd-${gi}-${ti}`).textContent   = s.d;
    document.getElementById(`csg-${gi}-${ti}`).textContent  = s.sg > 0 ? `+${s.sg}` : s.sg;
    document.getElementById(`cpts-${gi}-${ti}`).textContent = s.pts;
    row.style.order = pos;

    if (classificados1.has(ti)) {
      row.className = 'classif-row-item status-1';
      cpos.innerHTML = `${pos+1}<span class="status-badge badge-1"> ✓</span>`;
    } else if (classificados2.has(ti)) {
      row.className = 'classif-row-item status-2';
      cpos.innerHTML = `${pos+1}<span class="status-badge badge-2"> ✓</span>`;
    } else if (classificados3.has(ti)) {
      row.className = 'classif-row-item status-3';
      cpos.innerHTML = `${pos+1}<span class="status-badge badge-3"> ~</span>`;
    } else if (eliminados.has(ti)) {
      row.className = 'classif-row-item status-elim';
      cpos.innerHTML = `${pos+1}<span class="status-badge badge-elim"> ✗</span>`;
    } else {
      if (pos === 0)      { row.className = 'classif-row-item pos-1'; cpos.textContent = pos + 1; }
      else if (pos === 1) { row.className = 'classif-row-item pos-2'; cpos.textContent = pos + 1; }
      else if (pos === 2) { row.className = 'classif-row-item pos-3'; cpos.textContent = pos + 1; }
      else                { row.className = 'classif-row-item pos-4'; cpos.textContent = pos + 1; }
    }

    rows.style.display = 'flex';
    rows.style.flexDirection = 'column';
  });
}

// ============================================================
//  CONFIRMAR LIMPAR FASE
// ============================================================
function confirmarLimparFase(tipo) {
  const modal = document.getElementById('modal-limpar-fase');
  const txt   = document.getElementById('modal-limpar-fase-txt');
  const btn   = document.getElementById('modal-limpar-fase-btn');
  if (!modal || !txt || !btn) return;

  if (tipo === 'grupos') {
    txt.textContent = 'Apagar todos os resultados da fase de grupos? Os dados do mata-mata serão mantidos.';
    btn.onclick = () => { fecharModal('modal-limpar-fase'); limparFaseGrupos(); };
  } else if (tipo === 'matamata') {
    txt.textContent = 'Apagar todos os resultados da fase eliminatória? Os dados da fase de grupos serão mantidos.';
    btn.onclick = () => { fecharModal('modal-limpar-fase'); limparFaseMataMata(); };
  }
  modal.classList.remove('hidden');
}

function confirmarLimparRodada(prefixo, dados) {
  const modal = document.getElementById('modal-limpar-fase');
  const txt   = document.getElementById('modal-limpar-fase-txt');
  const btn   = document.getElementById('modal-limpar-fase-btn');
  if (!modal || !txt || !btn) return;

  const nomes = {
    '32avos':  'Décimo-Sextos de Final',
    'oitavas': 'Oitavas de Final',
    'quartas': 'Quartas de Final',
    'semis':   'Semifinais',
  };
  txt.textContent = `Apagar todos os resultados dos ${nomes[prefixo] || prefixo}?`;
  btn.onclick = () => { fecharModal('modal-limpar-fase'); limparRodadaMM(prefixo, dados); };
  modal.classList.remove('hidden');
}

// ============================================================
//  LIMPAR / ATUALIZAR POR FASE
// ============================================================
function limparFaseGrupos() {
  Storage.importState({ resultados: {} });
  renderGrupos();
  rodarChaveamentoCompleto();
  toast('🗑️ Todos os jogos da fase de grupos foram limpos!');
}

function atualizarFaseGrupos() {
  rodarChaveamentoCompleto();
  renderGrupos();
  toast('↺ Fase de grupos atualizada!');
}

function limparGrupo(gi) {
  const grupo = GRUPOS[gi];
  grupo.jogos.forEach((_, ji) => {
    Storage.setResultado(`g${gi}_j${ji}`, null, null);
  });
  atualizarClassif(gi);
  rodarChaveamentoCompleto();
  renderGrupos();
  toast(`🗑️ Grupo ${grupo.letra} limpo!`);
}

function limparFaseMataMata() {
  Storage.setMataMataCompleto({});
  renderMataMata();
  rodarChaveamentoCompleto();
  atualizarCampeaoEPodio();
  toast('🗑️ Toda a fase eliminatória foi limpa!');
}

function atualizarFaseMataMata() {
  rodarChaveamentoCompleto();
  propagarVencedoresMM();
  atualizarCampeaoEPodio();
  toast('↺ Fase eliminatória atualizada!');
}

function limparRodadaMM(prefixo, dados) {
  const mm = Storage.getMataMata();
  dados.forEach((_, i) => {
    const key = `${prefixo}_${i}`;
    if (mm[key]) mm[key] = { autoFilled1: false, autoFilled2: false };
  });
  Storage.setMataMataCompleto(mm);
  renderMataMata();
  rodarChaveamentoCompleto();
  propagarVencedoresMM();
  atualizarCampeaoEPodio();
  toast('🗑️ Rodada limpa!');
}

function atualizarRodadaMM(prefixo, dados) {
  const mm = Storage.getMataMata();
  dados.forEach((_, i) => {
    const key = `${prefixo}_${i}`;
    if (!mm[key]) mm[key] = {};
    mm[key].autoFilled1 = false;
    mm[key].autoFilled2 = false;
    mm[key].t1 = '';
    mm[key].t2 = '';
  });
  Storage.setMataMataCompleto(mm);
  renderMataMata();
  rodarChaveamentoCompleto();
  propagarVencedoresMM();
  atualizarCampeaoEPodio();
  toast('↺ Rodada atualizada!');
}

function limparJogoGrupo(gi, ji) {
  Storage.setResultado(`g${gi}_j${ji}`, null, null);
  const v1 = document.getElementById(`g${gi}_j${ji}_1`);
  const v2 = document.getElementById(`g${gi}_j${ji}_2`);
  if (v1) v1.value = '';
  if (v2) v2.value = '';
  atualizarClassif(gi);
  rodarChaveamentoCompleto();
  toast('🗑️ Resultado removido!');
}

// ============================================================
//  MATA-MATA — CRIAR CARD
// ============================================================
function dropdownTimes(id, valor, placeholder, onchange) {
  const opts = TODOS_TIMES.map(t =>
    `<option value="${t.nome}" ${t.nome === valor ? 'selected' : ''}>${t.nome}</option>`
  ).join('');
  return `
    <select class="mm-select" id="${id}" onchange="${onchange}">
      <option value="">${placeholder}</option>
      ${opts}
    </select>`;
}

function criarCardMM(key, cfg, cor) {
  const mm = Storage.getMataMata();
  const saved = mm[key] || {};
  return `
    <div class="mm-jogo" id="mm-jogo-${key}">
      <div class="mm-jogo-header" style="background:${cor}">
        <span class="mm-jogo-num">JOGO ${cfg.jogo}</span>
        <span class="mm-data">${cfg.data} · ${cfg.hora} · ${cfg.local}</span>
        <div class="mm-header-btns">
          <button class="btn-refresh-jogo" onclick="refreshJogoMM('${key}')" title="Atualizar Jogo">↺</button>
          <button class="btn-limpar-jogo" onclick="limparJogoMM('${key}')" title="Limpar Placar">✕</button>
        </div>
      </div>
      <div class="mm-time-row">
        <span class="mm-flag-emoji" id="mm-flag1-${key}">🏳️</span>
        ${dropdownTimes(`mm-t1-${key}`, saved.t1 || '', cfg.vaga1, `onMMSelectChange('${key}')`)}
        <input type="number" class="mm-placar"
          id="mm-g1-${key}" min="0" max="9" maxlength="1"
          value="${saved.g1 ?? ''}" placeholder="–"
          oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,2);onMMChange('${key}')">
      </div>
      <div class="mm-time-row">
        <span class="mm-flag-emoji" id="mm-flag2-${key}">🏳️</span>
        ${dropdownTimes(`mm-t2-${key}`, saved.t2 || '', cfg.vaga2, `onMMSelectChange('${key}')`)}
        <input type="number" class="mm-placar"
          id="mm-g2-${key}" min="0" max="9" maxlength="1"
          value="${saved.g2 ?? ''}" placeholder="–"
          oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,2);onMMChange('${key}')">
      </div>
      <div class="mm-pen-row">
        <span class="mm-pen-time" id="mm-pen-nome1-${key}">${saved.t1 || '–'}</span>
        <input type="number" class="mm-pen-input" id="mm-p1-${key}" min="0" max="20"
          value="${saved.p1 ?? ''}" placeholder="–"
          oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,2);onMMChange('${key}')">
        <span class="mm-pen-label">pên</span>
        <span class="mm-pen-x">×</span>
        <span class="mm-pen-label">pên</span>
        <input type="number" class="mm-pen-input" id="mm-p2-${key}" min="0" max="20"
          value="${saved.p2 ?? ''}" placeholder="–"
          oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,2);onMMChange('${key}')">
        <span class="mm-pen-time" id="mm-pen-nome2-${key}">${saved.t2 || '–'}</span>
      </div>
    </div>`;
}

function refreshJogoMM(key) {
  const mm = Storage.getMataMata();
  if (!mm[key]) return;
  mm[key].autoFilled1 = false;
  mm[key].autoFilled2 = false;
  mm[key].t1 = '';
  mm[key].t2 = '';
  Storage.setMataMataCompleto(mm);

  const t1El = document.getElementById(`mm-t1-${key}`);
  const t2El = document.getElementById(`mm-t2-${key}`);
  const f1El = document.getElementById(`mm-flag1-${key}`);
  const f2El = document.getElementById(`mm-flag2-${key}`);
  if (t1El) { t1El.value = ''; t1El.classList.remove('auto-filled'); }
  if (t2El) { t2El.value = ''; t2El.classList.remove('auto-filled'); }
  if (f1El) f1El.innerHTML = '🏳️';
  if (f2El) f2El.innerHTML = '🏳️';

  rodarChaveamentoCompleto();
  propagarVencedoresMM();
  atualizarCampeaoEPodio();
  toast('↺ Jogo atualizado!');
}

function limparJogoMM(key) {
  const mm = Storage.getMataMata();
  mm[key] = { autoFilled1: false, autoFilled2: false };
  Storage.setMataMataCompleto(mm);

  const els = {
    t1: document.getElementById(`mm-t1-${key}`),
    t2: document.getElementById(`mm-t2-${key}`),
    g1: document.getElementById(`mm-g1-${key}`),
    g2: document.getElementById(`mm-g2-${key}`),
    p1: document.getElementById(`mm-p1-${key}`),
    p2: document.getElementById(`mm-p2-${key}`),
    f1: document.getElementById(`mm-flag1-${key}`),
    f2: document.getElementById(`mm-flag2-${key}`),
    n1: document.getElementById(`mm-pen-nome1-${key}`),
    n2: document.getElementById(`mm-pen-nome2-${key}`),
  };

  if (els.t1) { els.t1.value = ''; els.t1.classList.remove('auto-filled'); }
  if (els.t2) { els.t2.value = ''; els.t2.classList.remove('auto-filled'); }
  if (els.g1) els.g1.value = '';
  if (els.g2) els.g2.value = '';
  if (els.p1) els.p1.value = '';
  if (els.p2) els.p2.value = '';
  if (els.f1) els.f1.innerHTML = '🏳️';
  if (els.f2) els.f2.innerHTML = '🏳️';
  if (els.n1) els.n1.textContent = '–';
  if (els.n2) els.n2.textContent = '–';

  rodarChaveamentoCompleto();
  propagarVencedoresMM();
  atualizarCampeaoEPodio();
  toast('🧹 Jogo limpo!');
}

function renderMataMata() {
  const fases = [
    { id: 'mm-32avos',  dados: FASE_16_AVOS,     prefixo: '32avos'  },
    { id: 'mm-oitavas', dados: OITAVAS_DE_FINAL,  prefixo: 'oitavas' },
    { id: 'mm-quartas', dados: QUARTAS_DE_FINAL,  prefixo: 'quartas' },
    { id: 'mm-semis',   dados: SEMIFINAIS,         prefixo: 'semis'   },
    { id: 'mm-3lugar',  dados: TERCEIRO_LUGAR,     prefixo: '3lugar'  },
    { id: 'mm-final',   dados: FINAL,              prefixo: 'final'   },
  ];

  fases.forEach(({ id, dados, prefixo }) => {
    const container = document.getElementById(id);
    if (!container) return;
    container.innerHTML = dados.map((cfg, i) => {
      const key = `${prefixo}_${i}`;
      const cor = CORES_MM[prefixo]?.[i] || '#3949AB';
      return criarCardMM(key, cfg, cor);
    }).join('');
  });

  const mm = Storage.getMataMata();
  Object.keys(mm).forEach(key => {
    const saved = mm[key];
    if (saved.t1 || saved.t2) atualizarFlagMM(key, saved.t1 || '', saved.t2 || '');
  });
}

function onMMSelectChange(key) {
  const t1El = document.getElementById(`mm-t1-${key}`);
  const t2El = document.getElementById(`mm-t2-${key}`);
  const t1 = t1El?.value || '';
  const t2 = t2El?.value || '';

  const mm = Storage.getMataMata();
  if (!mm[key]) mm[key] = {};

  if (!t1) { mm[key].t1 = ''; mm[key].autoFilled1 = false; }
  if (!t2) { mm[key].t2 = ''; mm[key].autoFilled2 = false; }
  if (t1 && t1El?.tagName === 'SELECT') mm[key].autoFilled1 = false;
  if (t2 && t2El?.tagName === 'SELECT') mm[key].autoFilled2 = false;

  Storage.setMataMataCompleto(mm);
  onMMChange(key);

  if (!t1 || !t2) rodarChaveamentoCompleto();
}

function onMMChange(key) {
  const t1 = document.getElementById(`mm-t1-${key}`)?.value || '';
  const t2 = document.getElementById(`mm-t2-${key}`)?.value || '';
  const g1 = document.getElementById(`mm-g1-${key}`)?.value;
  const g2 = document.getElementById(`mm-g2-${key}`)?.value;
  const p1 = document.getElementById(`mm-p1-${key}`)?.value;
  const p2 = document.getElementById(`mm-p2-${key}`)?.value;

  Storage.setMataMata(key, {
    t1, t2, g1, g2, p1, p2,
    autoFilled1: Storage.getMataMata()[key]?.autoFilled1 ?? false,
    autoFilled2: Storage.getMataMata()[key]?.autoFilled2 ?? false,
  });

  atualizarFlagMM(key, t1, t2);

  const n1 = document.getElementById(`mm-pen-nome1-${key}`);
  const n2 = document.getElementById(`mm-pen-nome2-${key}`);
  if (n1) n1.textContent = t1 || '–';
  if (n2) n2.textContent = t2 || '–';

  propagarVencedoresMM();
  atualizarCampeaoEPodio();
}

// ============================================================
//  FLAGS
// ============================================================
function getFlagByName(nome) {
  if (!nome) return '🏳️';
  const norm = s => s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
  const n = norm(nome);
  for (const g of GRUPOS) {
    for (const t of g.times) {
      if (norm(t.nome) === n) return t.flag;
    }
  }
  if (n.length >= 5) {
    for (const g of GRUPOS) {
      for (const t of g.times) {
        const tn = norm(t.nome);
        if (tn.startsWith(n) || n.startsWith(tn)) return t.flag;
      }
    }
  }
  return '🏳️';
}

function atualizarFlagMM(key, t1, t2) {
  const f1 = document.getElementById(`mm-flag1-${key}`);
  const f2 = document.getElementById(`mm-flag2-${key}`);
  if (f1) f1.innerHTML = getFlagByName(t1);
  if (f2) f2.innerHTML = getFlagByName(t2);
}

// ============================================================
//  CHAVEAMENTO COMPLETO — TABELA_495 (Anexo C oficial FIFA)
// ============================================================
function rodarChaveamentoCompleto() {
  const mm = Storage.getMataMata();
  const resultados = Storage.getResultados();
  const classificados = {};

  GRUPOS.forEach((grupo, gi) => {
    const { classificados1, classificados2 } = Classificacao.getStatusMatematico(gi);
    const ranking = Classificacao.calcStats(gi);

    const todosJogados = grupo.jogos.every((_, ji) => {
      const r = resultados[`g${gi}_j${ji}`];
      return r?.g1 != null && r?.g2 != null && r.g1 !== '' && r.g2 !== '';
    });

    const primeiroIdx = ranking[0]?.idx;
    if (primeiroIdx != null) {
      const time = grupo.times[primeiroIdx];
      if (todosJogados || classificados1.has(primeiroIdx)) {
        classificados[`1${grupo.letra}`] = time;
      }
    }

    const segundoIdx = ranking[1]?.idx;
    if (segundoIdx != null) {
      const time = grupo.times[segundoIdx];
      if (todosJogados || classificados2.has(segundoIdx)) {
        classificados[`2${grupo.letra}`] = time;
      }
    }
  });

  // 3ºs colocados via TABELA_495 (Anexo C oficial FIFA)
  const melhores3 = Classificacao.getMelhoresTerceiros()
    .filter(t => {
      const gi = GRUPOS.findIndex(g => g.letra === t.grupo);
      return gi >= 0 && GRUPOS[gi].jogos.every((_, ji) => {
        const r = resultados[`g${gi}_j${ji}`];
        return r?.g1 != null && r?.g2 != null && r.g1 !== '' && r.g2 !== '';
      });
    });

  // Colunas do Anexo C (ordem oficial FIFA): [1A, 1B, 1D, 1E, 1G, 1I, 1K, 1L]
  // Índices em FASE_16_AVOS:                   6,  12,  8,   1,  9,   4,  14,  7
  const SLOTS_3 = [6, 12, 8, 1, 9, 4, 14, 7];
  const terceirosSlotTime = {};

  if (melhores3.length === 8) {
    const letrasClassificadas = melhores3.map(t => t.grupo).sort().join('');
    const entrada = TABELA_495.find(e => e.g === letrasClassificadas);
    if (entrada) {
      entrada.r.forEach((letraGrupo, i) => {
        const slotIdx = SLOTS_3[i];
        const terceiro = melhores3.find(t => t.grupo === letraGrupo);
        if (terceiro) terceirosSlotTime[slotIdx] = terceiro.time;
      });
    }
  }

  const todasFases = [
    { dados: FASE_16_AVOS,     prefixo: '32avos'  },
    { dados: OITAVAS_DE_FINAL, prefixo: 'oitavas' },
    { dados: QUARTAS_DE_FINAL, prefixo: 'quartas' },
    { dados: SEMIFINAIS,       prefixo: 'semis'   },
    { dados: TERCEIRO_LUGAR,   prefixo: '3lugar'  },
    { dados: FINAL,            prefixo: 'final'   },
  ];

  todasFases.forEach(({ dados, prefixo }) => {
    dados.forEach((cfg, i) => {
      const key = `${prefixo}_${i}`;
      if (!mm[key]) mm[key] = {};
      const saved = mm[key];

      ['vaga1', 'vaga2'].forEach((vaga, lado) => {
        const texto = cfg[vaga];
        const nomeKey = lado === 0 ? 't1' : 't2';
        const autoKey = lado === 0 ? 'autoFilled1' : 'autoFilled2';

        if (saved[nomeKey] && !saved[autoKey]) return;

        let time = null;

        if (/^[12][A-L]$/.test(texto)) {
          time = classificados[texto] || null;
        } else if (texto.startsWith('3') && prefixo === '32avos') {
          time = terceirosSlotTime[i] || null;
        }

        const campoEl = document.getElementById(`mm-t${lado+1}-${key}`);
        const flagEl  = document.getElementById(`mm-flag${lado+1}-${key}`);
        const penNome = document.getElementById(`mm-pen-nome${lado+1}-${key}`);

        if (time) {
          if (campoEl) { campoEl.value = time.nome; campoEl.classList.add('auto-filled'); }
          if (flagEl)  flagEl.innerHTML = time.flag;
          if (penNome) penNome.textContent = time.nome;
          mm[key][nomeKey] = time.nome;
          mm[key][autoKey] = true;
        } else if (saved[autoKey]) {
          if (campoEl) { campoEl.value = ''; campoEl.classList.remove('auto-filled'); }
          if (flagEl)  flagEl.innerHTML = '🏳️';
          if (penNome) penNome.textContent = '–';
          mm[key][nomeKey] = '';
          mm[key][autoKey] = false;
        }
      });
    });
  });

  Storage.setMataMataCompleto(mm);
  propagarVencedoresMM();
}

// ============================================================
//  PROPAGAR VENCEDORES
// ============================================================
function propagarVencedoresMM() {
  const jogoParaKey = {};
  [
    { dados: FASE_16_AVOS,     prefixo: '32avos'  },
    { dados: OITAVAS_DE_FINAL, prefixo: 'oitavas' },
    { dados: QUARTAS_DE_FINAL, prefixo: 'quartas' },
    { dados: SEMIFINAIS,       prefixo: 'semis'   },
    { dados: TERCEIRO_LUGAR,   prefixo: '3lugar'  },
    { dados: FINAL,            prefixo: 'final'   },
  ].forEach(({ dados, prefixo }) => {
    dados.forEach((cfg, i) => { jogoParaKey[cfg.jogo] = `${prefixo}_${i}`; });
  });

  const destinos = [
    { dados: OITAVAS_DE_FINAL, prefixo: 'oitavas' },
    { dados: QUARTAS_DE_FINAL, prefixo: 'quartas' },
    { dados: SEMIFINAIS,       prefixo: 'semis'   },
    { dados: TERCEIRO_LUGAR,   prefixo: '3lugar'  },
    { dados: FINAL,            prefixo: 'final'   },
  ];

  const mm = Storage.getMataMata();

  destinos.forEach(({ dados, prefixo }) => {
    dados.forEach((cfg, i) => {
      const destKey = `${prefixo}_${i}`;
      if (!mm[destKey]) mm[destKey] = {};

      ['vaga1','vaga2'].forEach((vaga, lado) => {
        const texto = cfg[vaga];
        const matchVenc = texto.match(/Vencedor J(\d+)/);
        const matchPerd = texto.match(/Perdedor J(\d+)/);
        const match = matchVenc || matchPerd;
        if (!match) return;

        const ehVencedor = !!matchVenc;
        const origemKey = jogoParaKey[parseInt(match[1])];
        if (!origemKey) return;

        const nomeKey = lado === 0 ? 't1' : 't2';
        const autoKey = lado === 0 ? 'autoFilled1' : 'autoFilled2';

        if (mm[destKey][nomeKey] && !mm[destKey][autoKey]) return;

        const savedOrigem = mm[origemKey] || {};
        const g1 = savedOrigem.g1 != null && savedOrigem.g1 !== '' ? parseInt(savedOrigem.g1) : null;
        const g2 = savedOrigem.g2 != null && savedOrigem.g2 !== '' ? parseInt(savedOrigem.g2) : null;
        const p1 = savedOrigem.p1 != null && savedOrigem.p1 !== '' ? parseInt(savedOrigem.p1) : null;
        const p2 = savedOrigem.p2 != null && savedOrigem.p2 !== '' ? parseInt(savedOrigem.p2) : null;
        const t1 = savedOrigem.t1 || '';
        const t2 = savedOrigem.t2 || '';

        const campoEl = document.getElementById(`mm-t${lado+1}-${destKey}`);
        const flagEl  = document.getElementById(`mm-flag${lado+1}-${destKey}`);
        const penNome = document.getElementById(`mm-pen-nome${lado+1}-${destKey}`);

        if (!t1 || !t2 || g1 === null || g2 === null) {
          if (mm[destKey][autoKey]) {
            if (campoEl) { campoEl.value = ''; campoEl.classList.remove('auto-filled'); }
            if (flagEl)  flagEl.innerHTML = '🏳️';
            if (penNome) penNome.textContent = '–';
            mm[destKey][nomeKey] = '';
            mm[destKey][autoKey] = false;
          }
          return;
        }

        const vencedor = () => {
          if (g1 > g2) return { nome: t1, flag: getFlagByName(t1) };
          if (g2 > g1) return { nome: t2, flag: getFlagByName(t2) };
          if (p1 !== null && p2 !== null && p1 !== p2) {
            return p1 > p2 ? { nome: t1, flag: getFlagByName(t1) } : { nome: t2, flag: getFlagByName(t2) };
          }
          return null;
        };

        const perdedor = () => {
          if (g1 > g2) return { nome: t2, flag: getFlagByName(t2) };
          if (g2 > g1) return { nome: t1, flag: getFlagByName(t1) };
          if (p1 !== null && p2 !== null && p1 !== p2) {
            return p1 > p2 ? { nome: t2, flag: getFlagByName(t2) } : { nome: t1, flag: getFlagByName(t1) };
          }
          return null;
        };

        const escolhido = ehVencedor ? vencedor() : perdedor();

        if (escolhido) {
          if (campoEl) { campoEl.value = escolhido.nome; campoEl.classList.add('auto-filled'); }
          if (flagEl)  flagEl.innerHTML = escolhido.flag;
          if (penNome) penNome.textContent = escolhido.nome;
          mm[destKey][nomeKey] = escolhido.nome;
          mm[destKey][autoKey] = true;
        } else {
          if (mm[destKey][autoKey]) {
            if (campoEl) { campoEl.value = ''; campoEl.classList.remove('auto-filled'); }
            if (flagEl)  flagEl.innerHTML = '🏳️';
            if (penNome) penNome.textContent = '–';
            mm[destKey][nomeKey] = '';
            mm[destKey][autoKey] = false;
          }
        }
      });
    });
  });

  Storage.setMataMataCompleto(mm);
  atualizarCampeaoEPodio();
}

// ============================================================
//  PÓDIO
// ============================================================
function atualizarCampeaoEPodio() {
  const mm = Storage.getMataMata();

  const final = mm['final_0'] || {};
  const g1f = final.g1 != null && final.g1 !== '' ? parseInt(final.g1) : null;
  const g2f = final.g2 != null && final.g2 !== '' ? parseInt(final.g2) : null;
  const p1f = final.p1 != null && final.p1 !== '' ? parseInt(final.p1) : null;
  const p2f = final.p2 != null && final.p2 !== '' ? parseInt(final.p2) : null;

  let primeiro = '', segundo = '';
  if (final.t1 && final.t2 && g1f !== null && g2f !== null) {
    if (g1f > g2f)      { primeiro = final.t1; segundo = final.t2; }
    else if (g2f > g1f) { primeiro = final.t2; segundo = final.t1; }
    else if (p1f !== null && p2f !== null && p1f !== p2f) {
      if (p1f > p2f) { primeiro = final.t1; segundo = final.t2; }
      else           { primeiro = final.t2; segundo = final.t1; }
    }
  }

  const inputCampeao = document.getElementById('campeao-input');
  if (inputCampeao) {
    inputCampeao.value = primeiro;
    if (primeiro) Storage.setCampeao(primeiro);
  }

  const lugar3 = mm['3lugar_0'] || {};
  const g1t = lugar3.g1 != null && lugar3.g1 !== '' ? parseInt(lugar3.g1) : null;
  const g2t = lugar3.g2 != null && lugar3.g2 !== '' ? parseInt(lugar3.g2) : null;
  const p1t = lugar3.p1 != null && lugar3.p1 !== '' ? parseInt(lugar3.p1) : null;
  const p2t = lugar3.p2 != null && lugar3.p2 !== '' ? parseInt(lugar3.p2) : null;

  let terceiro = '';
  if (lugar3.t1 && lugar3.t2 && g1t !== null && g2t !== null) {
    if (g1t > g2t)      terceiro = lugar3.t1;
    else if (g2t > g1t) terceiro = lugar3.t2;
    else if (p1t !== null && p2t !== null && p1t !== p2t) {
      terceiro = p1t > p2t ? lugar3.t1 : lugar3.t2;
    }
  }

  const p1El = document.getElementById('podio-1');
  const p2El = document.getElementById('podio-2');
  const p3El = document.getElementById('podio-3');
  if (p1El) p1El.textContent = primeiro || '?';
  if (p2El) p2El.textContent = segundo  || '?';
  if (p3El) p3El.textContent = terceiro || '?';

  const podioBlock = document.getElementById('podio-block');
  if (podioBlock) {
    podioBlock.style.display = (primeiro || segundo || terceiro) ? 'block' : 'none';
  }
}

// ============================================================
//  CAMPEÃO
// ============================================================
function initCampeao() {
  const input = document.getElementById('campeao-input');
  if (!input) return;
  input.value = Storage.getCampeao();
}

// ============================================================
//  PERFIL DE TESTE
// ============================================================
function abrirModalPerfil() {
  renderListaPerfis();
  document.getElementById('modal-perfil')?.classList.remove('hidden');
}

function renderListaPerfis() {
  const lista = document.getElementById('perfil-lista');
  if (!lista) return;
  const saves = Storage.listarPerfis();
  if (saves.length === 0) {
    lista.innerHTML = '<p style="color:#888;font-size:13px;padding:8px 0">Nenhum save ainda.</p>';
    return;
  }
  lista.innerHTML = saves
    .sort((a, b) => b.ts - a.ts)
    .map(p => `
      <div class="perfil-item">
        <span class="perfil-nome" id="perfil-label-${p.nome}">${p.nome}</span>
        <input class="perfil-edit-input hidden" id="perfil-edit-${p.nome}"
          type="text" value="${p.nome}"
          onkeydown="if(event.key==='Enter')confirmarRenomear('${p.nome}');if(event.key==='Escape')cancelarEditar('${p.nome}')">
        <div class="perfil-acoes">
          <button class="btn-perfil-acao carregar"    onclick="carregarPerfil('${p.nome}')"          title="Carregar">📂</button>
          <button class="btn-perfil-acao salvar-cima" onclick="salvarPorCima('${p.nome}')"           title="Salvar por cima">💾</button>
          <button class="btn-perfil-acao editar"      onclick="ativarEditar('${p.nome}')"            title="Renomear">✏️</button>
          <button class="btn-perfil-acao deletar"     onclick="confirmarDeletarPerfil('${p.nome}')"  title="Excluir">🗑️</button>
        </div>
      </div>`).join('');
}

function ativarEditar(nome) {
  document.getElementById(`perfil-label-${nome}`)?.classList.add('hidden');
  const input = document.getElementById(`perfil-edit-${nome}`);
  input?.classList.remove('hidden');
  input?.focus();
  input?.select();
}

function cancelarEditar(nome) {
  document.getElementById(`perfil-label-${nome}`)?.classList.remove('hidden');
  document.getElementById(`perfil-edit-${nome}`)?.classList.add('hidden');
}

function confirmarRenomear(nomeAntigo) {
  const input = document.getElementById(`perfil-edit-${nomeAntigo}`);
  const novoNome = input?.value?.trim();
  if (!novoNome || novoNome === nomeAntigo) { cancelarEditar(nomeAntigo); return; }
  const perfis = Storage.listarPerfis();
  if (perfis.find(p => p.nome === novoNome)) { toast('Já existe um save com esse nome!', true); return; }
  const ok = Storage.carregarPerfil(nomeAntigo);
  if (ok) {
    Storage.salvarPerfil(novoNome);
    Storage.deletarPerfil(nomeAntigo);
    renderListaPerfis();
    toast(`✏️ Renomeado para "${novoNome}"!`);
  }
}

function confirmarDeletarPerfil(nome) {
  const modal = document.getElementById('modal-deletar-save');
  const txt = document.getElementById('deletar-save-nome');
  if (txt) txt.textContent = nome;
  if (modal) { modal.classList.remove('hidden'); modal.dataset.nome = nome; }
}

function executarDeletarPerfil() {
  const modal = document.getElementById('modal-deletar-save');
  const nome = modal?.dataset.nome;
  if (!nome) return;
  Storage.deletarPerfil(nome);
  fecharModal('modal-deletar-save');
  renderListaPerfis();
  toast(`🗑️ Save "${nome}" excluído.`);
}

function salvarPerfil() {
  const input = document.getElementById('perfil-nome-input');
  const nome = input?.value?.trim();
  if (!nome) { toast('Digite um nome para o novo perfil!', true); return; }
  Storage.salvarPerfil(nome);
  if (input) input.value = '';
  renderListaPerfis();
  toast(`💾 Perfil "${nome}" criado!`);
}

function salvarPorCima(nome) {
  Storage.salvarPerfil(nome);
  renderListaPerfis();
  toast(`💾 Perfil "${nome}" atualizado!`);
}

function carregarPerfil(nome) {
  Storage.carregarPerfil(nome);
  fecharModal('modal-perfil');
  renderGrupos();
  renderMataMata();
  initCampeao();
  rodarChaveamentoCompleto();
  atualizarCampeaoEPodio();
  toast(`📂 Perfil "${nome}" carregado!`);
}

function deletarPerfil(nome) {
  Storage.deletarPerfil(nome);
  renderListaPerfis();
  toast(`🗑️ Perfil "${nome}" removido.`);
}

// ============================================================
//  COMPARTILHAR
// ============================================================
function compartilhar() {
  try {
    const state = Storage.exportState();
    const json = JSON.stringify(state);
    const encoded = btoa(unescape(encodeURIComponent(json)));
    const url = `${location.origin}${location.pathname}?d=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      toast('🔗 Link copiado!');
    }).catch(() => mostrarModalCompartilhar(url));
  } catch(e) {
    toast('Erro ao gerar link.', true);
  }
}

function mostrarModalCompartilhar(url) {
  const modal = document.getElementById('modal-share');
  const input = document.getElementById('modal-share-url');
  if (modal && input) { input.value = url; modal.classList.remove('hidden'); }
}

function copiarLinkModal() {
  const input = document.getElementById('modal-share-url');
  if (input) { input.select(); document.execCommand('copy'); toast('🔗 Link copiado!'); fecharModal('modal-share'); }
}

function carregarDaURL() {
  const params = new URLSearchParams(location.search);
  const d = params.get('d');
  if (!d) return false;
  try {
    const json = decodeURIComponent(escape(atob(d)));
    Storage.importState(JSON.parse(json));
    toast('📥 Tabela carregada do link!');
    history.replaceState({}, '', location.pathname);
    return true;
  } catch(e) { return false; }
}

// ============================================================
//  IMPRESSÃO / RESET / MODAL / TOAST
// ============================================================
function imprimir() {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'block');
  window.print();
  setTimeout(() => {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = '');
    document.querySelector('.tab-content.active')?.style.removeProperty('display');
  }, 1000);
}

function confirmarReset() { document.getElementById('modal-reset')?.classList.remove('hidden'); }

function executarReset() {
  Storage.limparTudo();
  fecharModal('modal-reset');
  renderGrupos();
  renderMataMata();
  initCampeao();
  atualizarCampeaoEPodio();
  toast('🗑️ Dados apagados com sucesso.');
}

function fecharModal(id) { document.getElementById(id)?.classList.add('hidden'); }

function toast(msg, erro = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast${erro ? ' erro' : ''}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ============================================================
//  SUPABASE STATUS
// ============================================================
async function verificarSupabase() {
  const dot = document.getElementById('status-dot');
  const txt = document.getElementById('status-txt');
  if (!dot || !txt) return;
  if (!SupabaseSync.isConfigured()) {
    dot.className = 'status-dot offline';
    txt.textContent = 'Local apenas';
    return;
  }
  try {
    const state = await SupabaseSync.carregar();
    if (state) {
      dot.className = 'status-dot online';
      txt.textContent = 'Sincronizado';
      Storage.importState(state);
      renderGrupos(); renderMataMata(); initCampeao();
    }
  } catch {
    dot.className = 'status-dot offline';
    txt.textContent = 'Offline';
  }
}

// ============================================================
//  CHAVEAMENTO — BRACKET VISUAL
// ============================================================

// Lê os dados do mata-mata e retorna { t1, t2, g1, g2, p1, p2 } para um jogo
function getDadosJogo(prefixo, idx) {
  const mm = Storage.getMataMata();
  const saved = mm[`${prefixo}_${idx}`] || {};
  return {
    t1: saved.t1 || '',
    t2: saved.t2 || '',
    g1: saved.g1 ?? '',
    g2: saved.g2 ?? '',
    p1: saved.p1 ?? '',
    p2: saved.p2 ?? '',
  };
}

function getVencedor(d) {
  if (!d.t1 || !d.t2 || d.g1 === '' || d.g2 === '') return null;
  const g1 = parseInt(d.g1), g2 = parseInt(d.g2);
  if (g1 > g2) return d.t1;
  if (g2 > g1) return d.t2;
  const p1 = parseInt(d.p1), p2 = parseInt(d.p2);
  if (!isNaN(p1) && !isNaN(p2) && p1 !== p2) return p1 > p2 ? d.t1 : d.t2;
  return null;
}

// Cria um card de time para o bracket
function cardTime(nome, isVencedor) {
  const flag = nome ? getFlagByName(nome) : '';
  const cls = nome
    ? (isVencedor ? 'bk-time bk-vencedor' : 'bk-time bk-perdedor')
    : 'bk-time bk-vazio';
  return `<div class="${cls}">${flag ? `<span class="bk-flag">${flag}</span>` : ''}<span class="bk-nome">${nome || '?'}</span></div>`;
}

// Cria um card de jogo para o bracket
function cardJogo(d, jogoNum, label) {
  const venc = getVencedor(d);
  const placar = (d.g1 !== '' && d.g2 !== '') ? `<span class="bk-placar">${d.g1}×${d.g2}${(d.p1 !== '' && d.p2 !== '') ? ` (${d.p1}×${d.p2}p)` : ''}</span>` : '';
  return `
    <div class="bk-jogo">
      <div class="bk-jogo-label">${label || `J${jogoNum}`}${placar}</div>
      ${cardTime(d.t1, venc === d.t1)}
      ${cardTime(d.t2, venc === d.t2)}
    </div>`;
}

function renderChaveamento() {
  const root = document.getElementById('chaveamento-root');
  if (!root) return;

  // Coleta dados de todas as fases
  const d32  = Array.from({length:16}, (_, i) => getDadosJogo('32avos',  i));
  const dOit = Array.from({length:8},  (_, i) => getDadosJogo('oitavas', i));
  const dQua = Array.from({length:4},  (_, i) => getDadosJogo('quartas', i));
  const dSem = Array.from({length:2},  (_, i) => getDadosJogo('semis',   i));
  const dFin = getDadosJogo('final',   0);
  const d3   = getDadosJogo('3lugar',  0);

  // Números dos jogos reais
  const n32  = FASE_16_AVOS.map(j => j.jogo);
  const nOit = OITAVAS_DE_FINAL.map(j => j.jogo);
  const nQua = QUARTAS_DE_FINAL.map(j => j.jogo);
  const nSem = SEMIFINAIS.map(j => j.jogo);

  // Bracket: lado esquerdo = jogos 0-7 dos 32avos, lado direito = jogos 8-15
  // Oitavas: 0-3 esq, 4-7 dir
  // Quartas: 0-1 esq, 2-3 dir
  // Semis: 0 esq, 1 dir

  const ladoEsq32  = [0,1,2,3,4,5,6,7];
  const ladoDir32  = [8,9,10,11,12,13,14,15];
  const ladoEsqOit = [0,1,2,3];
  const ladoDirOit = [4,5,6,7];
  const ladoEsqQua = [0,1];
  const ladoDirQua = [2,3];

  const col32Esq  = ladoEsq32.map(i  => cardJogo(d32[i],  n32[i]));
  const col32Dir  = ladoDir32.map(i  => cardJogo(d32[i],  n32[i]));
  const colOitEsq = ladoEsqOit.map(i => cardJogo(dOit[i], nOit[i]));
  const colOitDir = ladoDirOit.map(i => cardJogo(dOit[i], nOit[i]));
  const colQuaEsq = ladoEsqQua.map(i => cardJogo(dQua[i], nQua[i]));
  const colQuaDir = ladoDirQua.map(i => cardJogo(dQua[i], nQua[i]));
  const semEsq    = cardJogo(dSem[0], nSem[0]);
  const semDir    = cardJogo(dSem[1], nSem[1]);
  const jogoFinal = cardJogo(dFin, FINAL[0].jogo, '🏆 FINAL');
  const jogo3     = cardJogo(d3,   TERCEIRO_LUGAR[0].jogo, '🥉 3º LUGAR');

  root.innerHTML = `
    <div class="bk-wrapper">

      <!-- BRACKET DESKTOP -->
      <div class="bk-bracket">

        <!-- COLUNA: 32avos esquerdo -->
        <div class="bk-col bk-col-32">
          <div class="bk-col-titulo">⚡ 16 AVOS</div>
          ${col32Esq.join('')}
        </div>

        <!-- COLUNA: Oitavas esquerdo -->
        <div class="bk-col bk-col-oitavas">
          <div class="bk-col-titulo">⚡ OITAVAS</div>
          ${colOitEsq.join('')}
        </div>

        <!-- COLUNA: Quartas esquerdo -->
        <div class="bk-col bk-col-quartas">
          <div class="bk-col-titulo">🔥 QUARTAS</div>
          ${colQuaEsq.join('')}
        </div>

        <!-- COLUNA: Semi esquerdo -->
        <div class="bk-col bk-col-semis">
          <div class="bk-col-titulo">⭐ SEMI</div>
          ${semEsq}
        </div>

        <!-- COLUNA: Centro (Final + 3º lugar) -->
        <div class="bk-col bk-col-centro">
          <div class="bk-col-titulo">🏆 FINAL</div>
          ${jogoFinal}
          <div class="bk-3lugar-wrap">${jogo3}</div>
        </div>

        <!-- COLUNA: Semi direito -->
        <div class="bk-col bk-col-semis">
          <div class="bk-col-titulo">⭐ SEMI</div>
          ${semDir}
        </div>

        <!-- COLUNA: Quartas direito -->
        <div class="bk-col bk-col-quartas">
          <div class="bk-col-titulo">🔥 QUARTAS</div>
          ${colQuaDir.join('')}
        </div>

        <!-- COLUNA: Oitavas direito -->
        <div class="bk-col bk-col-oitavas">
          <div class="bk-col-titulo">⚡ OITAVAS</div>
          ${colOitDir.join('')}
        </div>

        <!-- COLUNA: 32avos direito -->
        <div class="bk-col bk-col-32">
          <div class="bk-col-titulo">⚡ 16 AVOS</div>
          ${col32Dir.join('')}
        </div>

      </div>

      <!-- LISTA MOBILE: sequencial por rodada -->
      <div class="bk-mobile">

        <div class="bk-mob-secao">
          <div class="bk-mob-titulo">⚡ DÉCIMO SEXTOS DE FINAL</div>
          <div class="bk-mob-grid">${d32.map((d,i) => cardJogo(d, n32[i])).join('')}</div>
        </div>

        <div class="bk-mob-secao">
          <div class="bk-mob-titulo">⚡ OITAVAS DE FINAL</div>
          <div class="bk-mob-grid">${dOit.map((d,i) => cardJogo(d, nOit[i])).join('')}</div>
        </div>

        <div class="bk-mob-secao">
          <div class="bk-mob-titulo">🔥 QUARTAS DE FINAL</div>
          <div class="bk-mob-grid">${dQua.map((d,i) => cardJogo(d, nQua[i])).join('')}</div>
        </div>

        <div class="bk-mob-secao">
          <div class="bk-mob-titulo">⭐ SEMIFINAIS</div>
          <div class="bk-mob-grid">${dSem.map((d,i) => cardJogo(d, nSem[i])).join('')}</div>
        </div>

        <div class="bk-mob-secao">
          <div class="bk-mob-titulo">🥉 DISPUTA DO 3º LUGAR</div>
          <div class="bk-mob-grid">${jogo3}</div>
        </div>

        <div class="bk-mob-secao">
          <div class="bk-mob-titulo">🏆 GRANDE FINAL</div>
          <div class="bk-mob-grid">${jogoFinal}</div>
        </div>

      </div>
    </div>`;
}

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderBandeirinhas();
  carregarDaURL();
  renderGrupos();
  renderMataMata();
  initCampeao();
  verificarSupabase();

  mostrarTab(Storage.getAbaAtiva());

  setTimeout(() => {
    rodarChaveamentoCompleto();
    atualizarCampeaoEPodio();
  }, 100);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
    }
  });
});
