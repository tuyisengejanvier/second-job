import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#3575E2" fillOpacity="0.4" />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" fillOpacity="0.4" />
          </svg>
          <span>JobPortal</span>
        </a>

        {/* Nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Authentication UI */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:flex items-center">
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.photoURL || "/default-avatar.png"} alt="Profile" className="w-10 h-10 rounded-full border" />
              <button onClick={handleLogout} className="py-2 px-5 border rounded bg-red-500 text-white">
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="py-2 px-5 border rounded">
                Log In
              </Link>
              <Link to="/sign-up" className="py-2 px-5 border rounded bg-blue text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden block">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaXmark className="w-5 h-5 text-primary" /> : <FaBarsStaggered className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Items */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
        {isMenuOpen && (
            <div className={`bg-blue-700 mt-16 py-7 px-4 space-y-4`}>
              {navItems.map(({ title, path }) => (
               <li key={path} className="text-base text-white first:text-white py-1">
               <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                 {title}
               </NavLink>
              </li>
              ))}
            </div>
          )}
          {user ? (
            <li className="text-white py-1">
              <button onClick={handleLogout} className="py-2 px-5 border rounded bg-red-500 text-white">
                Log Out
              </button>
            </li>
          ) : (
            <li className="text-white py-1">
              <Link to="/login">Log In</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
