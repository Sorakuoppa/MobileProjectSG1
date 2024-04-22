import React, { useState } from 'react'
import { Text, View, TextInput, Pressable, Alert } from 'react-native'
import { forgotPasswordStyle } from '../../styles/accountManagementStyles/forgotPasswordStyle'
import { db, passwordReset } from '../../components/FirebaseComponents/FirebaseConfig' // Assuming passwordReset function is exported from FirebaseConfig
import { collection, getDocs, query, where } from '@firebase/firestore'
import { useTheme } from "@react-navigation/native";

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')
    const { colors } = useTheme();

    const handlePasswordReset = async () => {
        const usersRef = collection(db, "users")
        const q = query(usersRef, where("email", '==', email))
        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                // Email does not exist in the database
                Alert.alert("Email not found", "The provided email address is not associated with any account.");
            } else {
                // Email exists, proceed with password reset
                passwordReset(email)
                    .then(() => {
                        console.log('Password reset email sent successfully');
                        Alert.alert(
                            'Password Reset Email Sent',
                            'A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => navigation.goBack() // Redirect user back to previous screen
                                }
                            ]
                        );
                    })
                    .catch((error) => {
                        console.error('Error sending password reset email:', error.message);
                        Alert.alert("Error", "Failed to send password reset email. Please try again later.");
                    });
            }
        } catch (error) {
            console.error('Error checking email in database:', error.message);
            // Handle any errors that occur during the database query
        }
    };

    return (
        <View style={forgotPasswordStyle.container}>
            <Text style={{...forgotPasswordStyle.formFieldTitle, color: colors.primary}}>Enter your email here</Text>
            <TextInput           
                placeholder="Email"
                style={{...forgotPasswordStyle.formFieldInput, borderColor: colors.primary}}
                value={email}
                autoCapitalize='none'
                onChangeText={setEmail}
            />
            <Pressable  style={{...forgotPasswordStyle.button, backgroundColor: colors.primary}} onPress={handlePasswordReset}>
                <Text style={forgotPasswordStyle.buttonText}>Send new password</Text>
            </Pressable>
        </View>
    );
}
