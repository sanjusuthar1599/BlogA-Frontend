// Loader.jsx
import React from 'react';

const Loader = ({ size = 24, color = "#ffffff" }) => {
  return (
    <div
      className="animate-spin rounded-full border-4 border-t-4 border-t-transparent border-white"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} ${color}`,
      }}
    />
  );
};

export default Loader;
