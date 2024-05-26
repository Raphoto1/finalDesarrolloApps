//imports de app
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//imports propios
import Header from "../componets/Header";
import GameSession from "../screens/GameSession";
import CreateSession from "../screens/CreateSession";
import FindPlayersScreen from "../screens/FindPlayersScreen";
import SelectPlayersScreen from "../screens/SelectPlayersScreen";

const Stack = createNativeStackNavigator();
const SessionStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='GameSession'
      screenOptions={{
        header: () => <Header title='Game Session' />,
      }}>
      <Stack.Screen name="GameSession" component={GameSession} />
      <Stack.Screen name="CreateSession" component={CreateSession} />
      <Stack.Screen name="FindPlayersScreen" component={FindPlayersScreen} />
      <Stack.Screen name="SelectPlayersScreen" component={SelectPlayersScreen}/>
    </Stack.Navigator>
  );
};

export default SessionStack;

const styles = StyleSheet.create({});
