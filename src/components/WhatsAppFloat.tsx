import Link from 'next/link';
import { SiteSettings, defaultSettings } from '@/lib/site-settings';

interface WhatsAppFloatProps {
  settings?: SiteSettings;
}

export default function WhatsAppFloat({ settings = defaultSettings }: WhatsAppFloatProps) {
  return (
    <Link
      href={settings.whatsappLink}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-energy-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-energy-400"
    >
      <span className="text-lg">💬</span>
      WhatsApp
    </Link>
  );
}
