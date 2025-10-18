import React from "react";
import { Snackbar, Alert } from "@mui/material";

/**
 * 統一的 Snackbar 提示框組件。
 */
const AlertSnackbar = ({ open, message, type, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={2000}
    onClose={onClose}
  >
    <Alert severity={type} onClose={onClose}>
      {message}
    </Alert>
  </Snackbar>
);

export default AlertSnackbar;