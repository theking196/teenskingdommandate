import SectionHeading from '@/components/SectionHeading';
import { departments, rankings } from '@/lib/placeholder-data';

export default function AboutPage() {
  return (
    <div>
      <section>
        <div className="container-shell">
          <SectionHeading
            eyebrow="About Us"
            title="Our mission is to call teenagers to ministry, teach the gospel, and build community."
            description="Teens Kingdom Ministry (TKM) is a teenage Christian ministry based in Lagos, Nigeria. We gather
            monthly, serve weekly, and disciple teenagers through departments, rankings, and events."
          />
          <div className="gradient-card p-6 text-white/70">
            <p>
              We believe teenagers are called, gifted, and empowered by the Holy Spirit to lead their generation.
              Through worship, teaching, prayer, and outreach, we help teens discover their ministry calling and
              grow in character.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Rankings System"
            title="Growth levels that celebrate discipleship"
            description="Points are awarded for attending meetings, completing teachings, and serving in departments."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {rankings.map((rank) => (
              <div key={rank.level} className="gradient-card p-6">
                <h3 className="text-xl font-semibold">{rank.level}</h3>
                <p className="mt-2 text-sm text-white/70">{rank.focus}</p>
                <p className="mt-4 text-xs text-white/50">Points: {rank.points}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-shell">
          <SectionHeading
            eyebrow="Departments"
            title="Serve in a department and build lasting community"
            description="Choose a department that aligns with your gifts and passion."
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
    </div>
  );
}
