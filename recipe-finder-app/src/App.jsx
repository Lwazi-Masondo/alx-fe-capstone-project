import "/src/styles/App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import RecipeResults from "./components/RecipeResults";
import RecipeDetails from "./components/RecipeDetails";
import Filter from "./components/Filter";

function App() {
  const handleSearch = (q) => {
    console.log("Search for:", q); //test
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Search onSubmit={handleSearch} />
        <Filter />
        <Routes>
          <Route path="/" element={<RecipeResults />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
