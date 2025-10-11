import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "../../api/base/BaseApi";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState({ open: false, message: "", type: "info" });

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: (res) => {
      if (res.message === "註冊成功") {
        setAlert({ open: true, message: "註冊成功！請登入", type: "success" });
        setTimeout(() => navigate("/"), 1000);
      } else {
        setAlert({ open: true, message: "註冊失敗，請重試", type: "error" });
      }
    },
    onError: () => {
      setAlert({ open: true, message: "伺服器錯誤或網路異常", type: "error" });
    }
  });

  const onSubmit = (data) => {
    const payload = {
      username: data.username,
      password: data.password,
      email: data.email
    };
    mutation.mutate(payload);
  };

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
      <h2>建立帳號</h2>
      <TextField label="Username" {...register("username", { required: true })} />
      <TextField label="Email" {...register("email", { required: true })} />
      <TextField label="Password" type="password" {...register("password", { required: true })} />

      <Button
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : "註冊"}
      </Button>

      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        disabled={mutation.isLoading}
      >
        返回登入
      </Button>

      {mutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          註冊失敗：請檢查網路或伺服器狀態
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

export default SignUp;
