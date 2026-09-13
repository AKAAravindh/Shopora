import { useContext } from "react";
import { OtherContext } from "../context/OtherContext";

export const useOther = () => {
  return useContext(OtherContext);
};
