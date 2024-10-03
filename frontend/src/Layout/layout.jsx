/** @format */

import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";

const Layout = () => {
  const location = useLocation();

  // Check if the current path is '/login' or '/register' (signup)
  const isLoginOrSignUpPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <main>
        <Routers />
      </main>
      {/* Only show Footer if it's not the login or register page */}
      {!isLoginOrSignUpPage && <Footer />}
    </>
  );
};

export default Layout;
