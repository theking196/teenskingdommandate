'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const defaultState = {
  name: '',
  age: '',
  location: '',
  phone: '',
  email: '',
  department: ''
};

export default function JoinForm() {
  const [formState, setFormState] = useState(defaultState);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('idle');
    setMessage('');

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from('join_requests').insert({
        full_name: formState.name,
        age: Number(formState.age),
        location: formState.location,
        phone: formState.phone,
        email: formState.email,
        department_interest: formState.department
      });

      if (error) throw error;

      setStatus('success');
      setMessage('Thank you! Our team will reach out soon.');
      setFormState(defaultState);
    } catch (error) {
      setStatus('error');
      setMessage('Unable to submit right now. Please try again later.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="gradient-card space-y-4 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          Full Name
          <input
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          Age (13-19)
          <input
            type="number"
            name="age"
            min={13}
            max={19}
            value={formState.age}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            required
          />
        </label>
      </div>
      <label className="space-y-2 text-sm">
        Location (Lagos area)
        <input
          name="location"
          value={formState.location}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          required
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          Phone
          <input
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          Email
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            required
          />
        </label>
      </div>
      <label className="space-y-2 text-sm">
        Department Interest
        <select
          name="department"
          value={formState.department}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
          required
        >
          <option value="">Select one</option>
          <option value="Worship & Music">Worship & Music</option>
          <option value="Outreach & Evangelism">Outreach & Evangelism</option>
          <option value="Media & Tech">Media & Tech</option>
          <option value="Prayer Force">Prayer Force</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Creative Arts">Creative Arts</option>
        </select>
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
      >
        Submit Join Request
      </button>
      {message ? (
        <p className={`text-sm ${status === 'success' ? 'text-energy-400' : 'text-red-400'}`}>{message}</p>
      ) : null}
    </form>
  );
}
