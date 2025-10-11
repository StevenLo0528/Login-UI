import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/base/BaseApi";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState({ open: false, message: "", type: "info" });

  // 使用 TanStack Query 的 useMutation
  const mutation = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (res) => {
      if (res.message === "登入成功" && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.username || "");
        localStorage.setItem("userId", res.userId || "");
        setAlert({ open: true, message: "登入成功！", type: "success" });
        setTimeout(() => navigate("/welcome"), 1000);
      } else {
        setAlert({ open: true, message: "登入失敗", type: "error" });
      }
    },
    onError: () => {
      setAlert({ open: true, message: "登入錯誤，請檢查帳號密碼", type: "error" });
    }
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        textAlign: "center"
      }}
    >
      <h2>登入</h2>
      <TextField label="Email" {...register("email", { required: true })} />
      <TextField label="Password" type="password" {...register("password", { required: true })} />

      <Button
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : "登入"}
      </Button>

      <Button
        variant="outlined"
        onClick={() => navigate("/signup")}
        disabled={mutation.isLoading}
      >
        建立帳號
      </Button>

      {mutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          登入失敗：請確認帳號或伺服器狀態
        </Alert>
      )}

      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.type}>{alert.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
