import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api/base/BaseApi";
import EditIcon from "@mui/icons-material/Edit";
import FormContainer from "../../components/FormContainer"; // 引入共用組件
import SubmitButton from "../../components/SubmitButton"; // 引入共用組件
import AlertSnackbar from "../../components/AlertSnackbar"; // 引入共用組件
import MuiTextField from "../../components/MuiTextField"; // 引入共用組件

const Update = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const [alert, setAlert] = React.useState({ open: false, message: "", type: "info" });

  const mutation = useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: (res) => {
      if (res.message === "更新成功") {
        setAlert({ open: true, message: "更新成功！", type: "success" });
        queryClient.invalidateQueries({ queryKey: ["users"] });
        reset();
      } else {
        setAlert({ open: true, message: res.message || "更新失敗，請重試", type: "error" });
      }
    },
    onError: () => {
      setAlert({ open: true, message: "伺服器錯誤或網路異常", type: "error" });
    }
  });

  const onSubmit = (data) => {
    const payload = {
      Id: data.Id,
      name: data.name
    };
    mutation.mutate(payload);
  };
  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  return (
    <FormContainer>
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
        <EditIcon sx={{ mr: 1 }} />
        更新使用者名稱
      </Typography>
      <MuiTextField
        label="使用者 ID"
        {...register("Id", { required: true })}
        error={!!mutation.isError}
        helperText={mutation.isError ? "請檢查輸入的 ID 及伺服器狀態" : ""}
      />
      <MuiTextField label="新名稱" {...register("name", { required: true })} />

      <SubmitButton
        onClick={handleSubmit(onSubmit)}
        isLoading={mutation.isLoading}
        startIcon={<EditIcon />}
      >
        更新
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

export default Update;