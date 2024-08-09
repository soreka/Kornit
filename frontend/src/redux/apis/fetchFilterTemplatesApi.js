import axios from 'axios';

export const fetchFilterTemplates = async (filters) => {
 
    try {
      const response = await axios.get('http://localhost:5000/api/Get_templates');
      //console.log("fetchFilterTemplates ",response.data);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching templates data');
    }
  };


  /* export const fetchFilterTemplates = () => async (dispatch) => {
    dispatch(fetchTemplatesStart());
    try {
      /* const [regionsResponse, machineTypesResponse, clientNamesResponse] = await Promise.all([
        axios.get('/api/templates/regions'), 
        axios.get('/api/templates/machineTypes'), 
        axios.get('/api/templates/clientNames'), 
      ]); */

      /* const templatesResponse = await axios.get('http://localhost:5000/api/Get_templates'); */
      //console.log("templatesResponse",templatesResponse.data.SelectedFilters);
/*       dispatch(fetchRegionsSuccess(templatesResponse.data.SelectedFilters.regions));
      dispatch(fetchMachineTypesSuccess(templatesResponse.data.SelectedFilters.machineTypes));
      dispatch(fetchClientNamesSuccess(templatesResponse.data.SelectedFilters.clientNames));


    } catch (error) {
      dispatch(fetchTemplatesFailure(error.message));
    } */
  