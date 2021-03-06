import axios from 'axios';
import config from '../utils/config';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const endpoint = 'api/conversations';

const getMessages = async (token, chatTargetId) => {
  const response = await axiosService.get(`${endpoint}/${chatTargetId}`, { headers: { authorization: token } });
  return response;
};

const sendMessage = async (token, chatTargetId, payload) => {
  const response = await axiosService.post(`${endpoint}/${chatTargetId}`, payload, { headers: { authorization: token } });
  return response;
};

const chatService = {
  getMessages,
  sendMessage,
};

export default chatService;
