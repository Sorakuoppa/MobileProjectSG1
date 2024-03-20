import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";

import AboutUs from "../screens/AboutUs";
import Account from "../screens/Account";
import AddNew from "../screens/AddNew";
import GetStarted from "../screens/GetStarted";
import Home from "../screens/Home";
import Trackers from "../screens/Trackers";
import Settings from "../screens/Settings";

const Stack = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export function ScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add new" component={AddNew} />
      <Stack.Screen name="Trackers" component={Trackers} />
    </Stack.Navigator>
  );
}

export function DrawerStack() {
  return (
    <Drawer.Navigator screenOptions={{headerTitle: 'OnTrack' }}>
      <Drawer.Screen name="home" component={ScreenStack} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="About us" component={AboutUs} />
    </Drawer.Navigator>
  );
}
