import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../auth/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import Link from 'next/link'


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
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="..."
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="..."
        />

        {message && <p className="text-red-500">{message}</p>}
        <button type="submit" className="...">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </div>
  );
};

export default SignUp;
