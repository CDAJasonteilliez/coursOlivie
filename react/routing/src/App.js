import { Suspense, useEffect } from "react";
import styles from "./App.module.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet, ScrollRestoration, useLoaderData, useLocation } from "react-router-dom";

function App() {
  const user = useLoaderData();
  console.log(user);

  // const location = useLocation();

  // useEffect(()=> {
  //   console.log(location);
  // }, [location]);

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Suspense >
        <Outlet context={{ user }}/>  
      </Suspense>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

export default App;
