import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Auth() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState('');

  async function handleMagicLink(e) {
    e.preventDefault();
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Redirect URL after email verification,
        // Make sure the urls full name is configured in Supabase Auth settings
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard`,
      },
    });
    // const { data: { user }, error } = await supabase.auth.signUp({
    // 	email,
    // 	password,
    //   });

    if (user) {
      console.log('User signed up:', user);
      await supabase.from('profiles').insert([{ id: user.id, email: user.email }]);
    }
    if (error) alert(error.message);
    else alert('Check your email for the magic link.');
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign in / Sign up</h2>
        <form onSubmit={handleMagicLink} className="space-y-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-64 border rounded px-2 py-1"
          />
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Send Magic Link</button>
          </div>
        </form>
      </div>
    </div>
  );
}
