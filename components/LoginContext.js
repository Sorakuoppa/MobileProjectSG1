// LoginContext.js
import { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [email, setUserEmail] = useState('');
  const [username, setUsername] = useState('');

  return (
    <LoginContext.Provider value={{  email, setUserEmail, username, setUsername }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
