import SectionHeading from '@/components/SectionHeading';
import MediaTabs from '@/components/MediaTabs';

export default function MediaPage() {
  return (
    <section>
      <div className="container-shell">
        <SectionHeading
          eyebrow="Media Gallery"
          title="Photos, videos, and gospel posts from TKM"
          description="Upload photos and videos to Supabase storage and link them here."
        />
        <MediaTabs />
      </div>
    </section>
  );
}
