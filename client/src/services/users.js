/* eslint-disable prefer-template */
import axios from 'axios';
import config from '../utils/config';

const devAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

const prodAxios = axios;
const axiosService = config.isDev() ? devAxios : prodAxios;
const getUsers = 'api/users';

const getUserById = async (id) => {
  const response = await axiosService.get(getUsers + '/' + id);
  return response;
};

const usersService = {
  getUserById,
};

export default usersService;
