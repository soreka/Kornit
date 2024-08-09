import { createSlice } from '@reduxjs/toolkit';
import { fetchFilteredData1 } from '../apis/fetchFilteredDataApi';
import { initialFilteredResults } from './filteredResultsStructure';
import { fetchFilteredUserData } from '../actions/filterAction';

const initialState = {
  users: {},
  loading: false,
  error: null
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setRegions(state, action) {
      const { userId, regions } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: [],
          filteredResults: { ...initialFilteredResults }
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
          filterHistory: [],
          filteredResults: { ...initialFilteredResults }
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
          filterHistory: [],
          filteredResults: { ...initialFilteredResults }
        };
      }
      state.users[userId].clientNames = clientNames;
    },
    applyFilters(state, action) {
      const { userId, selectedFiltersData } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: [],
          filteredResults: {}
        };
      }
      const filters = {
        regions: state.users[userId].regions,
        machineTypes: state.users[userId].machineTypes,
        clientNames: state.users[userId].clientNames
      };
      state.users[userId].regions = filters.regions;
      state.users[userId].machineTypes = filters.machineTypes;
      state.users[userId].clientNames = filters.clientNames;

      console.log("red", filters);
      state.users[userId].currentFilters = filters;
      state.users[userId].filterHistory.push(filters);

      const currentFiltersStorage = JSON.parse(localStorage.getItem(`currentFilters_${userId}`));
      const filterHistoryStorage = JSON.parse(localStorage.getItem(`filterHistory_${userId}`));
      if (currentFiltersStorage) {
        localStorage.removeItem(`currentFilters_${userId}`);
      }
      if (filterHistoryStorage) {
        localStorage.removeItem(`filterHistory_${userId}`);
      }

      localStorage.setItem(`currentFilters_${userId}`, JSON.stringify(filters));
      localStorage.setItem(`filterHistory_${userId}`, JSON.stringify(state.users[userId].filterHistory));

      //state.users[userId].filteredResults = FilteredData;
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
          filteredResults: {}
        };
      }
      state.users[userId].regions = [];
      state.users[userId].machineTypes = [];
      state.users[userId].clientNames = [];
      state.users[userId].currentFilters = {};
    },
    clearHistory(state, action) {
      const { userId } = action.payload;
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: [],
          filteredResults: {}
        };
      }
      const filterHistoryStorage = JSON.parse(localStorage.getItem(`filterHistory_${userId}`));
      if (filterHistoryStorage) {
        localStorage.removeItem(`filterHistory_${userId}`);
      }
      state.users[userId].filterHistory = [];
    },
    loadFilters(state, action) {
      const { userId } = action.payload;
      const savedFilters = JSON.parse(localStorage.getItem(`currentFilters_${userId}`));
      const savedFilterHistory = JSON.parse(localStorage.getItem(`filterHistory_${userId}`));
      const savedFilteredData = JSON.parse(localStorage.getItem(`filteredData_${userId}`));
      //const savedSelectedFilters = JSON.parse(localStorage.getItem(`selectedFilters_${userId}`));
      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: [],
          filteredResults: {}
        };
      }
      /* state.users[userId].regions = savedFilters.regions; */
      /* state.users[userId].machineTypes = savedFilters.machineTypes; */
      /* state.users[userId].clientNames = savedFilters.clientNames; */
      if (savedFilters && !state.users[userId].currentFilters) {
        state.users[userId].currentFilters = savedFilters;
      }
      if (savedFilterHistory && !state.users[userId].filterHistory) {
        state.users[userId].filterHistory = savedFilterHistory;
      }
      if (savedFilteredData && ! state.users[userId].filteredResults) {
        state.users[userId].filteredResults = savedFilteredData;
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
          filterHistory: [],
          filteredResults: { ...initialFilteredResults }
        };
      }
      state.users[userId].filteredResults = results;
    },
    setSelectedFilters(state, action) {
      const { userId, SelectedFilters } = action.payload;

      if (!state.users[userId]) {
        state.users[userId] = {
          regions: [],
          machineTypes: [],
          clientNames: [],
          currentFilters: {},
          filterHistory: [],
          filteredResults: {}
        };
      }


      const filters = {
        regions: SelectedFilters.regions,
        machineTypes: SelectedFilters.machineTypes,
        clientNames: SelectedFilters.clientNames
      };

      state.users[userId].regions = filters.regions;
      state.users[userId].machineTypes = filters.machineTypes;
      state.users[userId].clientNames = filters.clientNames;

      //state.users[userId].currentFilters = filters;
      //state.users[userId].filterHistory.push(filters);
      //localStorage.setItem(`selectedFilters_${userId}`, JSON.stringify(filters));
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredUserData.fulfilled, (state, action) => {
        const { userId1, FilteredData } = action.payload;
        const userId = "111111";

        // Initialize user state if it doesn't exist
        if (!state.users[userId]) {
          state.users[userId] = {
            regions: [],
            machineTypes: [],
            clientNames: [],
            currentFilters: {},
            filterHistory: [],
            filteredResults: {}
          };
        }

        // Apply filters and update state
        const filters = {
          regions: state.users[userId].regions,
          machineTypes: state.users[userId].machineTypes,
          clientNames: state.users[userId].clientNames
        };
        state.users[userId].currentFilters = filters;
        //state.users[userId].filterHistory.push(filters);
        state.users[userId].filteredResults = FilteredData;

        //const currentFiltersStorage = JSON.parse(localStorage.getItem(`currentFilters_${userId}`));
        //const filterHistoryStorage = JSON.parse(localStorage.getItem(`filterHistory_${userId}`));
        const filteredDataStorage = JSON.parse(localStorage.getItem(`filteredData_${userId}`));
        /* if (currentFiltersStorage) {
          localStorage.removeItem(`currentFilters_${userId}`);
        }
        if (filterHistoryStorage) {
          localStorage.removeItem(`filterHistory_${userId}`);
        } */
        if (filteredDataStorage) {
          localStorage.removeItem(`filteredData_${userId}`);
        }

        /* localStorage.setItem(`currentFilters_${userId}`, JSON.stringify(filters));
        localStorage.setItem(`filterHistory_${userId}`, JSON.stringify(state.users[userId].filterHistory));
 */        localStorage.setItem(`filteredData_${userId}`, JSON.stringify(FilteredData));

        state.users[userId].regions = [];
        state.users[userId].machineTypes = [];
        state.users[userId].clientNames = [];
        state.loading = false;
      })
      .addCase(fetchFilteredUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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
  setSelectedFilters
} = filterSlice.actions;

export default filterSlice.reducer;
