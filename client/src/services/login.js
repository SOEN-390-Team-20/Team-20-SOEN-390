import axios from 'axios';
import config from '../utils/config';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;

const axiosService = config.isDev() ? devAxios : prodAxios;

const addUser = 'api/users';
const logUser = 'api/login';

// calls are this easy for json formatted https://github.com/axios/axios#example
const register = async (payload) => {
  const response = await axiosService.post(addUser, payload);
  return response;
};

const login = async (payload) => {
  const response = await axiosService.post(logUser, payload);
  return response;
};

// For export
const loginService = {
  register,
  login,
};

export default loginService;
