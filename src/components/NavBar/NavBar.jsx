import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import "./NavBar.css";
import { logoutUser } from "../../service/users";

export default function NavBar({ username, userId, user }) {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("light");

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://ga-p3-backend.onrender.com/users/showOne/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        console.log("data:", data);
        setAvatar(data.user.profilePicUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

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
            {username ? (
            <li>
              <Link to="/MyRecipes">Make a Dishcovery</Link>
            </li>
            ) : null}
            {user && user.is_admin ? (
              <>
                <li>
                  <Link to="/modrecipescontrol">Admin: Manage Recipes</Link>
                </li>
                <li>
                  <Link to="/ReviewAdmin">Admin: Manage Reviews</Link>
                </li>
                <li>
                  <Link to="/users">Admin: Manage Users</Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>

        {/* Home button */}
        <Link to="/" className="btn btn-ghost text-xl">
          Dishcover
        </Link>

        {/* Avatar */}
        <div className="dropdown dropdown-end">
          {/* Conditional rendering for avatar */}
          {username && (
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    avatar
                      ? avatar
                      : "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
                  }
                />
              </div>
            </div>
          )}
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`/users/${userId}`} className="justify-between">
                My Profile
              </Link>
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
              <button
                onClick={async () => {
                  await logoutUser();
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <span className="flex-1 gap-2">
          {username ? (
            `Welcome, ${username}`
          ) : (
            <>
              Welcome, <Link to="/login-signup">join us</Link>!
            </>
          )}
        </span>
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
                  {["light", "forest", "night", "emerald", "winter"].map(
                    (theme) => (
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
                    )
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
