import "./App.css";
import NavHeading from "./components/NavHeading";
import Monitor from "./components/Monitor";

function App() {
  return (
    <div>
      <nav>
        <NavHeading />
      </nav>
      <main>
        <Monitor />
      </main>
    </div>
  );
}

export default App;
