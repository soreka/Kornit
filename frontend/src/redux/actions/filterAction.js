import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFilteredData1 } from '../apis/fetchFilteredDataApi';



export const fetchFilteredUserData = createAsyncThunk(
    'filters/fetchFilteredUserData', /* [slice name]/[action name] */
    async ({ filters }, thunkAPI) => {
      try {
        const data = await fetchFilteredData1(filters);
        localStorage.setItem('filters', data.filters);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );