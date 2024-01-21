import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function NavBar() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Equivalent to history.goBack()
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        {/* Back button */}
        <button className="btn btn-ghost text-xl" onClick={handleGoBack}>
          &lt;
        </button>
        {/* Home button */}
        <Link to="/" className="btn btn-ghost text-xl">
          Dishcover
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        {/*Add new recipe button*/}
        <Link to="/MyRecipes" className="btn btn-ghost text-xl">
          + Add a Dishcovery
        </Link>
      </div>

      <div className="flex-none gap-2">
        <div className="form-control">
          <SearchBar />
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
              <Link to={"/my-profile"} className="justify-between">
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
        Hello, username
      </div>
    </div>
  );
}
