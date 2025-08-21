
import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TUser = {
  name: string;
  email: string;
  role: string;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authslice  = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('token', token)
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token')
    },
  },
});


export const { setUser, logout } = authslice.actions;

export default authslice.reducer;

export const  selectCurrentUser = (state: RootState) => state.auth.user;
export const  selectCurrentToken = (state: RootState) => state.auth.token;