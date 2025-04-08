import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Create an async thunk
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    // Simulating an API call
    const response = await new Promise<{ name: string; email: string }>(
      (resolve) =>
        setTimeout(
          () => resolve({ name: "Jane Doe", email: "jane.doe@example.com" }),
          1000
        )
    );
    return response;
  }
);

// Define the state type
interface UserState {
  user: { name: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Create the slice with extraReducers for handling async actions
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to fetch user";
        state.loading = false;
      });
  },
});

// Export actions
export const { setUser, clearUser, setLoading, setError, clearLoading } =
  userSlice.actions;

// Export reducer
export default userSlice.reducer;
