import React, { useEffect } from 'react';
import { View } from 'react-native';
import { signOut } from '@firebase/auth';
import { useLoginContext } from '../../components/Contexts/LoginContext';
import { auth } from '../../components/FirebaseComponents/FirebaseConfig';
import { DrawerItem } from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/FontAwesome5";

const SignOut = () => {
    const { loginState, setLoginState, setUserEmail, setUsername } = useLoginContext(); // Get the function to update login state from the context
 
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setLoginState(false);
            setUserEmail('');
            setUsername('');
        } catch (error) {
            console.error('Error signing out:', error.message);
        }
    };

    useEffect(() => {
        handleSignOut();
    }, []);

    return (
        <View>
            {loginState && (
                <DrawerItem
                    label="Sign Out"
                    icon={({ focused, color, size }) => (
                        <Icon
                            name="sign-out-alt"
                        />
                    )}
                    onPress={handleSignOut}
                />
            )}
        </View>
    );
};

export default SignOut;
