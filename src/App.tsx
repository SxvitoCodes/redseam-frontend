import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const isLoggedIn = false; // will replace later with real auth logic

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
