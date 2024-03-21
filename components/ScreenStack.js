import React from "react";
import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";

import AboutUs from "../screens/miscellaneous/AboutUs";
import Account from "../screens/accountManagement/Account";
import AddNew from "../screens/trackingScreens/AddNew";
import Home from "../screens/trackingScreens/Home";
import Trackers from "../screens/trackingScreens/Trackers";
import Settings from "../screens/miscellaneous/Settings";

const Stack = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function ScreenStack() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Add new"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.primary,
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
              color={focused ? colors.primary : color}
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
              color={focused ? colors.primary : color}
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
              color={focused ? colors.primary : color}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

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
  },
  {
    name: "About us",
    component: AboutUs,
    iconName: "question",
    drawerItemStyle: { marginTop: 400 },
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
