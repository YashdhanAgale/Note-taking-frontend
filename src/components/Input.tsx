import React from "react";
import type { InputHTMLAttributes } from 'react';


interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<Props> = ({ label, error, ...props }) => (
  <div className="w-full mb-4">
    {label && <label className="block mb-1 text-gray-700">{label}</label>}
    <input
      {...props}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
        ${error ? "border-red-500" : "border-gray-300"}`
      }
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Input;
