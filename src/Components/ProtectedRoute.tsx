import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../store/user/userSlice';
import { ROUTES } from '../routes/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      // Redirect to login page
      navigate(ROUTES.LOGIN);
    }
  }, [isAuthenticated, user, navigate]);

  // Show loading while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Please log in to continue...</p>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 