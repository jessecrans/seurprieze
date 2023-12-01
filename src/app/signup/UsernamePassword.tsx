import React, { useState, useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const UsernamePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<any>({
    message: ''
  });

  const [createUserWithEmailPassword, user, loading, createError] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (createError) {
      setError(createError);
    }
  }, [user])

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = await createUserWithEmailPassword(email, password);
      if (user) {
        window.location.href = '/';
      }
    } else {
      setError({
        message: 'Passwords do not match.'
      });
    }
  }

  return (
    <form className='flex flex-col gap-2 w-fit'>
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        className='p-2 rounded border-2'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        className='p-2 rounded border-2'
      />
      <input
        type='password'
        placeholder='Confirm Password'
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        className='p-2 rounded border-2'
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
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </form>
  )
}

export default UsernamePassword