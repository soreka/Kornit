import { createSlice } from '@reduxjs/toolkit';
import {fetchFilteredUserData} from '../apis/fetchFilteredDataApi';

const initialState = {
  users: {
    loading: false,
    error: null
  }
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    fetchFilteredDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFilteredDatasSuccess(state, action) {
      state.loading = false;
      state.regions = action.payload;
    },
    fetchFilteredDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },


    setRegions(state, action) {
      const { userId, regions } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: {},
          filteredResults: {}
        };
      }
      state.users[userId].regions = regions;
    },
    setMachineTypes(state, action) {
      const { userId, machineTypes } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: {},
          filteredResults: {}
        };
      }
      state.users[userId].machineTypes = machineTypes;
    },
    setClientNames(state, action) {
      const { userId, clientNames } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: {},
          filteredResults: {}
        };
      }
      state.users[userId].clientNames = clientNames;
    },
    applyFilters(state, action) {
      const { userId, FilteredData } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: {},
          filteredResults: {}
        };
      }
      const filters = {
        regions: state.users[userId].regions,
        machineTypes: state.users[userId].machineTypes,
        clientNames: state.users[userId].clientNames
      };
      state.users[userId].currentFilters = filters;
      state.users[userId].filterHistory.push(filters);
      localStorage.setItem(`currentFilters_${userId}`, JSON.stringify(filters));
      state.users[userId].filteredResults = FilteredData;
    },
    resetFilters(state, action) {
      const { userId } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: [],
          filteredResults: []
        };
      }
      state.users[userId].regions = [];
      state.users[userId].machineTypes = [];
      state.users[userId].clientNames = [];
      state.users[userId].currentFilters = {};
      state.users[userId].filteredResults = {};
    },
    clearHistory(state, action) {
      const { userId } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: {},
          filteredResults: {}
        };
      }
      state.users[userId].filterHistory = [];
    },
    loadFilters(state, action) {
      const { userId } = action.payload;
      const savedFilters = JSON.parse(localStorage.getItem(`currentFilters_${userId}`));
      if (savedFilters) {
        if (!state.users[userId]) {
          state.users[userId] = {
            regions: [],
            machineTypes: [],
            clientNames: [],
            currentFilters: {},
            filterHistory: {},
            filteredResults: {}
          };
        }
        state.users[userId].regions = savedFilters.regions;
        state.users[userId].machineTypes = savedFilters.machineTypes;
        state.users[userId].clientNames = savedFilters.clientNames;
        state.users[userId].currentFilters = savedFilters;
      }
    },
    setFilteredResults(state, action) {
      const { userId, results } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: {},
          filteredResults: {}
        };
      }
      state.users[userId].filteredResults = results;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilteredUserData.pending, (state, action) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(fetchFilteredUserData.fulfilled, (state, action) => {
        const { userId, FilteredData } = action.payload;
        state.loading = false;
        state.regions = action.payload;
        state.users[userId].filteredResults = FilteredData;
      })
      .addCase(fetchFilteredUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })
  }
});

export const {
  setRegions,
  setMachineTypes,
  setClientNames,
  applyFilters,
  resetFilters,
  clearHistory,
  loadFilters,
  setFilteredResults,
} = filterSlice.actions;

export default filterSlice.reducer;
