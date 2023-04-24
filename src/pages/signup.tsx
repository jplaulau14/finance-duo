import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../auth/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import Link from 'next/link';
import Head from 'next/head';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    // Check if the email address is in the invitedUsers collection
    const invitedUserRef = doc(db, "invitedUsers", email);
    const invitedUserDoc = await getDoc(invitedUserRef);

    if (!invitedUserDoc.exists()) {
      setMessage("User not found/invited");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Redirect to the home page after successful signup
      router.push("/");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  if (user) {
    return (
      <>
        <p>You are already logged in.</p>
        <button onClick={() => router.push("/")}>Go to home</button>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Finance Duo</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-Viridian via-Sea green to-Kelly green flex items-center justify-center">
        <div className="bg-Apple green p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl mb-4 text-center">Sign Up</h1>
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <label htmlFor="email" className="text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-gray-300 rounded-md p-2 text-black"
            />

            <label htmlFor="password" className="text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border border-gray-300 rounded-md p-2 text-black"
            />

            {message && <p className="text-red-500">{message}</p>}
            <button type="submit" className="bg-Yellow Green text-black py-2 px-4 rounded-md mt-4 hover:bg-Pear transition-colors">
              Sign Up
            </button>
          </form>
          <p className="text-center text-white mt-4">
            Already have an account? <Link href="/login" className="underline text-Yellow">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
