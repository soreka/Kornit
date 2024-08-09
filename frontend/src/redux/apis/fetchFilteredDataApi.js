
import axios from 'axios';


const API_URL = 'http://localhost:5000/api/FetchData';

const selectedAllData = {
  "SelectedFilters": {
    "regions": [{
      "id": "region1",
      "name": "All"
    }
    ],
    "clientNames": [{
      "id": "client1",
      "name": "All"
    }
    ],
    "machineTypes": [{
      "id": "machineType1",
      "name": "All"
    }
    ]
  }
};

export const fetchFilteredData1 = async (filters) => {

  try {

    if (filters === "All") {
      filters = selectedAllData.SelectedFilters;
    }

    const response = await axios.get('http://localhost:5000/api/FetchData', {
      params: {
        machines: filters.machineTypes,
        regions: filters.regions,
        clients: filters.clientNames
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching filtered data');
  }
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