/* global google */
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../_components/button';
import Input from '../_components/input';
import { createClientComponentClient } from '../_utils/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [isSentMagicLink, setIsSentMagicLink] = useState(false);

  const handleSignIn = async () => {
    const loginPromise = new Promise(async (resolve, reject) => {

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
        reject(false);
      } else {
        resolve(email);
        router.push('/dashboard');
        router.refresh();
      }
    });

    toast.promise(loginPromise, {
      loading: 'Authorizing...',
      success: (data: any) => `You're signed in as ${data}`,
      error: 'Authorization failed! Please try again',
    });
  };

  async function handleSignInWithGoogle(response: any) {
    const loginPromise = new Promise(async (resolve, reject) => {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      if (error) {
        console.error(error);
        reject(false);
        return;
      }

      if (data.user) {
        resolve(true);
        router.push('/dashboard');
        router.refresh();
      }
    });

    toast.promise(loginPromise, {
      loading: 'Authorizing...',
      success: 'Signed in successfully!',
      error:
        'Sign in failed! If you\'ve signed in directly with your email previously, please try that',
    });
  }

  return (
    <>
      <section className="flex h-screen w-full flex-1 flex-col items-start overflow-y-scroll bg-gray-50">
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center px-4">
          <div
            className="flex h-[400px] w-full max-w-sm flex-col justify-center gap-y-4 rounded-lg bg-white p-8 text-center font-semibold leading-6 tracking-wide shadow-lg">
            <img src="/logo_256.png" className="h-14 w-14 mb-1 self-center" />
            <p className="uppercase">{'Welcome to Dealroom'}</p>
            {isSentMagicLink ? (
              <p className="font-normal">
                Thank you!
                <br />
                <br />
                We&apos;ve sent a magic link for verification to{' '}
                <span className="font-bold">
                  <br />
                  {email}
                  <br />
                </span>
              </p>
            ) : (
              <>
                <Input
                  inputProps={{
                    name: 'email',
                    onChange: (e) => setEmail(e.target.value),
                    value: email,
                    placeholder: 'Enter your email',
                  }}
                  className="w-full rounded-md text-center text-sm placeholder:font-normal py-3 px-4"
                />
                <Input
                  inputProps={{
                    name: 'password',
                    type: 'password',
                    onChange: (e) => setPassword(e.target.value),
                    value: password,
                    placeholder: 'Enter your password',
                  }}
                  className="w-full !rounded-md text-center !text-sm placeholder:font-normal !py-3 !px-4 !border-gray-200"
                />
                <Button
                  variant="solid"
                  size="md"
                  className="w-full"
                  onClick={() => handleSignIn()}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
