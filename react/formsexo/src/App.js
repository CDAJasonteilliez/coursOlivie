import { useState } from "react";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import Login from "./components/Login";


function App() {
    const [page, setPage] = useState("Register");

    return(
        <>  
            <Header setPage={setPage}/>
            {page === "Register" ? <Register setPage={setPage} /> :""}
            {page === "HomePage" ? <HomePage /> :""}
            {page === "Login" ? <Login /> :""}
     
        </>
    )
}

export default App;