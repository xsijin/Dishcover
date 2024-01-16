import { Link } from "react-router-dom";

export default function BreadCrumb() {
  return (
    <nav>
      <Link to="/users/show">User Profile</Link>
      &nbsp; | &nbsp;
      <Link to="/ReviewPage">ReviewPage</Link>
    </nav>
  );
}
