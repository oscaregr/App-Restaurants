import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import FootupScreen from '../screens/FootupScreen';


const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={({ route, navigation }) => ({ headerShown: false})}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Foot' component={FootupScreen} />
    </Stack.Navigator>
  );
}