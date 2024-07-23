import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../actions/logInApi';


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
      try {
        const data = await login(email, password);
        localStorage.setItem('token', data.token);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );