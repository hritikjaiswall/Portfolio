import React, { useState } from "react";

const InputField = ({ field, label, icon: Icon, formData, handleChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = `
    w-full text-white bg-white/10 rounded-xl transition-all duration-300 
    placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#6366f1] 
    focus:ring-offset-2 focus:ring-offset-[#1c1e26] border border-white/20 
    hover:border-[#6366f1] focus:border-[#6366f1] peer
  `;

  return (
    <div className="relative w-full group">
      
      {/* Icon & Floating Label */}
      <div className="absolute left-4 top-4 flex items-center space-x-2 text-gray-400 group-hover:text-[#6366f1] transition-colors">
        <Icon className="w-5 h-5" />
        <label
          htmlFor={field}
          className={`
            absolute left-12 text-gray-400 text-sm pointer-events-none transform 
            transition-all duration-300 
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
            peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[#6366f1] peer-focus:text-sm
          `}
        >
          {label}
        </label>
      </div>

      {/* Input or Textarea */}
      {field === "message" ? (
        <textarea
          id={field}
          name={field}
          placeholder={label}
          value={formData[field]}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${baseClasses} pl-12 pt-12 h-52 resize-none`}
          required
        />
      ) : (
        <input
          id={field}
          type={field === "email" ? "email" : "text"}
          name={field}
          placeholder={label}
          value={formData[field]}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${baseClasses} pl-12 h-12`}
          required
        />
      )}

      {/* Animated Border Highlight */}
      <div
        className={`absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 ${
          isFocused ? "border border-[#6366f1]" : "border border-transparent"
        }`}
      ></div>
    </div>
  );
};

export default InputField;
