import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Link from 'next/link';
import Head from 'next/head';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error);
      alert("Error logging in. Please check your email and password.");
    }
  };

  return (
    <>
      <Head>
        <title>Finance Duo</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-Viridian via-Sea green to-Kelly green flex items-center justify-center">
        <div className="bg-Apple green p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl mb-4 text-center">Log In</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

            <button type="submit" className="bg-Yellow Green text-black py-2 px-4 rounded-md mt-4 hover:bg-Pear transition-colors">
              Log In
            </button>
          </form>
          <p className="text-center text-white mt-4">
            Don&apos;t have an account? <Link href="/signup" className="underline text-Yellow">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
