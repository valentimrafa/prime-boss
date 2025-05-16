"use client";

import { InputMask } from "@react-input/mask";
import { HTMLAttributes } from "react";

interface TimeInputMaskProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function InputTime({
  name,
  id,
  label,
  required = false,
  error,
  className,
  ...rest
}: TimeInputMaskProps) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block font-medium text-sm text-gray-700">
          {label}
        </label>
      )}

      <InputMask
        mask="__:__"
        replacement={{ _: /\d/ }}
        pattern="\d{2}:\d{2}"
        name={name}
        id={id}
        required={required}
        placeholder="hh:mm"
        className="w-full border rounded p-2"
        {...rest}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
