import AllRoutes from "./components/AllRoutes";
import "./App.css";
import NavbarTop from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavbarTop />
      <AllRoutes />
    </div>
  );
}

export default App;
