import React, { useEffect, useState } from 'react'
import { useAuthState, useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ChangePassword = () => {
  const [user, loading, userError] = useAuthState(auth);
  const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
  const [error, setError] = useState({
    message: ''
  })
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setError({
      message: resetError?.message || userError?.message || ''
    })
  }, [user])

  const handlePasswordReset = async () => {
    if (user?.providerData[0]?.providerId !== 'password') {
      setError({
        message: 'This account is associated with a third-party provider. Cannot change password.'
      })
      return;
    }
    const result = await sendPasswordResetEmail(user?.email || '');
    if (result) {
      setSuccess(true);
    }
  }

  return (
    <div>
      Password -
      {
        sending ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <button
            className='text-blue-500 hover:text-blue-400 underline mx-1'
            onClick={handlePasswordReset}
          >
            Send Password Change Email
          </button>
        )
      }
      {
        success ? (
          <p className='text-green-500 inline'>
            - Email sent. Check your inbox.
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
    </div>
  )
}

export default ChangePassword