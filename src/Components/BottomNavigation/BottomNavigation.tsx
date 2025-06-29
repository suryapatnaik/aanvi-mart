import React from "react";
import { useUser } from "../../store/user/userSlice";
import SearchIcon from "../../assets/icons/SearchIcon.svg";
import categoryIcon from "../../assets/icons/CategoryMobile.svg";

interface BottomNavigationProps {
  onSearchClick: () => void;
  onCategoriesClick: () => void;
  onMyAccountClick: () => void;
  onLoginClick: () => void;
  onHomeClick: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onSearchClick,
  onCategoriesClick,
  onMyAccountClick,
  onLoginClick,
  onHomeClick,
}) => {
  let isAuthenticated = false;
  
  try {
    const userState = useUser();
    isAuthenticated = userState.isAuthenticated;
  } catch (error) {
    console.error('Error in BottomNavigation:', error);
    // Fallback to false if there's an error
    isAuthenticated = false;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around py-2">
        {/* Home */}
        <button 
          onClick={onHomeClick}
          className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-6 h-6 text-[#920000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium text-[#920000]">Home</span>
        </button>

        {/* Search */}
        <button 
          onClick={onSearchClick}
          className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img src={SearchIcon} className="w-6 h-6" alt="Search" />
          <span className="text-xs font-medium text-gray-600">Search</span>
        </button>

        {/* Categories */}
        <button 
          onClick={onCategoriesClick}
          className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img src={categoryIcon} className="w-6 h-6" alt="Categories" />
          <span className="text-xs font-medium text-gray-600">Categories</span>
        </button>

        {/* My Account */}
        <button 
          onClick={isAuthenticated ? onMyAccountClick : onLoginClick}
          className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs font-medium text-gray-600">
            Account
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation; 