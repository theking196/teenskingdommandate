import Image from 'next/image';
import Link from 'next/link';
import { SiteSettings, defaultSettings } from '@/lib/site-settings';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/departments', label: 'Departments' },
  { href: '/events', label: 'Events' },
  { href: '/media', label: 'Media' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/join', label: 'Join Us' }
];

interface NavbarProps {
  settings?: SiteSettings;
}

export default function Navbar({ settings = defaultSettings }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          {settings.logoUrl ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl bg-white/10">
              <Image src={settings.logoUrl} alt={`${settings.ministryName} logo`} fill className="object-contain" />
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-500 text-lg font-bold">TKM</div>
          )}
          <div>
            <p className="text-lg font-bold text-white">{settings.ministryName}</p>
            <p className="text-xs text-white/60">{settings.tagline}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/70 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={settings.whatsappLink}
            className="rounded-full bg-energy-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-glow transition hover:bg-energy-400"
          >
            Join WhatsApp
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            Member Login
          </Link>
        </div>
        <div className="lg:hidden">
          <Link
            href={settings.whatsappLink}
            className="rounded-full bg-energy-500 px-4 py-2 text-xs font-semibold text-slate-900"
          >
            WhatsApp
          </Link>
        </div>
      </div>
    </header>
  );
}
