import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemplatesData } from '../../../redux/actions/templateActions';
import { fetchFilteredUserData } from '../../../redux/actions/filterAction';
import { applyFilters, resetFilters, loadFilters, clearHistory, setSelectedFilters } from '../../../redux/reducers/filterReducer';
import selectedDataStructure from '../../../redux/reducers/selectedDataStructure';


const Filter = () => {
    const userId = "111111";/* getUserIdFromToken(); */ // Ensure this gets the correct userId
    const dispatch = useDispatch();
    const [SelectedData, setSelectedData] = useState('');
    const [selData, setSelData] = useState('');
    const [filtersApplied, setFiltersApplied] = useState(false);

    const filtersTemplates = useSelector((state) => state.templates);
    const currentFilters = useSelector((state) => state.filters.users[userId]?.currentFilters || {});

    const loadingfilterdData = useSelector((state) => state.filters.loading);
    const errorfilterdData = useSelector((state) => state.filters.error);

    const loadingTemplates = useSelector((state) => state.templates.loading);
    const errorTemplates = useSelector((state) => state.templates.error);
    /*     const state = useSelector((state) => state);*/

    useEffect(() => {

        checkTemplatesExpiration();

    }, [filtersTemplates]);

    useEffect(() => {
        const applyFiltersAsync = async () => {
            try {
                await dispatch(applyFilters({ userId }));
                setFiltersApplied(true);
            } catch (error) {
                console.error("Error applying filters:", error);
            }
        };
        if (selData) {
            applyFiltersAsync();
        }
    }, [selData, dispatch, userId]);

    useEffect(() => {
        if (filtersApplied) {
            dispatch(fetchFilteredUserData({ userId, filters: currentFilters }));
            setFiltersApplied(false);
        }
    }, [filtersApplied, currentFilters, dispatch, userId]);

    const checkTemplatesExpiration = () => {

        if (!filtersTemplates) {
            dispatch(fetchTemplatesData());
        } else {

            const savedTemplates = localStorage.getItem(`filterTemplates`);
            if (!savedTemplates) dispatch(fetchTemplatesData());
            try {
                const item = JSON.parse(savedTemplates);
                const now = new Date();
                console.log("item.expiry", item.expiry);

                if (now.getTime() - item.expiry >= (1000 * 60 * 60 * 24)) {
                    // Item has expired
                    localStorage.removeItem(`filterTemplates`);
                    dispatch(fetchTemplatesData());
                }
            } catch (e) {
                // Handle parsing error
                console.error('Error retrieving item from localStorage', e);
                return null;
            }
        };
    }


    const handleApplyFilter = (event) => {
        event.preventDefault();
        setSelData(' ');
        // This will be handled in the useEffect
    };

    const handleSelectFilter = async (event) => {
        event.preventDefault();
        setSelectedData(selectedDataStructure.SelectedFilters);
        dispatch(setSelectedFilters({ userId, SelectedFilters: selectedDataStructure.SelectedFilters }));
    };

    const handleClearHistory = async (event) => {
        event.preventDefault();
        dispatch(clearHistory({ userId }));
    };
    const handleLoadFilters = async (event) => {
        event.preventDefault();
        dispatch(loadFilters({ userId }));
    };
    const handleResetFilters = async (event) => {
        event.preventDefault();
        dispatch(resetFilters({ userId }));
    };
    const handleGetTemplates = async (event) => {
        event.preventDefault();
        dispatch(fetchTemplatesData());
    };




    return (
        <>
            <form onSubmit={handleGetTemplates}>
                click to get templates for filters
                <button type="submit" disabled={loadingTemplates}>
                    {loadingTemplates ? 'waiting...' : 'get templates'}
                </button>

                {errorTemplates && <p>{errorTemplates.message}</p>}
            </form>

            <form onSubmit={handleSelectFilter}>
                click to select filter
                <button type="submit">
                    {'Select'}
                </button>

                {errorfilterdData && <p>{errorfilterdData.message}</p>}
            </form>
            <form onSubmit={handleApplyFilter}>
                click to Apply Filter
                <button type="submit" disabled={loadingfilterdData}>
                    {loadingfilterdData ? 'waiting...' : 'get filtered Data'}
                </button>

                {errorfilterdData && <p>{errorfilterdData.message}</p>}
            </form>

        </>
    );
};

export default Filter;
