// src/layout/Header.jsx
import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Home, People, Edit, Delete, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    // 登出後導向登入頁
    navigate("/"); 
  };

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🧩 Cute 使用者管理系統
        </Typography>

        {/* 修正：將首頁按鈕導向 /welcome (即您指定的首頁) */}
        <Button color="inherit" startIcon={<Home />} onClick={() => navigate("/welcome")}>
          首頁
        </Button>

        <Button color="inherit" startIcon={<People />} onClick={() => navigate("/users")}>
          查看使用者
        </Button>

        <Button color="inherit" startIcon={<Edit />} onClick={() => navigate("/update")}>
          更新名稱
        </Button>

        <Button color="inherit" startIcon={<Delete />} onClick={() => navigate("/delete")}>
          刪除使用者
        </Button>

        <Button color="inherit" startIcon={<Logout />} onClick={handleLogout}>
          登出
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;