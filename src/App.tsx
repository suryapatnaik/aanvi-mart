import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import { ROUTES } from "./routes/constants";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Router>
      <div className="flex flex-col items-center">
        <Header className="w-full" />
        <div className="md:max-w-[80%] max-w-[90%]">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
