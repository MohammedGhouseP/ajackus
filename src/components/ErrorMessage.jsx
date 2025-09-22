import React from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
function ErrorMessage({ message, onClose }) {
  return (
    <div className="bg-red-100 border border-red-300 text-red-800 rounded p-3 mb-4 flex items-center justify-between">
      <span className="flex items-center gap-2"><FaExclamationTriangle />{message}</span>
      <button onClick={onClose} className="text-red-400 hover:text-red-600"><FaTimes /></button>
    </div>
  );
}
export default ErrorMessage;
