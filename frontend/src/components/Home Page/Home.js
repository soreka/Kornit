import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilteredData } from '../../redux/apis/fetchDataApi';
import { applyFilters, loadFilters } from '../../../redux/reducers/filterReducer';
import { getUserIdFromToken } from '../../redux/actions/authActions';

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
          // If no filteredResults, fetch data with currentFilters
          const data = await fetchFilteredData(userFilters); // Send default data if `userFilters` is empty
          dispatch(applyFilters({ userId, results: data }));
        } else {
          // Optionally, you can dispatch an action to load existing filters if needed
          dispatch(loadFilters({ userId }));
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
        <Chart data={filteredResults.chartData} />
        <Statistics data={filteredResults.statisticsData} />
      </>
    ) : (
      <p>No data available. Please apply filters to view results.</p>
    )}
  </div>
  );
};

export default HomePage;
