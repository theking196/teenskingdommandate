import SectionHeading from '@/components/SectionHeading';
import AuthForm from '@/components/forms/AuthForm';

export default function LoginPage() {
  return (
    <section>
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <SectionHeading
            eyebrow="Member Login"
            title="Access your dashboard and rankings"
            description="Use your email and password or sign in with Google."
          />
          <div className="gradient-card p-6 text-sm text-white/70">
            <p>
              Admins can manage events, announcements, and media uploads in Supabase. Members can track points and
              update their profiles here.
            </p>
          </div>
        </div>
        <AuthForm />
      </div>
    </section>
  );
}
