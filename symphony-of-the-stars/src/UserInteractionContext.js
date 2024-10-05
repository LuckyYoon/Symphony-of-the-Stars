// UserInteractionContext.js
import React, { createContext, useState } from "react";

export const UserInteractionContext = createContext();

export const UserInteractionProvider = ({ children }) => {
  const [hasUserConsented, setHasUserConsented] = useState(false);

  return (
    <UserInteractionContext.Provider
      value={{ hasUserConsented, setHasUserConsented }}
    >
      {children}
    </UserInteractionContext.Provider>
  );
};