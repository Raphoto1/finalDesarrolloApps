//imports de app
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
//imports propios
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthStack";

const Navigator = () => {
  const [user, setUser] = useState(null);
  return <NavigationContainer>{user ? <BottomTabNavigator /> : <AuthStack />}</NavigationContainer>;
};

export default Navigator;

const styles = StyleSheet.create({});
