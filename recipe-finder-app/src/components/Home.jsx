function Home() {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl text-orange-500 my-10 mx-10 appear">
        Your taste buds called, they’re ready to plan the week!
      </h1>
      <img
        src="/randomfood.png"
        alt="Food"
        className="w-44 md:w-80 lg:w-96 m-auto mt-10 mb-20 rounded-xl scale-in "
      />
    </div>
  );
}

export default Home;
