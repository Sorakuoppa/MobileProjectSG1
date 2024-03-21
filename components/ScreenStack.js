import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";

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
        tabBarActiveTintColor: darkColors.primary,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Stack.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="home"
              size={20}
              color={focused ? darkColors.primary : color}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Add new"
        component={AddNew}
        options={{
          tabBarLabel: "Add new",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="plus"
              size={20}
              color={focused ? darkColors.primary : color}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Trackers"
        component={Trackers}
        options={{
          tabBarLabel: "Trackers",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="chart-bar"
              size={20}
              color={focused ? darkColors.primary : color}
            />
          ),
        }}
      />
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
        headerTintColor: darkColors.primary,
        drawerType: "slide",
        drawerStyle: { backgroundColor: darkColors.secondary },
        drawerActiveTintColor: darkColors.primary,
        drawerInactiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={ScreenStack}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Icon
              name="home"
              size={20}
              color={focused ? darkColors.primary : color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Icon
              name="cog"
              size={20}
              color={focused ? darkColors.primary : color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Icon
              name="user-circle"
              size={20}
              color={focused ? darkColors.primary : color}
            />
          ),
        }}
      />
      
      <Drawer.Screen
        name="About us"
        component={AboutUs}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Icon
              name="question-circle"
              size={20}
              color={focused ? darkColors.primary : color}
            />
          ),
          drawerItemStyle: { marginTop: 600},
        }}
      />
    </Drawer.Navigator>
  );
}
