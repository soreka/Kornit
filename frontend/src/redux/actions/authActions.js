import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../apis/logInApi';
import { jwtDecode } from 'jwt-decode';



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





export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId; // Ensure your token has `userId`
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};
