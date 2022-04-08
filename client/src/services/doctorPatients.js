import axios from 'axios';
import config from '../utils/config';
/*  eslint-disable quote-props  */
const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const apiGetPatients = 'api/getpatient';

const token = localStorage.getItem('token');
console.log(token);

const configuration = {
  headers: { 'authorization': token },
};
// calls are this easy for json formatted https://github.com/axios/axios#example
const getPatients = async (payload) => {
  const response = await axiosService.post(apiGetPatients, payload, configuration);
  return { data: response.data, status: response.status };
};

// For export
const doctorPatients = {
  getPatients,
};

export default doctorPatients;
