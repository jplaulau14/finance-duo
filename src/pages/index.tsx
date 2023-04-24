// src/pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../auth/AuthProvider';
import Navbar from '../components/Navbar';
import AccountOverview from '../components/AccountOverview';

const Home = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signup');
    }
  }, [loading, user, router]);

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <AccountOverview />
      </main>
    </div>
  );
};

export default Home;
