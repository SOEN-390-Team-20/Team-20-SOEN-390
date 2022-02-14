import axios from 'axios';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios.create({
  baseURL: 'http://ec2-15-223-77-239.ca-central-1.compute.amazonaws.com:3001',
});

// TODO: dynamic switch depending if dev or prod
const isDev = true; // manual switch
const axiosService = isDev ? devAxios : prodAxios;

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
