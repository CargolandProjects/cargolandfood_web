import React, { ReactNode } from "react";
import { CategoryProvider } from "./CategoryContext";

const ContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CategoryProvider>{children}</CategoryProvider>
    </>
  );
};

export default ContextProviders;
