import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

const App = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Input NavBar Here */}
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
        {/* Input footer here! */}
      </div>
    </BrowserRouter>
  );
};

export default App;
