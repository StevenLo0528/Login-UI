import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/base/BaseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

const Users = () => {
  const token = localStorage.getItem("token");

  // 使用 useQuery 獲取使用者列表
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(token),
    enabled: !!token, // 只有在 token 存在時才執行查詢
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          載入中...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        載入使用者列表失敗: {error.message || "伺服器或網路異常"}
      </Alert>
    );
  }

  // 檢查 API 回傳的資料是否為陣列
  const users = Array.isArray(data) ? data : [];

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
        <PeopleIcon sx={{ verticalAlign: "bottom", mr: 1 }} />
        使用者列表
      </Typography>
      {users.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          目前沒有使用者資料
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>名稱</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>狀態</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Users;