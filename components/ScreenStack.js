import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AboutUs from "../screens/miscellaneous/AboutUs";
import Account from "../screens/accountManagement/Account";
import AddNew from "../screens/trackingScreens/AddNew";
import Home from "../screens/trackingScreens/Home";
import Trackers from "../screens/trackingScreens/Trackers";
import Settings from "../screens/miscellaneous/Settings";

import { darkColors } from "../styles/general";

const Stack = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export function ScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: darkColors.secondary },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add new" component={AddNew} />
      <Stack.Screen name="Trackers" component={Trackers} />
    </Stack.Navigator>
  );
}

export function DrawerStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "OnTrack",
        swipeEdgeWidth: 80,
        headerStyle: { backgroundColor: darkColors.secondary },
        headerTitleStyle: { color: darkColors.primary },
        headerTintColor: darkColors.primary
      }}
    >
      <Drawer.Screen name="home" component={ScreenStack} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="About us" component={AboutUs} />
      <Drawer.Screen name="Account" component={Account} />
    </Drawer.Navigator>
  );
}
