import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer";
import { ROUTES } from "./routes/constants";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header className="w-full" />
        <main className="flex-1 flex flex-col items-center">
          <div className="md:max-w-[80%] max-w-[90%] w-full">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
              </Routes>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
