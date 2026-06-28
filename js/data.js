// ============================================================
//  COPA DO MUNDO 2026 — DADOS OFICIAIS
//  Bandeiras: quando você tiver os arquivos em assets/flags/,
//  troque FLAG_PATH abaixo e use getFlagImg(cod) no app.
// ============================================================

// ---- CONFIGURAÇÃO DE BANDEIRAS ----
// Troque para 'assets/flags/' quando tiver as imagens prontas.
// Cada arquivo deve se chamar: COD.png  ex: BRA.png, ARG.png
const FLAG_PATH = null; // ex: 'assets/flags/'

// Retorna <img> se FLAG_PATH estiver configurado, senão emoji
function getFlagImg(cod, emoji, nomeAlt) {
  if (FLAG_PATH) {
    return `<img src="${FLAG_PATH}${cod}.png" alt="${nomeAlt}" class="flag-img" onerror="this.style.display='none'">`;
  }
  return `<span class="flag-emoji">${emoji}</span>`;
}

// ---- MAPA DE TODOS OS PAÍSES (cod → { emoji, nome }) ----
// Adicione aqui conforme for colocando bandeiras na pasta assets/flags/
const PAISES = {
  MEX: { emoji: '<img src="assets/flags/mx.svg" alt="México" class="flag-img">', nome: 'México' },
  RSA: { emoji: '<img src="assets/flags/za.svg" alt="África do Sul" class="flag-img">', nome: 'África do Sul' },
  KOR: { emoji: '<img src="assets/flags/kr.svg" alt="Coreia do Sul" class="flag-img">', nome: 'Coreia do Sul' },
  CZE: { emoji: '<img src="assets/flags/cz.svg" alt="República Tcheca" class="flag-img">', nome: 'República Tcheca' },
  CAN: { emoji: '<img src="assets/flags/ca.svg" alt="Canadá" class="flag-img">', nome: 'Canadá' },
  BIH: { emoji: '<img src="assets/flags/ba.svg" alt="Bósnia-Herzegovina" class="flag-img">', nome: 'Bósnia-Herzegovina' },
  QAT: { emoji: '<img src="assets/flags/qa.svg" alt="Catar" class="flag-img">', nome: 'Catar' },
  SUI: { emoji: '<img src="assets/flags/ch.svg" alt="Suíça" class="flag-img">', nome: 'Suíça' },
  BRA: { emoji: '<img src="assets/flags/br.svg" alt="Brasil" class="flag-img">', nome: 'Brasil' },
  MAR: { emoji: '<img src="assets/flags/ma.svg" alt="Marrocos" class="flag-img">', nome: 'Marrocos' },
  HAI: { emoji: '<img src="assets/flags/ht.svg" alt="Haiti" class="flag-img">', nome: 'Haiti' },
  SCO: { emoji: '<img src="assets/flags/gb-sct.svg" alt="Escócia" class="flag-img">', nome: 'Escócia' },
  USA: { emoji: '<img src="assets/flags/us.svg" alt="Estados Unidos" class="flag-img">', nome: 'Estados Unidos' },
  PAR: { emoji: '<img src="assets/flags/py.svg" alt="Paraguai" class="flag-img">', nome: 'Paraguai' },
  AUS: { emoji: '<img src="assets/flags/au.svg" alt="Austrália" class="flag-img">', nome: 'Austrália' },
  TUR: { emoji: '<img src="assets/flags/tr.svg" alt="Turquia" class="flag-img">', nome: 'Turquia' },
  GER: { emoji: '<img src="assets/flags/de.svg" alt="Alemanha" class="flag-img">', nome: 'Alemanha' },
  CUR: { emoji: '<img src="assets/flags/cw.svg" alt="Curaçao" class="flag-img">', nome: 'Curaçao' },
  CIV: { emoji: '<img src="assets/flags/ci.svg" alt="Costa do Marfim" class="flag-img">', nome: 'Costa do Marfim' },
  ECU: { emoji: '<img src="assets/flags/ec.svg" alt="Equador" class="flag-img">', nome: 'Equador' },
  NED: { emoji: '<img src="assets/flags/nl.svg" alt="Holanda" class="flag-img">', nome: 'Holanda' },
  JPN: { emoji: '<img src="assets/flags/jp.svg" alt="Japão" class="flag-img">', nome: 'Japão' },
  SWE: { emoji: '<img src="assets/flags/se.svg" alt="Suécia" class="flag-img">', nome: 'Suécia' },
  TUN: { emoji: '<img src="assets/flags/tn.svg" alt="Tunísia" class="flag-img">', nome: 'Tunísia' },
  BEL: { emoji: '<img src="assets/flags/be.svg" alt="Bélgica" class="flag-img">', nome: 'Bélgica' },
  EGY: { emoji: '<img src="assets/flags/eg.svg" alt="Egito" class="flag-img">', nome: 'Egito' },
  IRN: { emoji: '<img src="assets/flags/ir.svg" alt="Irã" class="flag-img">', nome: 'Irã' },
  NZL: { emoji: '<img src="assets/flags/nz.svg" alt="Nova Zelândia" class="flag-img">', nome: 'Nova Zelândia' },
  ESP: { emoji: '<img src="assets/flags/es.svg" alt="Espanha" class="flag-img">', nome: 'Espanha' },
  CPV: { emoji: '<img src="assets/flags/cv.svg" alt="Cabo Verde" class="flag-img">', nome: 'Cabo Verde' },
  KSA: { emoji: '<img src="assets/flags/sa.svg" alt="Arábia Saudita" class="flag-img">', nome: 'Arábia Saudita' },
  URU: { emoji: '<img src="assets/flags/uy.svg" alt="Uruguai" class="flag-img">', nome: 'Uruguai' },
  FRA: { emoji: '<img src="assets/flags/fr.svg" alt="França" class="flag-img">', nome: 'França' },
  SEN: { emoji: '<img src="assets/flags/sn.svg" alt="Senegal" class="flag-img">', nome: 'Senegal' },
  NOR: { emoji: '<img src="assets/flags/no.svg" alt="Noruega" class="flag-img">', nome: 'Noruega' },
  IRQ: { emoji: '<img src="assets/flags/iq.svg" alt="Iraque" class="flag-img">', nome: 'Iraque' },
  ARG: { emoji: '<img src="assets/flags/ar.svg" alt="Argentina" class="flag-img">', nome: 'Argentina' },
  ALG: { emoji: '<img src="assets/flags/dz.svg" alt="Argélia" class="flag-img">', nome: 'Argélia' },
  AUT: { emoji: '<img src="assets/flags/at.svg" alt="Áustria" class="flag-img">', nome: 'Áustria' },
  JOR: { emoji: '<img src="assets/flags/jo.svg" alt="Jordânia" class="flag-img">', nome: 'Jordânia' },
  POR: { emoji: '<img src="assets/flags/pt.svg" alt="Portugal" class="flag-img">', nome: 'Portugal' },
  UZB: { emoji: '<img src="assets/flags/uz.svg" alt="Uzbequistão" class="flag-img">', nome: 'Uzbequistão' },
  COL: { emoji: '<img src="assets/flags/co.svg" alt="Colômbia" class="flag-img">', nome: 'Colômbia' },
  COD: { emoji: '<img src="assets/flags/cd.svg" alt="RD Congo" class="flag-img">', nome: 'RD Congo' },
  ENG: { emoji: '<img src="assets/flags/gb-eng.svg" alt="Inglaterra" class="flag-img">', nome: 'Inglaterra' },
  CRO: { emoji: '<img src="assets/flags/hr.svg" alt="Croácia" class="flag-img">', nome: 'Croácia' },
  GHA: { emoji: '<img src="assets/flags/gh.svg" alt="Gana" class="flag-img">', nome: 'Gana' },
  PAN: { emoji: '<img src="assets/flags/pa.svg" alt="Panamá" class="flag-img">', nome: 'Panamá' },
};

// Helper: retorna objeto time com cod
function time(cod) {
  const p = PAISES[cod];
  return { cod, nome: p.nome, flag: p.emoji };
}

// ============================================================
//  GRUPOS
// ============================================================
const GRUPOS = [
  {
    letra: 'A',
    // Ordem: México(0), África do Sul(1), Coreia do Sul(2), República Tcheca(3)
    times: [ time('MEX'), time('RSA'), time('KOR'), time('CZE') ],
    jogos: [
      // 1ª rodada
      { data: '11/06', hora: '16:00', t1: 0, t2: 1, local: 'Cidade do México' }, // México x África do Sul
      { data: '11/06', hora: '23:00', t1: 2, t2: 3, local: 'Guadalajara' },      // Coreia do Sul x República Tcheca
      // 2ª rodada
      { data: '18/06', hora: '13:00', t1: 3, t2: 1, local: 'Atlanta' },          // República Tcheca x África do Sul
      { data: '18/06', hora: '22:00', t1: 0, t2: 2, local: 'Guadalajara' },      // México x Coreia do Sul
      // 3ª rodada
      { data: '24/06', hora: '22:00', t1: 3, t2: 0, local: 'Cidade do México' }, // República Tcheca x México
      { data: '24/06', hora: '22:00', t1: 1, t2: 2, local: 'Monterrey' },        // África do Sul x Coreia do Sul
    ]
  },
  {
    letra: 'B',
    // Ordem: Canadá(0), Bósnia-Herzegovina(1), Catar(2), Suíça(3)
    times: [ time('CAN'), time('BIH'), time('QAT'), time('SUI') ],
    jogos: [
      // 1ª rodada
      { data: '12/06', hora: '16:00', t1: 0, t2: 1, local: 'Toronto' },          // Canadá x Bósnia-Herzegovina
      { data: '13/06', hora: '16:00', t1: 2, t2: 3, local: 'Santa Clara' },      // Catar x Suíça
      // 2ª rodada
      { data: '18/06', hora: '16:00', t1: 3, t2: 1, local: 'Los Angeles' },      // Suíça x Bósnia-Herzegovina
      { data: '18/06', hora: '19:00', t1: 0, t2: 2, local: 'Vancouver' },        // Canadá x Catar
      // 3ª rodada
      { data: '24/06', hora: '16:00', t1: 3, t2: 0, local: 'Vancouver' },        // Suíça x Canadá
      { data: '24/06', hora: '16:00', t1: 1, t2: 2, local: 'Seattle' },          // Bósnia-Herzegovina x Catar
    ]
  },
  {
    letra: 'C',
    // Ordem: Brasil(0), Marrocos(1), Haiti(2), Escócia(3)
    times: [ time('BRA'), time('MAR'), time('HAI'), time('SCO') ],
    jogos: [
      // 1ª rodada
      { data: '13/06', hora: '19:00', t1: 0, t2: 1, local: 'Nova York/Nova Jersey' }, // Brasil x Marrocos
      { data: '13/06', hora: '22:00', t1: 2, t2: 3, local: 'Boston' },                // Haiti x Escócia
      // 2ª rodada
      { data: '19/06', hora: '19:00', t1: 3, t2: 1, local: 'Boston' },                // Escócia x Marrocos
      { data: '19/06', hora: '21:30', t1: 0, t2: 2, local: 'Filadélfia' },            // Brasil x Haiti
      // 3ª rodada
      { data: '24/06', hora: '19:00', t1: 3, t2: 0, local: 'Miami' },                 // Escócia x Brasil
      { data: '24/06', hora: '19:00', t1: 1, t2: 2, local: 'Atlanta' },               // Marrocos x Haiti
    ]
  },
  {
    letra: 'D',
    // Ordem: Estados Unidos(0), Paraguai(1), Austrália(2), Turquia(3)
    times: [ time('USA'), time('PAR'), time('AUS'), time('TUR') ],
    jogos: [
      // 1ª rodada
      { data: '12/06', hora: '22:00', t1: 0, t2: 1, local: 'Los Angeles' },      // Estados Unidos x Paraguai
      { data: '13/06', hora: '01:00', t1: 2, t2: 3, local: 'Vancouver' },        // Austrália x Turquia (madrugada de 14/06 no Brasil)
      // 2ª rodada
      { data: '19/06', hora: '16:00', t1: 0, t2: 2, local: 'Seattle' },          // Estados Unidos x Austrália
      { data: '19/06', hora: '00:00', t1: 3, t2: 1, local: 'Santa Clara' },      // Turquia x Paraguai (madrugada de 20/06 no Brasil)
      // 3ª rodada
      { data: '25/06', hora: '23:00', t1: 3, t2: 0, local: 'Los Angeles' },      // Turquia x Estados Unidos
      { data: '25/06', hora: '23:00', t1: 1, t2: 2, local: 'Santa Clara' },      // Paraguai x Austrália
    ]
  },
  {
    letra: 'E',
    // Ordem: Alemanha(0), Curaçao(1), Costa do Marfim(2), Equador(3)
    times: [ time('GER'), time('CUR'), time('CIV'), time('ECU') ],
    jogos: [
      // 1ª rodada
      { data: '14/06', hora: '14:00', t1: 0, t2: 1, local: 'Houston' },          // Alemanha x Curaçao
      { data: '14/06', hora: '20:00', t1: 2, t2: 3, local: 'Filadélfia' },       // Costa do Marfim x Equador
      // 2ª rodada
      { data: '20/06', hora: '17:00', t1: 0, t2: 2, local: 'Toronto' },          // Alemanha x Costa do Marfim
      { data: '20/06', hora: '21:00', t1: 3, t2: 1, local: 'Kansas City' },      // Equador x Curaçao
      // 3ª rodada
      { data: '25/06', hora: '17:00', t1: 3, t2: 0, local: 'Nova York/Nova Jersey' }, // Equador x Alemanha
      { data: '25/06', hora: '17:00', t1: 1, t2: 2, local: 'Filadélfia' },             // Curaçao x Costa do Marfim
    ]
  },
  {
    letra: 'F',
    // Ordem: Holanda(0), Japão(1), Suécia(2), Tunísia(3)
    times: [ time('NED'), time('JPN'), time('SWE'), time('TUN') ],
    jogos: [
      // 1ª rodada
      { data: '14/06', hora: '17:00', t1: 0, t2: 1, local: 'Dallas' },           // Holanda x Japão
      { data: '14/06', hora: '23:00', t1: 2, t2: 3, local: 'Monterrey' },        // Suécia x Tunísia
      // 2ª rodada
      { data: '20/06', hora: '14:00', t1: 0, t2: 2, local: 'Houston' },          // Holanda x Suécia
      { data: '20/06', hora: '01:00', t1: 3, t2: 1, local: 'Monterrey' },        // Tunísia x Japão (madrugada de 21/06 no Brasil)
      // 3ª rodada
      { data: '25/06', hora: '20:00', t1: 1, t2: 2, local: 'Dallas' },           // Japão x Suécia
      { data: '25/06', hora: '20:00', t1: 3, t2: 0, local: 'Kansas City' },      // Tunísia x Holanda
    ]
  },
  {
    letra: 'G',
    // Ordem: Bélgica(0), Egito(1), Irã(2), Nova Zelândia(3)
    times: [ time('BEL'), time('EGY'), time('IRN'), time('NZL') ],
    jogos: [
      // 1ª rodada
      { data: '15/06', hora: '16:00', t1: 0, t2: 1, local: 'Seattle' },          // Bélgica x Egito
      { data: '15/06', hora: '22:00', t1: 2, t2: 3, local: 'Los Angeles' },      // Irã x Nova Zelândia
      // 2ª rodada
      { data: '21/06', hora: '16:00', t1: 0, t2: 2, local: 'Los Angeles' },      // Bélgica x Irã
      { data: '21/06', hora: '22:00', t1: 3, t2: 1, local: 'Vancouver' },        // Nova Zelândia x Egito
      // 3ª rodada
      { data: '26/06', hora: '00:00', t1: 1, t2: 2, local: 'Seattle' },          // Egito x Irã (madrugada de 27/06 no Brasil)
      { data: '26/06', hora: '00:00', t1: 3, t2: 0, local: 'Vancouver' },        // Nova Zelândia x Bélgica (madrugada de 27/06 no Brasil)
    ]
  },
  {
    letra: 'H',
    // Ordem: Espanha(0), Cabo Verde(1), Arábia Saudita(2), Uruguai(3)
    times: [ time('ESP'), time('CPV'), time('KSA'), time('URU') ],
    jogos: [
      // 1ª rodada
      { data: '15/06', hora: '13:00', t1: 0, t2: 1, local: 'Atlanta' },          // Espanha x Cabo Verde
      { data: '15/06', hora: '19:00', t1: 2, t2: 3, local: 'Miami' },            // Arábia Saudita x Uruguai
      // 2ª rodada
      { data: '21/06', hora: '13:00', t1: 0, t2: 2, local: 'Atlanta' },          // Espanha x Arábia Saudita
      { data: '21/06', hora: '19:00', t1: 3, t2: 1, local: 'Miami' },            // Uruguai x Cabo Verde
      // 3ª rodada
      { data: '26/06', hora: '21:00', t1: 1, t2: 2, local: 'Houston' },          // Cabo Verde x Arábia Saudita
      { data: '26/06', hora: '21:00', t1: 3, t2: 0, local: 'Guadalajara' },       // Uruguai x Espanha
    ]
  },
  {
    letra: 'I',
    // Ordem: França(0), Senegal(1), Iraque(2), Noruega(3)
    times: [ time('FRA'), time('SEN'), time('IRQ'), time('NOR')  ],
    jogos: [
      // 1ª rodada
      { data: '16/06', hora: '16:00', t1: 0, t2: 1, local: 'Nova York/Nova Jersey' }, // França x Senegal
      { data: '16/06', hora: '19:00', t1: 2, t2: 3, local: 'Boston' },                // Iraque x Noruega
      // 2ª rodada
      { data: '22/06', hora: '18:00', t1: 0, t2: 2, local: 'Filadélfia' },             // França x Iraque
      { data: '22/06', hora: '21:00', t1: 3, t2: 1, local: 'Nova York/Nova Jersey' }, // Noruega x Senegal
      // 3ª rodada
      { data: '26/06', hora: '16:00', t1: 3, t2: 0, local: 'Boston' },                // Noruega x França
      { data: '26/06', hora: '16:00', t1: 1, t2: 2, local: 'Toronto' },               // Senegal x Iraque
    ]
  },
  {
    letra: 'J',
    // Ordem: Argentina(0), Argélia(1), Áustria(2), Jordânia(3)
    times: [ time('ARG'), time('ALG'), time('AUT'), time('JOR') ],
    jogos: [
      // 1ª rodada
      { data: '16/06', hora: '22:00', t1: 0, t2: 1, local: 'Kansas City' },      // Argentina x Argélia
      { data: '16/06', hora: '01:00', t1: 2, t2: 3, local: 'Santa Clara' },      // Áustria x Jordânia (madrugada de 17/06 no Brasil)
      // 2ª rodada
      { data: '22/06', hora: '14:00', t1: 0, t2: 2, local: 'Dallas' },           // Argentina x Áustria
      { data: '22/06', hora: '00:00', t1: 3, t2: 1, local: 'Santa Clara' },      // Jordânia x Argélia (madrugada de 23/06 no Brasil)
      // 3ª rodada
      { data: '27/06', hora: '23:00', t1: 1, t2: 2, local: 'Kansas City' },      // Argélia x Áustria
      { data: '27/06', hora: '23:00', t1: 3, t2: 0, local: 'Dallas' },           // Jordânia x Argentina
    ]
  },
  {
    letra: 'K',
    // Ordem: Portugal(0), RD Congo(1), Uzbequistão(2), Colômbia(3)
    times: [ time('POR'), time('COD'), time('UZB'), time('COL')  ],
    jogos: [
      // 1ª rodada
      { data: '17/06', hora: '14:00', t1: 0, t2: 1, local: 'Houston' },          // Portugal x RD Congo
      { data: '17/06', hora: '23:00', t1: 2, t2: 3, local: 'Cidade do México' }, // Uzbequistão x Colômbia
      // 2ª rodada
      { data: '23/06', hora: '14:00', t1: 0, t2: 2, local: 'Houston' },          // Portugal x Uzbequistão
      { data: '23/06', hora: '23:00', t1: 3, t2: 1, local: 'Guadalajara' },       // Colômbia x RD do Congo
      // 3ª rodada
      { data: '27/06', hora: '20:30', t1: 3, t2: 0, local: 'Miami' },            // Colômbia x Portugal
      { data: '27/06', hora: '20:30', t1: 1, t2: 2, local: 'Atlanta' },          // RD Congo x Uzbequistão
    ]
  },
  {
    letra: 'L',
    // Ordem: Inglaterra(0), Croácia(1), Gana(2), Panamá(3)
    times: [ time('ENG'), time('CRO'), time('GHA'), time('PAN') ],
    jogos: [
      // 1ª rodada
      { data: '17/06', hora: '17:00', t1: 0, t2: 1, local: 'Dallas' },           // Inglaterra x Croácia
      { data: '17/06', hora: '20:00', t1: 2, t2: 3, local: 'Toronto' },          // Gana x Panamá
      // 2ª rodada
      { data: '23/06', hora: '17:00', t1: 0, t2: 2, local: 'Boston' },           // Inglaterra x Gana
      { data: '23/06', hora: '20:00', t1: 3, t2: 1, local: 'Toronto' },          // Panamá x Croácia
      // 3ª rodada
      { data: '27/06', hora: '18:00', t1: 3, t2: 0, local: 'Nova York/Nova Jersey' }, // Panamá x Inglaterra
      { data: '27/06', hora: '18:00', t1: 1, t2: 2, local: 'Filadélfia' },            // Croácia x Gana
    ]
  },
];

// ============================================================
//  CHAVEAMENTO DOS 32 AVOS
// ============================================================
const CHAVEAMENTO_32 = [
  { jogo: 1,  vaga1: '1A', vaga2: '2B' },
  { jogo: 2,  vaga1: '1C', vaga2: '2D' },
  { jogo: 3,  vaga1: '1E', vaga2: '2F' },
  { jogo: 4,  vaga1: '1G', vaga2: '2H' },
  { jogo: 5,  vaga1: '1I', vaga2: '2J' },
  { jogo: 6,  vaga1: '1K', vaga2: '2L' },
  { jogo: 7,  vaga1: '1B', vaga2: '2A' },
  { jogo: 8,  vaga1: '1D', vaga2: '2C' },
  { jogo: 9,  vaga1: '1F', vaga2: '2E' },
  { jogo: 10, vaga1: '1H', vaga2: '2G' },
  { jogo: 11, vaga1: '1J', vaga2: '2I' },
  { jogo: 12, vaga1: '1L', vaga2: '2K' },
  { jogo: 13, vaga1: '3A/B/C/D', vaga2: '3E/F/G/H' },
  { jogo: 14, vaga1: '3I/J/K/L', vaga2: '3A/B/E/F' },
  { jogo: 15, vaga1: '3C/D/G/H', vaga2: '3A/B/I/J' },
  { jogo: 16, vaga1: '3C/D/K/L', vaga2: '3E/F/K/L' },
];



// ============================================================
//  FASES FINAIS (MATA-MATA OFICIAL FIFA 2026)
// ============================================================

const FASE_16_AVOS = [
  { jogo: 73, data: '28/06', hora: '16:00', local: 'Los Angeles',            vaga1: '2A',         vaga2: '2B' },
  { jogo: 74, data: '29/06', hora: '17:30', local: 'Boston',                 vaga1: '1E',         vaga2: '3A/B/C/D/F' },
  { jogo: 75, data: '29/06', hora: '22:00', local: 'Monterrey',              vaga1: '1F',         vaga2: '2C' },
  { jogo: 76, data: '29/06', hora: '14:00', local: 'Houston',                vaga1: '1C',         vaga2: '2F' },
  { jogo: 77, data: '30/06', hora: '18:00', local: 'Nova York/Nova Jersey',  vaga1: '1I',         vaga2: '3C/D/F/G/H' },
  { jogo: 78, data: '30/06', hora: '14:00', local: 'Dallas',                 vaga1: '2E',         vaga2: '2I' },
  { jogo: 79, data: '30/06', hora: '22:00', local: 'Cidade do México',       vaga1: '1A',         vaga2: '3C/E/F/H/I' },
  { jogo: 80, data: '01/07', hora: '13:00', local: 'Atlanta',                vaga1: '1L',         vaga2: '3E/H/I/J/K' },
  { jogo: 81, data: '01/07', hora: '21:00', local: 'Santa Clara',            vaga1: '1D',         vaga2: '3B/E/F/I/J' },
  { jogo: 82, data: '01/07', hora: '17:00', local: 'Seattle',                vaga1: '1G',         vaga2: '3A/E/H/I/J' },
  { jogo: 83, data: '02/07', hora: '20:00', local: 'Toronto',                vaga1: '2K',         vaga2: '2L' },
  { jogo: 84, data: '02/07', hora: '16:00', local: 'Los Angeles',            vaga1: '1H',         vaga2: '2J' },
  { jogo: 85, data: '03/07', hora: '00:00', local: 'Vancouver',              vaga1: '1B',         vaga2: '3E/F/G/I/J' },
  { jogo: 86, data: '03/07', hora: '19:00', local: 'Miami',                  vaga1: '1J',         vaga2: '2H' },
  { jogo: 87, data: '03/07', hora: '22:30', local: 'Kansas City',            vaga1: '1K',         vaga2: '3D/E/I/J/L' },
  { jogo: 88, data: '03/07', hora: '15:00', local: 'Dallas',                 vaga1: '2D',         vaga2: '2G' },
];

const OITAVAS_DE_FINAL = [
  { jogo: 89, data: '04/07', hora: '18:00', local: 'Filadélfia',             vaga1: 'Vencedor J74', vaga2: 'Vencedor J77' },
  { jogo: 90, data: '04/07', hora: '14:00', local: 'Houston',                vaga1: 'Vencedor J73', vaga2: 'Vencedor J75' },
  { jogo: 91, data: '05/07', hora: '17:00', local: 'Nova York/Nova Jersey',  vaga1: 'Vencedor J76', vaga2: 'Vencedor J78' },
  { jogo: 92, data: '05/07', hora: '21:00', local: 'Cidade do México',       vaga1: 'Vencedor J79', vaga2: 'Vencedor J80' },
  { jogo: 93, data: '06/07', hora: '16:00', local: 'Dallas',                 vaga1: 'Vencedor J83', vaga2: 'Vencedor J84' },
  { jogo: 94, data: '06/07', hora: '21:00', local: 'Seattle',                vaga1: 'Vencedor J81', vaga2: 'Vencedor J82' },
  { jogo: 95, data: '07/07', hora: '13:00', local: 'Atlanta',                vaga1: 'Vencedor J86', vaga2: 'Vencedor J88' },
  { jogo: 96, data: '07/07', hora: '17:00', local: 'Vancouver',              vaga1: 'Vencedor J85', vaga2: 'Vencedor J87' },
];

const QUARTAS_DE_FINAL = [
  { jogo: 97,  data: '09/07', hora: '17:00', local: 'Boston',       vaga1: 'Vencedor J89', vaga2: 'Vencedor J90' },
  { jogo: 98,  data: '10/07', hora: '16:00', local: 'Los Angeles',  vaga1: 'Vencedor J93', vaga2: 'Vencedor J94' },
  { jogo: 99,  data: '11/07', hora: '18:00', local: 'Miami',        vaga1: 'Vencedor J91', vaga2: 'Vencedor J92' },
  { jogo: 100, data: '11/07', hora: '22:00', local: 'Kansas City',  vaga1: 'Vencedor J95', vaga2: 'Vencedor J96' },
];

const SEMIFINAIS = [
  { jogo: 101, data: '14/07', hora: '16:00', local: 'Dallas',  vaga1: 'Vencedor J97', vaga2: 'Vencedor J98' },
  { jogo: 102, data: '15/07', hora: '16:00', local: 'Atlanta', vaga1: 'Vencedor J99', vaga2: 'Vencedor J100' },
];

const TERCEIRO_LUGAR = [
  { jogo: 103, data: '18/07', hora: '18:00', local: 'Miami', vaga1: 'Perdedor J101', vaga2: 'Perdedor J102' },
];

const FINAL = [
  { jogo: 104, data: '19/07', hora: '16:00', local: 'Nova York/Nova Jersey', vaga1: 'Vencedor J101', vaga2: 'Vencedor J102' },
];


// ============================================================
//  LISTA DE TIMES PARA DROPDOWN DO MATA-MATA
// ============================================================
const TODOS_TIMES = Object.entries(PAISES).map(([cod, p]) => ({
  cod,
  nome: p.nome,
  flag: p.emoji,
})).sort((a, b) => a.nome.localeCompare(b.nome));




/// ============================================================
//  TABELA FIFA — COMBINAÇÕES DE 3ºS COLOCADOS (Anexo C)
//  Fonte: Regulamento Oficial FIFA Copa 2026 + Wikipedia
//
//  Estrutura de cada linha:
//  g: string com as 8 letras dos grupos classificados (ordem alfabética)
//  r: array com os 3ºs para cada vaga, na ordem:
//     [1A, 1B, 1D, 1E, 1G, 1I, 1K, 1L]
//     ex: 'E' significa que o 3º do Grupo E vai para aquele slot
// ============================================================
const TABELA_495 = [
  { g:'EFGHIJKL', r:['E','J','I','F','H','G','L','K'] }, // 1
  { g:'DFGHIJKL', r:['H','G','I','D','J','F','L','K'] }, // 2
  { g:'DEGHIJKL', r:['E','J','I','D','H','G','L','K'] }, // 3
  { g:'DEFHIJKL', r:['E','J','I','D','H','F','L','K'] }, // 4
  { g:'DEFGIJKL', r:['E','G','I','D','J','F','L','K'] }, // 5
  { g:'DEFGHJKL', r:['E','G','J','D','H','F','L','K'] }, // 6
  { g:'DEFGHIKL', r:['E','G','I','D','H','F','L','K'] }, // 7
  { g:'DEFGHIJL', r:['E','G','J','D','H','F','L','I'] }, // 8
  { g:'DEFGHIJK', r:['E','G','J','D','H','F','I','K'] }, // 9
  { g:'CFGHIJKL', r:['H','G','I','C','J','F','L','K'] }, // 10
  //Vou passar somente as 10 primeiras linhas para você ver a estrutura da tabela. Abaixo tenho a tabla completa.

//E aqui acaba o data.js

  { g:'CEGHIJKL', r:['E','J','I','C','H','G','L','K'] }, // 11
  { g:'CEFHIJKL', r:['E','J','I','C','H','F','L','K'] }, // 12
  { g:'CEFGIJKL', r:['E','G','I','C','J','F','L','K'] }, // 13
  { g:'CEFGHJKL', r:['E','G','J','C','H','F','L','K'] }, // 14
  { g:'CEFGHIKL', r:['E','G','I','C','H','F','L','K'] }, // 15
  { g:'CEFGHIJL', r:['E','G','J','C','H','F','L','I'] }, // 16
  { g:'CEFGHIJK', r:['E','G','J','C','H','F','I','K'] }, // 17
  { g:'CDGHIJKL', r:['H','G','I','C','J','D','L','K'] }, // 18
  { g:'CDFHIJKL', r:['C','J','I','D','H','F','L','K'] }, // 19
  { g:'CDFGIJKL', r:['C','G','I','D','J','F','L','K'] }, // 20
  { g:'CDFGHJKL', r:['C','G','J','D','H','F','L','K'] }, // 21
  { g:'CDFGHIKL', r:['C','G','I','D','H','F','L','K'] }, // 22
  { g:'CDFGHIJL', r:['C','G','J','D','H','F','L','I'] }, // 23
  { g:'CDFGHIJK', r:['C','G','J','D','H','F','I','K'] }, // 24
  { g:'CDEHIJKL', r:['E','J','I','C','H','D','L','K'] }, // 25
  { g:'CDEGIJKL', r:['E','G','I','C','J','D','L','K'] }, // 26
  { g:'CDEGHJKL', r:['E','G','J','C','H','D','L','K'] }, // 27
  { g:'CDEGHIKL', r:['E','G','I','C','H','D','L','K'] }, // 28
  { g:'CDEGHIJL', r:['E','G','J','C','H','D','L','I'] }, // 29
  { g:'CDEGHIJK', r:['E','G','J','C','H','D','I','K'] }, // 30
  { g:'CDEFIJKL', r:['C','J','E','D','I','F','L','K'] }, // 31
  { g:'CDEFHJKL', r:['C','J','E','D','H','F','L','K'] }, // 32
  { g:'CDEFHIKL', r:['C','E','I','D','H','F','L','K'] }, // 33
  { g:'CDEFHIJL', r:['C','J','E','D','H','F','L','I'] }, // 34
  { g:'CDEFHIJK', r:['C','J','E','D','H','F','I','K'] }, // 35
  { g:'CDEFGJKL', r:['C','G','E','D','J','F','L','K'] }, // 36
  { g:'CDEFGIKL', r:['C','G','E','D','I','F','L','K'] }, // 37
  { g:'CDEFGIJL', r:['C','G','E','D','J','F','L','I'] }, // 38
  { g:'CDEFGIJK', r:['C','G','E','D','J','F','I','K'] }, // 39
  { g:'CDEFGHKL', r:['C','G','E','D','H','F','L','K'] }, // 40
  { g:'CDEFGHJL', r:['C','G','J','D','H','F','L','E'] }, // 41
  { g:'CDEFGHJK', r:['C','G','J','D','H','F','E','K'] }, // 42
  { g:'CDEFGHIL', r:['C','G','E','D','H','F','L','I'] }, // 43
  { g:'CDEFGHIK', r:['C','G','E','D','H','F','I','K'] }, // 44
  { g:'CDEFGHIJ', r:['C','G','J','D','H','F','E','I'] }, // 45
  { g:'BFGHIJKL', r:['H','J','B','F','I','G','L','K'] }, // 46
  { g:'BEGHIJKL', r:['E','J','I','B','H','G','L','K'] }, // 47
  { g:'BEFHIJKL', r:['E','J','B','F','I','H','L','K'] }, // 48
  { g:'BEFGIJKL', r:['E','J','B','F','I','G','L','K'] }, // 49
  { g:'BEFGHJKL', r:['E','J','B','F','H','G','L','K'] }, // 50
  { g:'BEFGHIKL', r:['E','G','B','F','I','H','L','K'] }, // 51
  { g:'BEFGHIJL', r:['E','J','B','F','H','G','L','I'] }, // 52
  { g:'BEFGHIJK', r:['E','J','B','F','H','G','I','K'] }, // 53
  { g:'BDGHIJKL', r:['H','J','B','D','I','G','L','K'] }, // 54
  { g:'BDFHIJKL', r:['H','J','B','D','I','F','L','K'] }, // 55
  { g:'BDFGIJKL', r:['I','G','B','D','J','F','L','K'] }, // 56
  { g:'BDFGHJKL', r:['H','G','B','D','J','F','L','K'] }, // 57
  { g:'BDFGHIKL', r:['H','G','B','D','I','F','L','K'] }, // 58
  { g:'BDFGHIJL', r:['H','G','B','D','J','F','L','I'] }, // 59
  { g:'BDFGHIJK', r:['H','G','B','D','J','F','I','K'] }, // 60
  { g:'BDEHIJKL', r:['E','J','B','D','I','H','L','K'] }, // 61
  { g:'BDEGIJKL', r:['E','J','B','D','I','G','L','K'] }, // 62
  { g:'BDEGHJKL', r:['E','J','B','D','H','G','L','K'] }, // 63
  { g:'BDEGHIKL', r:['E','G','B','D','I','H','L','K'] }, // 64
  { g:'BDEGHIJL', r:['E','J','B','D','H','G','L','I'] }, // 65
  { g:'BDEGHIJK', r:['E','J','B','D','H','G','I','K'] }, // 66
  { g:'BDEFIJKL', r:['E','J','B','D','I','F','L','K'] }, // 67
  { g:'BDEFHJKL', r:['E','J','B','D','H','F','L','K'] }, // 68
  { g:'BDEFHIKL', r:['E','I','B','D','H','F','L','K'] }, // 69
  { g:'BDEFHIJL', r:['E','J','B','D','H','F','L','I'] }, // 70
  { g:'BDEFHIJK', r:['E','J','B','D','H','F','I','K'] }, // 71
  { g:'BDEFGJKL', r:['E','G','B','D','J','F','L','K'] }, // 72
  { g:'BDEFGIKL', r:['E','G','B','D','I','F','L','K'] }, // 73
  { g:'BDEFGIJL', r:['E','G','B','D','J','F','L','I'] }, // 74
  { g:'BDEFGIJK', r:['E','G','B','D','J','F','I','K'] }, // 75
  { g:'BDEFGHKL', r:['E','G','B','D','H','F','L','K'] }, // 76
  { g:'BDEFGHJL', r:['H','G','B','D','J','F','L','E'] }, // 77
  { g:'BDEFGHJK', r:['H','G','B','D','J','F','E','K'] }, // 78
  { g:'BDEFGHIL', r:['E','G','B','D','H','F','L','I'] }, // 79
  { g:'BDEFGHIK', r:['E','G','B','D','H','F','I','K'] }, // 80
  { g:'BDEFGHIJ', r:['H','G','B','D','J','F','E','I'] }, // 81
  { g:'BCGHIJKL', r:['H','J','B','C','I','G','L','K'] }, // 82
  { g:'BCFHIJKL', r:['H','J','B','C','I','F','L','K'] }, // 83
  { g:'BCFGIJKL', r:['I','G','B','C','J','F','L','K'] }, // 84
  { g:'BCFGHJKL', r:['H','G','B','C','J','F','L','K'] }, // 85
  { g:'BCFGHIKL', r:['H','G','B','C','I','F','L','K'] }, // 86
  { g:'BCFGHIJL', r:['H','G','B','C','J','F','L','I'] }, // 87
  { g:'BCFGHIJK', r:['H','G','B','C','J','F','I','K'] }, // 88
  { g:'BCEHIJKL', r:['E','J','B','C','I','H','L','K'] }, // 89
  { g:'BCEGIJKL', r:['E','J','B','C','I','G','L','K'] }, // 90
  { g:'BCEGHJKL', r:['E','J','B','C','H','G','L','K'] }, // 91
  { g:'BCEGHIKL', r:['E','G','B','C','I','H','L','K'] }, // 92
  { g:'BCEGHIJL', r:['E','J','B','C','H','G','L','I'] }, // 93
  { g:'BCEGHIJK', r:['E','J','B','C','H','G','I','K'] }, // 94
  { g:'BCEFIJKL', r:['E','J','B','C','I','F','L','K'] }, // 95
  { g:'BCEFHJKL', r:['E','J','B','C','H','F','L','K'] }, // 96
  { g:'BCEFHIKL', r:['E','I','B','C','H','F','L','K'] }, // 97
  { g:'BCEFHIJL', r:['E','J','B','C','H','F','L','I'] }, // 98
  { g:'BCEFHIJK', r:['E','J','B','C','H','F','I','K'] }, // 99
  { g:'BCEFGJKL', r:['E','G','B','C','J','F','L','K'] }, // 100
  { g:'BCEFGIKL', r:['E','G','B','C','I','F','L','K'] }, // 101
  { g:'BCEFGIJL', r:['E','G','B','C','J','F','L','I'] }, // 102
  { g:'BCEFGIJK', r:['E','G','B','C','J','F','I','K'] }, // 103
  { g:'BCEFGHKL', r:['E','G','B','C','H','F','L','K'] }, // 104
  { g:'BCEFGHJL', r:['H','G','B','C','J','F','L','E'] }, // 105
  { g:'BCEFGHJK', r:['H','G','B','C','J','F','E','K'] }, // 106
  { g:'BCEFGHIL', r:['E','G','B','C','H','F','L','I'] }, // 107
  { g:'BCEFGHIK', r:['E','G','B','C','H','F','I','K'] }, // 108
  { g:'BCEFGHIJ', r:['H','G','B','C','J','F','E','I'] }, // 109
  { g:'BCDHIJKL', r:['H','J','B','C','I','D','L','K'] }, // 110
  { g:'BCDJIJKL', r:['I','G','B','C','J','D','L','K'] }, // 111
  { g:'BCDGHJKL', r:['H','G','B','C','J','D','L','K'] }, // 112
  { g:'BCDGHIKL', r:['H','G','B','C','I','D','L','K'] }, // 113
  { g:'BCDGHIJL', r:['H','G','B','C','J','D','L','I'] }, // 114
  { g:'BCDGHIJK', r:['H','G','B','C','J','D','I','K'] }, // 115
  { g:'BCDFIJKL', r:['C','J','B','D','I','F','L','K'] }, // 116
  { g:'BCDFHJKL', r:['C','J','B','D','H','F','L','K'] }, // 117
  { g:'BCDFHIKL', r:['C','I','B','D','H','F','L','K'] }, // 118
  { g:'BCDFHIJL', r:['C','J','B','D','H','F','L','I'] }, // 119
  { g:'BCDFHIJK', r:['C','J','B','D','H','F','I','K'] }, // 120
  { g:'BCDFGJKL', r:['C','G','B','D','J','F','L','K'] }, // 121
  { g:'BCDFGIKL', r:['C','G','B','D','I','F','L','K'] }, // 122
  { g:'BCDFGIJL', r:['C','G','B','D','J','F','L','I'] }, // 123
  { g:'BCDFGIJK', r:['C','G','B','D','J','F','I','K'] }, // 124
  { g:'BCDFGHKL', r:['C','G','B','D','H','F','L','K'] }, // 125
  { g:'BCDFGHJL', r:['C','G','B','D','H','F','L','J'] }, // 126
  { g:'BCDFGHJK', r:['H','G','B','C','J','F','D','K'] }, // 127
  { g:'BCDFGHIL', r:['C','G','B','D','H','F','L','I'] }, // 128
  { g:'BCDFGHIK', r:['C','G','B','D','H','F','I','K'] }, // 129
  { g:'BCDFGHIJ', r:['H','G','B','C','J','F','D','I'] }, // 130
  { g:'BCDEIJKL', r:['E','J','B','C','I','D','L','K'] }, // 131
  { g:'BCDEHJKL', r:['E','J','B','C','H','D','L','K'] }, // 132
  { g:'BCDEHIKL', r:['E','I','B','C','H','D','L','K'] }, // 133
  { g:'BCDEHIJL', r:['E','J','B','C','H','D','L','I'] }, // 134
  { g:'BCDEHIJK', r:['E','J','B','C','H','D','I','K'] }, // 135
  { g:'BCDEHJKL', r:['E','G','B','C','J','D','L','K'] }, // 136
  { g:'BCDEHIKL', r:['E','G','B','C','I','D','L','K'] }, // 137
  { g:'BCDEHIJL', r:['E','G','B','C','J','D','L','I'] }, // 138
  { g:'BCDEHIJK', r:['E','G','B','C','J','D','I','K'] }, // 139
  { g:'BCDEGHKL', r:['E','G','B','C','H','D','L','K'] }, // 140
  { g:'BCDEGHJL', r:['H','G','B','C','J','D','L','E'] }, // 141
  { g:'BCDEGHJK', r:['H','G','B','C','J','D','E','K'] }, // 142
  { g:'BCDEGHIL', r:['E','G','B','C','H','D','L','I'] }, // 143
  { g:'BCDEGHIK', r:['E','G','B','C','H','D','I','K'] }, // 144
  { g:'BCDEGHIJ', r:['H','G','B','C','J','D','E','I'] }, // 145
  { g:'BCDEFJKL', r:['C','J','B','D','E','F','L','K'] }, // 146
  { g:'BCDEFIKL', r:['C','E','B','D','I','F','L','K'] }, // 147
  { g:'BCDEFIJL', r:['C','J','B','D','E','F','L','I'] }, // 148
  { g:'BCDEFIJK', r:['C','J','B','D','E','F','I','K'] }, // 149
  { g:'BCDEFHKL', r:['C','E','B','D','H','F','L','K'] }, // 150
  { g:'BCDEFHJL', r:['C','J','B','D','H','F','L','E'] }, // 151
  { g:'BCDEFHJK', r:['C','J','B','D','H','F','E','K'] }, // 152
  { g:'BCDEFHIL', r:['C','E','B','D','H','F','L','I'] }, // 153
  { g:'BCDEFHIK', r:['C','E','B','D','H','F','I','K'] }, // 154
  { g:'BCDEFHIJ', r:['C','J','B','D','H','F','E','I'] }, // 155
  { g:'BCDEFGKL', r:['C','G','B','D','E','F','L','K'] }, // 156
  { g:'BCDEFGJL', r:['C','G','B','D','J','F','L','E'] }, // 157
  { g:'BCDEFGJK', r:['C','G','B','D','J','F','E','K'] }, // 158
  { g:'BCDEFGIL', r:['C','G','B','D','E','F','L','I'] }, // 159
  { g:'BCDEFGIK', r:['C','G','B','D','E','F','I','K'] }, // 160
  { g:'BCDEFGIJ', r:['C','G','B','D','J','F','E','I'] }, // 161
  { g:'BCDEFGHL', r:['C','G','B','D','H','F','L','E'] }, // 162
  { g:'BCDEFGHK', r:['C','G','B','D','H','F','E','K'] }, // 163
  { g:'BCDEFGHJ', r:['H','G','B','C','J','F','D','E'] }, // 164
  { g:'BCDEFGHI', r:['C','G','B','D','H','F','E','I'] }, // 165
  { g:'AFGHIJKL', r:['H','J','I','F','A','G','L','K'] }, // 166
  { g:'AEGHIJKL', r:['E','J','I','A','H','G','L','K'] }, // 167
  { g:'AEFHIJKL', r:['E','J','I','F','A','H','L','K'] }, // 168
  { g:'AEFGIJKL', r:['E','J','I','F','A','G','L','K'] }, // 169
  { g:'AEFGHJKL', r:['E','G','J','F','A','H','L','K'] }, // 170
  { g:'AEFGHIKL', r:['E','G','I','F','A','H','L','K'] }, // 171
  { g:'AEFGHIJL', r:['E','G','J','F','A','H','L','I'] }, // 172
  { g:'AEFGHIJK', r:['E','G','J','F','A','H','I','K'] }, // 173
  { g:'ADGHIJKL', r:['H','J','I','D','A','G','L','K'] }, // 174
  { g:'ADFHIJKL', r:['H','J','I','D','A','F','L','K'] }, // 175
  { g:'ADFGIJKL', r:['I','G','J','D','A','F','L','K'] }, // 176
  { g:'ADFGHJKL', r:['H','G','J','D','A','F','L','K'] }, // 177
  { g:'ADFGHIKL', r:['H','G','I','D','A','F','L','K'] }, // 178
  { g:'ADFGHIJL', r:['H','G','J','D','A','F','L','I'] }, // 179
  { g:'ADFGHIJK', r:['H','G','J','D','A','F','I','K'] }, // 180
  { g:'ADEHIJKL', r:['E','J','I','D','A','H','L','K'] }, // 181
  { g:'ADEGIJKL', r:['E','J','I','D','A','G','L','K'] }, // 182
  { g:'ADEGHJKL', r:['E','G','J','D','A','H','L','K'] }, // 183
  { g:'ADEGHIKL', r:['E','G','I','D','A','H','L','K'] }, // 184
  { g:'ADEGHIJL', r:['E','G','J','D','A','H','L','I'] }, // 185
  { g:'ADEGHIJK', r:['E','G','J','D','A','H','I','K'] }, // 186
  { g:'ADEFIJKL', r:['E','J','I','D','A','F','L','K'] }, // 187
  { g:'ADEFHJKL', r:['H','J','E','D','A','F','L','K'] }, // 188
  { g:'ADEFHIKL', r:['H','E','I','D','A','F','L','K'] }, // 189
  { g:'ADEFHIJL', r:['H','J','E','D','A','F','L','I'] }, // 190
  { g:'ADEFHIJK', r:['H','J','E','D','A','F','I','K'] }, // 191
  { g:'ADEFGJKL', r:['E','G','J','D','A','F','L','K'] }, // 192
  { g:'ADEFGIKL', r:['E','G','I','D','A','F','L','K'] }, // 193
  { g:'ADEFGIJL', r:['E','G','J','D','A','F','L','I'] }, // 194
  { g:'ADEFGIJK', r:['E','G','J','D','A','F','I','K'] }, // 195
  { g:'ADEFGHKL', r:['H','G','E','D','A','F','L','K'] }, // 196
  { g:'ADEFGHJL', r:['H','G','J','D','A','F','L','E'] }, // 197
  { g:'ADEFGHJK', r:['H','G','J','D','A','F','E','K'] }, // 198
  { g:'ADEFGHIL', r:['H','G','E','D','A','F','L','I'] }, // 199
  { g:'ADEFGHIK', r:['H','G','E','D','A','F','I','K'] }, // 200
  { g:'ADEFGHIJ', r:['H','G','J','D','A','F','E','I'] }, // 201
  { g:'ACGHIJKL', r:['H','J','I','C','A','G','L','K'] }, // 202
  { g:'ACFHIJKL', r:['H','J','I','C','A','F','L','K'] }, // 203
  { g:'ACFGIJKL', r:['I','G','J','C','A','F','L','K'] }, // 204
  { g:'ACFGHJKL', r:['H','G','J','C','A','F','L','K'] }, // 205
  { g:'ACFGHIKL', r:['H','G','I','C','A','F','L','K'] }, // 206
  { g:'ACFGHIJL', r:['H','G','J','C','A','F','L','I'] }, // 207
  { g:'ACFGHIJK', r:['H','G','J','C','A','F','I','K'] }, // 208
  { g:'ACEHIJKL', r:['E','J','I','C','A','H','L','K'] }, // 209
  { g:'ACEGIJKL', r:['E','J','I','C','A','G','L','K'] }, // 210
  { g:'ACEGHJKL', r:['E','G','J','C','A','H','L','K'] }, // 211
  { g:'ACEGHIKL', r:['E','G','I','C','A','H','L','K'] }, // 212
  { g:'ACEGHIJL', r:['E','G','J','C','A','H','L','I'] }, // 213
  { g:'ACEGHIJK', r:['E','G','J','C','A','H','I','K'] }, // 214
  { g:'ACEFIJKL', r:['E','J','I','C','A','F','L','K'] }, // 215
  { g:'ACEFHJKL', r:['H','J','E','C','A','F','L','K'] }, // 216
  { g:'ACEFHIKL', r:['H','E','I','C','A','F','L','K'] }, // 217
  { g:'ACEFHIJL', r:['H','J','E','C','A','F','L','I'] }, // 218
  { g:'ACEFHIJK', r:['H','J','E','C','A','F','I','K'] }, // 219
  { g:'ACEFGJKL', r:['E','G','J','C','A','F','L','K'] }, // 220
  { g:'ACEFGIKL', r:['E','G','I','C','A','F','L','K'] }, // 221
  { g:'ACEFGIJL', r:['E','G','J','C','A','F','L','I'] }, // 222
  { g:'ACEFGIJK', r:['E','G','J','C','A','F','I','K'] }, // 223
  { g:'ACEFGHKL', r:['H','G','E','C','A','F','L','K'] }, // 224
  { g:'ACEFGHJL', r:['H','G','J','C','A','F','L','E'] }, // 225
  { g:'ACEFGHJK', r:['H','G','J','C','A','F','E','K'] }, // 226
  { g:'ACEFGHIL', r:['H','G','E','C','A','F','L','I'] }, // 227
  { g:'ACEFGHIK', r:['H','G','E','C','A','F','I','K'] }, // 228
  { g:'ACEFGHIJ', r:['H','G','J','C','A','F','E','I'] }, // 229
  { g:'ACDHIJKL', r:['H','J','I','C','A','D','L','K'] }, // 230
  { g:'ACDGIJKL', r:['I','G','J','C','A','D','L','K'] }, // 231
  { g:'ACDGHJKL', r:['H','G','J','C','A','D','L','K'] }, // 232
  { g:'ACDGHIKL', r:['H','G','I','C','A','D','L','K'] }, // 233
  { g:'ACDGHIJL', r:['H','G','J','C','A','D','L','I'] }, // 234
  { g:'ACDGHIJK', r:['H','G','J','C','A','D','I','K'] }, // 235
  { g:'ACDFIJKL', r:['C','J','I','D','A','F','L','K'] }, // 236
  { g:'ACDFHJKL', r:['H','J','F','C','A','D','L','K'] }, // 237
  { g:'ACDFHIKL', r:['H','F','I','C','A','D','L','K'] }, // 238
  { g:'ACDFHIJL', r:['H','J','F','C','A','D','L','I'] }, // 239
  { g:'ACDFHIJK', r:['H','J','F','C','A','D','I','K'] }, // 240
  { g:'ACDFGJKL', r:['C','G','J','D','A','F','L','K'] }, // 241
  { g:'ACDFGIKL', r:['C','G','I','D','A','F','L','K'] }, // 242
  { g:'ACDFGIJL', r:['C','G','J','D','A','F','L','I'] }, // 243
  { g:'ACDFGIJK', r:['C','G','J','D','A','F','I','K'] }, // 244
  { g:'ACDFGHKL', r:['H','G','F','C','A','D','L','K'] }, // 245
  { g:'ACDFGHJL', r:['C','G','J','D','A','F','L','H'] }, // 246
  { g:'ACDFGHJK', r:['H','G','J','C','A','F','D','K'] }, // 247
  { g:'ACDFGHIL', r:['H','G','F','C','A','D','L','I'] }, // 248
  { g:'ACDFGHIK', r:['H','G','F','C','A','D','I','K'] }, // 249
  { g:'ACDFGHIJ', r:['H','G','J','C','A','F','D','I'] }, // 250
  { g:'ACDEIJKL', r:['E','J','I','C','A','D','L','K'] }, // 251
  { g:'ACDEHJKL', r:['H','J','E','C','A','D','L','K'] }, // 252
  { g:'ACDEHIKL', r:['H','E','I','C','A','D','L','K'] }, // 253
  { g:'ACDEHIJL', r:['H','J','E','C','A','D','L','I'] }, // 254
  { g:'ACDEHIJK', r:['H','J','E','C','A','D','I','K'] }, // 255
  { g:'ACDEGJKL', r:['E','G','J','C','A','D','L','K'] }, // 256
  { g:'ACDEGIKL', r:['E','G','I','C','A','D','L','K'] }, // 257
  { g:'ACDEGIJL', r:['E','G','J','C','A','D','L','I'] }, // 258
  { g:'ACDEGIJK', r:['E','G','J','C','A','D','I','K'] }, // 259
  { g:'ACDEGHKL', r:['H','G','E','C','A','D','L','K'] }, // 260
  { g:'ACDEGHJL', r:['H','G','J','C','A','D','L','E'] }, // 261
  { g:'ACDEGHJK', r:['H','G','J','C','A','D','E','K'] }, // 262
  { g:'ACDEGHIL', r:['H','G','E','C','A','D','L','I'] }, // 263
  { g:'ACDEGHIK', r:['H','G','E','C','A','D','I','K'] }, // 264
  { g:'ACDEGHIJ', r:['H','G','J','C','A','D','E','I'] }, // 265
  { g:'ACDEFJKL', r:['C','J','E','D','A','F','L','K'] }, // 266
  { g:'ACDEFIKL', r:['C','E','I','D','A','F','L','K'] }, // 267
  { g:'ACDEFIJL', r:['C','J','E','D','A','F','L','I'] }, // 268
  { g:'ACDEFIJK', r:['C','J','E','D','A','F','I','K'] }, // 269
  { g:'ACDEFHKL', r:['H','E','F','C','A','D','L','K'] }, // 270
  { g:'ACDEFHJL', r:['H','J','F','C','A','D','L','E'] }, // 271
  { g:'ACDEFHJK', r:['H','J','E','C','A','F','D','K'] }, // 272
  { g:'ACDEFHIL', r:['H','E','F','C','A','D','L','I'] }, // 273
  { g:'ACDEFHIK', r:['H','E','F','C','A','D','I','K'] }, // 274
  { g:'ACDEFHIJ', r:['H','J','E','C','A','F','D','I'] }, // 275
  { g:'ACDEFGKL', r:['C','G','E','D','A','F','L','K'] }, // 276
  { g:'ACDEFGJL', r:['C','G','J','D','A','F','L','E'] }, // 277
  { g:'ACDEFGJK', r:['C','G','J','D','A','F','E','K'] }, // 278
  { g:'ACDEFGIL', r:['C','G','E','D','A','F','L','I'] }, // 279
  { g:'ACDEFGIK', r:['C','G','E','D','A','F','I','K'] }, // 280
  { g:'ACDEFGIJ', r:['C','G','J','D','A','F','E','I'] }, // 281
  { g:'ACDEFGHL', r:['H','G','F','C','A','D','L','E'] }, // 282
  { g:'ACDEFGHK', r:['H','G','E','C','A','F','D','K'] }, // 283
  { g:'ACDEFGHJ', r:['H','G','J','C','A','F','D','E'] }, // 284
  { g:'ACDEFGHI', r:['H','G','E','C','A','F','D','I'] }, // 285
  { g:'ABGHIJKL', r:['H','J','B','A','I','G','L','K'] }, // 286
  { g:'ABFHIJKL', r:['H','J','B','A','I','F','L','K'] }, // 287
  { g:'ABFGIJKL', r:['I','J','B','F','A','G','L','K'] }, // 288
  { g:'ABFGHJKL', r:['H','J','B','F','A','G','L','K'] }, // 289
  { g:'ABFGHIKL', r:['H','G','B','A','I','F','L','K'] }, // 290
  { g:'ABFGHIJL', r:['H','J','B','F','A','G','L','I'] }, // 291
  { g:'ABFGHIJK', r:['H','J','B','F','A','G','I','K'] }, // 292
  { g:'ABEHIJKL', r:['E','J','B','A','I','H','L','K'] }, // 293
  { g:'ABEGIJKL', r:['E','J','B','A','I','G','L','K'] }, // 294
  { g:'ABEGHJKL', r:['E','J','B','A','H','G','L','K'] }, // 295
  { g:'ABEGHIKL', r:['E','G','B','A','I','H','L','K'] }, // 296
  { g:'ABEGHIJL', r:['E','J','B','A','H','G','L','I'] }, // 297
  { g:'ABEGHIJK', r:['E','J','B','A','H','G','I','K'] }, // 298
  { g:'ABEFIJKL', r:['E','J','B','A','I','F','L','K'] }, // 299
  { g:'ABEFHJKL', r:['E','J','B','F','A','H','L','K'] }, // 300
  { g:'ABEFHIKL', r:['E','I','B','F','A','H','L','K'] }, // 301
  { g:'ABEFHIJL', r:['E','J','B','F','A','H','L','I'] }, // 302
  { g:'ABEFHIJK', r:['E','J','B','F','A','H','I','K'] }, // 303
  { g:'ABEFGJKL', r:['E','J','B','F','A','G','L','K'] }, // 304
  { g:'ABEFGIKL', r:['E','G','B','A','I','F','L','K'] }, // 305
  { g:'ABEFGIJL', r:['E','J','B','F','A','G','L','I'] }, // 306
  { g:'ABEFGIJK', r:['E','J','B','F','A','G','I','K'] }, // 307
  { g:'ABEFGHKL', r:['E','G','B','F','A','H','L','K'] }, // 308
  { g:'ABEFGHJL', r:['H','J','B','F','A','G','L','E'] }, // 309
  { g:'ABEFGHJK', r:['H','J','B','F','A','G','E','K'] }, // 310
  { g:'ABEFGHIL', r:['E','G','B','F','A','H','L','I'] }, // 311
  { g:'ABEFGHIK', r:['E','G','B','F','A','H','I','K'] }, // 312
  { g:'ABEFGHIJ', r:['H','J','B','F','A','G','E','I'] }, // 313
  { g:'ABDHIJKL', r:['I','J','B','D','A','H','L','K'] }, // 314
  { g:'ABDGIJKL', r:['I','J','B','D','A','G','L','K'] }, // 315
  { g:'ABDGHJKL', r:['H','J','B','D','A','G','L','K'] }, // 316
  { g:'ABDGHIKL', r:['I','G','B','D','A','H','L','K'] }, // 317
  { g:'ABDGHIJL', r:['H','J','B','D','A','G','L','I'] }, // 318
  { g:'ABDGHIJK', r:['H','J','B','D','A','G','I','K'] }, // 319
  { g:'ABDFIJKL', r:['I','J','B','D','A','F','L','K'] }, // 320
  { g:'ABDFHJKL', r:['H','J','B','D','A','F','L','K'] }, // 321
  { g:'ABDFHIKL', r:['H','I','B','D','A','F','L','K'] }, // 322
  { g:'ABDFHIJL', r:['H','J','B','D','A','F','L','I'] }, // 323
  { g:'ABDFHIJK', r:['H','J','B','D','A','F','I','K'] }, // 324
  { g:'ABDFGJKL', r:['F','J','B','D','A','G','L','K'] }, // 325
  { g:'ABDFGIKL', r:['I','G','B','D','A','F','L','K'] }, // 326
  { g:'ABDFGIJL', r:['F','J','B','D','A','G','L','I'] }, // 327
  { g:'ABDFGIJK', r:['F','J','B','D','A','G','I','K'] }, // 328
  { g:'ABDFGHKL', r:['H','G','B','D','A','F','L','K'] }, // 329
  { g:'ABDFGHJL', r:['H','G','B','D','A','F','L','J'] }, // 330
  { g:'ABDFGHJK', r:['H','G','B','D','A','F','J','K'] }, // 331
  { g:'ABDFGHIL', r:['H','G','B','D','A','F','L','I'] }, // 332
  { g:'ABDFGHIK', r:['H','G','B','D','A','F','I','K'] }, // 333
  { g:'ABDFGHIJ', r:['H','G','B','D','A','F','I','J'] }, // 334
  { g:'ABDEIJKL', r:['E','J','B','A','I','D','L','K'] }, // 335
  { g:'ABDEHJKL', r:['E','J','B','D','A','H','L','K'] }, // 336
  { g:'ABDEHIKL', r:['E','I','B','D','A','H','L','K'] }, // 337
  { g:'ABDEHIJL', r:['E','J','B','D','A','H','L','I'] }, // 338
  { g:'ABDEHIJK', r:['E','J','B','D','A','H','I','K'] }, // 339
  { g:'ABDEGJKL', r:['E','J','B','D','A','G','L','K'] }, // 340
  { g:'ABDEGIKL', r:['E','G','B','A','I','D','L','K'] }, // 341
  { g:'ABDEGIJL', r:['E','J','B','D','A','G','L','I'] }, // 342
  { g:'ABDEGIJK', r:['E','J','B','D','A','G','I','K'] }, // 343
  { g:'ABDEGHKL', r:['E','G','B','D','A','H','L','K'] }, // 344
  { g:'ABDEGHJL', r:['H','J','B','D','A','G','L','E'] }, // 345
  { g:'ABDEGHJK', r:['H','J','B','D','A','G','E','K'] }, // 346
  { g:'ABDEGHIL', r:['E','G','B','D','A','H','L','I'] }, // 347
  { g:'ABDEGHIK', r:['E','G','B','D','A','H','I','K'] }, // 348
  { g:'ABDEGHIJ', r:['H','J','B','D','A','G','E','I'] }, // 349
  { g:'ABDEFJKL', r:['E','J','B','D','A','F','L','K'] }, // 350
  { g:'ABDEFIKL', r:['E','I','B','D','A','F','L','K'] }, // 351
  { g:'ABDEFIJL', r:['E','J','B','D','A','F','L','I'] }, // 352
  { g:'ABDEFIJK', r:['E','J','B','D','A','F','I','K'] }, // 353
  { g:'ABDEFHKL', r:['H','E','B','D','A','F','L','K'] }, // 354
  { g:'ABDEFHJL', r:['H','J','B','D','A','F','L','E'] }, // 355
  { g:'ABDEFHJK', r:['H','J','B','D','A','F','E','K'] }, // 356
  { g:'ABDEFHIL', r:['H','E','B','D','A','F','L','I'] }, // 357
  { g:'ABDEFHIK', r:['H','E','B','D','A','F','I','K'] }, // 358
  { g:'ABDEFHIJ', r:['H','J','B','D','A','F','E','I'] }, // 359
  { g:'ABDEFGKL', r:['E','G','B','D','A','F','L','K'] }, // 360
  { g:'ABDEFGJL', r:['E','G','B','D','A','F','L','J'] }, // 361
  { g:'ABDEFGJK', r:['E','G','B','D','A','F','J','K'] }, // 362
  { g:'ABDEFGIL', r:['E','G','B','D','A','F','L','I'] }, // 363
  { g:'ABDEFGIK', r:['E','G','B','D','A','F','I','K'] }, // 364
  { g:'ABDEFGIJ', r:['E','G','B','D','A','F','I','J'] }, // 365
  { g:'ABDEFGHL', r:['H','G','B','D','A','F','L','E'] }, // 366
  { g:'ABDEFGHK', r:['H','G','B','D','A','F','E','K'] }, // 367
  { g:'ABDEFGHJ', r:['H','G','B','D','A','F','E','J'] }, // 368
  { g:'ABDEFGHI', r:['H','G','B','D','A','F','E','I'] }, // 369
  { g:'ABCHIJKL', r:['I','J','B','C','A','H','L','K'] }, // 370
  { g:'ABCGIJKL', r:['I','J','B','C','A','G','L','K'] }, // 371
  { g:'ABCGHJKL', r:['H','J','B','C','A','G','L','K'] }, // 372
  { g:'ABCGHIKL', r:['I','G','B','C','A','H','L','K'] }, // 373
  { g:'ABCGHIJL', r:['H','J','B','C','A','G','L','I'] }, // 374
  { g:'ABCGHIJK', r:['H','J','B','C','A','G','I','K'] }, // 375
  { g:'ABCFIJKL', r:['I','J','B','C','A','F','L','K'] }, // 376
  { g:'ABCFHJKL', r:['H','J','B','C','A','F','L','K'] }, // 377
  { g:'ABCFHIKL', r:['H','I','B','C','A','F','L','K'] }, // 378
  { g:'ABCFHIJL', r:['H','J','B','C','A','F','L','I'] }, // 379
  { g:'ABCFHIJK', r:['H','J','B','C','A','F','I','K'] }, // 380
  { g:'ABCFGJKL', r:['C','J','B','F','A','G','L','K'] }, // 381
  { g:'ABCFGIKL', r:['I','G','B','C','A','F','L','K'] }, // 382
  { g:'ABCFGIJL', r:['C','J','B','F','A','G','L','I'] }, // 383
  { g:'ABCFGIJK', r:['C','J','B','F','A','G','I','K'] }, // 384
  { g:'ABCFGHKL', r:['H','G','B','C','A','F','L','K'] }, // 385
  { g:'ABCFGHJL', r:['H','G','B','C','A','F','L','J'] }, // 386
  { g:'ABCFGHJK', r:['H','G','B','C','A','F','J','K'] }, // 387
  { g:'ABCFGHIL', r:['H','G','B','C','A','F','L','I'] }, // 388
  { g:'ABCFGHIK', r:['H','G','B','C','A','F','I','K'] }, // 389
  { g:'ABCFGHIJ', r:['H','G','B','C','A','F','I','J'] }, // 390
  { g:'ABCEIJKL', r:['E','J','B','A','I','C','L','K'] }, // 391
  { g:'ABCEHJKL', r:['E','J','B','C','A','H','L','K'] }, // 392
  { g:'ABCEHIKL', r:['E','I','B','C','A','H','L','K'] }, // 393
  { g:'ABCEHIJL', r:['E','J','B','C','A','H','L','I'] }, // 394
  { g:'ABCEHIJK', r:['E','J','B','C','A','H','I','K'] }, // 395
  { g:'ABCEGJKL', r:['E','J','B','C','A','G','L','K'] }, // 396
  { g:'ABCEGIKL', r:['E','G','B','A','I','C','L','K'] }, // 397
  { g:'ABCEGIJL', r:['E','J','B','C','A','G','L','I'] }, // 398
  { g:'ABCEGIJK', r:['E','J','B','C','A','G','I','K'] }, // 399
  { g:'ABCEGHKL', r:['E','G','B','C','A','H','L','K'] }, // 400
  { g:'ABCEGHJL', r:['H','J','B','C','A','G','L','E'] }, // 401
  { g:'ABCEGHJK', r:['H','J','B','C','A','G','E','K'] }, // 402
  { g:'ABCEGHIL', r:['E','G','B','C','A','H','L','I'] }, // 403
  { g:'ABCEGHIK', r:['E','G','B','C','A','H','I','K'] }, // 404
  { g:'ABCEGHIJ', r:['H','J','B','C','A','G','E','I'] }, // 405
  { g:'ABCEFJKL', r:['E','J','B','C','A','F','L','K'] }, // 406
  { g:'ABCEFIKL', r:['E','I','B','C','A','F','L','K'] }, // 407
  { g:'ABCEFIJL', r:['E','J','B','C','A','F','L','I'] }, // 408
  { g:'ABCEFIJK', r:['E','J','B','C','A','F','I','K'] }, // 409
  { g:'ABCEFHKL', r:['H','E','B','C','A','F','L','K'] }, // 410
  { g:'ABCEFHJL', r:['H','J','B','C','A','F','L','E'] }, // 411
  { g:'ABCEFHJK', r:['H','J','B','C','A','F','E','K'] }, // 412
  { g:'ABCEFHIL', r:['H','E','B','C','A','F','L','I'] }, // 413
  { g:'ABCEFHIK', r:['H','E','B','C','A','F','I','K'] }, // 414
  { g:'ABCEFHIJ', r:['H','J','B','C','A','F','E','I'] }, // 415
  { g:'ABCEFGKL', r:['E','G','B','C','A','F','L','K'] }, // 416
  { g:'ABCEFGJL', r:['E','G','B','C','A','F','L','J'] }, // 417
  { g:'ABCEFGJK', r:['E','G','B','C','A','F','J','K'] }, // 418
  { g:'ABCEFGIL', r:['E','G','B','C','A','F','L','I'] }, // 419
  { g:'ABCEFGIK', r:['E','G','B','C','A','F','I','K'] }, // 420
  { g:'ABCEFGIJ', r:['E','G','B','C','A','F','I','J'] }, // 421
  { g:'ABCEFGHL', r:['H','G','B','C','A','F','L','E'] }, // 422
  { g:'ABCEFGHK', r:['H','G','B','C','A','F','E','K'] }, // 423
  { g:'ABCEFGHJ', r:['H','G','B','C','A','F','E','J'] }, // 424
  { g:'ABCEFGHI', r:['H','G','B','C','A','F','E','I'] }, // 425
  { g:'ABCDIJKL', r:['I','J','B','C','A','D','L','K'] }, // 426
  { g:'ABCDHJKL', r:['H','J','B','C','A','D','L','K'] }, // 427
  { g:'ABCDHIKL', r:['H','I','B','C','A','D','L','K'] }, // 428
  { g:'ABCDHIJL', r:['H','J','B','C','A','D','L','I'] }, // 429
  { g:'ABCDHIJK', r:['H','J','B','C','A','D','I','K'] }, // 430
  { g:'ABCDGJKL', r:['C','J','B','D','A','G','L','K'] }, // 431
  { g:'ABCDGIKL', r:['I','G','B','C','A','D','L','K'] }, // 432
  { g:'ABCDGIJL', r:['C','J','B','D','A','G','L','I'] }, // 433
  { g:'ABCDGIJK', r:['C','J','B','D','A','G','I','K'] }, // 434
  { g:'ABCDGHKL', r:['H','G','B','C','A','D','L','K'] }, // 435
  { g:'ABCDGHJL', r:['H','G','B','C','A','D','L','J'] }, // 436
  { g:'ABCDGHJK', r:['H','G','B','C','A','D','J','K'] }, // 437
  { g:'ABCDGHIL', r:['H','G','B','C','A','D','L','I'] }, // 438
  { g:'ABCDGHIK', r:['H','G','B','C','A','D','I','K'] }, // 439
  { g:'ABCDGHIJ', r:['H','G','B','C','A','D','I','J'] }, // 440
  { g:'ABCDFJKL', r:['C','J','B','D','A','F','L','K'] }, // 441
  { g:'ABCDFIKL', r:['C','I','B','D','A','F','L','K'] }, // 442
  { g:'ABCDFIJL', r:['C','J','B','D','A','F','L','I'] }, // 443
  { g:'ABCDFIJK', r:['C','J','B','D','A','F','I','K'] }, // 444
  { g:'ABCDFHKL', r:['H','F','B','C','A','D','L','K'] }, // 445
  { g:'ABCDFHJL', r:['C','J','B','D','A','F','L','H'] }, // 446
  { g:'ABCDFHJK', r:['H','J','B','C','A','F','D','K'] }, // 447
  { g:'ABCDFHIL', r:['H','F','B','C','A','D','L','I'] }, // 448
  { g:'ABCDFHIK', r:['H','F','B','C','A','D','I','K'] }, // 449
  { g:'ABCDFHIJ', r:['H','J','B','C','A','F','D','I'] }, // 450
  { g:'ABCDFGKL', r:['C','G','B','D','A','F','L','K'] }, // 451
  { g:'ABCDFGJL', r:['C','G','B','D','A','F','L','J'] }, // 452
  { g:'ABCDFGJK', r:['C','G','B','D','A','F','J','K'] }, // 453
  { g:'ABCDFGIL', r:['C','G','B','D','A','F','L','I'] }, // 454
  { g:'ABCDFGIK', r:['C','G','B','D','A','F','I','K'] }, // 455
  { g:'ABCDFGIJ', r:['C','G','B','D','A','F','I','J'] }, // 456
  { g:'ABCDFGHL', r:['C','G','B','D','A','F','L','H'] }, // 457
  { g:'ABCDFGHK', r:['H','G','B','C','A','F','D','K'] }, // 458
  { g:'ABCDFGHJ', r:['H','G','B','C','A','F','D','J'] }, // 459
  { g:'ABCDFGHI', r:['H','G','B','C','A','F','D','I'] }, // 460
  { g:'ABCDEJKL', r:['E','J','B','C','A','D','L','K'] }, // 461
  { g:'ABCDEIKL', r:['E','I','B','C','A','D','L','K'] }, // 462
  { g:'ABCDEIJL', r:['E','J','B','C','A','D','L','I'] }, // 463
  { g:'ABCDEIJK', r:['E','J','B','C','A','D','I','K'] }, // 464
  { g:'ABCDEHKL', r:['H','E','B','C','A','D','L','K'] }, // 465
  { g:'ABCDEHJL', r:['H','J','B','C','A','D','L','E'] }, // 466
  { g:'ABCDEHJK', r:['H','J','B','C','A','D','E','K'] }, // 467
  { g:'ABCDEHIL', r:['H','E','B','C','A','D','L','I'] }, // 468
  { g:'ABCDEHIK', r:['H','E','B','C','A','D','I','K'] }, // 469
  { g:'ABCDEHIJ', r:['H','J','B','C','A','D','E','I'] }, // 470
  { g:'ABCDEGKL', r:['E','G','B','C','A','D','L','K'] }, // 471
  { g:'ABCDEGJL', r:['E','G','B','C','A','D','L','J'] }, // 472
  { g:'ABCDEGJK', r:['E','G','B','C','A','D','J','K'] }, // 473
  { g:'ABCDEGIL', r:['E','G','B','C','A','D','L','I'] }, // 474
  { g:'ABCDEGIK', r:['E','G','B','C','A','D','I','K'] }, // 475
  { g:'ABCDEGIJ', r:['E','G','B','C','A','D','I','J'] }, // 476
  { g:'ABCDEGHL', r:['H','G','B','C','A','D','L','E'] }, // 477
  { g:'ABCDEGHK', r:['H','G','B','C','A','D','E','K'] }, // 478
  { g:'ABCDEGHJ', r:['H','G','B','C','A','D','E','J'] }, // 479
  { g:'ABCDEGHI', r:['H','G','B','C','A','D','E','I'] }, // 480
  { g:'ABCDEFKL', r:['C','E','B','D','A','F','L','K'] }, // 481
  { g:'ABCDEFJL', r:['C','J','B','D','A','F','L','E'] }, // 482
  { g:'ABCDEFJK', r:['C','J','B','D','A','F','E','K'] }, // 483
  { g:'ABCDEFIL', r:['C','E','B','D','A','F','L','I'] }, // 484
  { g:'ABCDEFIK', r:['C','E','B','D','A','F','I','K'] }, // 485
  { g:'ABCDEFIJ', r:['C','J','B','D','A','F','E','I'] }, // 486
  { g:'ABCDEFHL', r:['H','F','B','C','A','D','L','E'] }, // 487
  { g:'ABCDEFHK', r:['H','E','B','C','A','F','D','K'] }, // 488
  { g:'ABCDEFHJ', r:['H','J','B','C','A','F','D','E'] }, // 489
  { g:'ABCDEFHI', r:['H','E','B','C','A','F','D','I'] }, // 490
  { g:'ABCDEFGL', r:['C','G','B','D','A','F','L','E'] }, // 491
  { g:'ABCDEFGK', r:['C','G','B','D','A','F','E','K'] }, // 492
  { g:'ABCDEFGJ', r:['C','G','B','D','A','F','E','J'] }, // 493
  { g:'ABCDEFGI', r:['C','G','B','D','A','F','E','I'] }, // 494
  { g:'ABCDEFGH', r:['H','G','B','C','A','F','D','E'] }, // 495
];

const SLOTS_3_NO_MM = [
  { vencedor: '1A', idxR: 0, prefixo: '32avos', idxJogo: 6  }, // M79 = 32avos_6
  { vencedor: '1B', idxR: 1, prefixo: '32avos', idxJogo: 12 }, // M85 = 32avos_12
  { vencedor: '1D', idxR: 2, prefixo: '32avos', idxJogo: 8  }, // M81 = 32avos_8
  { vencedor: '1E', idxR: 3, prefixo: '32avos', idxJogo: 1  }, // M74 = 32avos_1
  { vencedor: '1G', idxR: 4, prefixo: '32avos', idxJogo: 9  }, // M82 = 32avos_9
  { vencedor: '1I', idxR: 5, prefixo: '32avos', idxJogo: 4  }, // M77 = 32avos_4
  { vencedor: '1K', idxR: 6, prefixo: '32avos', idxJogo: 14 }, // M87 = 32avos_14
  { vencedor: '1L', idxR: 7, prefixo: '32avos', idxJogo: 7  }, // M80 = 32avos_7
];