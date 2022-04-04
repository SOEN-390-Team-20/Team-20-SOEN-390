import axios from 'axios';
import config from '../utils/config';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const endpoint = 'api/conversations';
const id = 123;

const getMessages = async () => {
  const response = await axiosService.get(`${endpoint}/${id}`);
  return response;
};

const sendMessage = async (payload) => {
  const response = await axiosService.post(`${endpoint}/${id}`, payload);
  return response;
};

const chatService = {
  getMessages,
  sendMessage,
};

export default chatService;
