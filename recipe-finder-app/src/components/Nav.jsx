import "/src/styles/App.css";

function Nav() {
  return (
    <nav className="flex gap-10">
      <span className="btn-primary">Search</span>
      <span className="btn-primary">Planner</span>
      <span className="btn-primary">Favourite</span>
    </nav>
  );
}

export default Nav;
