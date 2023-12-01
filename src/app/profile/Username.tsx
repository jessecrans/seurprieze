import React, { useState, useEffect } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../Contexts/UserContext';

const Username = () => {
  const [user, loading, userError] = useAuthState(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const error = userError || updateError;

  const [displayName, setDisplayName] = useUser();
  const [updateName, setUpdateName] = useState(user?.displayName || '');
  useEffect(() => {
    setUpdateName(user?.displayName || '');
  }, [user]);

  const handleUpdate = async () => {
    const success = await updateProfile({
      displayName: updateName
    });
    if (success) {
      setDisplayName(updateName);
    }
  }

  return (
    <>
      {
        updating ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <div>
            <p>
              Username
            </p>
            <input
              type='text'
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              className='border border-gray-400 p-2 rounded'
            />
            <button
              className='bg-gray-300 hover:bg-gray-200 p-2 rounded mx-2'
              onClick={handleUpdate}
            >
              Change
            </button>
            {
              error &&
              <p className='text-red-500 mt-2'>
                {error.message}
              </p>
            }
          </div>
        )
      }
    </>
  )
}

export default Username