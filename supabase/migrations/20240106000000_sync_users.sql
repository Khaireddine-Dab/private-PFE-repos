-- ============================================================================
-- Migration: 20240106000000_sync_users.sql
-- Description: Synchronisation automatique entre auth.users et public.users
-- ============================================================================

-- Fonction pour gérer les nouveaux utilisateurs
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    CASE 
      WHEN (NEW.raw_user_meta_data->>'role') = 'business_owner' OR (NEW.raw_user_meta_data->>'role') = 'PRO' THEN 'PRO'::user_role
      WHEN (NEW.raw_user_meta_data->>'role') = 'admin' THEN 'ADMIN'::user_role
      ELSE 'CLIENT'::user_role
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger après insertion dans auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Gère la création automatique d''un profil utilisateur dans public.users lors de l''inscription.';

-- ============================================================================
-- Fonction pour supprimer l'utilisateur de auth.users quand on le supprime de public.users
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_delete_user()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM auth.users WHERE id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger avant suppression dans public.users
DROP TRIGGER IF EXISTS on_public_user_deleted ON public.users;
CREATE TRIGGER on_public_user_deleted
  AFTER DELETE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_delete_user();

COMMENT ON FUNCTION public.handle_delete_user() IS 'Supprime automatiquement le compte auth.users quand le profil public.users est supprimé.';
