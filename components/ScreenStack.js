import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Home from "../screens/Home";
import GetStarted from "../screens/GetStarted";

const Stack = createBottomTabNavigator();

export default function ScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerRight: () => <Text>Drawer nav</Text> }}
    >
      <Stack.Screen
        name="Get Started"
        component={GetStarted}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
