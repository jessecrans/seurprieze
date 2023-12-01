"use client";
import React, { useState } from 'react';
import { auth } from '../firebase';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async () => {
    const result = await sendPasswordResetEmail(email);
    if (result) {
      setSuccess(true);
    }
  }

  return (
    <form
      className='w-fit border-2 rounded p-4'
    >
      <label className='flex flex-col gap-2'>
        Send Password Reset Email to:
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='p-2 rounded border-2'
        />
      </label>
      <button
        type='button'
        onClick={async (e) => {
          e.preventDefault();
          await handlePasswordReset();
        }}
        className='p-2 rounded my-2 bg-blue-500 hover:bg-blue-400 text-white'
      >
        Send
      </button>
      {
        success ? (
          <p className='text-green-500'>
            Email sent. Check your inbox.
          </p>
        ) : (
          <></>
        )
      }
      {
        error ? (
          <p className='text-red-500'>
            {error.message}
          </p>
        ) : (
          <></>
        )
      }
    </form>
  )
}

export default ChangePassword