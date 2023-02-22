import React from "react";

export const Alert = ({ children }) => {
  return (
    <div className="mb-4 text-center text-white font-bold p-3 bg-red-600">
      {children}
    </div>
  );
};
