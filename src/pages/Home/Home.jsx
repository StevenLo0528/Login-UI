// src/pages/Home/Home.jsx
import React from "react";
import Layout from "../../layout/Layout";
import { Typography } from "@mui/material";

const Home = () => {
  const username = localStorage.getItem("username") || "User";
  return (
    <Layout>
      <Typography variant="h4" textAlign="center">
        🎉 Welcome, {username}!
      </Typography>
    </Layout>
  );
};

export default Home;
