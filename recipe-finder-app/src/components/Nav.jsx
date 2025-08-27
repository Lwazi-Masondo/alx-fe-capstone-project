import "/src/styles/App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex gap-10">
      <span className="btn-primary">Planner</span>
      <Link to="/favourites">
        <span className="btn-primary hover:bg-orange-500 hover:cursor-pointer">
          Favourite
        </span>
      </Link>
    </nav>
  );
}

export default Nav;
