import { FC } from "react";
import { primaryColor } from "../styles";

type InputProps = {
  label: string;
  placeholder: string;
  name: string;
  required: boolean;
};

const Input: FC<InputProps> = ({ label, placeholder, name, required }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          name={name}
          id={name}
          placeholder={placeholder}
          required={required}
          className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 transition-all duration-150 focus:ring-2 focus:ring-inset focus:ring-[${primaryColor}] sm:text-sm sm:leading-6`}
        />
      </div>
    </div>
  );
};

export default Input;
