'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface EventRecord {
  id: number;
  name: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  status: string | null;
}

interface PostRecord {
  id: number;
  title: string;
  category: string | null;
  content: string | null;
  cover_image: string | null;
}

interface DepartmentRecord {
  id: number;
  name: string;
  description: string | null;
}

interface WorkerRecord {
  id: number;
  name: string;
  role: string | null;
  bio: string | null;
  photo_url: string | null;
}

interface MediaRecord {
  id: number;
  title: string | null;
  media_type: string | null;
  url: string | null;
}

interface JoinRequestRecord {
  id: number;
  full_name: string | null;
  age: number | null;
  location: string | null;
  phone: string | null;
  email: string | null;
  department_interest: string | null;
  status: string | null;
}

interface RsvpRecord {
  id: number;
  full_name: string | null;
  phone: string | null;
  event_name: string | null;
  note: string | null;
}

interface SiteSettingsRecord {
  id: number;
  ministry_name: string | null;
  tagline: string | null;
  logo_url: string | null;
  whatsapp_link: string | null;
}

export default function AdminDashboard() {
  const supabase = createSupabaseBrowserClient();
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [departments, setDepartments] = useState<DepartmentRecord[]>([]);
  const [workers, setWorkers] = useState<WorkerRecord[]>([]);
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequestRecord[]>([]);
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [settings, setSettings] = useState<SiteSettingsRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [eventForm, setEventForm] = useState<Partial<EventRecord>>({});
  const [postForm, setPostForm] = useState<Partial<PostRecord>>({});
  const [departmentForm, setDepartmentForm] = useState<Partial<DepartmentRecord>>({});
  const [workerForm, setWorkerForm] = useState<Partial<WorkerRecord>>({});
  const [mediaForm, setMediaForm] = useState<Partial<MediaRecord>>({});
  const [settingsForm, setSettingsForm] = useState<Partial<SiteSettingsRecord>>({});

  const loadData = async () => {
    setLoading(true);
    const [eventsRes, postsRes, departmentsRes, workersRes, mediaRes, joinRes, rsvpRes, settingsRes] = await Promise.all([
      supabase.from('events').select('*').order('event_date', { ascending: true }),
      supabase.from('posts').select('*').order('published_at', { ascending: false }),
      supabase.from('departments').select('*').order('name', { ascending: true }),
      supabase.from('workers').select('*').order('name', { ascending: true }),
      supabase.from('media').select('*').order('created_at', { ascending: false }),
      supabase.from('join_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('rsvps').select('*').order('created_at', { ascending: false }),
      supabase.from('site_settings').select('*').order('updated_at', { ascending: false }).limit(1)
    ]);

    setEvents((eventsRes.data as EventRecord[]) ?? []);
    setPosts((postsRes.data as PostRecord[]) ?? []);
    setDepartments((departmentsRes.data as DepartmentRecord[]) ?? []);
    setWorkers((workersRes.data as WorkerRecord[]) ?? []);
    setMedia((mediaRes.data as MediaRecord[]) ?? []);
    setJoinRequests((joinRes.data as JoinRequestRecord[]) ?? []);
    setRsvps((rsvpRes.data as RsvpRecord[]) ?? []);
    const settingsRow = (settingsRes.data as SiteSettingsRecord[])?.[0] ?? null;
    setSettings(settingsRow);
    setSettingsForm(settingsRow ?? {});
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async <T extends { id?: number }>(
    table: string,
    payload: T,
    onSaved: () => void
  ) => {
    setMessage('');
    const { id, ...data } = payload;
    const response = id
      ? await supabase.from(table).update(data).eq('id', id)
      : await supabase.from(table).insert(data);

    if (response.error) {
      setMessage(`Error saving to ${table}: ${response.error.message}`);
      return;
    }

    setMessage('Saved successfully.');
    onSaved();
    loadData();
  };

  const handleDelete = async (table: string, id: number) => {
    setMessage('');
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      setMessage(`Error deleting from ${table}: ${error.message}`);
      return;
    }
    setMessage('Deleted successfully.');
    loadData();
  };

  const updateJoinStatus = async (id: number, status: string) => {
    setMessage('');
    const { error } = await supabase.from('join_requests').update({ status }).eq('id', id);
    if (error) {
      setMessage(`Error updating join request: ${error.message}`);
      return;
    }
    setMessage('Join request updated.');
    loadData();
  };

  const handleLogoUpload = async (file: File) => {
    if (!file) return;
    setMessage('');
    const filePath = `branding/logo-${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

    if (uploadError) {
      setMessage(`Logo upload failed: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    setSettingsForm((prev) => ({ ...prev, logo_url: data.publicUrl }));
  };

  const saveSettings = async () => {
    setMessage('');
    const payload = {
      ministry_name: settingsForm.ministry_name ?? 'Teens Kingdom Ministry',
      tagline: settingsForm.tagline ?? 'Called to Ministry, Empowered by the Gospel',
      logo_url: settingsForm.logo_url ?? null,
      whatsapp_link: settingsForm.whatsapp_link ?? 'https://chat.whatsapp.com/example',
      updated_at: new Date().toISOString()
    };

    const response = settings?.id
      ? await supabase.from('site_settings').update(payload).eq('id', settings.id)
      : await supabase.from('site_settings').insert(payload);

    if (response.error) {
      setMessage(`Error saving settings: ${response.error.message}`);
      return;
    }

    setMessage('Brand settings saved.');
    loadData();
  };

  return (
    <div className="space-y-12">
      <div className="gradient-card p-6">
        <p className="glass-pill">Admin Dashboard</p>
        <h1 className="mt-4 text-2xl font-bold">Manage everything on the site</h1>
        <p className="mt-3 text-sm text-white/70">
          Create, edit, and delete announcements, events, departments, workers, and media. Review join requests and
          RSVP lists here.
        </p>
        {message ? <p className="mt-4 text-sm text-energy-400">{message}</p> : null}
      </div>

      {loading ? <p className="text-white/70">Loading admin data...</p> : null}

      <section className="gradient-card p-6">
        <h2 className="text-xl font-semibold">Branding & Logo</h2>
        <p className="mt-2 text-sm text-white/70">
          Upload your logo and update the ministry name, tagline, and WhatsApp link used across the site.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Ministry name"
              value={settingsForm.ministry_name ?? ''}
              onChange={(event) => setSettingsForm((prev) => ({ ...prev, ministry_name: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Tagline"
              value={settingsForm.tagline ?? ''}
              onChange={(event) => setSettingsForm((prev) => ({ ...prev, tagline: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="WhatsApp link"
              value={settingsForm.whatsapp_link ?? ''}
              onChange={(event) => setSettingsForm((prev) => ({ ...prev, whatsapp_link: event.target.value }))}
            />
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  handleLogoUpload(file);
                }
              }}
            />
            <button
              className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white"
              onClick={saveSettings}
            >
              Save Brand Settings
            </button>
          </div>
          <div className="rounded-2xl border border-white/10 p-4 text-sm text-white/70">
            <p className="font-semibold text-white">Current Logo</p>
            {settingsForm.logo_url ? (
              <img
                src={settingsForm.logo_url}
                alt="Ministry logo"
                className="mt-4 h-20 w-20 rounded-2xl object-contain"
              />
            ) : (
              <p className="mt-4 text-white/50">No logo uploaded yet.</p>
            )}
          </div>
        </div>
      </section>

      <section className="gradient-card p-6">
        <h2 className="text-xl font-semibold">Announcements & Teachings (Posts)</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Title"
              value={postForm.title ?? ''}
              onChange={(event) => setPostForm((prev) => ({ ...prev, title: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Category (Youth Devotional, Updates, etc.)"
              value={postForm.category ?? ''}
              onChange={(event) => setPostForm((prev) => ({ ...prev, category: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Cover image URL"
              value={postForm.cover_image ?? ''}
              onChange={(event) => setPostForm((prev) => ({ ...prev, cover_image: event.target.value }))}
            />
            <textarea
              className="min-h-[140px] w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Post content"
              value={postForm.content ?? ''}
              onChange={(event) => setPostForm((prev) => ({ ...prev, content: event.target.value }))}
            />
            <button
              className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white"
              onClick={() => handleSave('posts', postForm, () => setPostForm({}))}
            >
              {postForm.id ? 'Update Post' : 'Create Post'}
            </button>
          </div>
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="rounded-2xl border border-white/10 p-4">
                <p className="text-sm font-semibold">{post.title}</p>
                <p className="text-xs text-white/60">{post.category}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => setPostForm(post)} className="text-energy-400">
                    Edit
                  </button>
                  <button onClick={() => handleDelete('posts', post.id)} className="text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-card p-6">
        <h2 className="text-xl font-semibold">Events & Meetings</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Event name"
              value={eventForm.name ?? ''}
              onChange={(event) => setEventForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            <input
              type="date"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              value={eventForm.event_date ?? ''}
              onChange={(event) => setEventForm((prev) => ({ ...prev, event_date: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Location"
              value={eventForm.location ?? ''}
              onChange={(event) => setEventForm((prev) => ({ ...prev, location: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Status (Upcoming/Past)"
              value={eventForm.status ?? ''}
              onChange={(event) => setEventForm((prev) => ({ ...prev, status: event.target.value }))}
            />
            <textarea
              className="min-h-[120px] w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Description"
              value={eventForm.description ?? ''}
              onChange={(event) => setEventForm((prev) => ({ ...prev, description: event.target.value }))}
            />
            <button
              className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white"
              onClick={() => handleSave('events', eventForm, () => setEventForm({}))}
            >
              {eventForm.id ? 'Update Event' : 'Create Event'}
            </button>
          </div>
          <div className="space-y-3">
            {events.map((eventItem) => (
              <div key={eventItem.id} className="rounded-2xl border border-white/10 p-4">
                <p className="text-sm font-semibold">{eventItem.name}</p>
                <p className="text-xs text-white/60">{eventItem.event_date}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => setEventForm(eventItem)} className="text-energy-400">
                    Edit
                  </button>
                  <button onClick={() => handleDelete('events', eventItem.id)} className="text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-card p-6">
        <h2 className="text-xl font-semibold">Departments</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Department name"
              value={departmentForm.name ?? ''}
              onChange={(event) => setDepartmentForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            <textarea
              className="min-h-[100px] w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Department description"
              value={departmentForm.description ?? ''}
              onChange={(event) => setDepartmentForm((prev) => ({ ...prev, description: event.target.value }))}
            />
            <button
              className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white"
              onClick={() => handleSave('departments', departmentForm, () => setDepartmentForm({}))}
            >
              {departmentForm.id ? 'Update Department' : 'Create Department'}
            </button>
          </div>
          <div className="space-y-3">
            {departments.map((department) => (
              <div key={department.id} className="rounded-2xl border border-white/10 p-4">
                <p className="text-sm font-semibold">{department.name}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => setDepartmentForm(department)} className="text-energy-400">
                    Edit
                  </button>
                  <button onClick={() => handleDelete('departments', department.id)} className="text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-card p-6">
        <h2 className="text-xl font-semibold">Workers & Volunteers</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Name"
              value={workerForm.name ?? ''}
              onChange={(event) => setWorkerForm((prev) => ({ ...prev, name: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Role"
              value={workerForm.role ?? ''}
              onChange={(event) => setWorkerForm((prev) => ({ ...prev, role: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Photo URL"
              value={workerForm.photo_url ?? ''}
              onChange={(event) => setWorkerForm((prev) => ({ ...prev, photo_url: event.target.value }))}
            />
            <textarea
              className="min-h-[100px] w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Short bio"
              value={workerForm.bio ?? ''}
              onChange={(event) => setWorkerForm((prev) => ({ ...prev, bio: event.target.value }))}
            />
            <button
              className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white"
              onClick={() => handleSave('workers', workerForm, () => setWorkerForm({}))}
            >
              {workerForm.id ? 'Update Worker' : 'Create Worker'}
            </button>
          </div>
          <div className="space-y-3">
            {workers.map((worker) => (
              <div key={worker.id} className="rounded-2xl border border-white/10 p-4">
                <p className="text-sm font-semibold">{worker.name}</p>
                <p className="text-xs text-white/60">{worker.role}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => setWorkerForm(worker)} className="text-energy-400">
                    Edit
                  </button>
                  <button onClick={() => handleDelete('workers', worker.id)} className="text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-card p-6">
        <h2 className="text-xl font-semibold">Media Gallery</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Title"
              value={mediaForm.title ?? ''}
              onChange={(event) => setMediaForm((prev) => ({ ...prev, title: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="Media type (photo, video, post)"
              value={mediaForm.media_type ?? ''}
              onChange={(event) => setMediaForm((prev) => ({ ...prev, media_type: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
              placeholder="URL (Supabase storage or YouTube link)"
              value={mediaForm.url ?? ''}
              onChange={(event) => setMediaForm((prev) => ({ ...prev, url: event.target.value }))}
            />
            <button
              className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white"
              onClick={() => handleSave('media', mediaForm, () => setMediaForm({}))}
            >
              {mediaForm.id ? 'Update Media' : 'Add Media'}
            </button>
          </div>
          <div className="space-y-3">
            {media.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 p-4">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-white/60">{item.media_type}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => setMediaForm(item)} className="text-energy-400">
                    Edit
                  </button>
                  <button onClick={() => handleDelete('media', item.id)} className="text-red-400">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-card p-6">
        <h2 className="text-xl font-semibold">Join Requests</h2>
        <div className="mt-4 grid gap-3">
          {joinRequests.map((request) => (
            <div key={request.id} className="rounded-2xl border border-white/10 p-4 text-sm">
              <p className="font-semibold">{request.full_name}</p>
              <p className="text-white/60">
                {request.age} · {request.location} · {request.phone}
              </p>
              <p className="text-white/60">{request.department_interest}</p>
              <p className="mt-2 text-xs text-white/50">Status: {request.status}</p>
              <div className="mt-2 flex gap-3 text-xs">
                <button onClick={() => updateJoinStatus(request.id, 'approved')} className="text-energy-400">
                  Approve
                </button>
                <button onClick={() => updateJoinStatus(request.id, 'declined')} className="text-red-400">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="gradient-card p-6">
        <h2 className="text-xl font-semibold">RSVP List</h2>
        <div className="mt-4 grid gap-3">
          {rsvps.map((rsvp) => (
            <div key={rsvp.id} className="rounded-2xl border border-white/10 p-4 text-sm">
              <p className="font-semibold">{rsvp.full_name}</p>
              <p className="text-white/60">{rsvp.event_name}</p>
              <p className="text-white/60">{rsvp.phone}</p>
              {rsvp.note ? <p className="text-white/60">{rsvp.note}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
