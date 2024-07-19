/** @format */

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/reset-password/${token}`,
        { password }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again later.");
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="rounded-lg lg:pl-16 py-10">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Reset Password
          </h3>

          <form onSubmit={handleResetPassword}>
            <div className="mb-5">
              <input
                type="password"
                name="password"
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="password"
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
                autoComplete="password"
              />
            </div>
            <div className="mt-7">
              <button
                type="submit"
                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                Reset Password
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
