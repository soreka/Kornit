
  import { createAsyncThunk } from '@reduxjs/toolkit';
  import { fetchFilterTemplates } from '../apis/fetchFilterTemplatesApi';
  

  export const fetchTemplatesData = createAsyncThunk(
    'templates/fetchTemplatesData', /* [slice name]/[action name] */
    async ( thunkAPI) => {
      try {
        const data = await fetchFilterTemplates();
        localStorage.setItem('templates', data.Templates);
        //console.log(data);
        return data.Templates;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );