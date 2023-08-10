import { FC } from "react";

type BadgeProps = {
  backgroundColor: string;
  label: string;
};

const Badge: FC<BadgeProps> = ({ backgroundColor, label }) => {
  return (
    <span
      className={`px-2 py-1 rounded-lg text-white font-medium text-sm bg-[${backgroundColor}] self-start`}
    >
      {label}
    </span>
  );
};

export default Badge;
