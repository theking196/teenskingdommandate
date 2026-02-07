import { requireUser } from '@/lib/supabase/auth';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  await requireUser();

  return (
    <section>
      <div className="container-shell">
        <AdminDashboard />
      </div>
    </section>
  );
}
