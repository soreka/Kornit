import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredData } from '../../redux/apis/fetchDataApi';
import { applyFilters, loadFilters } from '../../../redux/reducers/filterReducer';
import { getUserIdFromToken } from '../../redux/actions/authActions';
import { fetchFilteredUserData } from '../../redux/actions/filterAction';


const HomePage = () => {
  const userId = getUserIdFromToken(); // Ensure this gets the correct userId
  const dispatch = useDispatch();
  const filteredResults = useSelector(state => state.filters.users[userId]?.filteredResults);
  const userFilters = useSelector(state => state.filters.users[userId]?.currentFilters || {}); // Use `currentFilters`

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!filteredResults) {
          dispatch(fetchFilteredUserData({ userId, filters: "All" }));// get all data per week
        }
      } catch (error) {
        setError('Failed to fetch filtered data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch, filteredResults, userFilters, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Home Page</h1>
      {filteredResults ? (
        <>

        </>
      ) : (
        <p>No data available. Please apply filters to view results.</p>
      )}
    </div>
  );
};

export default HomePage;
