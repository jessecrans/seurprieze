"use client";
import { createContext, useContext, useState } from "react";

type displayNameState = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

const UserContext = createContext({} as displayNameState);
export const useUser = () => useContext(UserContext);
export const UserProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const displayNameState = useState('');

  return (
    <UserContext.Provider
      value={
        displayNameState
      }
    >
      {children}
    </UserContext.Provider>
  )
}
