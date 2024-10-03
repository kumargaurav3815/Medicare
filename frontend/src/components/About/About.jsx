/** @format */

import aboutImg from "../../assets/images/d4.png";

const About = () => {
  return (
    <section className="py-10 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-20">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <img
              src={aboutImg}
              alt="About Us"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Proud to be one of the nation's best.
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              ipsum modi cupiditate totam fugit maxime, aperiam voluptatem
              tempora eaque. Voluptate perspiciatis officiis libero dolores?
              Fugiat ullam cupiditate doloremque pariatur minus.
            </p>
            <p className="text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
              ipsum modi cupiditate totam fugit maxime, aperiam voluptatem
              tempora eaque. Voluptate perspiciatis officiis libero dolores?
              Fugiat ullam cupiditate doloremque pariatur minus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
