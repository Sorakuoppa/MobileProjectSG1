import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Icon from "react-native-vector-icons/FontAwesome5";

import AboutUs from "../screens/miscellaneous/AboutUs";
import Account from "../screens/accountManagement/Account";
import AddNew from "../screens/trackingScreens/AddNew";
import Home from "../screens/trackingScreens/Home";
import Trackers from "../screens/trackingScreens/Trackers";
import MyTracker from "../screens/trackingScreens/MyTracker";
import Templates from "../screens/trackingScreens/Templates";
import Settings from "../screens/miscellaneous/Settings";
import GetStarted from "../screens/miscellaneous/GetStarted";
import LoginOrRegister from "../screens/miscellaneous/LoginOrRegister";
import { useLoaded } from "./FirstTimeLoadContext";
import LoginComponent from "../screens/accountManagement/LoginComponent";
import RegisterComponent from "../screens/accountManagement/RegisterComponent";
import { useLoginContext } from "./LoginContext";

const Stack = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const InitialStack = createNativeStackNavigator();
// Manage labels and icons for BOTTOM NAV here
const bottomTabs = [
  {
    name: "HomeTab",
    component: Home,
    tabBarLabel: "Home",
    iconName: "home",
  },
  {
    name: "Add new",
    component: AddNew,
    tabBarLabel: "Add new",
    iconName: "plus",
  },
  {
    name: "Trackers",
    component: Trackers,
    tabBarLabel: "Trackers",
    iconName: "chart-bar",
  },
];

function InitialStackScreen() {
  return (
    <InitialStack.Navigator>
      <InitialStack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{ headerShown: false }}
      />
      <InitialStack.Screen name="LoginOrRegister" component={LoginOrRegister} />
      <InitialStack.Screen name="Login" component={LoginComponent} />
      <InitialStack.Screen name="Register" component={RegisterComponent} />
    </InitialStack.Navigator>
  );
}

function ScreenStack() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Add new"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: { fontSize: 13 },
      }}
    >
      {bottomTabs.map((screen, index) => (
        <Stack.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarLabel: screen.tabBarLabel,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={screen.iconName}
                size={22}
                color={focused ? colors.primary : colors.text}
              />
            ),
            tabBarItemStyle: screen.tabBarItemStyle,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

// Manage labels and icons for DRAWER NAV here
const screens = [
  {
    name: "Home",
    component: ScreenStack,
    iconName: "home",
  },
  {
    name: "Settings",
    component: Settings,
    iconName: "cog",
  },
  {
    name: "Account",
    component: Account,
    iconName: "user",
    drawerItemStyle: useLoginContext ? {} : { display: "none" }
  },
  {
    name: "Login",
    component: LoginComponent,
    iconName: "sign-in-alt",
    drawerItemStyle: useLoginContext ? { display: "none" } : {}  
  },
  {
    name: "About us",
    component: AboutUs,
    iconName: "question",
    drawerItemStyle: { marginTop: 400 },
  },
  {
    name: "Templates",
    component: Templates,
    drawerItemStyle: { display: "none" },
  },
  {
    name: "MyTracker",
    component: MyTracker,
    drawerItemStyle: { display: "none" },
  },
];

export function DrawerStack() {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: "OnTrack",
        swipeEdgeWidth: 80,
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.primary },
        headerTintColor: colors.primary,
        drawerType: "slide",
        drawerStyle: { backgroundColor: colors.background },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
      }}
    >
      {screens.map((screen, index) => (
        <Drawer.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            drawerIcon: ({ focused }) => (
              <Icon
                name={screen.iconName}
                size={20}
                color={focused ? colors.primary : colors.text}
              />
            ),
            drawerItemStyle: screen.drawerItemStyle,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
export function MainNavigator() {
  const { firstTimeLoaded } = useLoaded();
  return <>{firstTimeLoaded ? <DrawerStack /> : <InitialStackScreen />}</>;
}
