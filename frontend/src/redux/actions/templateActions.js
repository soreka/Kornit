import {
    fetchTemplatesStart,
    fetchRegionsSuccess,
    fetchMachineTypesSuccess,
    fetchClientNamesSuccess,
    fetchTemplatesFailure,
  } from '../reducers/templateReducer';
  import axios from 'axios';
  
  export const fetchFilterTemplates = () => async (dispatch) => {
    dispatch(fetchTemplatesStart());
    try {
      /* const [regionsResponse, machineTypesResponse, clientNamesResponse] = await Promise.all([
        axios.get('/api/templates/regions'), 
        axios.get('/api/templates/machineTypes'), 
        axios.get('/api/templates/clientNames'), 
      ]); */

      const templatesResponse = axios.get('/api/Get_templates');
      dispatch(fetchRegionsSuccess(templatesResponse.data.Regions));
      dispatch(fetchMachineTypesSuccess(templatesResponse.data.MachineTypes));
      dispatch(fetchClientNamesSuccess(templatesResponse.data.ClientNames));


    } catch (error) {
      dispatch(fetchTemplatesFailure(error.message));
    }
  };
  