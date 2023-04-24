import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase"; // Import auth from firebase
import { signOut } from "firebase/auth"; // Import signOut function
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signup"); // Navigate to the signup page after successful logout
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out. Please try again.");
    }
  };

  const MenuItems = () => (
    <>
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
      <li className="hidden md:block">
        <Link href="#">Partner&apos;s Dashboard</Link>
      </li>
    </>
  );

  return (
    <header className="flex justify-between items-center p-4 bg-AppleGreen">
      <Link href="/" className="text-xl font-bold text-white">
        Header Placeholder
      </Link>
      <nav className="hidden md:block">
        <ul className="flex space-x-4 text-white">
          <MenuItems />
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M1 4a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2H1zm0 7a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2H1zm0 7a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2H1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-white p-4">
            <ul className="space-y-4 text-black">
              <MenuItems />
              <li>
                <Link href="#">Partner&apos;s Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
