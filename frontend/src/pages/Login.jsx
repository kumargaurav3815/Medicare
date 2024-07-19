/** @format */

import { useState } from "react";
import loginImg from "../assets/images/login.gif";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/login", {
        email,
        password,
        confirmPassword,
      });
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigateTo("/");
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Login error:", error);

      // Check if error.response exists
      if (error.response) {
        // Display server error message
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        // Display network or other errors
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleRegisterNewUser = () => {
    navigateTo("/register");
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block">
            <figure className="rounded-l-lg">
              <img src={loginImg} className="w-full" alt="Login" />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Login
            </h3>

            <form onSubmit={handleLogin}>
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                  Login
                </button>
              </div>

              <p className="mt-2 text-textColor text-center">
                <Link
                  to="/forgotPassword"
                  className="text-primaryColor font-medium ml-1">
                  Forgot password?
                </Link>
              </p>

              <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-800" />

              <div>
                <button
                  type="button"
                  className="w-full bg-slate-500 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                  onClick={handleRegisterNewUser}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
}

export default Login;
