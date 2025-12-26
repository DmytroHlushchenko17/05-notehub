import { useEffect } from "react";
import { toast } from "react-hot-toast";

const ErrorMessage = () => {
    useEffect(() => {
        const toastId = toast.error('This is an error!');
        return toast.dismiss(toastId);
    }, []);

    return null;
}
export default ErrorMessage;
