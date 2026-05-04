import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import routeMapping from "./objects/routeMapping";

const App = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="app-content">
          <Routes>
            {routeMapping.map((route) => (
              <Route path={route.path} element={route.element}/>
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
