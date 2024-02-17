import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Bot = () => {
  const handleWhatsAppChat = () => {
    window.location.href = `https://wa.me/+2348062329708`;
  };
  return (
    <div
      className="fixed bottom-5 sm:right-8 right-4 z-[999] cursor-pointer text-white text-4xl w-16 h-16 flex items-center justify-center rounded-full animate-bounce"
      style={{ backgroundColor: "#075e54" }}
    >
      {/* <ion-icon
        name="chatbubble-ellipses"
        onClick={handleWhatsAppChat}
      ></ion-icon> */}
      <FaWhatsapp onClick={handleWhatsAppChat} />
    </div>
  );
};

export default Bot;
