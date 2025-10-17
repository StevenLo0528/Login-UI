import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Snackbar, Alert, CircularProgress, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../api/base/BaseApi";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
    // 保持嘗試將 ID 轉換為數字，但由於後端可能接受字串，我們移除前端格式限制
    const payload = {
      user_ID: data.user_ID, // 不再強制轉換為數字，讓後端處理
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
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
        <DeleteForeverIcon sx={{ mr: 1 }} color="error" />
        刪除使用者
      </Typography>
      <TextField
        label="使用者 ID"
        // 移除 pattern 限制，只保留 required
        {...register("user_ID", { required: true })}
        error={!!mutation.isError}
        helperText={mutation.isError ? "請檢查輸入的 ID 及伺服器狀態" : ""}
      />

      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteForeverIcon />}
        onClick={handleSubmit(onSubmit)}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : "刪除"}
      </Button>

      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.type} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Delete;