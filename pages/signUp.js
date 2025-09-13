import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function SignUp() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(undefined);

  async function handleMagicLink(e) {
    e.preventDefault();
    const {
      // data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Redirect URL after email verification,
        // Make sure the urls full name is configured in Supabase Auth settings
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard`,
      },
    });

    if (error) alert(error.message);
    else alert('Check your email to verify your email address.');
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign in / Sign up</h2>
        <form onSubmit={handleMagicLink} className="space-y-2">
          <div className=" flex flex-col gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-64 border rounded px-2 py-1"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-64 border rounded px-2 py-1"
              type="password"
            />
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
}
