import React from 'react';

const Value: React.FC<{ value: number }> = ({ value }) => {
  return <span className="text-2xl font-bold text-green-600">{value.toFixed(2)} kPa</span>;
};

export default Value;
