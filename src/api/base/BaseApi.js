import axios from "axios";

const API_BASE = "http://172.16.1.39:8964";

const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
});

export const login = async (email, password) => {
  const res = await axios.post(
    `${API_BASE}/User/Login`,
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};

export const register = async (user) => {
  const res = await axios.post(`${API_BASE}/User/Register`, user, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};

export const getUsers = async (token) => {
  const res = await axios.get(`${API_BASE}/User/all`, {
    headers: getAuthHeader(token)
  });
  return res.data;
};

export const updateUser = async (userUpdateData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_BASE}/User/Update`, userUpdateData, {
    headers: getAuthHeader(token)
  });
  return res.data;
};

export const deleteUser = async (userDeleteData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_BASE}/User/Delete`, userDeleteData, {
    headers: getAuthHeader(token)
  });
  return res.data;
};
