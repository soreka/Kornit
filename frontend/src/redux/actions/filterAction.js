import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFilteredData1 } from '../apis/fetchFilteredDataApi';


 export const fetchFilteredUserData = createAsyncThunk(
  'filters/fetchFilteredUserData', 
  async ({ userId, filters }, thunkAPI) => {
    try {
      console.log("from fetch", filters);
      const data = await fetchFilteredData1(filters);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
); 
