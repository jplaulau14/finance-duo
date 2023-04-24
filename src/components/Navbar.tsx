import React from 'react';
import { useRouter } from 'next/router';
import { auth } from "../firebase"; // Import auth from firebase
import { signOut } from "firebase/auth"; // Import signOut function
import Link from 'next/link'

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signup"); // Navigate to the signup page after successful logout
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out. Please try again.");
    }
  };

  return (
    <header className="flex justify-between items-center bg-white p-4">
      <Link href="/" className="text-xl font-bold">
        <h1>Header Placeholder</h1>
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="#">Transactions</Link>
          </li>
          <li>
            <Link href="#">Accounts</Link>
          </li>
          <li>
            <Link href="#">Budgeting</Link>
          </li>
          <li>
            <Link href="#">Goals</Link>
          </li>
          <li>
            <Link href="#">Wishlists</Link>
          </li>
          <li>
            <div className="relative">
              <button>Menu</button>
              <ul className="absolute mt-2 bg-white shadow-lg rounded p-2 space-y-2">
                <li>
                  <Link href="#">Your Profile</Link>
                </li>
                <li>
                  <Link href="#">Partner's Profile</Link>
                </li>
                <li>
                  <Link href="#">Settings</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
