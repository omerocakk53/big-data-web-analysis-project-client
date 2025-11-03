import React from "react";

const StatCard = ({ title, value, color }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105">
    <h3 className="text-base font-medium text-gray-500 uppercase tracking-wide">
      {title}
    </h3>
    <p className={`text-3xl font-bold mt-2 ${color || "text-gray-900"}`}>
      {value}
    </p>
  </div>
);

export default StatCard;