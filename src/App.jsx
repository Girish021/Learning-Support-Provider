
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./Component/Header";
import LoadingSpinner from "./Component/LoadingSpinner";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const ProviderDetail = lazy(() => import("./pages/ProviderDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/provider/:id" element={<ProviderDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p>
              © {new Date().getFullYear()} Learning Support Directory. All
              rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
