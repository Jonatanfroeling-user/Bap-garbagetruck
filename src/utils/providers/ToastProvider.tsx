import { createContext, ReactNode, useState } from "react";
import { Id, toast, ToastContainer } from "react-toastify";

type toastSuccessType = (message?: string, config?: {}) => Id;
type toastErrorType = (message?: string, config?: {}) => Id;
type toastInfoType = (message?: string, config?: {}) => Id;
type toastPromiseType = (
  action: () => Promise<unknown>,
  msg?: string,
  succes?: string,
  error?: string
) => void;
type toastProgressType = (
  toastId: string,
  message: string,
  progress: number
) => void;
type toastRemoveType = (id: string) => void;

export interface ToastTypes {
  toastSuccess: toastSuccessType;
  toastError: toastErrorType;
  toastInfo: toastInfoType;
  toastPromise: toastPromiseType;
  toastProgress: toastProgressType;
  toastRemove: toastRemoveType;
}

export const ToastContext = createContext(null) as any;

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [ids, setIds] = useState<string[]>([]);

  const toastSuccess: toastSuccessType = (message = "Succes!", config = {}) =>
    toast.success(message, config);

  const toastError: toastErrorType = (message = "Unknown Error", config = {}) =>
    toast.error(message, config);

  const toastInfo: toastInfoType = (message = "Notification!", config = {}) =>
    toast.info(message, config);

  const toastPromise: toastPromiseType = (
    action: () => Promise<unknown>,
    msg = "Downloading...",
    succes = "Succes! 👌",
    error = "An error occured"
  ) => {
    toast.promise(action, {
      pending: msg,
      success: succes,
      error: error,
    });
  };
  const toastProgress: toastProgressType = (
    toastId: string,
    message: string,
    progress: number
  ) => {
    if (progress >= 1) {
      setIds((current) => current.filter((id) => id === toastId));
    }
    if (ids.includes(toastId)) {
      toast.update(toastId, { progress });
    } else {
      toast(message, { progress });
      setIds([toastId]);
    }
  };

  const toastRemove: toastRemoveType = (id: string) => toast.dismiss(id);

  return (
    <ToastContext.Provider
      value={
        {
          toastSuccess,
          toastError,
          toastInfo,
          toastPromise,
          toastRemove,
          toastProgress,
        } as ToastTypes
      }
    >
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
