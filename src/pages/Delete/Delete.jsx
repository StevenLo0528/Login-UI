import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../api/base/BaseApi";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormContainer from "../../components/FormContainer"; // 引入共用組件
import SubmitButton from "../../components/SubmitButton"; // 引入共用組件
import AlertSnackbar from "../../components/AlertSnackbar"; // 引入共用組件
import MuiTextField from "../../components/MuiTextField"; // 引入共用組件

const Delete = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const [alert, setAlert] = React.useState({ open: false, message: "", type: "info" });

  const mutation = useMutation({
    mutationFn: (data) => deleteUser(data),
    onSuccess: (res) => {
      if (res.message === "刪除成功") {
        setAlert({ open: true, message: "刪除成功！", type: "success" });
        queryClient.invalidateQueries({ queryKey: ["users"] });
        reset();
      } else {
        setAlert({ open: true, message: res.message || "刪除失敗，請重試", type: "error" });
      }
    },
    onError: () => {
      setAlert({ open: true, message: "伺服器錯誤或網路異常", type: "error" });
    }
  });

  const onSubmit = (data) => {
    const payload = {
      user_ID: data.user_ID,
    };
    mutation.mutate(payload);
  };
  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  return (
    <FormContainer>
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
        <DeleteForeverIcon sx={{ mr: 1 }} color="error" />
        刪除使用者
      </Typography>
      <MuiTextField
        label="使用者 ID"
        {...register("user_ID", { required: true })}
        error={!!mutation.isError}
        helperText={mutation.isError ? "請檢查輸入的 ID 及伺服器狀態" : ""}
      />

      <SubmitButton
        onClick={handleSubmit(onSubmit)}
        isLoading={mutation.isLoading}
        color="error"
        startIcon={<DeleteForeverIcon />}
      >
        刪除
      </SubmitButton>

      <AlertSnackbar
        open={alert.open}
        message={alert.message}
        type={alert.type}
        onClose={handleCloseAlert}
      />
    </FormContainer>
  );
};

export default Delete;