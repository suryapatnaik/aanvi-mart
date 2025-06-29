import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../index";

// Define UserData type to match Login component
interface UserData {
  username: string;
  mobileNumber: string;
  isVerified: boolean;
  email?: string;
  profilePicture?: string;
  joinDate?: string;
  lastLogin?: string;
}

// Create an async thunk
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    // Simulating an API call
    const response = await new Promise<UserData>(
      (resolve) =>
        setTimeout(
          () => resolve({ 
            username: "Jane Doe", 
            mobileNumber: "1234567890",
            isVerified: true 
          }),
          1000
        )
    );
    return response;
  }
);

// Define the state type
interface UserState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Create the slice with extraReducers for handling async actions
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    loginUser(state, action) {
      const userData = {
        ...action.payload,
        joinDate: action.payload.joinDate || new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      state.user = userData;
      state.isAuthenticated = true;
      state.error = null;
      // Store in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(userData));
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Remove from localStorage
      localStorage.removeItem('currentUser');
    },
    updateUserProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update localStorage
        localStorage.setItem('currentUser', JSON.stringify(state.user));
      }
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearLoading(state) {
      state.loading = false;
    },
    // Initialize user from localStorage
    initializeUser(state) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          state.user = userData;
          state.isAuthenticated = true;
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('currentUser');
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch user";
        state.loading = false;
      });
  },
});

// Export actions
export const { 
  setUser, 
  clearUser, 
  loginUser, 
  logoutUser, 
  updateUserProfile,
  setLoading, 
  setError, 
  clearLoading, 
  initializeUser 
} = userSlice.actions;

// Export selectors
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectUserLoading = (state: { user: UserState }) => state.user.loading;
export const selectUserError = (state: { user: UserState }) => state.user.error;

// Custom hook for user state
export const useUser = () => {
  const dispatch = useDispatch();
  
  // Add error handling for selectors
  let user, isAuthenticated, loading, error;
  
  try {
    user = useSelector((state: RootState) => state.user.user);
    isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    loading = useSelector((state: RootState) => state.user.loading);
    error = useSelector((state: RootState) => state.user.error);
  } catch (err) {
    console.error('Error accessing user state:', err);
    // Provide fallback values
    user = null;
    isAuthenticated = false;
    loading = false;
    error = 'Failed to load user state';
  }

  const login = useCallback((userData: UserData) => {
    try {
      dispatch(loginUser(userData));
    } catch (err) {
      console.error('Error during login dispatch:', err);
    }
  }, [dispatch]);

  const logout = useCallback(() => {
    try {
      dispatch(logoutUser());
    } catch (err) {
      console.error('Error during logout dispatch:', err);
    }
  }, [dispatch]);

  const updateProfile = useCallback((updates: Partial<UserData>) => {
    try {
      dispatch(updateUserProfile(updates));
    } catch (err) {
      console.error('Error during profile update dispatch:', err);
    }
  }, [dispatch]);

  const initialize = useCallback(() => {
    try {
      dispatch(initializeUser());
    } catch (err) {
      console.error('Error during initialize dispatch:', err);
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    updateProfile,
    initialize,
  };
};

// Export reducer
export default userSlice.reducer;
