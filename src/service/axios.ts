import axios from 'axios';

export const customAxios = axios.create({
  timeout: 30000,
  baseURL:
    `${process.env.REACT_APP_API_BASEURL}` ||
    'https://connectgateway-dev.emporioanalytics.com:10510/ops_management',
});
