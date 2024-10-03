/** @format */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import onlineAppointment from "../../assets/images/onlineAppointment.png";
import Header from "../../components/Header/Header";
import emailjs from "@emailjs/browser";

function Consult() {
  const [currentDate, setCurrentDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [callType, setCallType] = useState("");
  const [prescriptionNeed, setPrescriptionNeed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setCurrentDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    const isValid =
      name.trim() !== "" &&
      email.trim() !== "" &&
      appointmentDate !== "" &&
      appointmentTime !== "" &&
      callType !== "";
    setIsFormValid(isValid);
  }, [name, email, appointmentDate, appointmentTime, callType]);

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_67w4fp1",
        "template_3ahxliv",
        form.current,
        "9bIhBrnGj8qVHGlZ-"
      )
      .then(
        () => {
          toast.success("Online appointment booked successfully!");
        },
        () => {
          toast.error("Failed to book the appointment. Please try again.");
        }
      );
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          {/* Image for Mobile */}
          <div className="lg:hidden p-8">
            <img
              src={onlineAppointment}
              className="w-full rounded-lg shadow-lg"
              alt="Appointment"
            />
          </div>

          {/* Form Section */}
          <div className="p-8 lg:pl-16 py-10">
            <h3 className="text-headingColor text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left">
              Book your Online Appointment
            </h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="full_name"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <input
                  type="date"
                  id="appointment"
                  name="appointment"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  min={currentDate}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                  autoComplete="date"
                />
              </div>

              <div>
                <input
                  type="time"
                  id="appointmentTime"
                  name="appointmentTime"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                  autoComplete="time"
                />
              </div>

              <div>
                <select
                  name="callType"
                  className="form_input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor"
                  value={callType}
                  onChange={(e) => setCallType(e.target.value)}
                  required>
                  <option value="" disabled>
                    Select Call Type
                  </option>
                  <option value="video">Video Call</option>
                  <option value="audio">Audio Call</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="prescriptionNeed"
                  name="prescriptionNeed"
                  className="form_checkbox border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primaryColor mr-2 h-5 w-5 text-primaryColor"
                  checked={prescriptionNeed}
                  onChange={(e) => setPrescriptionNeed(e.target.checked)}
                />
                <label htmlFor="prescriptionNeed" className="text-gray-700">
                  Do you need a prescription?
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full text-lg lg:text-xl rounded-lg px-4 py-3 transition-colors duration-300 ${
                    isFormValid
                      ? "bg-primaryColor text-white hover:bg-primaryDark"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}>
                  Book Now
                </button>
              </div>
            </form>

            {/* Link to Visit Clinic */}
            <div className="mt-4 text-center lg:text-left">
              <Link
                to="/appointment"
                className="text-primaryColor hover:underline text-sm lg:text-base">
                Visit our clinic
              </Link>
            </div>
          </div>

          {/* Image for Desktop */}
          <div className="hidden lg:block p-8">
            <img
              src={onlineAppointment}
              className="w-full rounded-lg shadow-lg"
              alt="Appointment"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Consult;
