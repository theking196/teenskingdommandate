import SectionHeading from '@/components/SectionHeading';
import { announcements } from '@/lib/placeholder-data';

export default function AnnouncementsPage() {
  return (
    <section>
      <div className="container-shell">
        <SectionHeading
          eyebrow="Announcements & Teachings"
          title="Devotionals, ministry calls, and updates"
          description="Posts are stored as rich text with images in Supabase."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {announcements.map((item) => (
            <article key={item.title} className="gradient-card p-6">
              <p className="text-xs uppercase tracking-widest text-white/50">{item.category}</p>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.excerpt}</p>
              <p className="mt-4 text-xs text-white/50">{item.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
