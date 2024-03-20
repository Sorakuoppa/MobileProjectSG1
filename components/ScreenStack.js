import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import GetStarted from "../screens/GetStarted";

const Stack = createBottomTabNavigator();

export default function ScreenStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Get Started" component={GetStarted} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
    }