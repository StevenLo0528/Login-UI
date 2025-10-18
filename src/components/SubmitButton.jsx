import React from "react";
import { Button, CircularProgress } from "@mui/material";

/**
 * 統一的提交按鈕組件，處理載入狀態和 onClick 事件。
 */
const SubmitButton = ({ onClick, isLoading, children, variant = "contained", color = "primary", startIcon }) => (
  <Button
    variant={variant}
    onClick={onClick}
    disabled={isLoading}
    color={color}
    startIcon={startIcon}
  >
    {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
  </Button>
);

export default SubmitButton;