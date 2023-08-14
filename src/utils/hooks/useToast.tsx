import { useContext } from "react";
import { ToastContext, ToastTypes } from "../providers/ToastProvider";

export const useSimpleToast = (): ToastTypes => useContext(ToastContext);
