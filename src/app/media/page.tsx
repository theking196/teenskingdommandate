import SectionHeading from '@/components/SectionHeading';
import MediaTabs from '@/components/MediaTabs';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { announcements as fallbackPosts, mediaHighlights } from '@/lib/placeholder-data';

export default async function MediaPage() {
  const supabase = createSupabaseServerClient();
  const { data: mediaData } = await supabase.from('media').select('*');
  const { data: postsData } = await supabase.from('posts').select('*').order('published_at', { ascending: false });

  const photos = (mediaData ?? [])
    .filter((item) => item.media_type === 'photo')
    .map((item) => item.url)
    .filter(Boolean) as string[];

  const videos = (mediaData ?? [])
    .filter((item) => item.media_type === 'video')
    .map((item) => ({ title: item.title ?? 'Video', media_type: 'video', url: item.url }))
    .filter((item) => item.url) as { title: string; media_type: string; url: string }[];

  const posts = (postsData ?? []).length
    ? (postsData ?? []).map((post) => ({
        title: post.title,
        category: post.category,
        excerpt: post.content?.slice(0, 120) ?? '',
        date: new Date(post.published_at ?? new Date()).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      }))
    : fallbackPosts.map((post) => ({
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        date: post.date
      }));

  return (
    <section>
      <div className="container-shell">
        <SectionHeading
          eyebrow="Media Gallery"
          title="Photos, videos, and gospel posts from TKM"
          description="Upload photos and videos to Supabase storage and manage them in the admin dashboard."
        />
        <MediaTabs
          photos={photos.length ? photos : mediaHighlights.photos}
          videos={videos.length ? videos : mediaHighlights.videos.map((video) => ({
            title: video.title,
            media_type: 'video',
            url: `https://www.youtube.com/embed/${video.youtubeId}`
          }))}
          posts={posts}
        />
      </div>
    </section>
  );
}
