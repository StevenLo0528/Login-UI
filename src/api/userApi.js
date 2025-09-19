import axios from "axios";

// 你的 API 伺服器位址 (依實際情況修改)
const API_BASE = "http://172.16.1.39:8964";

// 共用：從 localStorage 取出 Bearer Token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

/**
 * 1. 使用者登入
 * @param {string} email
 * @param {string} password
 */
export const login = async (email, password) => {
  const res = await axios.post(
    `${API_BASE}/User/Login`,
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data; // { id, name, email, token }
};

/**
 * 2. 使用者註冊
 * @param {object} user { email, password, name }
 */
export const register = async (user) => {
  const res = await axios.post(`${API_BASE}/User/Register`, user, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};

/**
 * 3. 取得所有使用者 (需要 Bearer Token)
 */
export const getUsers = async () => {
  const res = await axios.get(`${API_BASE}/User/all`, {
    headers: getAuthHeader()
  });
  return res.data;
};

/**
 * 4. 更新使用者名稱 (需要 Bearer Token)
 * API 文件要求 POST，Body 格式: { Id, name }
 */
export const updateUser = async (userUpdateData) => {
  const res = await axios.post(
    `${API_BASE}/User/Update`,
    userUpdateData,
    { headers: getAuthHeader() }
  );
  return res.data; // { message: "更新成功" }
};

/**
 * 5. 刪除帳號 (需要 Bearer Token)
 * API 文件要求 POST，Body 格式: { user_ID }
 */
export const deleteUser = async (userDeleteData) => {
  const res = await axios.post(
    `${API_BASE}/User/Delete`,
    userDeleteData,
    { headers: getAuthHeader() }
  );
  return res.data; // { message: "刪除成功" }
};
