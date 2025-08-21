function Footer() {
  return (
    <footer className=" flex flex-col md:flex-row gap-5 justify-between py-2.5 px-5 text-center items-center bg-amber-300 w-full">
      <img src="/public/logo_dark.png" alt="logo" className="w-28" />
      <p className="font-bold text-sm md:text-base">
        ©Pallet Planner 2025 coded by Nolwazi Masondo and open-sourced on
        <a
          href="https://github.com/Lwazi-Masondo/alx-fe-capstone-project"
          target="_blank"
          className="text-orange-500 hover:underline decoration-solid"
        >
          {" "}
          GitHub
        </a>
        , hosted on
        <a
          href="#"
          target="_blank"
          className="text-orange-500 hover:underline decoration-solid"
        >
          {" "}
          Netlify
        </a>
        .
      </p>
      <div className="flex flex-row gap-5">
        <span>
          <img
            src="/public/linkedIn.png"
            alt="LinkedIn icon"
            className="w-10"
          />
        </span>
        <span>
          <img src="/public/github.png" alt="Github icon" className="w-10" />
        </span>
      </div>
    </footer>
  );
}

export default Footer;
