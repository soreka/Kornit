// src/api.js
import axios from 'axios';
import {
  fetchFilteredDataStart,
  fetchFilteredDatasSuccess,
  fetchFilteredDataFailure
} from '../reducers/filterReducer';

const API_URL = 'https://localhost:3333/api/FetchData';

export const fetchFilteredData = async (dispatch, filters) => {
  dispatch(fetchFilteredDataStart());
  try {
    if (!filters) {
      //need to get initial value
    }
    //need to send the request with barer token
    const fetchFilteredData = await axios.post(`${API_URL}/filtered-data`, filters);
    dispatch(fetchFilteredDatasSuccess(fetchFilteredData.data.Regions));

    return fetchFilteredData.data;
  } catch (error) {
    dispatch(fetchFilteredDataFailure(error.message));
    console.error('Error fetching filtered data:', error);
    throw error;
  }
};



export const fetchFilteredData1 = async (filters) => {
  const response = await axios.post(`${API_URL}/filtered-data`, { filters });
  return response.data;
};





//Templates structure json to init the filters
/* {
  "Templates": {
    "regions": [
      {
        "id": "region1",
        "name": "North America"
      },
      {
        "id": "region2",
        "name": "Europe"
      },
      {
        "id": "region3",
        "name": "Asia"
      }
    ],
    "clientNames": [
      {
        "id": "client1",
        "name": "Client A"
      },
      {
        "id": "client2",
        "name": "Client B"
      },
      {
        "id": "client3",
        "name": "Client C"
      }
    ],
    "machineTypes": [
      {
        "id": "machineType1",
        "name": "Type 1"
      },
      {
        "id": "machineType2",
        "name": "Type 2"
      },
      {
        "id": "machineType3",
        "name": "Type 3"
      }
    ]
  }
}
 */



//user filter selection
/* {
  "userId": "",
  "SelectedFilters": {
    "regions": [
      {
        "id": "region1",
        "name": "North America"
      },
      {
        "id": "region2",
        "name": "Europe"
      },
      {
        "id": "region3",
        "name": "Asia"
      }
    ],
    "clientNames": [
      {
        "id": "client1",
        "name": "Client A"
      },
      {
        "id": "client2",
        "name": "Client B"
      },
      {
        "id": "client3",
        "name": "Client C"
      }
    ],
    "machineTypes": [
      {
        "id": "machineType1",
        "name": "Type 1"
      },
      {
        "id": "machineType2",
        "name": "Type 2"
      },
      {
        "id": "machineType3",
        "name": "Type 3"
      }
    ]
  }
} */



/* results filterd data structure that returnd from back end */
/* {
  "userId": "",
  "FilteredData": {
      "Performance": {
          "Impression_vs_Target": {
              "DisplayData": {},
              "ChartData": {}
          },
          "Impression_Growth": {
              "DisplayData": {},
              "ChartData": {}
          },
          "Impression_Printed": {
              "DisplayData": {},
              "ChartData": {}
          },
          "Handled_Time": {
              "DisplayData": {},
              "ChartData": {}
          },
          "Utilization": {
              "DisplayData": {},
              "ChartData": {}
          },

      },
      "Surveys_Info": {
          "survey_Response_Percentage": {
              "DisplayData": {},
              "Data": {
                  "CFI": {},
                  "ServiceCalls": {},
                  "PostInstallation": {},
                  "SiteVisit": {}
              }
          },
          "Impression_Growth": {
              "DisplayData": {},
              "Data": {
                  "CFI": {},
                  "ServiceCalls": {},
                  "PostInstallation": {},
                  "SiteVisit": {}
              }
          },
          "Impression_Printed": {
              "DisplayData": {},
              "Data": {
                  "CFI": {},
                  "ServiceCalls": {},
                  "PostInstallation": {},
                  "SiteVisit": {}
              }
          },
          "Handled_Time": {
              "DisplayData": {},
              "Data": {
                  "CFI": {},
                  "ServiceCalls": {},
                  "PostInstallation": {},
                  "SiteVisit": {}
              }
          },
          "Utilization": {
              "DisplayData": {},
              "Data": {
                  "CFI": {},
                  "ServiceCalls": {},
                  "PostInstallation": {},
                  "SiteVisit": {}
              }
          }

      }

  }
}
*/