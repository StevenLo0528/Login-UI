import React from "react";
import { useForm } from "react-hook-form";
import { Button, Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/base/BaseApi";
import FormContainer from "../../components/FormContainer"; // 引入共用組件
import SubmitButton from "../../components/SubmitButton"; // 引入共用組件
import AlertSnackbar from "../../components/AlertSnackbar"; // 引入共用組件
import MuiTextField from "../../components/MuiTextField"; // 引入共用組件

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState({ open: false, message: "", type: "info" });

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
  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  return (
    <FormContainer>
      <h2>登入</h2>
      <MuiTextField label="Email" {...register("email", { required: true })} />
      <MuiTextField label="Password" type="password" {...register("password", { required: true })} />

      <SubmitButton
        onClick={handleSubmit(onSubmit)}
        isLoading={mutation.isLoading}
      >
        登入
      </SubmitButton>

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

      <AlertSnackbar
        open={alert.open}
        message={alert.message}
        type={alert.type}
        onClose={handleCloseAlert}
      />
    </FormContainer>
  );
};

export default Login;