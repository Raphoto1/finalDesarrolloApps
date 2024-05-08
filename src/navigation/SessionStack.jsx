//imports de app
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//imports propios
import Header from "../componets/Header";
import GameSession from "../screens/GameSession";
import CreateSession from "../screens/CreateSession";

const Stack = createNativeStackNavigator();
const SessionStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='GameSession'
      screenOptions={{
        header: () => <Header title='Game Session' />,
      }}>
      <Stack.Screen name="GameSession" component={GameSession} />
      <Stack.Screen name="CreateSession" component={CreateSession}/>
    </Stack.Navigator>
  );
};

export default SessionStack;

const styles = StyleSheet.create({});
