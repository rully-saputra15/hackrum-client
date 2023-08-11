import { FC } from "react";
import { primaryColor } from "../styles";

type SelectProps = {
  label: string;
  handleChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

const Select: FC<SelectProps> = ({ label, handleChange, children }) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          name={label.toLowerCase()}
          onChange={handleChange}
          className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 transition-all duration-150 focus:ring-2 focus:ring-inset focus:ring-[${primaryColor}] sm:text-sm sm:leading-6`}
        >
          {children}
        </select>
      </div>
    </>
  );
};

export default Select;
