import React, { useContext } from "react";
import { Context } from "./App";

export const Num = () => {
  const num = useContext(Context);
  return num as unknown as JSX.Element;
};
