// app/components/atoms/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500 ${props.className}`}
      style={{ transition: 'all 0.15s ease', color: 'black' }}
    />
  );
};

export default Input;