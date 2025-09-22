import React from "react";
import { FaTimes } from "react-icons/fa";
function Modal({ children, onClose }) {
  function handleClick(e) {
    if (e.target === e.currentTarget) onClose();
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClick}>
      <div className="bg-white rounded shadow-lg p-6 relative max-w-lg w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><FaTimes /></button>
        {children}
      </div>
    </div>
  );
}
export default Modal;
