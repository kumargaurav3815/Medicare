/** @format */
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import axios from "axios";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("Appointments");

  useEffect(() => {
    // Fetch appointments initially when the component mounts
    if (activeButton === "Appointments") {
      fetchAppointments();
    } else if (activeButton === "Consultations") {
      fetchConsultations();
    }
  }, [activeButton]); // Dependency on activeButton

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Assume token is stored in localStorage
      const response = await axios.get(
        "http://localhost:5000/api/v1/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization header
          },
        }
      );
      setAppointments(response.data.appointments); // Assuming your response is like { appointments: [...] }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Assume token is stored in localStorage
      const response = await axios.get(
        "http://localhost:5000/api/v1/consultations",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization header
          },
        }
      );
      setConsultations(response.data.consultations); // Assuming your response is like { consultations: [...] }
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => handleButtonClick("Appointments")}
            className={`px-6 py-3 rounded-lg shadow-lg transition duration-300 ${
              activeButton === "Appointments"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}>
            Appointments
          </button>
          <button
            onClick={() => handleButtonClick("Consultations")}
            className={`px-6 py-3 rounded-lg shadow-lg transition duration-300 ${
              activeButton === "Consultations"
                ? "bg-green-700 text-white"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}>
            Consultations
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            {activeButton === "Appointments" && appointments.length > 0 && (
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Appointment Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="hover:bg-gray-50 transition duration-300">
                      <td className="py-4 px-6">{appointment.name}</td>
                      <td className="py-4 px-6">{appointment.email}</td>
                      <td className="py-4 px-6">
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeButton === "Consultations" && consultations.length > 0 && (
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Time</th>
                    <th className="py-3 px-6 text-left">Call Type</th>
                    <th className="py-3 px-6 text-left">Prescription Need</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {consultations.map((consultation) => (
                    <tr
                      key={consultation._id}
                      className="hover:bg-gray-50 transition duration-300">
                      <td className="py-4 px-6">{consultation.name}</td>
                      <td className="py-4 px-6">{consultation.email}</td>
                      <td className="py-4 px-6">
                        {new Date(
                          consultation.appointmentDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        {consultation.appointmentTime}
                      </td>
                      <td className="py-4 px-6">{consultation.callType}</td>
                      <td className="py-4 px-6">
                        {consultation.prescriptionNeed ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeButton === "Appointments" && appointments.length === 0 && (
              <p className="text-center text-gray-500">
                No appointments found.
              </p>
            )}
            {activeButton === "Consultations" && consultations.length === 0 && (
              <p className="text-center text-gray-500">
                No consultations found.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default MyAppointments;
