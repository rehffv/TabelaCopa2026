-- ============================================================
--  CORREÇÃO: trocar a estratégia de header customizado por
--  uma função RPC que recebe o token como parâmetro.
--  Isso evita problemas de header sendo descartado/não lido
--  pelo PostgREST com a chave publishable nova.
--  Execute no SQL Editor do Supabase.
-- ============================================================

-- 1. Remove as policies antigas baseadas em header
DROP POLICY IF EXISTS "escrita_admin" ON copa_estado;
DROP POLICY IF EXISTS "update_admin"  ON copa_estado;
DROP POLICY IF EXISTS "escrita_publica" ON copa_estado;
DROP POLICY IF EXISTS "update_publica"  ON copa_estado;

-- 2. Bloqueia totalmente INSERT/UPDATE direto via API para o role anon
--    (a única forma de escrever passa a ser a função RPC abaixo)
CREATE POLICY "bloquear_escrita_direta_insert"
ON copa_estado FOR INSERT
WITH CHECK (false);

CREATE POLICY "bloquear_escrita_direta_update"
ON copa_estado FOR UPDATE
USING (false);

-- 3. Cria a função que faz o "upsert" protegido por senha,
--    rodando com privilégios de owner (security definer),
--    então ela ignora as policies acima.
CREATE OR REPLACE FUNCTION salvar_estado_admin(
  p_id TEXT,
  p_valor TEXT,
  p_token TEXT
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Troque 'SUA_SENHA_AQUI' pela MESMA senha que está no js/storage.js (ADMIN_TOKEN)
  IF p_token != 'rehffv_copa2026_admin' THEN
    RETURN false;
  END IF;

  INSERT INTO copa_estado (id, valor)
  VALUES (p_id, p_valor)
  ON CONFLICT (id)
  DO UPDATE SET valor = EXCLUDED.valor, atualizado_em = NOW();

  RETURN true;
END;
$$;

-- 4. Permite que o role anon (visitantes) chame essa função
GRANT EXECUTE ON FUNCTION salvar_estado_admin(TEXT, TEXT, TEXT) TO anon;

-- ============================================================
--  IMPORTANTE: sempre que você mudar a senha no js/storage.js,
--  precisa rodar este UPDATE com a nova senha:
--
--  CREATE OR REPLACE FUNCTION salvar_estado_admin(
--    p_id TEXT, p_valor TEXT, p_token TEXT
--  ) RETURNS BOOLEAN SECURITY DEFINER SET search_path = public
--  LANGUAGE plpgsql AS $$
--  BEGIN
--    IF p_token != 'NOVA_SENHA_AQUI' THEN RETURN false; END IF;
--    INSERT INTO copa_estado (id, valor) VALUES (p_id, p_valor)
--    ON CONFLICT (id) DO UPDATE SET valor = EXCLUDED.valor, atualizado_em = NOW();
--    RETURN true;
--  END; $$;
-- ============================================================
