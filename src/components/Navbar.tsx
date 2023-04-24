import React from 'react';
import { useRouter } from 'next/router';
import { auth } from "../firebase"; // Import auth from firebase
import { signOut } from "firebase/auth"; // Import signOut function

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
      <a href="/" className="text-xl font-bold">
        <img src="/sample-logo.png" alt="Logo" width={40} height={40} />
      </a>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#">Transactions</a>
          </li>
          <li>
            <a href="#">Accounts</a>
          </li>
          <li>
            <a href="#">Budgeting</a>
          </li>
          <li>
            <a href="#">Goals</a>
          </li>
          <li>
            <a href="#">Wishlists</a>
          </li>
          <li>
            <div className="relative">
              <button>Menu</button>
              <ul className="absolute mt-2 bg-white shadow-lg rounded p-2 space-y-2">
                <li>
                  <a href="#">Your Profile</a>
                </li>
                <li>
                  <a href="#">Partner's Profile</a>
                </li>
                <li>
                  <a href="#">Settings</a>
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
