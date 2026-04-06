import { FaWhatsapp } from "react-icons/fa";
export default function WhatsAppButton() {
  const phone = "919999999999"; // 👉 replace with your number

  const message = encodeURIComponent(
    "Hi Faizan 👋 I checked your portfolio. Can we discuss my project?",
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 
      bg-green-500 hover:bg-green-600 
      w-14 h-14 flex items-center justify-center 
      rounded-full shadow-lg 
      hover:scale-110 transition duration-300"
    >
      <FaWhatsapp size={28} color="white" />
    </a>
  );
}
