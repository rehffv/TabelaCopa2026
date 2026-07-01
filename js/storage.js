// ============================================================
//  STORAGE — localStorage para perfis locais + Supabase para a Tabela Oficial
//
//  REGRAS:
//  - "Oficial" é um perfil especial que vive no Supabase.
//    Qualquer visitante pode VER. Só o admin pode EDITAR e PUBLICAR.
//  - Perfis locais (criados pelo usuário) ficam só no localStorage
//    do dispositivo dele. Visitante pode criar/salvar/carregar à vontade.
//  - "Tabela ativa" é o nome do perfil que está sendo exibido agora
//    (pode ser "Oficial" ou um perfil local).
// ============================================================
const Storage = (() => {
  const PREFIX = 'copa2026_';
  const NOME_OFICIAL = 'Oficial';

  function lsGet(key) {
    try { return JSON.parse(localStorage.getItem(PREFIX + key)); }
    catch { return null; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); return true; }
    catch { return false; }
  }

  // ---------- Resultados (estado de trabalho atual, exibido na tela) ----------
  function getResultados() { return lsGet('resultados') || {}; }
  function setResultado(jogoKey, g1, g2) {
    const r = getResultados();
    r[jogoKey] = { g1, g2, ts: Date.now() };
    lsSet('resultados', r);
    return r;
  }

  // ---------- Mata-Mata ----------
  function getMataMata() { return lsGet('matamata') || {}; }
  function setMataMata(jogoKey, data) {
    const mm = getMataMata();
    mm[jogoKey] = { ...data, ts: Date.now() };
    lsSet('matamata', mm);
  }
  function setMataMataCompleto(obj) {
    lsSet('matamata', obj);
  }

  // ---------- Campeão ----------
  function getCampeao() { return lsGet('campeao') || ''; }
  function setCampeao(nome) {
    lsSet('campeao', nome);
  }

  // ---------- Aba ativa ----------
  function getAbaAtiva() { return lsGet('aba_ativa') || 'grupos'; }
  function setAbaAtiva(aba) { lsSet('aba_ativa', aba); }

  // ---------- Tabela ativa (nome do perfil carregado na tela agora) ----------
  function getTabelaAtiva() { return lsGet('tabela_ativa') || null; }
  function setTabelaAtiva(nome) { lsSet('tabela_ativa', nome); }

  // ---------- Cache local da Tabela Oficial (cópia, não editável diretamente) ----------
  function getCacheOficial() { return lsGet('cache_oficial') || null; }
  function setCacheOficial(state) { lsSet('cache_oficial', state); }

  // ---------- Perfis locais (criados pelo usuário, qualquer um pode) ----------
  function salvarPerfil(nome) {
    if (nome === NOME_OFICIAL) return false; // nome reservado
    const perfis = lsGet('perfis') || {};
    perfis[nome] = {
      resultados: getResultados(),
      matamata: getMataMata(),
      campeao: getCampeao(),
      ts: Date.now(),
    };
    lsSet('perfis', perfis);
    setTabelaAtiva(nome);
    return true;
  }

  // Salva um novo perfil local a partir de um estado fornecido (ex: cópia
  // da Tabela Oficial) sem precisar que esses dados estejam na tela.
  function salvarPerfilComDados(nome, state) {
    if (nome === NOME_OFICIAL) return false;
    const perfis = lsGet('perfis') || {};
    perfis[nome] = {
      resultados: state.resultados || {},
      matamata: state.matamata || {},
      campeao: state.campeao || '',
      ts: Date.now(),
    };
    lsSet('perfis', perfis);
    return true;
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
    setTabelaAtiva(nome);
    return true;
  }
  function deletarPerfil(nome) {
    const perfis = lsGet('perfis') || {};
    delete perfis[nome];
    lsSet('perfis', perfis);
    if (getTabelaAtiva() === nome) setTabelaAtiva(null);
  }

  // Carrega a Tabela Oficial na tela
  function carregarOficialNaTela(state) {
    lsSet('resultados', state.resultados || {});
    lsSet('matamata',   state.matamata   || {});
    lsSet('campeao',    state.campeao    || '');
    setTabelaAtiva(NOME_OFICIAL);
    setCacheOficial(state);
  }

  // ---------- Export/Import ----------
  function limparTudo() {
    lsSet('resultados', {});
    lsSet('matamata', {});
    lsSet('campeao', '');
    setTabelaAtiva(null);
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
    NOME_OFICIAL,
    getResultados, setResultado,
    getMataMata, setMataMata, setMataMataCompleto,
    getCampeao, setCampeao,
    getAbaAtiva, setAbaAtiva,
    getTabelaAtiva, setTabelaAtiva,
    getCacheOficial, setCacheOficial,
    salvarPerfil, listarPerfis, carregarPerfil, deletarPerfil,
    salvarPerfilComDados,
    carregarOficialNaTela,
    limparTudo, exportState, importState,
  };
})();

// ============================================================
//  MODO ADMIN
// ============================================================
const AdminMode = (() => {
  const ADMIN_TOKEN = '';
  const SESSION_KEY = 'admin123';

  function isAdmin() {
    return sessionStorage.getItem(SESSION_KEY) === ADMIN_TOKEN;
  }

  function ativar(senhaDigitada) {
    if (senhaDigitada === ADMIN_TOKEN) {
      sessionStorage.setItem(SESSION_KEY, ADMIN_TOKEN);
      return true;
    }
    return false;
  }

  function desativar() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function getToken() {
    return isAdmin() ? ADMIN_TOKEN : null;
  }

  return { isAdmin, ativar, desativar, getToken };
})();

// ============================================================
//  SUPABASE SYNC — Tabela Oficial
//  Leitura: qualquer visitante. Escrita: só via RPC com senha (admin).
// ============================================================
const SupabaseSync = (() => {
  const SUPABASE_URL = 'https://nztcdmidojzhljppkcpp.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56dGNkbWlkb2p6aGxqcHBrY3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3Njc3NTksImV4cCI6MjA5ODM0Mzc1OX0.AaK1nH_wrTPX_8LTImj5wfPMYqc616KmF9LUnmgQIHs';

  function isConfigured() { return SUPABASE_URL !== '' && SUPABASE_KEY !== ''; }

  function headersBase() {
    return {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    };
  }

  // Salva uma chave da Tabela Oficial via função RPC protegida por senha
  async function salvar(chave, valor) {
    if (!isConfigured()) return false;
    if (!AdminMode.isAdmin()) return false;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/salvar_estado_admin`, {
        method: 'POST',
        headers: headersBase(),
        body: JSON.stringify({
          p_id: chave,
          p_valor: JSON.stringify(valor),
          p_token: AdminMode.getToken(),
        }),
      });
      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        console.error('Erro Supabase RPC:', res.status, errBody);
        return false;
      }
      const ok = await res.json();
      return ok === true;
    } catch (e) {
      console.error('Erro de rede ao salvar no Supabase:', e);
      return false;
    }
  }

  // Carrega a Tabela Oficial do Supabase — disponível para qualquer visitante
  async function carregar() {
    if (!isConfigured()) return null;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/copa_estado?select=id,valor`, {
        headers: headersBase(),
      });
      if (!res.ok) return null;
      const rows = await res.json();
      const state = {};
      rows.forEach(row => {
        try { state[row.id] = JSON.parse(row.valor); } catch {}
      });
      return Object.keys(state).length > 0 ? state : null;
    } catch (e) {
      console.error('Erro de rede ao carregar do Supabase:', e);
      return null;
    }
  }

  // Salva o estado atual (tela) no Supabase como Tabela Oficial
  async function salvarOficial() {
    if (!AdminMode.isAdmin()) return false;
    const state = Storage.exportState();
    const ok1 = await salvar('resultados', state.resultados);
    const ok2 = await salvar('matamata',   state.matamata);
    const ok3 = await salvar('campeao',    state.campeao);
    if (ok1 && ok2 && ok3) {
      Storage.setCacheOficial(state);
      return true;
    }
    return false;
  }

  return { isConfigured, salvar, carregar, salvarOficial };
})();
