import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home"; // 這裡的 Home 實際上是 welcome 頁面
import Users from "../pages/Users/Users";
import Update from "../pages/Update/Update";
import Delete from "../pages/Delete/Delete";

// PrivateRoute 元件：檢查是否有 token，沒有則導向登入頁 (/)
const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  // 如果沒有 token，導向登入頁 (/)
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* 公開路由：使用者未登入時的入口點 */}
    {/* / 是登入頁，這是未登入時的預設路由 */}
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />

    {/* 私有路由：需要登入才能訪問 */}
    {/* /welcome 是登入後的主頁（首頁） */}
    <Route path="/welcome" element={<PrivateRoute element={Home} />} /> 
    <Route path="/users" element={<PrivateRoute element={Users} />} />
    <Route path="/update" element={<PrivateRoute element={Update} />} />
    <Route path="/delete" element={<PrivateRoute element={Delete} />} />
    
    {/* 輔助路由：處理登出導航和 /login 導航 */}
    {/* 登出後導航到 /login，這裡導向 / */}
    <Route path="/login" element={<Navigate to="/" replace />} /> 
    
    {/* 移除 /home 路由，因為您指定 /welcome 為首頁 */}

  </Routes>
);

export default AppRoutes;