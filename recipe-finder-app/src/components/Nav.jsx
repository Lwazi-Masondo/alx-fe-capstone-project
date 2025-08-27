import "/src/styles/App.css";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="flex gap-5">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `transition - colors ${isActive ? "act-button" : "btn-primary"}`
        }
      >
        <span className="">Home</span>
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          `transition - colors ${isActive ? "act-button" : "btn-primary"}`
        }
      >
        <span>Search</span>
      </NavLink>

      {/* <NavLink
        to="#"
        className={({ isActive }) =>
          `transition - colors ${isActive ? "act-button" : "btn-primary"}`
        }
      >
        <span>Planner</span>
      </NavLink> */}

      <NavLink
        to="/favourites"
        className={({ isActive }) =>
          `transition - colors ${isActive ? "act-button" : "btn-primary"}`
        }
      >
        <span>Favourite</span>
      </NavLink>
    </nav>
  );
}

export default Nav;
