'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MediaItem {
  title: string;
  media_type: string;
  url: string;
}

interface PostItem {
  title: string;
  category: string | null;
  excerpt: string;
  date: string;
}

interface MediaTabsProps {
  photos: string[];
  videos: MediaItem[];
  posts: PostItem[];
}

const tabs = ['Photos', 'Videos', 'Posts'] as const;

export default function MediaTabs({ photos, videos, posts }: MediaTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Photos');

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeTab === tab
                ? 'bg-primary-500 text-white'
                : 'border border-white/20 text-white/70 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === 'Photos' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <div key={photo} className="relative h-48 overflow-hidden rounded-2xl">
                <Image src={photo} alt="TKM media" fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === 'Videos' ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {videos.map((video) => (
              <div key={video.url} className="gradient-card p-4">
                <p className="text-sm font-semibold">{video.title}</p>
                <div className="mt-3 aspect-video overflow-hidden rounded-2xl">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === 'Posts' ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <div key={post.title} className="gradient-card p-6">
                <p className="text-xs uppercase tracking-widest text-white/50">{post.category}</p>
                <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
                <p className="mt-4 text-xs text-white/50">{post.date}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
