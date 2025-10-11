import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

const Welcome = () => {
  const username = localStorage.getItem("username") || "使用者";
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome 🎉 {username}</h2>
    </div>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/welcome" element={<Welcome />} />
  </Routes>
);

export default AppRoutes;
