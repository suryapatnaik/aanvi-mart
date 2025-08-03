import React, { useRef, useEffect } from 'react';
import { useUser } from '../../store/user/userSlice';
import userIcon from '../../assets/icons/userIcon.svg';
import wishlistIcon from '../../assets/icons/wishlistIcon.svg';

interface MyAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToOrders?: () => void;
  onNavigateToWishlist?: () => void;
  position?: { x: number; y: number };
}

const MyAccountModal: React.FC<MyAccountModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  onNavigateToProfile,
  onNavigateToOrders,
  onNavigateToWishlist,
  position,
}) => {
  let currentUser = null;
  
  try {
    const userState = useUser();
    currentUser = userState.user;
  } catch (error) {
    console.error('Error in MyAccountModal:', error);
    // Fallback to null if there's an error
    currentUser = null;
  }
  
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleProfileClick = () => {
    onNavigateToProfile?.();
    onClose();
  };

  const handleOrdersClick = () => {
    onNavigateToOrders?.();
    onClose();
  };

  const handleWishlistClick = () => {
    onNavigateToWishlist?.();
    onClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  // Calculate position for the dropdown
  const modalStyle = position ? {
    position: 'fixed' as const,
    top: `${position.y+18}px`,
    left: `${position.x-10}px`,
    transform: 'translateX(-50%)',
  } : {};

  return (
    <div className="fixed inset-0 z-50">
      <div
        ref={modalRef}
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        style={modalStyle}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">My Account</h2>
          </div>
          {currentUser && (
            <div className="mt-3 flex items-center gap-3">
              <div>
                <img src={userIcon} alt="avatar" className="w-8 h-8 rounded-full" />
              </div>
              <div>
                <p className="font-semibold text-lg">{currentUser.username}</p>
                <p className="text-sm opacity-90">{currentUser.mobileNumber}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-0">
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center p-4 text-left hover:bg-gray-200 transition-colors group"
          >
            <div>
              <h3 className="font-semibold text-gray-900">My Profile</h3>
            </div>
          </button>

          <button
            onClick={handleOrdersClick}
            className="w-full flex items-center p-4 text-left hover:bg-gray-200 transition-colors group"
          >
            <div>
              <h3 className="font-semibold text-gray-900">My Orders</h3>
            </div>
          </button>

          <button
            onClick={handleWishlistClick}
            className="w-full flex items-center p-4 text-left hover:bg-gray-200 transition-colors group"
          >
            <div>
              <h3 className="font-semibold text-gray-900">My Wishlist</h3>
            </div>
          </button>

          <div className="border-t border-gray-200"></div>

          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center p-4 text-left hover:bg-red-50 transition-colors group"
          >
            <div>
              <h3 className="font-semibold text-red-600">Logout</h3>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccountModal; 