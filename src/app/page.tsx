"use client";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, User } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";
import SignIn from "./signin/SignIn";

export default function Home() {
  return (
    <main className="p-4">
      <h1
        className="text-4xl font-light text-center uppercase"
      >
        User Authentication Template
      </h1>
    </main>
  )
}
