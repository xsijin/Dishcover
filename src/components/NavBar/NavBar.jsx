import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import "./NavBar.css";

export default function NavBar({ user }) {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleGoBack = () => {
    navigate(-1); // Equivalent to history.goBack()
  };

  const handleThemeChange = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    setSelectedTheme(theme);
  };

  return (
    <div className={`navbar stayfixed bg-base-100`} data-theme={selectedTheme}>
      <div className="flex-1">
        {/* Back button */}
        <button
          className="btn btn-ghost text-xl btn-circle"
          onClick={handleGoBack}
        >
          &lt;
        </button>

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/MyRecipes">Make a Dishcovery</Link>
            </li>
            <li>
              <Link to="/modrecipescontrol">Manage Recipes (admin only)</Link>
            </li>
            <li>
              <Link to="/ReviewAdmin">Manage Reviews (admin only)</Link>
            </li>
            <li>
              <Link to="/users">Manage Users (admin only)</Link>
            </li>
          </ul>
        </div>

        {/* Home button */}
        <Link to="/" className="btn btn-ghost text-xl">
          Dishcover
        </Link>
      </div>

      <div className="flex-1 gap-2">
        <div className="form-control">
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <div
                tabIndex={0}
                className="mt-3 z-[1] p-2 menu menu-sm dropdown-content rounded-box unbold"
              >
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
        {/* Theme Dropdown */}
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Theme</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  {[
                    "light",
                    "forest",
                    "night",
                    "emerald",
                    "winter"
                  ].map((theme) => (
                    <li key={theme}>
                      <input
                        type="radio"
                        name="theme-dropdown"
                        className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                        aria-label={theme}
                        value={theme}
                        checked={selectedTheme === theme}
                        onChange={() => handleThemeChange(theme)}
                      />
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`/users/${user._id}`} className="justify-between">
                My Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <Link to={"/MyRecipes"} className="justify-between">
                My Recipes
              </Link>
            </li>
            <li>
              <Link to={"/ReviewUser"} className="justify-between">
                My Reviews
              </Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
        Hello, {user.firstName}
      </div>
    </div>
  );
}
