import "/src/styles/App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import RecipeResults from "./components/RecipeResults";

function App() {
  const handleSearch = (q) => {
    console.log("Search for:", q); //test
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <h1 className="text-blue-300">Render</h1>
        <Search onSubmit={handleSearch} />
        <RecipeResults />
      </main>
      <Footer />
    </div>
  );
}

export default App;
