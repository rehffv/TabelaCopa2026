// ============================================================
//  STORAGE — localStorage primário, Supabase como sync opcional
// ============================================================
const Storage = (() => {
  const PREFIX = 'copa2026_';

  function lsGet(key) {
    try { return JSON.parse(localStorage.getItem(PREFIX + key)); }
    catch { return null; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); return true; }
    catch { return false; }
  }

  // ---------- Resultados ----------
  function getResultados() { return lsGet('resultados') || {}; }
  function setResultado(jogoKey, g1, g2) {
    const r = getResultados();
    r[jogoKey] = { g1, g2, ts: Date.now() };
    lsSet('resultados', r);
    SupabaseSync.salvar('resultados', r).catch(() => {});
    return r;
  }

  // ---------- Mata-Mata ----------
  function getMataMata() { return lsGet('matamata') || {}; }
  function setMataMata(jogoKey, data) {
    const mm = getMataMata();
    mm[jogoKey] = { ...data, ts: Date.now() };
    lsSet('matamata', mm);
    SupabaseSync.salvar('matamata', mm).catch(() => {});
  }
  function setMataMataCompleto(obj) {
    lsSet('matamata', obj);
    SupabaseSync.salvar('matamata', obj).catch(() => {});
  }

  // ---------- Campeão ----------
  function getCampeao() { return lsGet('campeao') || ''; }
  function setCampeao(nome) {
    lsSet('campeao', nome);
    SupabaseSync.salvar('campeao', nome).catch(() => {});
  }

  // ---------- Aba ativa ----------
  function getAbaAtiva() { return lsGet('aba_ativa') || 'grupos'; }
  function setAbaAtiva(aba) { lsSet('aba_ativa', aba); }

  // ---------- Perfil de teste ----------
  function salvarPerfil(nome) {
    const perfis = lsGet('perfis') || {};
    perfis[nome] = {
      resultados: getResultados(),
      matamata: getMataMata(),
      campeao: getCampeao(),
      ts: Date.now(),
    };
    lsSet('perfis', perfis);
  }
  function listarPerfis() {
    const perfis = lsGet('perfis') || {};
    return Object.entries(perfis).map(([nome, data]) => ({ nome, ts: data.ts }));
  }
  function carregarPerfil(nome) {
    const perfis = lsGet('perfis') || {};
    const p = perfis[nome];
    if (!p) return false;
    lsSet('resultados', p.resultados || {});
    lsSet('matamata',   p.matamata   || {});
    lsSet('campeao',    p.campeao    || '');
    return true;
  }
  function deletarPerfil(nome) {
    const perfis = lsGet('perfis') || {};
    delete perfis[nome];
    lsSet('perfis', perfis);
  }

  // ---------- Bolão/Palpite ----------
  function getPalpite() { return lsGet('palpite') || {}; }
  function setPalpite(jogoKey, data) {
    const p = getPalpite();
    p[jogoKey] = { ...data, ts: Date.now() };
    lsSet('palpite', p);
  }
  function setPalpiteCompleto(obj) { lsSet('palpite', obj); }
  function getCampeaoPalpite() { return lsGet('campeao_palpite') || ''; }
  function setCampeaoPalpite(nome) { lsSet('campeao_palpite', nome); }

  // ---------- Export/Import ----------
  function limparTudo() {
    lsSet('resultados', {});
    lsSet('matamata', {});
    lsSet('campeao', '');
  }
  function exportState() {
    return {
      resultados: getResultados(),
      matamata: getMataMata(),
      campeao: getCampeao(),
    };
  }
  function importState(state) {
    if (state.resultados) lsSet('resultados', state.resultados);
    if (state.matamata)   lsSet('matamata',   state.matamata);
    if (state.campeao !== undefined) lsSet('campeao', state.campeao);
  }

  return {
    getResultados, setResultado,
    getMataMata, setMataMata, setMataMataCompleto,
    getCampeao, setCampeao,
    getAbaAtiva, setAbaAtiva,
    salvarPerfil, listarPerfis, carregarPerfil, deletarPerfil,
    getPalpite, setPalpite, setPalpiteCompleto,
    getCampeaoPalpite, setCampeaoPalpite,
    limparTudo, exportState, importState,
  };
})();

// ============================================================
//  SUPABASE SYNC — opcional
// ============================================================
const SupabaseSync = (() => {
  const SUPABASE_URL = '';
  const SUPABASE_KEY = '';

  function isConfigured() { return SUPABASE_URL !== '' && SUPABASE_KEY !== ''; }

  async function salvar(chave, valor) {
    if (!isConfigured()) return;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/copa_estado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({ id: chave, valor: JSON.stringify(valor) }),
    });
    return res.ok;
  }

  async function carregar() {
    if (!isConfigured()) return null;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/copa_estado?select=id,valor`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      }
    });
    if (!res.ok) return null;
    const rows = await res.json();
    const state = {};
    rows.forEach(row => {
      try { state[row.id] = JSON.parse(row.valor); } catch {}
    });
    return state;
  }

  return { isConfigured, salvar, carregar };
})();