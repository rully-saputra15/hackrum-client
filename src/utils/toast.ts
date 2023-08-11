import { toast } from "react-hot-toast";

export const showSuccessToast = (message: string) => {
    return toast.success(message)
};

export const showErrorToast = (message: string) => {
    return toast.error(message)
}