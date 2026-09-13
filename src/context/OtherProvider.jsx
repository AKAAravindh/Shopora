import { useState } from "react";
import { OtherContext } from "../context/OtherContext";

export const OtherProvider = ({ children }) => {
  const [itemToRemove, setItemToRemove] = useState(null);

  return (
    <OtherContext.Provider value={{ itemToRemove, setItemToRemove }}>
      {children}
    </OtherContext.Provider>
  );
};
