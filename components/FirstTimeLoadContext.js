
import React, { createContext, useState, useContext } from 'react';

// Create context
export const LoginContext = createContext();

// Create provider
export const FirstTimeLoadProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to consume the context
export const useLoaded = () => useContext(LoginContext);
