import "./App.css";
import NavHeading from "./components/NavHeading";
import UtilityBar from "./components/Monitor";

function App() {
  return (
    <div>
      <nav>
        <NavHeading />
      </nav>
      <main>
        <UtilityBar />
      </main>
    </div>
  );
}

export default App;
