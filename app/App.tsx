import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ListUserScreen from "./screen/ListUser/user"
import SignInScreen from "./screen/Login"
import CreateScreen from "./screen/ListUser/create";
import EditUserScreen from "./screen/ListUser/edituser"
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
      
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="ListUser" component={ListUserScreen} />
          <Stack.Screen name="CreateUser" component={CreateScreen} />
          <Stack.Screen name="EditUser" component={EditUserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}