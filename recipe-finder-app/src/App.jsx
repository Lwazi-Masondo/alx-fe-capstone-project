import "/src/styles/App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <h1 className="font-bold text-blue-600 text-2xl">
          Welcome to my recipe finder app
        </h1>
      </main>
      <Footer />
    </div>
  );
}

export default App;
