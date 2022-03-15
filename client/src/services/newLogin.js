import axios from 'axios';
import config from '../utils/config';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const logUser = 'api/login/new';

// calls are this easy for json formatted https://github.com/axios/axios#example
const login = async (payload) => {
  const response = await axiosService.post(logUser, payload);
  var rep = { data : response.data, status: response.status };
  return rep
};

// For export
const newLoginService = {
  login,
};

export default newLoginService;
