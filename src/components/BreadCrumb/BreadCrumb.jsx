import { Link } from "react-router-dom";

export default function BreadCrumb() {
  return (
    <nav>
      <Link to="/users/show">User Profile</Link>
      &nbsp; | &nbsp;
      <Link to="/ReviewLanding">ReviewLanding</Link>
      &nbsp; | &nbsp;
      <Link to="/MyRecipes">My Recipes</Link>
    </nav>
  );
}
