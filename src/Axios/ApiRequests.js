// api.js
import axios from 'axios';
import {BASE_URL} from '@env';
const instance = axios.create({
  baseURL: BASE_URL,
  // timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const makeApiRequest = async (
  endpoint,
  method = 'get',
  data = null,
  headers = {},
) => {
  try {
    let requestConfiguration = {
      url: endpoint,
      method,
      baseURL: BASE_URL,
      headers,
    };
    if (method === 'post') {
      requestConfiguration.data = data;
    }
    const response = await instance.request(requestConfiguration);
    return response.data;
  } catch (error) {
    throw error;
  }
};
