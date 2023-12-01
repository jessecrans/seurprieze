"use client";
import React from 'react';
import SignOut from '../signin/SignOut';
import GoogleSignIn from '../signin/GoogleSignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import UsernamePassword from './UsernamePassword';
import Link from 'next/link';

const SignUp = () => {
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
            <h2>Sign Up</h2>
            <UsernamePassword />
            <Link
              href='/signin'
              className='text-blue-500 hover:text-blue-400 underline'
            >
              If you already have an account, sign in here.
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

export default SignUp