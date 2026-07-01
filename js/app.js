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

  // Auto-sync no Supabase se for admin
  if (AdminMode.isAdmin()) {
    SupabaseSync.salvar('resultados', Storage.getResultados()).catch(() => {});
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

  // Auto-sync no Supabase se for admin
  if (AdminMode.isAdmin()) {
    SupabaseSync.salvar('matamata', Storage.getMataMata()).catch(() => {});
  }
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
//  PERFIS — Oficial (Supabase, todos veem, só admin edita) + locais
// ============================================================
function abrirModalPerfil() {
  renderListaPerfis();
  document.getElementById('modal-perfil')?.classList.remove('hidden');
}

function renderListaPerfis() {
  const lista = document.getElementById('perfil-lista');
  if (!lista) return;
  const isAdmin = AdminMode.isAdmin();
  const tabelaAtiva = Storage.getTabelaAtiva();

  const saves = Storage.listarPerfis();

  // Item especial: Tabela Oficial — sempre aparece primeiro
  const oficialAtiva = tabelaAtiva === Storage.NOME_OFICIAL;
  let html = `
    <div class="perfil-item perfil-oficial${oficialAtiva ? ' perfil-ativa' : ''}">
      <span class="perfil-nome"><img src="assets/icones/prancheta.png" class="icones-btn"> Tabela Oficial${oficialAtiva ? ' Atualizada' : ''}</span>
      <div class="perfil-acoes">
        <button class="btn-perfil-acao carregar" onclick="carregarTabelaOficial()" title="Carregar Tabela Oficial">📂</button>
        <button class="btn-perfil-acao copiar" onclick="abrirCopiarOficial()" title="Criar uma cópia para editar"><img src="assets/icones/copia-de.png" class="icones-btn"></button>
        ${isAdmin ? `<button class="btn-perfil-acao salvar-cima" onclick="confirmarSalvarOficial()" title="Publicar Tabela Oficial">☁️</button>` : ''}</div>
    </div>`;

  if (saves.length === 0) {
    html += '<p style="color:#888;font-size:13px;padding:8px 0">Nenhuma tabela salva ainda. Crie uma para fazer suas projeções!</p>';
  } else {
    html += saves
      .sort((a, b) => b.ts - a.ts)
      .map(p => {
        const ativa = tabelaAtiva === p.nome;
        return `
      <div class="perfil-item${ativa ? ' perfil-ativa' : ''}">
        <span class="perfil-nome" id="perfil-label-${p.nome}">${p.nome}${ativa ? ' (atual)' : ''}</span>
        <input class="perfil-edit-input hidden" id="perfil-edit-${p.nome}"
          type="text" value="${p.nome}"
          onkeydown="if(event.key==='Enter')confirmarRenomear('${p.nome}');if(event.key==='Escape')cancelarEditar('${p.nome}')">
        <div class="perfil-acoes">
          <button class="btn-perfil-acao carregar"    onclick="carregarPerfilUI('${p.nome}')"     title="Carregar">📂</button>
          <button class="btn-perfil-acao salvar-cima" onclick="salvarPorCima('${p.nome}')"        title="Salvar por cima">💾</button>
          <button class="btn-perfil-acao editar"      onclick="ativarEditar('${p.nome}')"         title="Renomear"><img src="assets/icones/editar-amarelo.png" class="icones-btn"></button>
          <button class="btn-perfil-acao deletar"     onclick="confirmarDeletarPerfil('${p.nome}')" title="Excluir"><img src="assets/icones/lixeira.png" class="icones-btn"></button>
        </div>
      </div>`;
      }).join('');
  }

  lista.innerHTML = html;
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
  if (novoNome === Storage.NOME_OFICIAL) { toast('Esse nome é reservado para a Tabela Oficial!', true); return; }
  const perfis = Storage.listarPerfis();
  if (perfis.find(p => p.nome === novoNome)) { toast('Já existe um save com esse nome!', true); return; }
  const ok = Storage.carregarPerfil(nomeAntigo);
  if (ok) {
    Storage.salvarPerfil(novoNome);
    Storage.deletarPerfil(nomeAntigo);
    renderListaPerfis();
    atualizarStatusBar();
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
  atualizarStatusBar();
  toast(`🗑️ Save "${nome}" excluído.`);
}

function salvarPerfil() {
  const input = document.getElementById('perfil-nome-input');
  const nome = input?.value?.trim();
  if (!nome) { toast('Digite um nome para o novo perfil!', true); return; }
  if (nome === Storage.NOME_OFICIAL) { toast('Esse nome é reservado para a Tabela Oficial!', true); return; }

  const ehCopiaOficial = input?.dataset.modoCopiaOficial === 'true' && window.__copiaOficialPendente;

  if (ehCopiaOficial) {
    const ok = Storage.salvarPerfilComDados(nome, window.__copiaOficialPendente);
    if (!ok) { toast('Não foi possível salvar com esse nome.', true); return; }
    delete input.dataset.modoCopiaOficial;
    window.__copiaOficialPendente = null;
    if (input) input.value = '';
    renderListaPerfis();
    toast(`<img src="assets/icones/copia-de.png" class="icones-btn"> Cópia "${nome}" criada a partir da Tabela Oficial! Carregando...`);
    carregarPerfilUI(nome);
    return;
  }

  const ok = Storage.salvarPerfil(nome);
  if (!ok) { toast('Não foi possível salvar com esse nome.', true); return; }
  if (input) input.value = '';
  renderListaPerfis();
  atualizarStatusBar();
  toast(`💾 Tabela "${nome}" criada!`);
}

function salvarPorCima(nome) {
  Storage.salvarPerfil(nome);
  renderListaPerfis();
  atualizarStatusBar();
  toast(`💾 Tabela "${nome}" atualizada!`);
}

// Carrega um perfil local na tela (renomeado de carregarPerfil → carregarPerfilUI
// para não colidir com Storage.carregarPerfil)
function carregarPerfilUI(nome) {
  Storage.carregarPerfil(nome);
  fecharModal('modal-perfil');
  renderGrupos();
  renderMataMata();
  initCampeao();
  rodarChaveamentoCompleto();
  atualizarCampeaoEPodio();
  atualizarStatusBar();
  toast(`📂 Tabela "${nome}" carregada!`);
}

// Cria uma cópia local da Tabela Oficial (no estado atual) para o
// visitante usar como ponto de partida de suas próprias projeções.
async function abrirCopiarOficial() {
  toast('☁️ Buscando dados atuais da Tabela Oficial...');
  try {
    const state = await SupabaseSync.carregar() || Storage.getCacheOficial();
    if (!state) {
      toast('❌ Não foi possível obter a Tabela Oficial para copiar.', true);
      return;
    }
    // Guarda temporariamente para a confirmação de nome usar
    window.__copiaOficialPendente = state;
    const input = document.getElementById('perfil-nome-input');
    if (input) {
      const sugestao = `Minha Projeção ${new Date().toLocaleDateString('pt-BR')}`;
      input.value = sugestao;
      input.dataset.modoCopiaOficial = 'true';
      input.focus();
      input.select();
    }
    toast('✏️ Dê um nome pra sua cópia e clique em "Novo"!');
  } catch (e) {
    toast('❌ Erro ao copiar: ' + e.message, true);
  }
}

// Botão "↺ Atualizar" na barra de status: busca a versão mais recente
// da Tabela Oficial sem precisar abrir o modal de tabelas salvas.
async function atualizarTabelaOficialNaTela() {
  const btn = document.getElementById('btn-atualizar-oficial');
  btn?.classList.add('spinning');
  toast('↺ Buscando atualizações...');
  try {
    const state = await SupabaseSync.carregar();
    if (!state) { toast('❌ Sem conexão no momento.', true); return; }
    Storage.carregarOficialNaTela(state);
    renderGrupos();
    renderMataMata();
    initCampeao();
    rodarChaveamentoCompleto();
    atualizarCampeaoEPodio();
    atualizarStatusBar();
    toast('✅ Tabela Oficial atualizada!');
  } catch (e) {
    toast('❌ Erro ao atualizar: ' + e.message, true);
  } finally {
    setTimeout(() => btn?.classList.remove('spinning'), 600);
  }
}

// Carrega a Tabela Oficial na tela (busca do cache local ou do Supabase)
async function carregarTabelaOficial() {
  toast('☁️ Carregando Tabela Oficial...');
  try {
    const state = await SupabaseSync.carregar();
    if (state) {
      Storage.carregarOficialNaTela(state);
    } else {
      // Sem conexão: tenta usar o cache local da última vez que carregou
      const cache = Storage.getCacheOficial();
      if (cache) {
        Storage.carregarOficialNaTela(cache);
        toast('⚠️ Usando última versão salva localmente (offline).', true);
      } else {
        toast('❌ Não foi possível carregar a Tabela Oficial.', true);
        return;
      }
    }
    fecharModal('modal-perfil');
    renderGrupos();
    renderMataMata();
    initCampeao();
    rodarChaveamentoCompleto();
    atualizarCampeaoEPodio();
    atualizarStatusBar();
    toast('📋 Tabela Oficial carregada!');
  } catch (e) {
    toast('❌ Erro ao carregar: ' + e.message, true);
  }
}

function deletarPerfil(nome) {
  Storage.deletarPerfil(nome);
  renderListaPerfis();
  atualizarStatusBar();
  toast(`🗑️ Perfil "${nome}" removido.`);
}

// ============================================================
//  COMPARTILHAR
// ============================================================
function compartilhar() {
  try {
    const url = `${location.origin}${location.pathname}`;
    navigator.clipboard.writeText(url).then(() => {
      toast('🔗 Link copiado! A Tabela Oficial carrega automaticamente para quem abrir.');
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
//  RESET / MODAL / TOAST
// ============================================================

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

function fecharModal(id) {
  document.getElementById(id)?.classList.add('hidden');
  if (id === 'modal-perfil') {
    const input = document.getElementById('perfil-nome-input');
    if (input) { delete input.dataset.modoCopiaOficial; }
    window.__copiaOficialPendente = null;
  }
}

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
//  BARRA DE STATUS — Modo Admin / Visitante + Tabela ativa
// ============================================================
function atualizarStatusBar() {
  const bar        = document.getElementById('status-bar');
  const dot        = document.getElementById('status-dot-bar');
  const modoTxt    = document.getElementById('status-modo-txt');
  const tabelaNome = document.getElementById('status-tabela-nome');
  const btnToggle  = document.getElementById('btn-admin-toggle');

  if (!bar || !dot || !modoTxt) return;

  const isAdmin = AdminMode.isAdmin();
  const nomeTabela = Storage.getTabelaAtiva();
  const estaNaOficial = nomeTabela === Storage.NOME_OFICIAL;

  if (isAdmin) {
    bar.className = 'status-bar modo-admin';
    dot.className = 'status-dot-bar admin';
    modoTxt.textContent = 'MODO ADMIN';
    document.body.classList.remove('modo-visitante');
    document.body.classList.add('modo-admin');
    if (btnToggle) { btnToggle.textContent = '🔓 Sair Admin'; btnToggle.className = 'btn-admin-login ativo'; }
  } else {
    bar.className = 'status-bar';
    dot.className = 'status-dot-bar visitante';
    modoTxt.textContent = ' VISITANTE ';
    document.body.classList.remove('modo-admin');
    document.body.classList.add('modo-visitante');
    if (btnToggle) { btnToggle.textContent = '🔐 Entrar Admin'; btnToggle.className = 'btn-admin-login'; }
  }

  // Bloqueia edição só quando: NÃO é admin E está vendo a Tabela Oficial
  if (!isAdmin && estaNaOficial) {
    document.body.classList.add('visualizando-oficial');
  } else {
    document.body.classList.remove('visualizando-oficial');
  }

  if (tabelaNome) {
    if (estaNaOficial) {
      tabelaNome.innerHTML = `<strong>Tabela Oficial Atualizada </strong>${isAdmin ? ' - editando ' : ''}`;
    } else if (nomeTabela) {
      tabelaNome.innerHTML = `<strong>${nomeTabela}</strong>${isAdmin ? '' : ' 🎯 Seu Palpite'}`;
    } else {
      tabelaNome.innerHTML = `Nenhuma tabela carregada`;
    }
  }

  const aviso = document.getElementById('status-aviso-leitura');
  if (aviso) {
    aviso.textContent = (!isAdmin && estaNaOficial) ? ' 👁️ Somente visualização ' : '';
  }
}

function toggleAdmin() {
  if (AdminMode.isAdmin()) {
    AdminMode.desativar();
    atualizarStatusBar();
    toast('👁️ Saiu do modo admin.');
    carregarTabelaOficial();
  } else {
    const input = document.getElementById('admin-senha-input');
    if (input) input.value = '';
    const erro = document.getElementById('admin-erro');
    if (erro) erro.style.display = 'none';
    document.getElementById('modal-admin')?.classList.remove('hidden');
    setTimeout(() => input?.focus(), 100);
  }
}

function tentarLoginAdmin() {
  const input = document.getElementById('admin-senha-input');
  const erro  = document.getElementById('admin-erro');
  const senha = input?.value || '';

  if (AdminMode.ativar(senha)) {
    fecharModal('modal-admin');
    atualizarStatusBar();
    toast('🔑 Modo Admin ativado! Carregando Tabela Oficial para edição...');
    carregarTabelaOficial();
  } else {
    if (erro) erro.style.display = 'block';
    input?.select();
  }
}

function confirmarSalvarOficial() {
  if (!AdminMode.isAdmin()) { toast('Você precisa estar no modo admin!', true); return; }
  document.getElementById('modal-salvar-oficial')?.classList.remove('hidden');
}

async function executarSalvarOficial() {
  fecharModal('modal-salvar-oficial');
  toast('☁️ Publicando tabela oficial...');
  try {
    const ok = await SupabaseSync.salvarOficial();
    if (ok) {
      Storage.setTabelaAtiva('Oficial');
      atualizarStatusBar();
      toast('✅ Tabela oficial publicada!');
    } else {
      toast('❌ Erro ao publicar. Verifique a conexão.', true);
    }
  } catch(e) {
    toast('❌ Erro: ' + e.message, true);
  }
}

// ============================================================
//  SUPABASE STATUS + CARGA INICIAL
//  Ao abrir a página: se não há nenhuma tabela local ativa ainda,
//  carrega a Tabela Oficial automaticamente (comportamento padrão
//  para visitantes que abrem o link pela primeira vez).
// ============================================================
async function verificarSupabase() {
  const dot = document.getElementById('status-dot');
  const txt = document.getElementById('status-txt');

  atualizarStatusBar();

  if (!SupabaseSync.isConfigured()) {
    if (dot) dot.className = 'status-dot offline';
    if (txt) txt.textContent = 'Local apenas';
    return;
  }

  const tabelaAtiva = Storage.getTabelaAtiva();
  const deveCarregarOficial = !tabelaAtiva; // primeira visita ou nada carregado ainda

  try {
    const state = await SupabaseSync.carregar();
    if (state) {
      if (dot) dot.className = 'status-dot online';
      if (txt) txt.textContent = 'Conectado';

      if (deveCarregarOficial) {
        Storage.carregarOficialNaTela(state);
        renderGrupos();
        renderMataMata();
        initCampeao();
        rodarChaveamentoCompleto();
        atualizarCampeaoEPodio();
      } else {
        // Já tem tabela local sendo usada — só atualiza o cache da Oficial
        // em segundo plano, sem sobrescrever o que está na tela.
        Storage.setCacheOficial(state);
      }
    } else {
      if (dot) dot.className = 'status-dot online';
      if (txt) txt.textContent = 'Conectado';
    }
  } catch {
    if (dot) dot.className = 'status-dot offline';
    if (txt) txt.textContent = 'Offline';
  }

  atualizarStatusBar();
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

  const d = {
    // 16avos
    j73: getDadosJogo('32avos', 0),   // jogo 73
    j74: getDadosJogo('32avos', 1),   // jogo 74  ← índice correto
    j75: getDadosJogo('32avos', 2),
    j76: getDadosJogo('32avos', 3),
    j77: getDadosJogo('32avos', 4),
    j78: getDadosJogo('32avos', 5),
    j79: getDadosJogo('32avos', 6),
    j80: getDadosJogo('32avos', 7),
    j81: getDadosJogo('32avos', 8),
    j82: getDadosJogo('32avos', 9),
    j83: getDadosJogo('32avos', 10),
    j84: getDadosJogo('32avos', 11),
    j85: getDadosJogo('32avos', 12),
    j86: getDadosJogo('32avos', 13),
    j87: getDadosJogo('32avos', 14),
    j88: getDadosJogo('32avos', 15),
    // oitavas
    j89: getDadosJogo('oitavas', 0),
    j90: getDadosJogo('oitavas', 1),
    j91: getDadosJogo('oitavas', 2),
    j92: getDadosJogo('oitavas', 3),
    j93: getDadosJogo('oitavas', 4),
    j94: getDadosJogo('oitavas', 5),
    j95: getDadosJogo('oitavas', 6),
    j96: getDadosJogo('oitavas', 7),
    // quartas
    j97: getDadosJogo('quartas', 0),
    j98: getDadosJogo('quartas', 1),
    j99: getDadosJogo('quartas', 2),
    j100: getDadosJogo('quartas', 3),
    // semis
    j101: getDadosJogo('semis', 0),
    j102: getDadosJogo('semis', 1),
    // final e 3º
    j103: getDadosJogo('3lugar', 0),
    j104: getDadosJogo('final', 0),
  };

  // Helper: card de time
  function bkTime(nome, isVenc, jogoRealizado, vagaLabel, gols, penalti) {
  const flag = nome ? getFlagByName(nome) : '';
  let cls = 'bk-time';
  if (!nome) {
    cls += ' bk-vazio';
  } else if (jogoRealizado && isVenc) {
    cls += ' bk-vencedor';
  } else if (jogoRealizado && !isVenc) {
    cls += ' bk-perdedor';
  }
  const exibir = nome || vagaLabel || '?';
  const golLabel = (jogoRealizado && gols !== '' && gols != null)
    ? `<span class="bk-time-gol">${gols}${penalti !== '' && penalti != null ? `<span class="bk-time-pen">(${penalti}p)</span>` : ''}</span>`
    : '';
  return `<div class="${cls}">
    ${flag ? `<span class="bk-flag">${flag}</span>` : ''}
    <span class="bk-nome">${exibir}</span>
    ${golLabel}
  </div>`;
}

// Helper: card de jogo com número
function bkJogo(dados, num, extra = '') {
  const v = getVencedor(dados);
  const jogoRealizado = dados.g1 !== '' && dados.g2 !== '';
  const placar = jogoRealizado
    ? ` <span class="bk-placar">${dados.g1}×${dados.g2}${dados.p1 !== '' && dados.p2 !== '' ? ` (${dados.p1}×${dados.p2}p)` : ''}</span>`
    : '';

  const todasFases = [...FASE_16_AVOS, ...OITAVAS_DE_FINAL, ...QUARTAS_DE_FINAL,
                      ...SEMIFINAIS, ...TERCEIRO_LUGAR, ...FINAL];
  const cfg = todasFases.find(j => j.jogo === num);
  const vaga1 = cfg?.vaga1 || '?';
  const vaga2 = cfg?.vaga2 || '?';

// Cores alternadas por fase (igual ao mata-mata)
const coresPorFase = {
  32:      ['#3F51B5','#3F51B5','#66BB6A','#3F51B5','#66BB6A','#66BB6A','#3F51B5','#66BB6A','#3F51B5',
             '#66BB6A','#3F51B5','#66BB6A','#3F51B5','#3F51B5','#66BB6A','#66BB6A'],
  oitavas: ['#66BB6A','#3F51B5','#66BB6A','#3F51B5','#66BB6A','#3F51B5','#66BB6A','#3F51B5'],
  quartas: ['#3F51B5','#66BB6A','#3F51B5','#66BB6A'],
  semis:   ['#66BB6A','#3F51B5'],
};

let corCabecalho = '';
if (num >= 73 && num <= 88)          corCabecalho = coresPorFase[32][num - 73];
else if (num >= 89 && num <= 96)     corCabecalho = coresPorFase.oitavas[num - 89];
else if (num >= 97 && num <= 100)    corCabecalho = coresPorFase.quartas[num - 97];
else if (num === 101 || num === 102) corCabecalho = coresPorFase.semis[num - 101];

return `<div class="bk-jogo${extra ? ' ' + extra : ''}" data-jogo="${num}">
  <div class="bk-num" style="background:${corCabecalho || 'var(--azul)'}">J${num}${placar}</div>
  ${bkTime(dados.t1, v === dados.t1 && !!v, jogoRealizado, vaga1, dados.g1, dados.p1)}
  ${bkTime(dados.t2, v === dados.t2 && !!v, jogoRealizado, vaga2, dados.g2, dados.p2)}
</div>`;

}

  // Ordem dos jogos: lado esq de cima pra baixo
  const esq32  = [d.j74, d.j77, d.j73, d.j75, d.j83, d.j84, d.j81, d.j82];
  const esqNum = [74, 77, 73, 75, 83, 84, 81, 82];
  const dir32  = [d.j76, d.j78, d.j79, d.j80, d.j86, d.j88, d.j85, d.j87];
  const dirNum = [76, 78, 79, 80, 86, 88, 85, 87];

  const esqOit  = [d.j89, d.j90, d.j93, d.j94];
  const esqONum = [89, 90, 93, 94];
  const dirOit  = [d.j91, d.j92, d.j95, d.j96];
  const dirONum = [91, 92, 95, 96];

  root.innerHTML = `
    <div class="bk-wrapper">

      <!-- ══ BRACKET DESKTOP ══ -->
      <div class="bk-bracket">

        <!-- Coluna 1: 32avos esquerdo -->
        <div class="bk-col" id="bk-c-esq32">
          <div class="bk-col-titulo">⚡ 16 AVOS</div>
          <div class="bk-slots">
            ${esq32.map((d,i) => `<div class="bk-slot">${bkJogo(d, esqNum[i])}</div>`).join('')}
          </div>
        </div>

        <!-- Linhas esq32 → oitavas esq -->
        <div class="bk-linhas" id="bk-l-esqOit">
          <svg class="bk-svg" id="bk-svg-esqOit"></svg>
        </div>

        <!-- Coluna 2: Oitavas esquerdo -->
        <div class="bk-col" id="bk-c-esqOit">
          <div class="bk-col-titulo">⚡ OITAVAS</div>
          <div class="bk-slots">
            ${esqOit.map((d,i) => `<div class="bk-slot">${bkJogo(d, esqONum[i])}</div>`).join('')}
          </div>
        </div>

        <!-- Linhas oitavas esq → quartas esq -->
        <div class="bk-linhas" id="bk-l-esqQua">
          <svg class="bk-svg" id="bk-svg-esqQua"></svg>
        </div>

        <!-- Coluna 3: Quartas esquerdo -->
        <div class="bk-col" id="bk-c-esqQua">
          <div class="bk-col-titulo">🔥 QUARTAS</div>
          <div class="bk-slots">
            <div class="bk-slot">${bkJogo(d.j97, 97)}</div>
            <div class="bk-slot">${bkJogo(d.j98, 98)}</div>
          </div>
        </div>

        <!-- Linhas quartas esq → semi esq -->
        <div class="bk-linhas" id="bk-l-esqSemi">
          <svg class="bk-svg" id="bk-svg-esqSemi"></svg>
        </div>

        <!-- Coluna 4: Semi esquerdo -->
        <div class="bk-col" id="bk-c-esqSemi">
          <div class="bk-col-titulo">⭐ SEMI</div>
          <div class="bk-slots">
            <div class="bk-slot">${bkJogo(d.j101, 101)}</div>
          </div>
        </div>

        <!-- Linhas semi → final -->
        <div class="bk-linhas" id="bk-l-final">
          <svg class="bk-svg" id="bk-svg-final"></svg>
        </div>

        <!-- Coluna 5: Centro (Final + 3º) -->
        <div class="bk-col bk-col-centro" id="bk-c-centro">
          <div class="bk-col-titulo bk-titulo-final">🏆 FINAL</div>
          <div class="bk-slots">
            <div class="bk-1lugar-label">🏆 GRANDE FINAL
              <div class="bk-slot">${bkJogo(d.j104, 104, 'bk-jogo-final')}</div>
            </div>
            <div class="bk-slot bk-slot-3lugar">
              <div class="bk-3lugar-label">🥉 3º LUGAR</div>
              ${bkJogo(d.j103, 103, 'bk-jogo-3lugar')}
            </div>
          </div>
        </div>

        <!-- Linhas final → semi dir -->
        <div class="bk-linhas" id="bk-l-finalDir">
          <svg class="bk-svg" id="bk-svg-finalDir"></svg>
        </div>

        <!-- Coluna 6: Semi direito -->
        <div class="bk-col" id="bk-c-dirSemi">
          <div class="bk-col-titulo">⭐ SEMI</div>
          <div class="bk-slots">
            <div class="bk-slot">${bkJogo(d.j102, 102)}</div>
          </div>
        </div>

        <!-- Linhas semi dir → quartas dir -->
        <div class="bk-linhas" id="bk-l-dirQua">
          <svg class="bk-svg" id="bk-svg-dirQua"></svg>
        </div>

        <!-- Coluna 7: Quartas direito -->
        <div class="bk-col" id="bk-c-dirQua">
          <div class="bk-col-titulo">🔥 QUARTAS</div>
          <div class="bk-slots">
            <div class="bk-slot">${bkJogo(d.j99, 99)}</div>
            <div class="bk-slot">${bkJogo(d.j100, 100)}</div>
          </div>
        </div>

        <!-- Linhas quartas dir → oitavas dir -->
        <div class="bk-linhas" id="bk-l-dirOit">
          <svg class="bk-svg" id="bk-svg-dirOit"></svg>
        </div>

        <!-- Coluna 8: Oitavas direito -->
        <div class="bk-col" id="bk-c-dirOit">
          <div class="bk-col-titulo">⚡ OITAVAS</div>
          <div class="bk-slots">
            ${dirOit.map((d,i) => `<div class="bk-slot">${bkJogo(d, dirONum[i])}</div>`).join('')}
          </div>
        </div>

        <!-- Linhas oitavas dir → 32avos dir -->
        <div class="bk-linhas" id="bk-l-dir32">
          <svg class="bk-svg" id="bk-svg-dir32"></svg>
        </div>

        <!-- Coluna 9: 32avos direito -->
        <div class="bk-col" id="bk-c-dir32">
          <div class="bk-col-titulo">⚡ 16 AVOS</div>
          <div class="bk-slots">
            ${dir32.map((d,i) => `<div class="bk-slot">${bkJogo(d, dirNum[i])}</div>`).join('')}
          </div>
        </div>

      </div>
      <!-- fim bracket desktop -->

    </div>`;

  // Desenha as linhas conectoras após o DOM renderizar
  requestAnimationFrame(() => desenharLinhas());
}

// ============================================================
//  DESENHAR LINHAS CONECTORAS DO BRACKET
// ============================================================
function desenharLinhas() {
  // Conecta pares de slots de uma coluna fonte para slots de coluna destino
  // via SVG dentro do container de linhas entre elas
  function conectar(svgId, containerId, fontSlots, destSlots) {
    const svg = document.getElementById(svgId);
    const container = document.getElementById(containerId);
    if (!svg || !container) return;

    const cRect = container.getBoundingClientRect();
    svg.setAttribute('width', cRect.width);
    svg.setAttribute('height', cRect.height);
    svg.innerHTML = '';

    const cor = '#FFE866'; // amarelo

    for (let i = 0; i < destSlots.length; i++) {
      const a = fontSlots[i * 2];
      const b = fontSlots[i * 2 + 1];
      const dest = destSlots[i];
      if (!a || !b || !dest) continue;

      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      const dRect = dest.getBoundingClientRect();

      // Pontos de saída (meio vertical de cada jogo fonte)
      const y1 = aRect.top + aRect.height / 2 - cRect.top;
      const y2 = bRect.top + bRect.height / 2 - cRect.top;
      // Ponto de entrada (meio vertical do jogo destino)
      const yd = dRect.top + dRect.height / 2 - cRect.top;

      // X: saída do lado direito da coluna fonte, entrada pelo lado esquerdo da destino
      // Container de linhas fica entre as colunas: x esq = 0, x dir = largura total
      const xSaida = svgId.includes('Dir') || svgId.includes('dir') ? cRect.width : 0;
      const xEntrada = svgId.includes('Dir') || svgId.includes('dir') ? 0 : cRect.width;
      const xMeio = cRect.width / 2;

      // Linha vertical entre os dois jogos fonte
      const yTop = Math.min(y1, y2);
      const yBot = Math.max(y1, y2);

      // Saída horizontal de cada fonte até o meio
      svg.innerHTML += `<line x1="${xSaida}" y1="${y1}" x2="${xMeio}" y2="${y1}" stroke="${cor}" stroke-width="2"/>`;
      svg.innerHTML += `<line x1="${xSaida}" y1="${y2}" x2="${xMeio}" y2="${y2}" stroke="${cor}" stroke-width="2"/>`;
      // Linha vertical unindo os dois
      svg.innerHTML += `<line x1="${xMeio}" y1="${yTop}" x2="${xMeio}" y2="${yBot}" stroke="${cor}" stroke-width="2"/>`;
      // Linha horizontal do meio até a entrada do destino
      svg.innerHTML += `<line x1="${xMeio}" y1="${yd}" x2="${xEntrada}" y2="${yd}" stroke="${cor}" stroke-width="2"/>`;
    }
  }

  // Pega todos os .bk-jogo dentro de um container de coluna
  function jogosEm(colId) {
    return Array.from(document.querySelectorAll(`#${colId} .bk-jogo`));
  }

  // Esq: 32avos → oitavas
  conectar('bk-svg-esqOit', 'bk-l-esqOit',
    jogosEm('bk-c-esq32'),
    jogosEm('bk-c-esqOit')
  );
  // Esq: oitavas → quartas
  conectar('bk-svg-esqQua', 'bk-l-esqQua',
    jogosEm('bk-c-esqOit'),
    jogosEm('bk-c-esqQua')
  );
  // Esq: quartas → semi
  conectar('bk-svg-esqSemi', 'bk-l-esqSemi',
    jogosEm('bk-c-esqQua'),
    jogosEm('bk-c-esqSemi')
  );
  // Esq: semi → final
  conectar('bk-svg-final', 'bk-l-final',
    jogosEm('bk-c-esqSemi'),
    jogosEm('bk-c-centro').filter(j => j.dataset.jogo === '104')
  );

  // Dir: semi → final (lado direito, linhas espelhadas)
  conectar('bk-svg-finalDir', 'bk-l-finalDir',
    jogosEm('bk-c-dirSemi'),
    jogosEm('bk-c-centro').filter(j => j.dataset.jogo === '104')
  );
  // Dir: quartas → semi
  conectar('bk-svg-dirQua', 'bk-l-dirQua',
    jogosEm('bk-c-dirQua'),
    jogosEm('bk-c-dirSemi')
  );
  // Dir: oitavas → quartas
  conectar('bk-svg-dirOit', 'bk-l-dirOit',
    jogosEm('bk-c-dirOit'),
    jogosEm('bk-c-dirQua')
  );
  // Dir: 32avos → oitavas
  conectar('bk-svg-dir32', 'bk-l-dir32',
    jogosEm('bk-c-dir32'),
    jogosEm('bk-c-dirOit')
  );
}

window.addEventListener('resize', () => {
  if (document.getElementById('tab-chaveamento')?.classList.contains('active')) {
    desenharLinhas();
  }
});

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
