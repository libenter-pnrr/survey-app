import type { ToastContainerProps } from "react-toastify";

const toastContainerConfig: ToastContainerProps = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
};

export default toastContainerConfig;
