import axios from 'axios';
const tokenWeb = ''
const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_BASE_DEV,
    timeout: 5000,
});

instance.defaults.headers.common['Authorization'] = `Bearer ${tokenWeb}`;

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance