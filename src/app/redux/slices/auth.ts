import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

interface AuthInfo {
  access_token: string;
  expires_at: Date;
}

interface AuthState {
  auth: AuthInfo | null;
  tokenDevice: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export const login = createAsyncThunk<AuthInfo, LoginParams>(
  "auth/login",
  async (values: LoginParams, { rejectWithValue }) => {
      try {
          const res = await new Promise((resolve, reject) => {
            if (values.username === 'jinylove99' && values.password === 'huyhung@123') {
              const response: AuthInfo = {
                access_token: 'random_Access_token',
                expires_at: new Date(),
              }
              resolve(response);
            }
            else{
              reject('Invalid username or password')
            }
          })
          return res as AuthInfo;
      } catch (err: any) {
          console.log(err);
          return rejectWithValue(err);
      }
  }
);

const initialState: AuthState = {
  auth: null,
  tokenDevice: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: () => {
      //clear token
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<AuthInfo>) => {
        if (action.payload.access_token) {
            state.auth = action.payload;
        }
    });

    builder.addCase(login.pending, (state) => {
      //do something
    });

    builder.addCase(login.rejected, (state) => {
        state.auth = null;
    });
},
});

export const selectAuth = (state: RootState) => state.auth;

export const {logout} = authSlice.actions;

export default authSlice.reducer;
