import React, { useContext, useEffect } from 'react'
import { View, Image, Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { accountStyle } from '../../styles/accountManagementStyles/accountStyle'
import { ThemeContext } from '../../components/Contexts/ThemeContext'
import { useTheme } from '@react-navigation/native'

export default function LoadingScreen() {
    const { colors } = useTheme();
    const  theme  = useContext(ThemeContext);

    useEffect(() => {
      theme.setTheme("dark");
    }, []);

  return (
    <View style={{ ...accountStyle.container, backgroundColor: colors.background }}>
    <Image
      source={
        theme === "dark"
          ? require("../../assets/logos/onTrack_dark_theme.png")
          : require("../../assets/logos/onTrack_light_theme.png")
      }
      style={{ width: 200, height: 100, marginBottom: 40 }}
    />
    <View>
      <Text
        style={{
          ...accountStyle.title,
          color: colors.text,
          marginBottom: 20,
        }}
      >
        Fetching account data...
      </Text>
      <ActivityIndicator
        animating={true}
        color={colors.primary}
        size={80}
      />
    </View>
  </View>
  )
}
