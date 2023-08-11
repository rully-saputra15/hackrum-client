import { FC } from "react";
import { primaryColor, secondaryColor } from "../styles";
import { GrFormClose } from "react-icons/gr";

type ModalProps = {
  children: React.ReactNode;
  handleCloseModal: () => void;
};

const Modal: FC<ModalProps> = ({ children, handleCloseModal }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 relative">
          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-left 
          shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <GrFormClose
                onClick={handleCloseModal}
                className="absolute top-0 right-0 m-4 text-black cursor-pointer text-2xl"
              />
              <div className="sm:flex sm:items-start">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
