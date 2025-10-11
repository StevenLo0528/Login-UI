import React from "react";

const Content = ({ children }) => (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  }}>
    {children}
  </div>
);

export default Content;
