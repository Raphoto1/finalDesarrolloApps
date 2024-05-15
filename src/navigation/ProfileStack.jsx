//imports de app
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//imports propios
import Header from "../componets/Header";
import MyProfileScreen from "../screens/MyProfileScreen";
import ImageSelector from "../screens/ImageSelector";

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        header: () => <Header title='Profile' />,
      }}>
      <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <Stack.Screen name="ImageSelector" component={ImageSelector}/>
    </Stack.Navigator>
  );
};

export default ProfileStack;