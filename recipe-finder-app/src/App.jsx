import "/src/styles/App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import RecipeDetails from "./components/RecipeDetails";
import Favourites from "./components/Favourites";
import Home from "./components/Home";

function App() {
  const handleSearch = (q) => {
    console.log("Search for:", q); //test
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/search" element={<Search onSubmit={handleSearch} />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
