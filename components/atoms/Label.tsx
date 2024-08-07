import React from 'react';

const Label: React.FC<{ text: string }> = ({ text }) => {
  return <span className="font-semibold text-gray-800">{text}</span>;
};

export default Label;
