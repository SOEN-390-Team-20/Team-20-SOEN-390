import axios from 'axios';
import config from '../utils/config';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const addCheckInToUser = 'api/forms/healthform';

// calls are this easy for json formatted https://github.com/axios/axios#example
const checkIn = async (payload) => {
  const response = await axiosService.post(addCheckInToUser, payload);
  return response;
};

// For export
const checkInService = {
  checkIn,
};

export default checkInService;
