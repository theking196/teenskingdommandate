import { requireUser } from '@/lib/supabase/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import ProfileForm from '@/components/forms/ProfileForm';

const pointsHistory = [
  { activity: 'Monthly Meeting Attendance', points: 5, date: 'Feb 2, 2026' },
  { activity: 'Completed Gospel Teaching', points: 10, date: 'Feb 4, 2026' },
  { activity: 'Served in Media Team', points: 8, date: 'Feb 6, 2026' }
];

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = createSupabaseServerClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, department')
    .eq('id', user.id)
    .maybeSingle();

  return (
    <section>
      <div className="container-shell space-y-10">
        <div>
          <p className="glass-pill">Member Dashboard</p>
          <h1 className="mt-4 text-3xl font-bold">Welcome back, {profile?.full_name ?? user.email}</h1>
          <p className="mt-2 text-white/70">
            Track your rankings, update your profile, and grow through TKM discipleship.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="gradient-card p-6">
            <h2 className="text-xl font-semibold">Your Ranking Progress</h2>
            <p className="mt-2 text-sm text-white/70">Current Level: Disciple</p>
            <div className="mt-4">
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[60%] rounded-full bg-energy-500"></div>
              </div>
              <p className="mt-2 text-xs text-white/50">120 / 150 points to reach Leader</p>
            </div>
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p>Attend meeting: +5 points</p>
              <p>Complete teaching: +10 points</p>
              <p>Serve in department: +8 points</p>
            </div>
          </div>
          <ProfileForm initialName={profile?.full_name} initialDepartment={profile?.department} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Recent Points History</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {pointsHistory.map((item) => (
              <div key={item.activity} className="gradient-card p-4">
                <p className="text-sm font-semibold">{item.activity}</p>
                <p className="mt-2 text-xs text-white/60">{item.date}</p>
                <p className="mt-3 text-lg font-bold text-energy-400">+{item.points}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
