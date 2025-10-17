// src/pages/Home/Home.jsx
import React from "react";
// 由於 App.jsx 已經提供了 Layout，這裡不再需要導入和使用
// import Layout from "../../layout/Layout"; 
import { Typography } from "@mui/material";

const Home = () => {
  const username = localStorage.getItem("username") || "User";
  return (
    // 移除 Layout 包裹，解決雙 Header 問題
    <>
      <Typography variant="h4" textAlign="center">
        🎉 Welcome, {username}!
      </Typography>
    </>
  );
};

export default Home;