import axios from 'axios';
import config from '../utils/config';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const endpoint = 'api/login';

// calls are this easy for json formatted https://github.com/axios/axios#example
const login = async (payload) => {
  const response = await axiosService.post(endpoint, payload);
  return response;
};

// For export
const loginService = {
  login,
};

export default loginService;
