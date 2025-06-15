import React, { useEffect, useState } from "react";
import brandLogo from "../../assets/Brand/anvi-logo.png";
import categoryIcon from "../../assets/icons/categoryIcon.svg";
import CustomInput from "../CustomInput/CustomInput";
import CartSection from "../CartSection/CartSection";
import { fetchLocationDetails } from "../../utils/common/common.helpers";
import { LoginModal, UserData } from "../Login";

// Add a location icon (using a Unicode emoji for now, replace with your SVG if needed)
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
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [location, setLocation] = useState<string>("Fetching location...");
  const [plusCode, setPlusCode] = useState<string>("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(() => {
    // Load user data from localStorage on component mount
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    fetchAndSetLocation(setLocation, setPlusCode);
  }, []);

  const handleLoginSuccess = (userData: UserData) => {
    console.log('Login successful:', userData);
    setCurrentUser(userData);
    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleSignupSuccess = (userData: UserData) => {
    console.log('Signup successful:', userData);
    setCurrentUser(userData);
    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // Remove user data from localStorage
    localStorage.removeItem('currentUser');
  };

  return (
    <>
      <div className={`bg-[#920000] ${className}`}>
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between p-4">
          {/* Logo and Location Section */}
          <div className="flex items-center gap-4">
            <img
              src={brandLogo}
              className="w-[70px] object-contain"
              alt="Brand Logo"
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
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
              <img src={categoryIcon} className="h-6 w-6" alt="Categories" />
              <h2 className="text-white font-semibold font-sans">
                Categories
              </h2>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="text-white text-sm">
                  <span className="font-medium">Hi, {currentUser.username}!</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-white font-medium cursor-pointer hover:text-gray-200 transition-colors px-3 py-1 rounded hover:bg-white hover:bg-opacity-10"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="text-white font-medium cursor-pointer hover:text-gray-200 transition-colors px-3 py-1 rounded hover:bg-white hover:bg-opacity-10"
              >
                Login
              </button>
            )}

            <CartSection />
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:flex lg:hidden items-center justify-between p-3">
          {/* Logo and Location */}
          <div className="flex items-center gap-3">
            <img
              src={brandLogo}
              className="w-[60px] object-contain"
              alt="Brand Logo"
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
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
              <img src={categoryIcon} className="h-5 w-5" alt="Categories" />
              <h2 className="text-white font-semibold font-sans text-sm">
                Categories
              </h2>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">Hi, {currentUser.username}!</span>
                <button 
                  onClick={handleLogout}
                  className="text-white font-medium cursor-pointer hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-white hover:bg-opacity-10 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="text-white font-medium cursor-pointer hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-white hover:bg-opacity-10 text-sm"
              >
                Login
              </button>
            )}

            <CartSection />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden p-3">
          {/* Top Row - Logo, Location, and Actions */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img
                src={brandLogo}
                className="w-[50px] object-contain"
                alt="Brand Logo"
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
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">Hi, {currentUser.username}!</span>
                  <button 
                    onClick={handleLogout}
                    className="text-white font-medium cursor-pointer  transition-colors px-2 py-1 rounded hover:bg-white hover:text-[#920000] hover:bg-opacity-10 text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-white font-medium cursor-pointer  transition-colors px-2 py-1 rounded hover:bg-white hover:text-[#920000] hover:bg-opacity-10 text-sm"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row - Search, Categories, and Cart */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <CustomInput
                placeholder="Search"
                height="40px"
                width="100%"
              />
            </div>

            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
              <img src={categoryIcon} className="h-5 w-5" alt="Categories" />
              <span className="text-white font-semibold font-sans text-sm">
                Categories
              </span>
            </div>

            <CartSection />
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleSignupSuccess}
      />
    </>
  );
};

export default Header;
