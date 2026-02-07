'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function RsvpForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('idle');
    setMessage('');

    const formData = new FormData(event.currentTarget);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from('rsvps').insert({
        full_name: formData.get('name'),
        phone: formData.get('phone'),
        event_name: formData.get('event'),
        note: formData.get('note')
      });

      if (error) throw error;

      setStatus('success');
      setMessage('RSVP received! We will send event updates via WhatsApp.');
      event.currentTarget.reset();
    } catch (error) {
      setStatus('error');
      setMessage('Unable to save RSVP. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="gradient-card space-y-4 p-6">
      <label className="space-y-2 text-sm">
        Full Name
        <input
          name="name"
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          required
        />
      </label>
      <label className="space-y-2 text-sm">
        Phone
        <input
          name="phone"
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          required
        />
      </label>
      <label className="space-y-2 text-sm">
        Event of Interest
        <input
          name="event"
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          placeholder="e.g., March Monthly Meeting"
          required
        />
      </label>
      <label className="space-y-2 text-sm">
        Note (optional)
        <input
          name="note"
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          placeholder="Prayer requests, questions"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
      >
        Submit RSVP
      </button>
      {message ? (
        <p className={`text-sm ${status === 'success' ? 'text-energy-400' : 'text-red-400'}`}>{message}</p>
      ) : null}
    </form>
  );
}
