function Footer() {
  return (
    <footer className=" flex flex-col md:flex-row gap-5 justify-between py-2.5 px-5 text-center items-center bg-amber-300 w-full">
      <img src="/logo_dark.png" alt="logo" className=" w-20 md:w-24" />
      <p className="font-bold text-sm md:text-base">
        ©PalatePlanner 2025 coded by Nolwazi Masondo and open-sourced on
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
          Vercel
        </a>
        .
      </p>
      <div className="flex flex-row gap-5">
        <a href="https://www.linkedin.com/in/nolwazi-masondo/" target="_blank">
          <span>
            <img src="/linkedIn.png" alt="LinkedIn icon" className="w-10" />
          </span>
        </a>
        <a href="https://github.com/Lwazi-Masondo" target="_blank">
          <span>
            <img src="/github.png" alt="Github icon" className="w-10" />
          </span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
