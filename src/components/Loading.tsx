import { BounceLoader } from "react-spinners";
import { primaryColor } from "../styles";

const Loading = () => {
  return (
    <div
      className={`flex flex-col justify-center items-center absolute top-0 left-0 right-0 bottom-0`}
    >
      <BounceLoader color={primaryColor} />
    </div>
  );
};

export default Loading;
