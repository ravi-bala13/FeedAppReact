import AllRoutes from "./components/AllRoutes";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCanvas from "./components/NavbarCanvas";

function App() {
  return (
    <div className="App">
      <NavbarCanvas />
      <AllRoutes />
    </div>
  );
}

export default App;
