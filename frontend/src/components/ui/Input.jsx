"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700 sm:text-base"
        >
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            w-full
            rounded-lg
            border
            px-3
            py-2.5
            pr-11
            text-sm
            outline-none
            transition
            duration-200

            sm:px-4
            sm:py-3
            sm:text-base

            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }

            ${
              disabled
                ? "cursor-not-allowed bg-gray-100 text-gray-500"
                : "bg-white text-gray-900"
            }
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              rounded-md
              p-1
              text-gray-500
              hover:text-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500 sm:text-sm">{error}</p>}
    </div>
  );
}
