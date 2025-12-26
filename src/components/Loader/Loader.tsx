import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Loader = () => {
  useEffect(() => {
    const toastId = toast.loading("Loading...");
    return () => toast.dismiss(toastId);
  }, []);

  return null;
};

export default Loader;
