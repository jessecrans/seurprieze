"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUpdateProfile, useAuthState, useSendEmailVerification, useSignOut, useDeleteUser } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Username from './Username';
import Email from './Email';
import ChangePassword from './ChangePassword';

const Profile = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  const [deleteUser, deleteLoading, deleteError] = useDeleteUser(auth);

  const loading = userLoading || signOutLoading || deleteLoading;
  const error = userError || signOutError || deleteError;

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      window.location.href = '/';
    }
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.') === false) {
      return;
    }
    const success = await deleteUser();
    if (success) {
      window.location.href = '/';
    }
  }

  return (
    <>
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
          <div>
            <Username />
            <hr className='w-full my-2' />
            <Email />
            {
              user?.providerData[0]?.providerId === 'password' &&
              <>
                <hr className='w-full my-2' />
                <ChangePassword />
              </>
            }
            <hr className='w-full my-2' />
            <button
              className='p-2 rounded bg-sky-500 hover:bg-sky-400 text-white'
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <hr className='w-full my-2' />
            <button
              className='p-2 rounded bg-red-500 hover:bg-red-400 text-white'
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        ) : (
          <p>
            You are not logged in.
          </p>
        )
      }
    </>
  )
}

export default Profile