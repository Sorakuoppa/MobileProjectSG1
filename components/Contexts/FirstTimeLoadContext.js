import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
export const FirstTimeLoadContext = createContext(); // Renamed context

// Create provider
export const FirstTimeLoadProvider = ({ children }) => {
  const [firstTimeLoaded, setFirstTimeLoadedState] = useState(false); // Renamed variable

  useEffect(() => {
    // Load the value of firstTimeLoaded from AsyncStorage
    const loadFirstTimeLoaded = async () => {
      try {
        const value = await AsyncStorage.getItem('firstTimeLoaded');
        if (value === null) {
          setFirstTimeLoadedState(value === 'true');
        }
      } catch (error) {
        console.error('Error loading firstTimeLoaded from AsyncStorage:', error);
      }
    };
    loadFirstTimeLoaded();
  }, []);

  const setFirstTimeLoaded = async (value) => {
    try {
      // Save the value of firstTimeLoaded to AsyncStorage
      await AsyncStorage.setItem('firstTimeLoaded', value.toString());
      // Update the context state
      setFirstTimeLoadedState(value);
    } catch (error) {
      console.error('Error saving firstTimeLoaded to AsyncStorage:', error);
    }
  };

  return (
    <FirstTimeLoadContext.Provider value={{ firstTimeLoaded, setFirstTimeLoaded }}>
      {children}
    </FirstTimeLoadContext.Provider>
  );
};

// Custom hook to consume the context
export const useLoaded = () => useContext(FirstTimeLoadContext);
