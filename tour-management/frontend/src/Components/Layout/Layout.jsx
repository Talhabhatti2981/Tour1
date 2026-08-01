import React from "react";
import { useLocation } from "react-router-dom";

import Header from "./../Header/Header";
import Routers from "../../router/Routers";
import Footer from "./../Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const hideChrome = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideChrome && <Header />}
      <Routers />
      {!hideChrome && <Footer />}
    </>
  );
};

export default Layout;
