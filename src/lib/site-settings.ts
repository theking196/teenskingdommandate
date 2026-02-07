import { createSupabaseServerClient } from '@/lib/supabase/server';

export interface SiteSettings {
  ministryName: string;
  tagline: string;
  logoUrl?: string | null;
  whatsappLink: string;
}

export const defaultSettings: SiteSettings = {
  ministryName: 'Teens Kingdom Ministry',
  tagline: 'Called to Ministry, Empowered by the Gospel',
  logoUrl: null,
  whatsappLink: 'https://chat.whatsapp.com/example'
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from('site_settings').select('*').order('updated_at', { ascending: false }).limit(1);
  const settings = data?.[0];

  if (!settings) {
    return defaultSettings;
  }

  return {
    ministryName: settings.ministry_name ?? defaultSettings.ministryName,
    tagline: settings.tagline ?? defaultSettings.tagline,
    logoUrl: settings.logo_url,
    whatsappLink: settings.whatsapp_link ?? defaultSettings.whatsappLink
  };
};
