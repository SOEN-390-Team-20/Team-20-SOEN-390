import axios from 'axios';
import config from '../utils/config';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const endpoint = 'api/conversations';
// temp hardcoded ID of a doctor user
const id = '6249f7833ec170ce6ede751d';
const token = localStorage.getItem('token');

const getMessages = async () => {
  const response = await axiosService.get(`${endpoint}/${id}`, { headers: { authorization: token } });
  return response;
};

const sendMessage = async (payload) => {
  const response = await axiosService.post(`${endpoint}/${id}`, payload, { headers: { authorization: token } });
  return response;
};

const chatService = {
  getMessages,
  sendMessage,
};

export default chatService;
