import React from "react";
import type { ButtonHTMLAttributes } from "react"

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    {...props}
    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
  >
    {children}
  </button>
);

export default Button;
