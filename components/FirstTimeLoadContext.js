import React, { createContext, useState, useContext } from 'react';

// Create context
export const FirstTimeLoadContext = createContext(); // Renamed context

// Create provider
export const FirstTimeLoadProvider = ({ children }) => {
  const [firstTimeLoaded, setFirstTimeLoaded] = useState(false); // Renamed variable

  return (
    <FirstTimeLoadContext.Provider value={{ firstTimeLoaded, setFirstTimeLoaded }}>
      {children}
    </FirstTimeLoadContext.Provider>
  );
};

// Custom hook to consume the context
export const useLoaded = () => useContext(FirstTimeLoadContext);
