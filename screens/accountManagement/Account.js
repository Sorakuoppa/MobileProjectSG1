import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { general } from '../../styles/general';
import { db } from '../../components/FirebaseConfig';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useLoginContext } from '../../components/LoginContext';

export default function Account() {
  const { email } = useLoginContext(); // Assuming you have userEmail in your context
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", '==', email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  return (
    <View style={general.scaffold}>
      <Text style={general.title}>Account</Text>
      {userData && (
        <View>
          <Text>Email: {userData.email}</Text>
          <Text>Username: {userData.username}</Text>
          {/* Add more fields here as needed */}
        </View>
      )}
    </View>
  );
}
