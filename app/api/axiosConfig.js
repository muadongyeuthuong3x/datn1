import axios from 'axios';
export const API_URL = "http://192.168.99.44:5000/api/"

export const loginApi = async (email, password) => {
    const data = {
      email,
      password,
    };
    const response = await axios.post(`${API_URL}users/login`, data);
    return response;
};

