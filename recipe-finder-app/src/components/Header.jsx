import Nav from "./Nav";

function Header() {
  return (
    <>
      <header className="flex flex-row justify-between items-center py-5 px-5 relative">
        <img src="/logo_light.png" alt="logo" className=" w-20 md:w-28 " />
      </header>
      <div className="absolute  top-10 md:top-5 right-0">
        <Nav />
      </div>
    </>
  );
}

export default Header;
