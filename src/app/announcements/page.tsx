import SectionHeading from '@/components/SectionHeading';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { announcements as fallbackAnnouncements } from '@/lib/placeholder-data';

export default async function AnnouncementsPage() {
  const supabase = createSupabaseServerClient();
  const { data: posts } = await supabase.from('posts').select('*').order('published_at', { ascending: false });

  const items = posts?.length
    ? posts.map((post) => ({
        title: post.title,
        category: post.category,
        excerpt: post.content?.slice(0, 140) ?? '',
        date: new Date(post.published_at ?? new Date()).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      }))
    : fallbackAnnouncements;

  return (
    <section>
      <div className="container-shell">
        <SectionHeading
          eyebrow="Announcements & Teachings"
          title="Devotionals, ministry calls, and updates"
          description="Posts are stored as rich text with images in Supabase."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
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
