import { createSlice } from '@reduxjs/toolkit';
import { fetchTemplatesData } from '../actions/templateActions';

const initialState = {
  regions: [],
  machineTypes: [],
  clientNames: [],
  loading: false,
  error: null,
};

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    loadTemplates(state, action) {
      const savedTemplates = JSON.parse(localStorage.getItem(`filterTemplates`));
      if (savedTemplates) {
        state.regions = savedTemplates.regions;
        state.clientNames = savedTemplates.clientNames;
        state.machineTypes = savedTemplates.machineTypes;

      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplatesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplatesData.fulfilled, (state, action) => {
        const { regions, machineTypes, clientNames } = action.payload;
        state.regions = regions;
        state.machineTypes = machineTypes;
        state.clientNames = clientNames;

        const filterTemplates = {
          regions: state.regions,
          machineTypes: state.machineTypes,
          clientNames: state.clientNames
        };

        const savedTemplates = JSON.parse(localStorage.getItem(`filterTemplates`));
        if (savedTemplates) {
          localStorage.removeItem('filterTemplates');
        }
        const now = new Date();
        const item = {
          data: filterTemplates,
          expiry: now.getTime()
        };
        localStorage.setItem(`filterTemplates`, JSON.stringify(item));
        state.loading = false;
      })
      .addCase(fetchTemplatesData.rejected, (state, action) => {
        state.loading = false;
        console.error('Fetch Error:', action.error); // For debugging
        state.error = action.error.message;
      });
  },
});

// No need to export unnecessary action creators
export default templateSlice.reducer;
