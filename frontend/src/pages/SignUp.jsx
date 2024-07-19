/** @format */

import { useState } from "react";
import signUpImg from "../assets/images/signup.gif";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [password, setPassword] = useState();
  // const [role, setRole] = useState();

  const navigateTo = useNavigate();
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/v1/user/patient/register", {
          firstName,
          lastName,
          email,
          phone,
          gender,
          password,
        })
        .then((res) => {
          toast.success(res.data.message);
          navigateTo("/login");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // const handleRegistration = (e) => {
  //   e.preventDefault();
  //   axios.post("http://localhost:5000/api/v1/user/patient/register", {
  //     firstName,
  //     lastName,
  //     email,
  //     phone,
  //     gender,
  //     password,
  //     // role,
  //   });
  //   // .then((result) => console.log(result))
  //   // .catch((err) => console.log(err));
  // };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signUpImg} className="w-full" alt="" />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor"></span> account
            </h3>

            <form onSubmit={handleRegistration}>
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="number"
                  name="phone"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
                  placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender
                  <select
                    name="gender"
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    onChange={(e) => setGender(e.target.value)}
                    required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>
              </div>
              <div className="mt-7">
                <button className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                  Sign Up
                </button>
              </div>
              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
