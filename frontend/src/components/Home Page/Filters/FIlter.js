import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setRegions,
    setMachineTypes,
    setClientNames,
    applyFilters,
    resetFilters,
    clearHistory,
    loadFilters,
    setFilteredResults
} from '../../../redux/reducers/filterReducer';
import { fetchFilteredData } from '../../../redux/apis/fetchFilteredDataApi';
import { getUserIdFromToken } from '../../../redux/actions/authActions';


const Filter = () => {
    const userId = getUserIdFromToken(); // Ensure this gets the correct userId
    const dispatch = useDispatch();
    const userFilters = useSelector(state => state.filters.users[userId]?.currentFilters || {});
    const { regions, machineTypes, clientNames, filterHistory } = useSelector(state => state.filters.users[userId] || {});

    useEffect(() => {
        dispatch(loadFilters({ userId }));
    }, [dispatch, userId]);

    const handleRegionsChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        dispatch(setRegions({ userId, regions: options }));
    };

    const handleMachineTypesChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        dispatch(setMachineTypes({ userId, machineTypes: options }));
    };

    const handleClientNamesChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        dispatch(setClientNames({ userId, clientNames: options }));
    };

    const handleApply = async () => {
        dispatch(applyFilters({ userId }));
        fetchFilteredResults();
    };

    const fetchFilteredResults = async () => {
        const filters = {
            regions: userFilters.regions || [],
            machineTypes: userFilters.machineTypes || [],
            clientNames: userFilters.clientNames || []
        };
        try {
            const data = await fetchFilteredData(filters);
            dispatch(setFilteredResults({ userId, results: data }));
        } catch (error) {
            console.error('Failed to fetch filtered results:', error);
        }
    };

    const handleReset = () => {
        dispatch(resetFilters({ userId }));
    };

    const handleClearHistory = () => {
        dispatch(clearHistory({ userId }));
    };

    const handleCurrentFilterChange = (filterType, value) => {
        switch (filterType) {
            case 'regions':
                dispatch(setRegions({ userId, regions: value.split(',') }));
                break;
            case 'machineTypes':
                dispatch(setMachineTypes({ userId, machineTypes: value.split(',') }));
                break;
            case 'clientNames':
                dispatch(setClientNames({ userId, clientNames: value.split(',') }));
                break;
            default:
                break;
        }
    };

    return (
        <div>
        </div>
    );
};

export default Filter;
