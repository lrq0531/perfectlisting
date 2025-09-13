import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Login() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(undefined);

  async function handleMagicLink(e) {
    e.preventDefault();
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else {
      alert(`Welcome back! ${user && user.email}`);
      router.push('/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
