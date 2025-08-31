import "/src/styles/App.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="hidden md:flex gap-5 md:mx-20">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition - colors ${isActive ? "act-button" : "btn-primary"}`
          }
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `transition - colors ${isActive ? "act-button" : "btn-primary"}`
          }
        >
          <span>Search</span>
        </NavLink>

        <NavLink
          to="/planner"
          className={({ isActive }) =>
            `transition - colors ${isActive ? "act-button" : "btn-primary"}`
          }
        >
          <span>Planner</span>
        </NavLink>

        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            `transition - colors ${isActive ? "act-button" : "btn-primary"}`
          }
        >
          <span>Favourite</span>
        </NavLink>
      </div>

      <div className="flex flex-col ">
        {/* Mobile Menu Button */}
        <div className="md:hidden mx-5 self-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-between w-6 h-6 focus:outline-none "
          >
            <div
              className={`block h-0.5 w-full bg-lime-200 transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-2.5 bg-orange-500" : ""
              }`}
            ></div>
            <div
              className={`block h-0.5 w-full bg-lime-200 transition duration-300 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`block h-0.5 w-full bg-lime-200 transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-3 bg-orange-500" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Mobile Dropdown menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out flex flex-col bg-lime-200  mt-2 ${
            isOpen
              ? "max-h-60 opacity-100 "
              : "max-h-0 opacity-0 translate-x-25"
          }`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition - colors ${
                isActive ? "act-button-sec" : "btn-secondary"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <span className="">Home</span>
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `transition - colors ${
                isActive ? "act-button-sec" : "btn-secondary"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <span>Search</span>
          </NavLink>

          <NavLink
            to="/planner"
            className={({ isActive }) =>
              `transition - colors ${
                isActive ? "act-button-sec" : "btn-secondary"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <span>Planner</span>
          </NavLink>

          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `transition - colors ${
                isActive ? "act-button-sec" : "btn-secondary"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <span>Favourite</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
