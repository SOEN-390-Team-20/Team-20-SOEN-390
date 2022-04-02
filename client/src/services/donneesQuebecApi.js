import axios from 'axios';

const getApiData = async () => {
  const response = await axios.get(
    'https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?limit=10000&resource_id=d2cf4211-5400-46a3-9186-a81e6cd41de9',
  );
  return response;
};

const getLatestData = async () => {
  const response = await getApiData();
  const recordsLength = response.data.result.total;
  const latestArray = response.data.result.records[recordsLength - 1];

  /* Example of return
  {
      _id: 801,
      Date: '2022-04-01',
      Nb_Cas_Cumulatif: '974009',
      Nb_Nvx_Cas: '1658',
      Nb_Cas_Actifs: '25625',
      Nb_Deces_Cumulatif_Total: '14335',
      Nb_Deces_Cumulatif_CHCHSLD: '6232',
      Nb_Deces_Cumulatif_RPA: '2871',
      Nb_Deces_Cumulatif_DomInc: '4547',
      Nb_Deces_Cumulatif_Autre: '685',
      Nb_Nvx_Deces_Total: '3',
      Nb_Nvx_Deces_CHCHSLD: '0',
      Nb_Nvx_Deces_RPA: '1',
      Nb_Nvx_Deces_DomInc: '2',
      Nb_Nvx_Deces_Autre: '0'
    }
  */
  return latestArray;
};

const quebecApiService = {
  getApiData,
  getLatestData,
};

export default quebecApiService;
