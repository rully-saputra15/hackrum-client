import { FC } from "react";
import { primaryColor } from "../styles";

type ButtonProps = {
  label: string;
  handleClick: () => void;
};

const Button: FC<ButtonProps> = ({ label, handleClick }) => {
  return (
    <button
      className={`outline outline-[${primaryColor}] cursor-pointer transition-all duration-300 hover:bg-[${primaryColor}] hover:text-white hover:outline-none rounded-md px-2 py-1.5`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
