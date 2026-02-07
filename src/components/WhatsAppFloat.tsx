import Link from 'next/link';

export default function WhatsAppFloat() {
  return (
    <Link
      href="https://chat.whatsapp.com/example"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-energy-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-energy-400"
    >
      <span className="text-lg">💬</span>
      WhatsApp
    </Link>
  );
}
