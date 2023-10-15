"use client";
import React, { FormEventHandler, HTMLInputTypeAttribute, SVGProps, useState } from "react";

const TextInput = ({
  Icon,
  type = "text",
  placeholder,
  value,
  onInput,
}: {
  Icon: React.ReactElement<SVGProps<SVGSVGElement>>;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value: string | number | readonly string[] | undefined;
  onInput: FormEventHandler<HTMLInputElement> | undefined;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const svgClass = `w-6 h- absolute top-[17px] left-5 transition-all ${
    isFocused ? "stroke-mediumBlue" : "stroke-gray-400"
  }`;
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={svgClass}
      >
        {Icon}
      </svg>
      <input
        type={type}
        className="transition-all border border-lightBlue focus:border-mediumBlue focus:outline-none py-4 pl-12 pr-4 rounded-full w-full"
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      ></input>
    </div>
  );
};

export default TextInput;
