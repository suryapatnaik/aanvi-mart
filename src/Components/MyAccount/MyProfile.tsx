import React, { useState, useEffect } from 'react';
import { useUser } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
// Import available icons
import CartIcon from "../../assets/icons/CartIcon.svg";
import categoryIcon from "../../assets/icons/categoryIcon.svg";
import phoneIcon from "../../assets/icons/phoneIcon.svg";
import CheckedIcon from "../../assets/icons/CheckedIcon.svg";
import facebookIcon from "../../assets/icons/facebookIcon.svg";
import instagramIcon from "../../assets/icons/instagramIcon.svg";

// TODO: Replace with actual API service when backend is ready
const mockApiService = {
  updateProfile: async (userData: { username: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('API Call: updateProfile', userData);
    return { success: true, data: userData };
  },
  
  verifyUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('API Call: verifyUser');
    return { success: true, data: { isVerified: true } };
  }
};

const MyProfile: React.FC = () => {
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form to original values
      setEditForm({
        username: user?.username || '',
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'username') {
      setEditForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await mockApiService.updateProfile(editForm);
      
      if (response.success) {
        // TODO: Update user state in Redux store
        console.log('Profile updated successfully:', response.data);
        setIsEditing(false);
        // You can add a success toast/notification here
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      // TODO: Add error handling and user notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyUser = async () => {
    setIsVerifying(true);
    try {
      // TODO: Replace with actual verification API call
      const response = await mockApiService.verifyUser();
      
      if (response.success) {
        console.log('User verified successfully');
        // TODO: Update user verification status in Redux store
        // You can add a success toast/notification here
      }
    } catch (error) {
      console.error('Failed to verify user:', error);
      // TODO: Add error handling and user notification
    } finally {
      setIsVerifying(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-800 to-red-900 rounded-full flex items-center justify-center">
                <span className="text-lg sm:text-2xl font-bold text-white">
                  {user.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user.username}</h1>
                <p className="text-sm sm:text-base text-gray-600">{user.mobileNumber}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.isVerified ? '✓ Verified User' : 'Unverified User'}
                  </span>
                </div>
              </div>
              <button
                onClick={handleEditToggle}
                disabled={isLoading}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                title={isEditing ? 'Cancel' : 'Edit Username'}
              >
                {isEditing ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate(ROUTES.HOME)}
                className="w-auto px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="sm:inline">Home</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-auto px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className=" sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-sm sm:text-base"
                    placeholder="Enter username"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-900">{user.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="space-y-2">
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-sm sm:text-base text-gray-900">{user.mobileNumber}</p>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    Mobile number cannot be changed for security reasons. Contact support if you need to update your number.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Status
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.isVerified ? '✓ Verified' : 'Unverified'}
                  </span>
                  {!user.isVerified && (
                    <button 
                      onClick={handleVerifyUser}
                      disabled={isVerifying}
                      className="text-sm text-blue-600 hover:text-blue-800 underline disabled:opacity-50 disabled:cursor-not-allowed w-fit"
                    >
                      {isVerifying ? 'Verifying...' : 'Verify Now'}
                    </button>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="pt-4">
                  <button
                    onClick={handleSaveChanges}
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Statistics */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Account Statistics</h2>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">0</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-green-600">₹0</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">0</div>
                <div className="text-xs sm:text-sm text-gray-600">Wishlist Items</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-orange-600">0</div>
                <div className="text-xs sm:text-sm text-gray-600">Reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mt-4 sm:mt-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <button className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">My Orders</h3>
                <p className="text-xs sm:text-sm text-gray-500">Track your orders</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Wishlist</h3>
                <p className="text-xs sm:text-sm text-gray-500">View saved items</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Reviews</h3>
                <p className="text-xs sm:text-sm text-gray-500">Rate your purchases</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AccountOptionProps {
  icon: React.ReactNode;
  label: React.ReactNode;
}

const AccountOption: React.FC<AccountOptionProps> = ({ icon, label }) => (
  <button
    className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors w-full text-left border-b border-gray-100 last:border-b-0"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default MyProfile; 