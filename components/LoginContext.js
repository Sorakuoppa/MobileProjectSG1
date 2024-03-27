// LoginContext.js
import { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [email, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loginState, setLoginState] = useState(false);

  return (
    <LoginContext.Provider value={{  email, setUserEmail, username, setUsername, loginState, setLoginState }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
