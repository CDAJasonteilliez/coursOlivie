import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Homepage from "./components/Homepage.js";


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
