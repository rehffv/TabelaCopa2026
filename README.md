# 🏆 Copa do Mundo 2026 — Tabela Interativa

Tabela interativa da Copa do Mundo FIFA 2026 com estilo inspirado nos cartazes dos anos 90, modernizado.

## ✨ Funcionalidades

- **Fase de Grupos** — 12 grupos (A ao L), 48 seleções, 72 jogos
- **Classificação automática** — atualiza em tempo real com critérios oficiais FIFA (confronto direto, saldo de gols, gols marcados)
- **Status matemático** — indica visualmente quando um time está classificado ou eliminado matematicamente
- **Chaveamento automático** — classificados dos grupos preenchem automaticamente os 16 avos de final usando a tabela oficial de 495 combinações do Anexo C da FIFA
- **Mata-Mata completo** — 16 avos, Oitavas, Quartas, Semifinais, Disputa do 3º Lugar e Final com suporte a pênaltis
- **Bracket visual** — aba "Chaveamento" com bracket estilo torneio (desktop) e lista por rodada (mobile)
- **Pódio automático** — exibe Campeão, Vice e 3º lugar ao término da competição
- **Salvar automaticamente** — tudo é salvo no navegador (localStorage)
- **Múltiplas tabelas** — salve e alterne entre diferentes versões/cenários da tabela
- **Compartilhar via link** — gera um link com todos os resultados codificados
- **Impressão otimizada** — CSS dedicado para imprimir
- **Sync com Supabase** *(opcional)* — sincroniza em qualquer dispositivo

## 🚀 Como usar

### GitHub Pages
Acesse em `[https://seu-usuario.github.io/seu-repo/](https://rehffv.github.io/TabelaCopa2026/)`


## 📁 Estrutura

```
copa2026/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos (anos 90 modernizado)
├── js/
│   ├── data.js             # Grupos, times, chaveamento e tabela FIFA 495
│   ├── storage.js          # localStorage + Supabase sync
│   ├── classificacao.js    # Lógica de pontuação e critérios FIFA
│   └── app.js              # App principal e bracket visual
├── assets/
│   └── flags/              # Bandeiras SVG de todos os países
├── SETUP_SUPABASE.sql      # SQL para configurar Supabase
└── README.md
```

## 📐 Regras FIFA implementadas

- **Critérios de desempate no grupo** — confronto direto (pontos, saldo, gols), depois saldo geral e gols marcados
- **Melhores terceiros colocados** — seleção dos 8 melhores entre os 12 grupos por pontos, saldo e gols
- **Tabela de 495 combinações** — Anexo C do regulamento oficial FIFA 2026, determina qual 3º colocado vai para qual vaga nos 32avos

## 🛠️ Tecnologias

- HTML5 / CSS3 / JavaScript puro (zero dependências!)
- Google Fonts (Bebas Neue, Oswald, Nunito)
- localStorage para persistência
- Supabase REST API (opcional)

---

*Desenvolvido como projeto de portfólio — Copa do Mundo FIFA 2026*
