import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import AppNavbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <BrowserRouter>
      <NoteState>
        <div>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </NoteState>
    </BrowserRouter>
  );
}

export default App;
