import Nav from "./nav";

function Header() {
  return (
    <header className="flex flex-row justify-between items-center py-5 px-10  bg-amber-300">
      <img src="/public/logo_light.png" alt="logo" className="w-28" />
      <Nav />
    </header>
  );
}

export default Header;
