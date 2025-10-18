import React from "react";
import { TextField } from "@mui/material";

/**
 * 統一的 TextField 輸入欄位組件，簡化 props 傳遞。
 */
const MuiTextField = React.forwardRef(({ label, type = "text", error, helperText, ...props }, ref) => (
  <TextField
    label={label}
    type={type}
    inputRef={ref}
    error={error}
    helperText={helperText}
    {...props}
  />
));

MuiTextField.displayName = 'MuiTextField';

export default MuiTextField;