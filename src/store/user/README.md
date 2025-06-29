# User Authentication System

This document describes the user authentication system implemented in the Aanvi Mart application.

## Overview

The user authentication system is built using Redux Toolkit and provides:
- User login/logout functionality
- Persistent user sessions using localStorage
- User profile management
- OTP-based authentication
- User verification status

## Components

### 1. User Slice (`userSlice.ts`)

The main Redux slice that manages user state and authentication.

#### State Structure
```typescript
interface UserState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface UserData {
  username: string;
  mobileNumber: string;
  isVerified: boolean;
  email?: string;
  profilePicture?: string;
  joinDate?: string;
  lastLogin?: string;
}
```

#### Actions
- `loginUser(userData)`: Logs in a user and stores data in localStorage
- `logoutUser()`: Logs out user and clears localStorage
- `updateUserProfile(updates)`: Updates user profile information
- `initializeUser()`: Initializes user from localStorage on app start
- `setUser(userData)`: Sets user data without persistence
- `clearUser()`: Clears user data without persistence

#### Custom Hook: `useUser()`
Provides easy access to user state and actions:

```typescript
const { 
  user,           // Current user data
  isAuthenticated, // Authentication status
  loading,        // Loading state
  error,          // Error state
  login,          // Login function
  logout,         // Logout function
  updateProfile,  // Update profile function
  initialize      // Initialize function
} = useUser();
```

### 2. Login Component (`Login.tsx`)

Handles user authentication with OTP verification.

#### Features
- Username and mobile number validation
- OTP generation and verification
- Login/Signup toggle
- Form validation with error messages
- Loading states and timers

#### Usage
```typescript
<LoginModal
  isOpen={isLoginModalOpen}
  onClose={() => setIsLoginModalOpen(false)}
  onLoginSuccess={(userData) => {
    // Handle successful login
    login(userData);
  }}
  onSignupSuccess={(userData) => {
    // Handle successful signup
    login(userData);
  }}
/>
```

### 3. Header Component (`Header.tsx`)

Displays user authentication status and provides access to user account.

#### Features
- Shows user avatar and name when logged in
- Displays mobile number and verification status
- Provides "My Account" dropdown
- Shows login button when not authenticated

### 4. MyAccountModal (`MyAccountModal.tsx`)

Dropdown modal for user account actions.

#### Features
- User profile information display
- Navigation to profile and orders
- Logout functionality
- Responsive design

### 5. MyProfile Component (`MyProfile.tsx`)

Comprehensive user profile page.

#### Features
- User information display and editing
- Account statistics
- Quick action buttons
- Profile picture and verification status
- Responsive design

### 6. UserStatus Component (`UserStatus.tsx`)

Compact component showing current user status.

#### Features
- User avatar and name
- Mobile number and verification status
- Logout button
- Loading and error states

## Usage Examples

### Basic Authentication Flow

```typescript
import { useUser } from '../store/user/userSlice';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useUser();

  const handleLogin = (userData) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => setShowLogin(true)}>Login</button>
      )}
    </div>
  );
}
```

### Profile Management

```typescript
import { useUser } from '../store/user/userSlice';

function ProfileComponent() {
  const { user, updateProfile } = useUser();

  const handleUpdateProfile = (updates) => {
    updateProfile({
      username: updates.username,
      email: updates.email,
    });
  };

  return (
    <div>
      <h1>{user?.username}</h1>
      <p>Mobile: {user?.mobileNumber}</p>
      <p>Verified: {user?.isVerified ? 'Yes' : 'No'}</p>
      <p>Member since: {new Date(user?.joinDate).toLocaleDateString()}</p>
    </div>
  );
}
```

### Protected Routes

```typescript
import { useUser } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

function ProtectedComponent() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div>Please login to continue</div>;
  }

  return <div>Protected content here</div>;
}
```

## Local Storage

User data is automatically persisted in localStorage under the key `'currentUser'`. The data includes:
- Username
- Mobile number
- Verification status
- Join date
- Last login timestamp

## Error Handling

The system includes comprehensive error handling:
- Invalid OTP errors
- Network errors
- localStorage parsing errors
- Redux state access errors

## Security Considerations

1. **OTP Verification**: Uses time-based OTP for secure authentication
2. **Input Validation**: All user inputs are validated before processing
3. **Error Messages**: Generic error messages to prevent information leakage
4. **Session Management**: Automatic session cleanup on logout

## Future Enhancements

1. **JWT Tokens**: Implement JWT-based authentication
2. **Refresh Tokens**: Add token refresh functionality
3. **Multi-factor Authentication**: Add additional security layers
4. **Social Login**: Integrate with Google, Facebook, etc.
5. **Password-based Login**: Add traditional password authentication
6. **Email Verification**: Add email verification functionality

## Testing

The authentication system can be tested by:
1. Opening the login modal
2. Entering valid credentials
3. Verifying OTP
4. Checking user state persistence
5. Testing logout functionality
6. Verifying protected route access

## Troubleshooting

### Common Issues

1. **User not persisting**: Check localStorage permissions
2. **Login not working**: Verify Redux store configuration
3. **OTP issues**: Check console for API errors
4. **State not updating**: Ensure components are wrapped in Redux Provider

### Debug Commands

```javascript
// Check localStorage
console.log(localStorage.getItem('currentUser'));

// Check Redux state
console.log(store.getState().user);

// Clear user data
localStorage.removeItem('currentUser');
``` 