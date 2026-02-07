import { requireUser } from '@/lib/supabase/auth';

export default async function AdminPage() {
  await requireUser();

  return (
    <section>
      <div className="container-shell">
        <div className="gradient-card p-6">
          <p className="glass-pill">Admin</p>
          <h1 className="mt-4 text-2xl font-bold">Admin Control Center</h1>
          <p className="mt-3 text-sm text-white/70">
            Use the Supabase dashboard for full content management. For custom admin tooling, create role-based
            checks in the profiles table and extend this page with forms to manage events, announcements, and media
            uploads.
          </p>
        </div>
      </div>
    </section>
  );
}
