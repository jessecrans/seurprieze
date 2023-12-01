import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Email = () => {
  const [user, loading, userError] = useAuthState(auth);
  const [sendEmailVerification, sending, sendError] = useSendEmailVerification(auth);

  const error = userError || sendError;

  const handleSendEmailVerification = async () => {
    const result = await sendEmailVerification();
  }

  return (
    <div>
      {
        loading ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <>
            Email - {user?.email} - {
              user?.emailVerified ? (
                <span className='text-green-500'>
                  Verified
                </span>
              ) : (
                <>
                  <span className='text-red-500'>
                    Unverified
                  </span>
                  <button
                    className='text-blue-500 hover:text-blue-400 underline mx-2'
                    onClick={handleSendEmailVerification}
                  >
                    {
                      sending ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      ) : (
                        <>
                          Send Verification Email
                        </>
                      )
                    }
                  </button>
                  {
                    error ? (
                      <p className='text-red-500 inline'>
                        {error.message}
                      </p>
                    ) : (
                      <></>
                    )
                  }
                </>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default Email