import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function ForgotPassword() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/update-password`,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for a reset password link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">{message ? message : 'Reset Password'} </h2>
        <form onSubmit={handleForgotPassword} className="space-y-2">
          <div className=" flex flex-col gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-64 border rounded px-2 py-1"
            />
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
