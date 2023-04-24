// src/pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../auth/AuthProvider";
import Dashboard from "@/components/Dashboard";
import Head from "next/head";
import Navbar from "@/components/Navbar";

const Home = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signup");
    }
  }, [loading, user, router]);

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Finance Duo</title>
      </Head>
      <Navbar />
      <Dashboard />
    </>
  );
};

export default Home;
