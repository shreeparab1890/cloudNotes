import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import AppNavbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import AppAlert from "./components/Alert";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <BrowserRouter>
      <NoteState>
        <div>
          <AppNavbar />
          <AppAlert alert={alert} />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
