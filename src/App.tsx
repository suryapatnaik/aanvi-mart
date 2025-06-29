import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer";
import BottomNavigation from "./Components/BottomNavigation/BottomNavigation";
import CategoriesModal from "./Components/categories/CategoriesModal";
import Categories from "./Components/categories/Categories";
import { ROUTES } from "./routes/constants";
import ErrorBoundary from "./Components/ErrorBoundary";
import MyProfile from "./Components/MyAccount/MyProfile";
import { LoginModal, UserData } from "./Components/Login";
import { useUser } from "./store/user/userSlice";
import ProtectedRoute from "./Components/ProtectedRoute";
import CategoryProducts from './pages/CategoryProducts';
import ProductDetail from './pages/ProductDetail';

const Home = lazy(() => import("./pages/Home"));

// Default Route Component that redirects to home
const DefaultRoute: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to home...</p>
      </div>
    </div>
  );
};

// Login Page Component that automatically opens login modal
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  // If user is already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = (userData: UserData) => {
    login(userData);
    setIsLoginModalOpen(false);
    // Redirect to home after successful login
    navigate(ROUTES.HOME);
  };

  const handleSignupSuccess = (userData: UserData) => {
    login(userData);
    setIsLoginModalOpen(false);
    // Redirect to home after successful signup
    navigate(ROUTES.HOME);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    // Redirect to home when modal is closed
    navigate(ROUTES.HOME);
  };

  return (
    <LoginModal
      isOpen={isLoginModalOpen}
      onClose={handleCloseLoginModal}
      onLoginSuccess={handleLoginSuccess}
      onSignupSuccess={handleSignupSuccess}
    />
  );
};

function AppContent() {
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useUser();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSearchClick = () => {
    setIsCategoriesModalOpen(true);
  };
  const handleCategoriesClick = () => {
    // Navigate to home page first
    navigate(ROUTES.HOME);
    
    // Then scroll to categories section after navigation completes
    setTimeout(() => {
      const categoriesSection = document.getElementById('categories-section');
      if (categoriesSection) {
        const headerHeight = 130; 
        const elementTop = categoriesSection.offsetTop;
        
        window.scrollTo({
          top: elementTop - headerHeight,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to ensure navigation completes
  };

  const handleMyAccountClick = () => {
    // Check if user is authenticated, if not redirect to login
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }
    navigate(ROUTES.ACCOUNT);
  };

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleHomeClick = () => {
    // Navigate to home page first
    navigate(ROUTES.HOME);
    
    // Then scroll to top of the screen
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100); // Small delay to ensure navigation completes
  };

  const handleCloseCategoriesModal = () => {
    setIsCategoriesModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary>
        <Header className="w-full" onCategoriesClick={handleCategoriesClick} />
      </ErrorBoundary>
      <main className="flex-1 flex flex-col items-center lg:pb-0 pb-20 lg:pt-24 md:pt-20 pt-16 max-sm:mt-10" >
        <div className="md:max-w-[80%] max-w-[90%] w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path="/category/:categoryValue" element={<CategoryProducts />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route 
                path={ROUTES.ACCOUNT} 
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                } 
              />
              {/* Catch all other routes and redirect to home */}
              <Route path="*" element={<DefaultRoute />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Footer />
      
      {/* Bottom Navigation for Mobile/Tablet */}
      <BottomNavigation
        onSearchClick={handleSearchClick}
        onCategoriesClick={handleCategoriesClick}
        onMyAccountClick={handleMyAccountClick}
        onLoginClick={handleLoginClick}
        onHomeClick={handleHomeClick}
      />

      {/* Categories Modal */}
      <CategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={handleCloseCategoriesModal}
      >
        <Categories />
      </CategoriesModal>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
