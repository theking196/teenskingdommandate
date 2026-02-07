import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './server';

export const requireUser = async () => {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/login');
  }

  return data.user;
};
