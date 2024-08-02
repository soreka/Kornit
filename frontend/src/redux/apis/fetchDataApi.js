// src/api.js
import axios from 'axios';

const API_URL = 'https://localhost:3333/api/FetchData'; 

export const fetchFilteredData = async (filters) => {
  try {
    if(!filters){
        //need to get initial value
    }
    //need to send the request with barer token
    const response = await axios.post(`${API_URL}/filtered-data`, filters);
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered data:', error);
    throw error;
  }
};