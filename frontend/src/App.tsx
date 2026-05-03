import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <p>Home!</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
