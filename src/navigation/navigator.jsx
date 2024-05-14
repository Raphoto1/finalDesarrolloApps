//imports de app
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
//imports propios
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";

const Navigator = () => {
  const { user } = useSelector((state) => state.auth.value);
  return <NavigationContainer>{user ? <BottomTabNavigator /> : <AuthStack />}</NavigationContainer>;
};

export default Navigator;

const styles = StyleSheet.create({});
