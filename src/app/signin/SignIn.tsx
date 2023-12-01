"use client";
import React, { useState } from 'react';
import GoogleSignIn from './GoogleSignIn';
import { auth } from '../firebase';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import SignOut from './SignOut';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import UsernamePassword from './UsernamePassword';
import Link from 'next/link';

const SignIn = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className='border-2 w-fit p-4 rounded flex flex-col justify-center items-center'>
      {
        loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : user ? (
          <>
            <p>You are logged in.</p>
            <SignOut />
          </>
        ) : (
          <div className='flex flex-col justify-between items-center gap-2'>
            <h2>Sign In</h2>
            <UsernamePassword />
            <Link
              href='/signup'
              className='text-blue-500 hover:text-blue-400 underline'
            >
              If you don't have an account, sign up here.
            </Link>
            <Link
              href='/password-reset'
              className='text-blue-500 hover:text-blue-400 underline'
            >
              Forgot your password?
            </Link>
            <hr className='w-full' />
            <GoogleSignIn />
            {
              error ? (
                <p className='text-red-500'>
                  {error.message}
                </p>
              ) : (
                <></>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default SignIn