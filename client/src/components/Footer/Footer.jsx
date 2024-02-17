import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import boostBackground from "../../assets/bg.jpeg";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleSignin = () => {
    // Navigate to the "/cars" page
    navigate("/sign-in");
  };
  const handleWhatsAppChat = () => {
    window.location.href = `https://wa.me/+2348062329708`;
  };

  const data = new Date();
  const year = data.getFullYear();
  return (
    <div>
      <section
        className="bg-gray-900 py-2 relative overflow-hidden"
        style={{ backgroundImage: `url(${boostBackground})` }}
      >
        <div className="container mx-auto flex flex-col items-center text-white z-10 relative">
          <div className="flex flex-col items-center mb-10 md:flex-row md:justify-between md:w-3/4">
            <div className="div1 flex items-center space-x-2 mb-4 md:mb-0 md:mr-4 md:w-1/3 md:justify-start">
              <div className="flex">
                <FaWhatsapp
                  className="mr-3 md:mr-5 text-white text-2xl border border-danger-500 p-4 w-16 h-16 rounded-full cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-green-800"
                  onClick={handleWhatsAppChat}
                />
                <FaTiktok className="mr-3 md:mr-5 text-white text-2xl border border-danger-500 p-4 w-16 h-16 rounded-full cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-black" />
                <FaInstagram className="i text-white text-2xl border border-danger-500 p-4 w-16 h-16 rounded-full cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:bg-red-600" />
              </div>
            </div>

            <div className="div2 flex items-center space-x-2 mb-4 md:mb-0 md:w-1/3 md:justify-center">
              <h2 className="text-5xl font-bold mb-8 text-white md:text-center md:mb-0">
                Let's Talk?
              </h2>
            </div>

            <div className="div3 flex items-center space-x-2 md:w-1/3 md:justify-end mt-6">
              <button
                className="md:justify-end text-red md:w-60 hover:before:bg-red border border-black relative h-[50px] w-60 font-bold text-xl overflow-hidden bg-white px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-600 before:transition-all before:duration-500 hover:text-white hover:bg-red-700 hover:before:left-0 hover:before:w-full"
                onClick={handleWhatsAppChat}
              >
                <span className="relative z-10">Make an inquiry</span>
              </button>
            </div>
          </div>
        </div>
        {/* Rest of your content */}

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-col justify-center items-center mt-8 text-white md:ml-48">
          <p className="py-4">&copy; {year} All Rights Reserved</p>
          <button className="cursor-pointer" onClick={handleSignin}>
            carzArena
          </button>
        </div>
      </section>
    </div>
  );
}
