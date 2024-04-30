// LoginContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../FirebaseComponents/FirebaseConfig';
import { collection, query, where, getDocs } from '@firebase/firestore';
import LoadingScreen from '../../screens/miscellaneous/LoadingScreen';
const LoginContext = createContext();
export const LoginProvider = ({ children }) => {

  const [email, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [loginState, setLoginState] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged( async (user) => {
      if (user) {
         await fetchUserData(user.email)
         setIsLoading(false); 
      } else {
        // No user is signed in.
        // Clear user email and set login state to false
        setUserEmail('');
        setUsername('')
        setLoginState(false);
        setIsLoading(false); 
      }
    });
    return unsubscribe;
  }, [])

  const fetchUserData = async (email) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", '==', email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const snapshotResult = doc.data()
        setUserEmail(snapshotResult.email);
        setUsername(snapshotResult.username)
            });
            setLoginState(true);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    } 
  }

 

  return (
    <LoginContext.Provider value={{ email, setUserEmail, username, setUsername, loginState, setLoginState }}>
      {isLoading ? (
        // Render a loading indicator while data is being fetched
        <LoadingScreen />
      ) : (
        // Render children once data fetching is complete
        children
      )}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
