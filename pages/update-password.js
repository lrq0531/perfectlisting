import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function UpdatePassword() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [conpassword, setConPassword] = useState(undefined);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== conpassword) {
      alert('Passwords do not match');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password updated! You can now log in with your new password.');
      setTimeout(() => {
        supabase.auth.signOut();
        router.push('/login');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{message ? message : 'New Password'}</h2>
        <form onSubmit={handleUpdatePassword} className="space-y-2">
          <div className=" flex flex-col gap-2">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-64 border rounded px-2 py-1"
              type="password"
            />
            <input
              value={conpassword}
              onChange={(e) => setConPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-64 border rounded px-2 py-1"
              type="password"
            />
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
