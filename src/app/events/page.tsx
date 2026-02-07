import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import RsvpForm from '@/components/forms/RsvpForm';
import { events, mediaHighlights } from '@/lib/placeholder-data';

export default function EventsPage() {
  const upcoming = events.filter((event) => event.status === 'Upcoming');
  const past = events.filter((event) => event.status === 'Past');

  return (
    <div>
      <section>
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Events & Meetings"
              title="Monthly and annual gatherings for teens"
              description="RSVP to receive reminders and updates via WhatsApp."
            />
            <div className="space-y-4">
              {upcoming.map((event) => (
                <div key={event.name} className="gradient-card p-6">
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{event.description}</p>
                  <div className="mt-4 text-sm text-white/60">
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <RsvpForm />
        </div>
      </section>

      <section className="bg-slate-900/30">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Past Events"
            title="Memories from retreats and outreaches"
            description="Upload photo galleries to Supabase storage and link them here."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {past.map((event) => (
              <div key={event.name} className="gradient-card p-6">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="mt-2 text-sm text-white/70">{event.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {mediaHighlights.photos.map((photo) => (
              <div key={photo} className="relative h-44 overflow-hidden rounded-2xl">
                <Image src={photo} alt="Event highlight" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
