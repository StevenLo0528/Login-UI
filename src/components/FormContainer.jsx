import React from "react";
import { Box } from "@mui/material";

/**
 * 集中式表單容器，提供統一的樣式和居中佈局。
 */
const FormContainer = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      width: 300,
      textAlign: "center"
    }}
  >
    {children}
  </Box>
);

export default FormContainer;