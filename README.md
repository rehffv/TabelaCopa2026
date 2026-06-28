# 🏆 Copa do Mundo 2026 — Tabela Interativa

Tabela interativa da Copa do Mundo FIFA 2026 com estilo inspirado nos cartazes dos anos 90, modernizado.

## ✨ Funcionalidades

- **Fase de Grupos** — 12 grupos (A ao L), 48 seleções
- **Classificação automática** — atualiza em tempo real conforme você preenche os placares
- **Chaveamento automático** — os classificados dos grupos aparecem automaticamente nos 32avos de final
- **Mata-Mata completo** — 32avos, Oitavas, Quartas, Semifinais e Final com campo para pênaltis
- **Salvar automaticamente** — tudo é salvo no navegador (localStorage)
- **Compartilhar via link** — gera um link com todos os resultados codificados
- **Modo bloqueado** — impede edições acidentais
- **Impressão otimizada** — CSS dedicado para imprimir bonito
- **Sync com Supabase** *(opcional)* — sincroniza em qualquer dispositivo

## 🚀 Como usar

### GitHub Pages (recomendado)

1. Crie um repositório no GitHub
2. Faça upload da pasta `copa2026/` como `docs/`
3. Vá em Settings → Pages → Source: `docs/`
4. Acesse `https://seu-usuario.github.io/seu-repo/`

### Localmente

Basta abrir o `index.html` em qualquer navegador.

> ⚠️ Para funcionar corretamente localmente, use o **Live Server** do VS Code (igual ao CheckPoint).

## ☁️ Supabase (sincronização multi-dispositivo)

Opcional — permite ver os resultados em qualquer dispositivo.

1. Crie conta gratuita em [supabase.com](https://supabase.com)
2. Execute o SQL do arquivo `SETUP_SUPABASE.sql`
3. Copie sua **Project URL** e **anon key**
4. Cole em `js/storage.js` nas variáveis `SUPABASE_URL` e `SUPABASE_KEY`

## 📁 Estrutura

```
copa2026/
├── index.html           # Página principal
├── css/
│   └── style.css        # Estilos (anos 90 modernizado)
├── js/
│   ├── data.js          # Dados dos grupos e times
│   ├── storage.js       # localStorage + Supabase sync
│   ├── classificacao.js # Lógica de pontuação
│   └── app.js           # App principal
├── SETUP_SUPABASE.sql   # SQL para configurar Supabase
└── README.md
```

## 🛠️ Tecnologias

- HTML5 / CSS3 / JavaScript puro (zero dependências!)
- Google Fonts (Bebas Neue, Oswald)
- localStorage para persistência
- Supabase REST API (opcional)

---
*Desenvolvido como projeto de portfólio — Copa do Mundo FIFA 2026*
