import React from "react";
import Header from "./Header";
import Content from "./Content";

const Layout = ({ children }) => (
  <>
    <Header />
    <Content>{children}</Content>
  </>
);

export default Layout;
