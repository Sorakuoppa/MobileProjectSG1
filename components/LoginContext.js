import React, { createContext, useContext, useState } from 'react';

// Create a context for user data
const UserContext = createContext();

// Create a provider component to wrap your application with
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the user context
export const useUser = () => useContext(UserContext);
