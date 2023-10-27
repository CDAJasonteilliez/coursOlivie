import { useState } from "react";
import Register from "./components/Register";
import HomePage from "./components/HomePage";


function App() {
    const [page, setPage] = useState("Register");

    return(
        <>  
            {page === "Register" ? <Register setPage={setPage} /> :""}
            {page === "HomePage" ? <HomePage /> :""}
     
        </>
    )
}

export default App;