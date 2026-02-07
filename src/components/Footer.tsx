import Link from 'next/link';
import { weeklyPrograms } from '@/lib/placeholder-data';
import { SiteSettings, defaultSettings } from '@/lib/site-settings';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings = defaultSettings }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="container-shell grid gap-10 py-16 lg:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold">{settings.ministryName}</h3>
          <p className="mt-4 text-sm text-white/70">
            Calling teenagers to ministry, teaching the gospel, and building community through events, media, and
            weekly WhatsApp programs.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/about" className="hover:text-white">About Us</Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-white">Events & Meetings</Link>
            </li>
            <li>
              <Link href="/media" className="hover:text-white">Media Gallery</Link>
            </li>
            <li>
              <Link href="/announcements" className="hover:text-white">Announcements</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Weekly Programs</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            {weeklyPrograms.map((program) => (
              <li key={program.name} className="flex items-center justify-between gap-4">
                <span>
                  {program.name} · {program.time}
                </span>
                <Link href={settings.whatsappLink} className="text-energy-400 hover:text-energy-300">
                  Join
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © 2026 Teens Kingdom Ministry. Built for Lagos teens who love Jesus.
      </div>
    </footer>
  );
}
