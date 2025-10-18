import React from "react";
import { useForm } from "react-hook-form";
import { Button, Alert, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "../../api/base/BaseApi";
import FormContainer from "../../components/FormContainer"; // 引入共用組件
import SubmitButton from "../../components/SubmitButton"; // 引入共用組件
import AlertSnackbar from "../../components/AlertSnackbar"; // 引入共用組件
import MuiTextField from "../../components/MuiTextField"; // 引入共用組件

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
  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  return (
    <FormContainer>
      <h2>建立帳號</h2>
      <MuiTextField label="Username" {...register("username", { required: true })} />
      <MuiTextField label="Email" {...register("email", { required: true })} />
      <MuiTextField label="Password" type="password" {...register("password", { required: true })} />

      <SubmitButton
        onClick={handleSubmit(onSubmit)}
        isLoading={mutation.isLoading}
      >
        註冊
      </SubmitButton>

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

      <AlertSnackbar
        open={alert.open}
        message={alert.message}
        type={alert.type}
        onClose={handleCloseAlert}
      />
    </FormContainer>
  );
};

export default SignUp;