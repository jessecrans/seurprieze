import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const UsernamePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(email, password);
    if (user) {
      window.location.href = '/';
    }
  }

  return (
    <form className='flex flex-col gap-2 w-fit'>
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='p-2 rounded-md border-2'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        className='p-2 rounded-md border-2'
      />
      {
        error ? (
          <p className='text-red-500'>
            {error.message}
          </p>
        ) : (
          <></>
        )
      }
      <button
        type='submit'
        className='p-2 rounded bg-blue-500 hover:bg-blue-600 text-white'
        onClick={handleSignIn}
      >
        Sign In
      </button>
    </form>
  )
}

export default UsernamePassword