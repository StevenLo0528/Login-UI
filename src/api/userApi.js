import axios from "axios";

const API_BASE = "http://172.16.1.39:8964"; 

export const login = async (email, password) => {
  const res = await axios.post(`${API_BASE}/User/Login`, { email, password });
  return res.data;
};

export const register = async (user) => {
  const res = await axios.post(`${API_BASE}/User/Register`, user);
  return res.data;
};

export const getUsers = async (token) => {
  const res = await axios.get(`${API_BASE}/User/all`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
