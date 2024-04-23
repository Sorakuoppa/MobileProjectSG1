import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="moreAboutUs" component={moreAboutUs} />
    </Stack.Navigator>
  );
};