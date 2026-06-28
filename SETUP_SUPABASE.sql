-- ============================================================
--  SETUP_SUPABASE.sql
--  Execute este SQL no Supabase Dashboard → SQL Editor
--  Projeto: https://supabase.com (gratuito)
-- ============================================================

-- 1. Criar tabela de estado
CREATE TABLE IF NOT EXISTS copa_estado (
  id    TEXT PRIMARY KEY,   -- ex: 'resultados', 'matamata', 'campeao'
  valor TEXT NOT NULL,      -- JSON serializado
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION atualizar_ts()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER copa_estado_ts
BEFORE UPDATE ON copa_estado
FOR EACH ROW EXECUTE FUNCTION atualizar_ts();

-- 3. Permitir acesso público anônimo (RLS)
ALTER TABLE copa_estado ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode ler
CREATE POLICY "leitura_publica"
ON copa_estado FOR SELECT
USING (true);

-- Qualquer pessoa pode inserir/atualizar (sem auth)
-- ATENÇÃO: para uso pessoal. Se quiser restringir,
-- adicione autenticação Supabase.
CREATE POLICY "escrita_publica"
ON copa_estado FOR INSERT
WITH CHECK (true);

CREATE POLICY "update_publica"
ON copa_estado FOR UPDATE
USING (true);

-- ============================================================
--  COMO CONFIGURAR no js/storage.js:
--
--  1. Acesse https://supabase.com e crie um projeto gratuito
--  2. Vá em Settings → API
--  3. Copie:
--     - Project URL  → coloque em SUPABASE_URL
--     - anon/public key → coloque em SUPABASE_KEY
--  4. Abra js/storage.js e preencha as variáveis no topo
--  5. Execute este SQL no SQL Editor do Supabase
--
--  Pronto! Os resultados serão sincronizados automaticamente.
-- ============================================================
