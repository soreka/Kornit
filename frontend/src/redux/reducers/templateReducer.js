import { createSlice } from '@reduxjs/toolkit';

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
    fetchTemplatesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRegionsSuccess(state, action) {
      state.loading = false;
      state.regions = action.payload;
    },
    fetchMachineTypesSuccess(state, action) {
      state.loading = false;
      state.machineTypes = action.payload;
    },
    fetchClientNamesSuccess(state, action) {
      state.loading = false;
      state.clientNames = action.payload;
    },
    fetchTemplatesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTemplatesStart,
  fetchRegionsSuccess,
  fetchMachineTypesSuccess,
  fetchClientNamesSuccess,
  fetchTemplatesFailure,
} = templateSlice.actions;

export default templateSlice.reducer;
