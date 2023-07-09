import axios from 'axios';
import queryString from 'query-string';
import { DataInterface, DataGetQueryInterface } from 'interfaces/data';
import { GetQueryInterface } from '../../interfaces';

export const getData = async (query?: DataGetQueryInterface) => {
  const response = await axios.get(`/api/data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createData = async (data: DataInterface) => {
  const response = await axios.post('/api/data', data);
  return response.data;
};

export const updateDataById = async (id: string, data: DataInterface) => {
  const response = await axios.put(`/api/data/${id}`, data);
  return response.data;
};

export const getDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDataById = async (id: string) => {
  const response = await axios.delete(`/api/data/${id}`);
  return response.data;
};
