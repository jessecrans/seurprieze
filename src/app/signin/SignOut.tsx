import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

const SignOut = () => {
  const [signOut, loading, error] = useSignOut(auth);
  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
      onClick={signOut}
    >
      Sign Out
    </button>
  )
}

export default SignOut