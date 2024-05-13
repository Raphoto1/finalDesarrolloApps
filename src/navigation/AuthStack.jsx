//imports de app
import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//imports propios
import Header from "../componets/Header";
import LoginScreen from "../screens/LoginScreen"
import SignupScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ header: ({ route }) => <Header title={"Ready Player One?"} /> }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
