"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useUser } from '../Contexts/UserContext';

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [displayName, setDisplayName] = useUser();

  useEffect(() => {
    setDisplayName(user?.displayName || '');
  }, [user]);

  return (
    <nav className='p-4 mb-2 border-2'>
      <ul className='flex justify-between gap-4 items-center'>
        <div>
          <li className='hover:text-gray-500 text-xl'>
            <Link href='/'>
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
        </div>
        <div className='flex gap-4'>
          {
            loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className='text-center w-4 h-4 m-auto'
              />
            ) : error ? (
              <p className='text-red-500'>
                {error.message}
              </p>
            ) : user ? (
              <>
                <li className='hover:text-gray-500'>
                  <Link href='/profile'>
                    <FontAwesomeIcon icon={faUser} className='mx-2' />
                    <p className='inline'>
                      {displayName.length > 20 ? `${displayName.slice(0, 20)}...` : displayName}
                    </p>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className='hover:text-gray-500'>
                  <Link href='/signin'>
                    SignIn
                  </Link>
                </li>
                <li className='hover:text-gray-500'>
                  <Link href='/signup'>
                    SignUp
                  </Link>
                </li>
              </>
            )
          }
        </div>
      </ul>
    </nav>
  )
}

export default Navbar