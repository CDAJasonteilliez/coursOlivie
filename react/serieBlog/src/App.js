import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Homepage from "./Pages/Homepage/Homepage.js";


function App() {
  return (
    <div className="d-flex flex-column mh100">
      <Header />
      <Homepage />
      <Footer />
    </div>
  );
}

export default App;
