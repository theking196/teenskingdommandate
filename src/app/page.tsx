import Image from 'next/image';
import Link from 'next/link';
import FeatureCard from '@/components/FeatureCard';
import SectionHeading from '@/components/SectionHeading';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getSiteSettings } from '@/lib/site-settings';
import { announcements as fallbackAnnouncements, events as fallbackEvents, mediaHighlights, weeklyPrograms } from '@/lib/placeholder-data';

export default async function HomePage() {
  const supabase = createSupabaseServerClient();
  const settings = await getSiteSettings();
  const { data: posts } = await supabase.from('posts').select('*').order('published_at', { ascending: false }).limit(3);
  const { data: events } = await supabase.from('events').select('*').order('event_date', { ascending: true }).limit(3);
  const { data: media } = await supabase.from('media').select('*').order('created_at', { ascending: false }).limit(6);

  const announcements = posts?.length
    ? posts.map((post) => ({
        title: post.title,
        category: post.category,
        date: new Date(post.published_at ?? new Date()).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        excerpt: post.content?.slice(0, 120) ?? ''
      }))
    : fallbackAnnouncements;

  const eventItems = events?.length ? events : fallbackEvents;

  const mediaPhotos = (media ?? [])
    .filter((item) => item.media_type === 'photo')
    .map((item) => item.url)
    .filter(Boolean) as string[];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="glass-pill">Lagos • {settings.ministryName}</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Join {settings.ministryName}: {settings.tagline} – Lagos
            </h1>
            <p className="mt-4 text-lg text-white/70">
              A vibrant teen community where you grow in Jesus, serve in departments, and connect through events,
              rankings, and weekly WhatsApp programs.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/join"
                className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
              >
                Become a Member
              </Link>
              <Link
                href="/events"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                View Events
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {weeklyPrograms.map((program) => (
                <Link
                  key={program.name}
                  href={program.link}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white/80 transition hover:border-white/40"
                >
                  <p className="font-semibold text-white">{program.name}</p>
                  <p className="text-xs">{program.time}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="gradient-card p-6">
            <div className="relative h-72 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
                alt="TKM teens worshipping"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-6 space-y-2 text-sm text-white/70">
              <p className="text-xs uppercase tracking-widest text-white/60">Weekly Highlight</p>
              <p className="text-lg font-semibold text-white">Gospel Conversations in Lagos Schools</p>
              <p>
                Teen leaders are visiting schools across Lagos to share the gospel, pray, and mentor their peers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Latest Announcements"
            title="Stay updated on devotionals, ministry calls, and team updates"
            description="All announcements are stored in Supabase for easy updates by the admin team."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {announcements.map((item) => (
              <div key={item.title} className="gradient-card p-6">
                <p className="text-xs uppercase tracking-widest text-white/50">{item.category}</p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/70">{item.excerpt}</p>
                <p className="mt-4 text-xs text-white/50">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-shell">
          <SectionHeading
            eyebrow="Upcoming Events"
            title="Monthly meetings, annual gatherings, and leadership trainings"
            description="RSVPs are stored in Supabase so we can follow up with you."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {eventItems.map((eventItem) => (
              <div key={eventItem.name} className="gradient-card p-6">
                <p className="text-xs uppercase tracking-widest text-white/50">{eventItem.status}</p>
                <h3 className="mt-3 text-xl font-semibold">{eventItem.name}</h3>
                <p className="mt-2 text-sm text-white/70">{eventItem.description}</p>
                <div className="mt-4 text-sm text-white/60">
                  <p>{eventItem.event_date ?? eventItem.date}</p>
                  <p>{eventItem.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Featured Media"
              title="Photos, testimonies, and gospel teachings"
              description="Upload your media to Supabase storage to keep the gallery fresh."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {(mediaPhotos.length ? mediaPhotos : mediaHighlights.photos).map((photo) => (
                <div key={photo} className="relative h-44 overflow-hidden rounded-2xl">
                  <Image src={photo} alt="TKM moments" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {mediaHighlights.videos.map((video) => (
              <div key={video.youtubeId} className="gradient-card p-4">
                <p className="text-sm font-semibold text-white">{video.title}</p>
                <div className="mt-3 aspect-video overflow-hidden rounded-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-shell">
          <SectionHeading
            eyebrow="Get Involved"
            title="Build community through departments, service, and discipleship"
            description="Choose a department, earn points, and grow through intentional mentorship."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Departments & Workers"
              description="Join worship, media, outreach, prayer, and creative teams with dedicated leaders."
              icon="🎤"
            />
            <FeatureCard
              title="Rankings & Growth"
              description="Earn points for meetings, teachings, and service to grow from New Believer to Leader."
              icon="🏆"
            />
            <FeatureCard
              title="Weekly WhatsApp Programs"
              description="Bible study, prayer, and fellowship happen every week on WhatsApp."
              icon="📲"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
