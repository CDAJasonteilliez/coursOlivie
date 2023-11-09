import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Suspense } from "react";
import UserProvider from "./components/Provider/UserProvider";

function App() {

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <UserProvider>
        <Header/>
        <Suspense>
          <Outlet/>  
        </Suspense>
        <Footer />
      </UserProvider >
    </div>
  );
}

export default App;
