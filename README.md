# 🏆 Copa do Mundo 2026 — Tabela Interativa

Tabela interativa da Copa do Mundo FIFA 2026 com estilo inspirado nos cartazes dos anos 90, modernizado.

## ✨ Funcionalidades

- **Fase de Grupos** — 12 grupos (A ao L), 48 seleções, 72 jogos
- **Classificação automática** — atualiza em tempo real com critérios oficiais FIFA (confronto direto, saldo de gols, gols marcados)
- **Status matemático** — indica visualmente quando um time está classificado ou eliminado matematicamente
- **Chaveamento automático** — classificados dos grupos preenchem automaticamente os 16 avos de final usando a tabela oficial de 495 combinações do Anexo C da FIFA
- **Mata-Mata completo** — 16 avos, Oitavas, Quartas, Semifinais, Disputa do 3º Lugar e Final com suporte a pênaltis
- **Bracket visual** — aba "Chaveamento" com bracket estilo torneio (desktop) e lista por rodada (mobile), exibindo os gols de cada time ao lado do nome (incluindo pênaltis quando houver)
- **Pódio automático** — exibe Campeão, Vice e 3º lugar ao término da competição
- **Modo Admin / Visitante** — a Tabela Oficial é sincronizada em tempo real via Supabase e só pode ser editada pela administradora; qualquer visitante pode visualizá-la em qualquer dispositivo
- **Tabelas pessoais (projeções)** — cada visitante pode criar, salvar, renomear e alternar entre suas próprias tabelas locais para fazer projeções, sem afetar a Tabela Oficial
- **Compartilhar via link** — gera um link com todos os resultados codificados
- **Impressão otimizada** — CSS dedicado para imprimir

## 🚀 Como usar

### GitHub Pages
**Acesse em:** [https://rehffv.github.io/TabelaCopa2026/](https://rehffv.github.io/TabelaCopa2026/)

### Modo Visitante (padrão)
Ao abrir o link, a Tabela Oficial é carregada automaticamente, sempre atualizada e igual em qualquer dispositivo. Você pode visualizá-la livremente, mas não pode editá-la.

Quer fazer suas próprias projeções? Use o botão **📋 TABELAS** para criar uma tabela própria — ela fica salva só no seu navegador, e você pode editá-la, salvar, renomear ou excluir à vontade.

### Modo Admin
Reservado para a administradora do projeto. Ao clicar em **🔐 Entrar como Admin** e inserir a senha, a Tabela Oficial é carregada para edição. Qualquer alteração feita nos placares é sincronizada automaticamente, e o botão **☁️ Publicar Oficial** confirma a publicação para todos os visitantes.

## 📁 Estrutura

```
copa2026/
├── index.html               # Página principal
├── css/
│   ├── style.css             # Estilos (anos 90 modernizado)
│   └── status-bar-addon.css  # Estilos da barra de status Admin/Visitante
├── js/
│   ├── data.js               # Grupos, times, chaveamento e tabela FIFA 495
│   ├── storage.js            # localStorage (tabelas pessoais) + Supabase sync (Tabela Oficial) + modo Admin
│   ├── classificacao.js      # Lógica de pontuação e critérios FIFA
│   └── app.js                # App principal e bracket visual
├── assets/
│   └── flags/                # Bandeiras SVG de todos os países
├── SETUP_SUPABASE.sql        # SQL inicial para configurar o Supabase
├── SETUP_SUPABASE_FIX.sql    # SQL de correção: função RPC protegida por senha para publicação da Tabela Oficial
└── README.md
```

## 📐 Regras FIFA implementadas

- **Critérios de desempate no grupo** — confronto direto (pontos, saldo, gols), depois saldo geral e gols marcados
- **Melhores terceiros colocados** — seleção dos 8 melhores entre os 12 grupos por pontos, saldo e gols
- **Tabela de 495 combinações** — Anexo C do regulamento oficial FIFA 2026, determina qual 3º colocado vai para qual vaga nos 32avos

## 🔐 Arquitetura de dados

- **Tabela Oficial** — vive no Supabase (PostgreSQL), com leitura pública liberada para qualquer visitante e escrita restrita a uma função RPC protegida por senha (`salvar_estado_admin`), chamada apenas pela administradora autenticada no modo Admin
- **Tabelas pessoais** — armazenadas no `localStorage` do próprio navegador de cada visitante, sem sincronização entre dispositivos (por design, para não conflitar com a Tabela Oficial)
- **Sessão do Admin** — o token de acesso fica em `sessionStorage`, válido apenas durante a aba aberta

## 🛠️ Tecnologias

- HTML5 / CSS3 / JavaScript puro (zero dependências de frontend)
- Google Fonts (Bebas Neue, Oswald, Nunito)
- localStorage para tabelas pessoais
- Supabase (PostgreSQL + REST API + RLS) para a Tabela Oficial

---

*Desenvolvido por **Renata** como projeto de portfólio — Copa do Mundo FIFA 2026*
