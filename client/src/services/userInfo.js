import axios from 'axios';
import config from '../utils/config';
/*  eslint-disable quote-props  */
const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const apiGetUser = 'api/users';
const token = localStorage.getItem('token');

const configuration = {
  headers: { 'authorization': token },
};

const getUser = async (currentId) => {
  const response = await axiosService.get(`${apiGetUser}/${currentId}`, configuration);
  return { data: response.data, status: response.status };
};

// For export
const userInfo = {
  getUser,
};

export default userInfo;
