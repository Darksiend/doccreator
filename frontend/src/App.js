import logo from "./logo.svg";
import "./App.css";
import CreatingDocx from "./pages/CreatingDocx";
import Header from "./components/NavBar/Header";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { useEffect } from "react";
import Login from "./pages/Login/Login";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CreatingDocx />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
