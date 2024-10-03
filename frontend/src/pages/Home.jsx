/** @format */

import { useEffect } from "react";
import heroImg01 from "../assets/images/d1.png";
import icon03 from "../assets/images/icon03.png";
import icon04 from "../assets/images/icon04.png";
import featureImg from "../assets/images/d2.webp";
import faqImg from "../assets/images/faq-img.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import FaqList from "../components/Faq/FaqList";
import ServicesList from "../components/Services/ServicesList";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

const Home = () => {
  const navigate = useNavigate("/login");

  // If there is no token, navigate to login
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero_section pt-[60px] bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-[60px] items-center justify-between">
            {/* Left Content */}
            <div className="lg:w-[570px] text-center lg:text-left">
              <h1 className="text-[36px] leading-[46px] text-headingColor font-bold md:text-[50px] md:leading-[60px]">
                We help patients live a healthy, longer life.
              </h1>
              <p className="text-lg text-gray-600 mt-4">
                Helping patients live healthier and longer lives can encompass a
                wide range of healthcare activities, from preventive care and
                education to diagnosis, treatment, and ongoing support.
              </p>
              <Link to="/appointment">
                <button className="btn mt-6">Request an Appointment</button>
              </Link>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <img
                className="w-full rounded-lg object-cover"
                src={heroImg01}
                alt="Healthy Life"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Providing the Best Medical Services
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              World-class care for everyone. Our health system offers unmatched,
              expert healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service Item 1 */}
            <div className="bg-white shadow-lg rounded-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={icon03}
                alt="Book an Appointment"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">
                Book an Appointment
              </h3>
              <p className="text-gray-600 mt-4">
                World-class care for everyone. Our health system offers
                unmatched, expert healthcare.
              </p>
              <Link
                to="/appointment"
                className="mt-6 inline-block w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300">
                <BsArrowRight className="w-6 h-6" />
              </Link>
            </div>

            {/* Service Item 2 */}
            <div className="bg-white shadow-lg rounded-lg p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={icon04}
                alt="Review your health"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">
                Review Your Health
              </h3>
              <p className="text-gray-600 mt-4">
                World-class care for everyone. Our health system offers
                unmatched, expert healthcare.
              </p>
              <Link
                to="/appointment"
                className="mt-6 inline-block w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300">
                <BsArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="lg:w-[50%] text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-800">
                Get virtual treatment anytime.
              </h2>
              <ul className="list-disc list-inside mt-4 text-lg text-gray-600">
                <li>Schedule the appointment directly.</li>
                <li>Search your physician here, and contact their office.</li>
                <li>
                  Use the online scheduling tool to select an appointment time.
                </li>
              </ul>
              <Link to="/virtualAppointment">
                <button className="btn mt-6">Schedule an Appointment</button>
              </Link>
            </div>

            {/* Right Image */}
            <div className="lg:w-[50%]">
              <img
                src={featureImg}
                alt="Virtual Treatment"
                className="w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Our Medical Services
          </h2>
          <p className="text-center text-lg text-gray-600 mt-4 mb-10">
            World-class care for everyone. Our health system offers unmatched,
            expert healthcare.
          </p>
          <ServicesList />
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-10">
        <About />
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* FAQ Image */}
            <div className="w-full md:w-1/2 hidden md:block">
              <img
                src={faqImg}
                alt="FAQ"
                className="w-full object-cover rounded-lg"
              />
            </div>
            {/* FAQ Content */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800">
                Most questions by our beloved patients.
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
