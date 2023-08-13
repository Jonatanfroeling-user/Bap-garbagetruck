import { useContext } from "react";
import {
  PreviewContext,
  PreviewContextValue,
} from "../providers/previewProvider";

export const usePreview = () =>
  useContext(PreviewContext) as PreviewContextValue;
