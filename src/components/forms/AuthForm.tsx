'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AuthForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleEmailSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('idle');
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setStatus('success');
      setMessage('Logged in! Redirecting...');
      window.location.href = '/dashboard';
    } catch (error) {
      setStatus('error');
      setMessage('Login failed. Please check your details.');
      console.error(error);
    }
  };

  const handleGoogle = async () => {
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    } catch (error) {
      setStatus('error');
      setMessage('Google login failed.');
      console.error(error);
    }
  };

  return (
    <div className="gradient-card space-y-6 p-6">
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <label className="space-y-2 text-sm">
          Email
          <input
            type="email"
            name="email"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          Password
          <input
            type="password"
            name="password"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-400"
        >
          Login
        </button>
      </form>
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
      >
        Continue with Google
      </button>
      {message ? (
        <p className={`text-sm ${status === 'success' ? 'text-energy-400' : 'text-red-400'}`}>{message}</p>
      ) : null}
    </div>
  );
}
