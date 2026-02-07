'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface ProfileFormProps {
  initialName?: string | null;
  initialDepartment?: string | null;
}

export default function ProfileForm({ initialName, initialDepartment }: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialName ?? '');
  const [department, setDepartment] = useState(initialDepartment ?? '');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('idle');
    setMessage('');

    try {
      const supabase = createSupabaseBrowserClient();
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        throw new Error('No user');
      }

      const { error } = await supabase.from('profiles').upsert({
        id: userData.user.id,
        full_name: fullName,
        department,
        updated_at: new Date().toISOString()
      });

      if (error) throw error;

      setStatus('success');
      setMessage('Profile updated!');
    } catch (error) {
      setStatus('error');
      setMessage('Could not update profile.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="gradient-card space-y-4 p-6">
      <label className="space-y-2 text-sm">
        Full Name
        <input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
        />
      </label>
      <label className="space-y-2 text-sm">
        Department
        <input
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          placeholder="Worship, Media, Outreach..."
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
      >
        Save Profile
      </button>
      {message ? (
        <p className={`text-sm ${status === 'success' ? 'text-energy-400' : 'text-red-400'}`}>{message}</p>
      ) : null}
    </form>
  );
}
