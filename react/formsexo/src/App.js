import { useState } from "react";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Login from "./components/Login";
import Profil from "./components/Profil";

function App() {
  const [page, setPage] = useState("Register");
  const [auth, setAuth] = useState(-1);

  return (
    <>
      <Header setPage={setPage} setAuth={setAuth} auth={auth} />
      {page === "Register" ? <Register setPage={setPage} /> : ""}
      {page === "HomePage" ? <HomePage /> : ""}
      {page === "Login" ? <Login setPage={setPage} setAuth={setAuth} /> : ""}
      {page === "Profil" ? <Profil auth={auth} /> : ""}
    </>
  );
}

export default App;
