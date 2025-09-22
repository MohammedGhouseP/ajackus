import React from "react";
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center py-8 text-blue-700">
      <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <span>Loading...</span>
    </div>
  );
}
export default LoadingSpinner;
