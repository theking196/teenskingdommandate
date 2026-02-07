import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { departments as fallbackDepartments, workers as fallbackWorkers } from '@/lib/placeholder-data';

export default async function DepartmentsPage() {
  const supabase = createSupabaseServerClient();
  const { data: departmentsData } = await supabase.from('departments').select('*').order('name');
  const { data: workersData } = await supabase.from('workers').select('*').order('name');

  const departments = departmentsData?.length ? departmentsData : fallbackDepartments;
  const workers = workersData?.length ? workersData : fallbackWorkers;

  return (
    <div>
      <section>
        <div className="container-shell">
          <SectionHeading
            eyebrow="Departments & Workers"
            title="Serve alongside passionate teen leaders"
            description="Admins can add or edit departments and workers through the admin dashboard."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <div key={department.name} className="gradient-card p-6">
                <h3 className="text-lg font-semibold">{department.name}</h3>
                <p className="mt-2 text-sm text-white/70">{department.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Meet the Workers"
            title="Teen leaders and volunteers across TKM"
            description="Photos are stored in Supabase storage buckets for easy updates."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {workers.map((worker) => (
              <div key={worker.name} className="gradient-card overflow-hidden">
                <div className="relative h-52">
                  <Image src={worker.image ?? worker.photo_url} alt={worker.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{worker.name}</h3>
                  <p className="text-sm text-energy-400">{worker.role}</p>
                  <p className="mt-2 text-sm text-white/70">{worker.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
