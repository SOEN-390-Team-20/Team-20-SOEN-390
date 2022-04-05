/* eslint-disable prefer-template */
import axios from 'axios';
import config from '../utils/config';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const getForm = 'api/forms/healthforms';

// calls are this easy for json formatted https://github.com/axios/axios#example
const getList = async () => {
  const response = await axiosService.get(getForm);
  return response;
};

const historySymptom = {
  getList,
};

export default historySymptom;
