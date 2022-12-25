import logo from "./logo.svg";
import "./App.css";
import CreatingDocx from "./pages/CreatingDocx";
import Header from "./components/NavBar/Header";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CreatingDocx />} />
      </Routes>
    </>
  );
}

export default App;
