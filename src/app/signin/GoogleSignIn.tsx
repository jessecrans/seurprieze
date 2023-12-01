import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { auth } from '../firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const GoogleSignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleGoogleSignIn = async () => {
    const success = await signInWithGoogle();
    if (success) {
      window.location.href = '/';
    }
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-fit"
      onClick={handleGoogleSignIn}
    >
      <FontAwesomeIcon
        icon={faGoogle}
        className='mr-2'
      />
      Sign in with Google
    </button>
  )
}

export default GoogleSignIn