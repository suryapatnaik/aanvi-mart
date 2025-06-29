import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/user/userSlice";
import brandLogo from "../../assets/Brand/anvi-logo.png";
import categoryIcon from "../../assets/icons/categoryIcon.svg";
import CustomInput from "../CustomInput/CustomInput";
import CartSection from "../CartSection/CartSection";
import { fetchLocationDetails } from "../../utils/common/common.helpers";
import CartModal from "../CartSection/CartModal";
import MyAccountModal from "./MyAccountModal";
import { ROUTES } from "../../routes/constants";
import { searchProducts } from "../../utils/mockData";
import SearchResults from "../SearchResults";

// Add a locationzzzzlace with your SVG if needed)
const locationIcon = (
  <span role="img" aria-label="location" className="text-white text-lg">
    📍
  </span>
);

const fetchAndSetLocation = async (
  setLocation: React.Dispatch<React.SetStateAction<string>>,
  setPlusCode: React.Dispatch<React.SetStateAction<string>>
) => {
  const result = await fetchLocationDetails();
  if ("error" in result) {
    setLocation(result.error);
    setPlusCode("");
  } else {
    setPlusCode(result.plusCode);
    setLocation(result.address);
  }
};

interface HeaderProps {
  className?: string;
  onCategoriesClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ className = '', onCategoriesClick = () => {} }) => {
  const { user: currentUser, isAuthenticated, login, logout, initialize } = useUser();
  const initializedRef = useRef(false);
  const navigate = useNavigate();
  
  const [location, setLocation] = useState<string>("Fetching location...");
  const [plusCode, setPlusCode] = useState<string>("");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isMyAccountModalOpen, setIsMyAccountModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number } | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Initialize user from localStorage on component mount
  useEffect(() => {
    if (!initializedRef.current) {
      try {
        initialize();
        initializedRef.current = true;
      } catch (error) {
        console.error('Error initializing user:', error);
      }
    }
  }, [initialize]);

  useEffect(() => {
    try {
      fetchAndSetLocation(setLocation, setPlusCode);
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocation("Location unavailable");
    }
  }, []);

  const handleLogout = () => {
    try {
      logout();
      setIsMyAccountModalOpen(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleNavigateToProfile = () => {
    navigate(ROUTES.ACCOUNT);
  };

  const handleNavigateToOrders = () => {
    navigate(ROUTES.ORDERS);
  };

  const handleMyAccountClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    try {
      // If user is not authenticated, redirect to login
      if (!isAuthenticated) {
        navigate(ROUTES.LOGIN);
        return;
      }

      if (event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        setModalPosition({
          x: rect.left + rect.width / 2,
          y: rect.bottom + 10, // 10px gap below the button
        });
      } else {
        // For bottom navigation, position in center
        setModalPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        });
      }
      setIsMyAccountModalOpen(true);
    } catch (error) {
      console.error('Error handling my account click:', error);
    }
  };

  const handleSearchClick = () => {
    // Focus on search input or open search modal
    console.log('Search clicked');
  };

  const handleHomeClick = () => {
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchProducts(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(true);
  };

  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
    setSearchQuery("");
  };

  return (
    <>
      <div className={`bg-[#920000] fixed top-0 left-0 right-0 z-50 ${className}`}>
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between p-4">
          {/* Logo and Location Section */}
          <div className="flex items-center gap-4">
            <img
              src={brandLogo}
              className="w-[70px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
              alt="Brand Logo"
              onClick={() => navigate(ROUTES.HOME)}
            />

            <div className="flex flex-col text-white">
              <div className="flex items-center gap-1">
                {locationIcon}
                <span className="font-semibold text-sm">{plusCode || "--"}</span>
              </div>
              <span className="text-xs truncate max-w-[200px]">
                {location}
              </span>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-8">
            <CustomInput
              placeholder="Search for Chicken, Mutton and More.."
              height="50px"
              width="100%"
              value={searchQuery}
              onSearch={handleSearch}
              showSearchResults={showSearchResults}
              searchResults={
                showSearchResults && searchResults.length > 0 ? (
                  <SearchResults
                    products={searchResults}
                    searchQuery={searchQuery}
                    onClose={handleCloseSearchResults}
                  />
                ) : undefined
              }
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div 
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onCategoriesClick}
            >
              <img src={categoryIcon} className="h-6 w-6" alt="Categories" />
              <h2 className="text-white font-semibold font-sans">
                Categories
              </h2>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                
                {/* My Account Button */}
                <button 
                  onClick={handleMyAccountClick}
                  className="text-white font-medium cursor-pointer hover:text-red-900 transition-colors px-3 py-1 rounded hover:bg-white hover:bg-opacity-10 flex items-center gap-2"
                >
                  <span>My Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className="text-white font-medium cursor-pointer hover:text-red-900 transition-colors px-4 py-2 rounded border border-white hover:bg-white hover:bg-opacity-10"
              >
                Login
              </button>
            )}

            <CartSection onClick={() => setIsCartModalOpen(true)} />
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:flex lg:hidden items-center justify-between p-3">
          {/* Logo and Location */}
          <div className="flex items-center gap-3">
            <img
              src={brandLogo}
              className="w-[60px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
              alt="Brand Logo"
              onClick={() => navigate(ROUTES.HOME)}
            />

            <div className="flex flex-col text-white">
              <div className="flex items-center gap-1">
                {locationIcon}
                <span className="font-semibold text-sm">{plusCode || "--"}</span>
              </div>
              <span className="text-xs truncate max-w-[150px]">
                {location}
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4">
            <CustomInput
              placeholder="Search for Chicken, Mutton and More.."
              height="45px"
              width="100%"
              value={searchQuery}
              onSearch={handleSearch}
              showSearchResults={showSearchResults}
              searchResults={
                showSearchResults && searchResults.length > 0 ? (
                  <SearchResults
                    products={searchResults}
                    searchQuery={searchQuery}
                    onClose={handleCloseSearchResults}
                  />
                ) : undefined
              }
            />
          </div>

          {/* Right Section - Only Cart for tablet */}
          <div className="flex items-center gap-4">
            <CartSection onClick={() => setIsCartModalOpen(true)} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden p-3">
          {/* Top Row - Logo, Location, and Actions */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img
                src={brandLogo}
                className="w-[50px] object-contain cursor-pointer hover:opacity-80 transition-opacity"
                alt="Brand Logo"
                onClick={() => navigate(ROUTES.HOME)}
              />

              <div className="flex flex-col text-white">
                <div className="flex items-center gap-1">
                  {locationIcon}
                  <span className="font-semibold text-sm">{plusCode || "--"}</span>
                </div>
                <span className="text-xs truncate max-w-[120px]">
                  {location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CartSection onClick={() => setIsCartModalOpen(true)} />
            </div>
          </div>

          {/* Bottom Row - Search Only */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <CustomInput
                placeholder="Search for Chicken, Mutton and More.."
                height="40px"
                width="100%"
                value={searchQuery}
                onSearch={handleSearch}
                showSearchResults={showSearchResults}
                searchResults={
                  showSearchResults && searchResults.length > 0 ? (
                    <SearchResults
                      products={searchResults}
                      searchQuery={searchQuery}
                      onClose={handleCloseSearchResults}
                    />
                  ) : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* My Account Modal */}
      <MyAccountModal
        isOpen={isMyAccountModalOpen}
        onClose={() => setIsMyAccountModalOpen(false)}
        onLogout={handleLogout}
        onNavigateToProfile={handleNavigateToProfile}
        onNavigateToOrders={handleNavigateToOrders}
        position={modalPosition}
      />

      {isCartModalOpen && (
        <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
      )}
    </>
  );
};

export default Header;
