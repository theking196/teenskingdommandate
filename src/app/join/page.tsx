import SectionHeading from '@/components/SectionHeading';
import JoinForm from '@/components/forms/JoinForm';

export default function JoinPage() {
  return (
    <section>
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Join Us"
            title="Become a member of Teens Kingdom Ministry"
            description="Ages 13-19 are welcome. Complete the form and our team will contact you."
          />
          <div className="gradient-card p-6 text-sm text-white/70">
            <p>
              New members are added to WhatsApp groups, connected with a department, and guided through the ranking
              system. You can also join weekly programs immediately using the WhatsApp links on this page.
            </p>
          </div>
        </div>
        <JoinForm />
      </div>
    </section>
  );
}
