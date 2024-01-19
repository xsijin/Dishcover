import { Link } from "react-router-dom";

export default function BreadCrumb() {
  return (
    <nav>
      <Link to="/">Home</Link>
      &nbsp; | &nbsp;
      <Link to="/users/show">User Profile</Link>
      &nbsp; | &nbsp;
      <Link to="/MyRecipes">My Recipes</Link>

    </nav>
  );
}
