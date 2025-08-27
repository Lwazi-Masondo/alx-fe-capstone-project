import "/src/styles/App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex gap-10">
      <Link to="/">
        <span className="btn-primary">Home</span>
      </Link>
      <Link to="/search">
        <span className="btn-primary">Search</span>
      </Link>

      <span className="btn-primary">Planner</span>
      <Link to="/favourites">
        <span className="btn-primary">Favourite</span>
      </Link>
    </nav>
  );
}

export default Nav;
