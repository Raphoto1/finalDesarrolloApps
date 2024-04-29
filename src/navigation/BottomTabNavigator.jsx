//imports de app
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
//imports propios
import Header from "../componets/Header";
import HomeStack from "./HomeStack";
import SessionStack from "./SessionStack";
import { colors } from "../constants/colors";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return <Header route={route} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}>
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <SimpleLineIcons name='game-controller' size={24} color='white' />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name='SessionStack'
        component={SessionStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <SimpleLineIcons name='rocket' size={24} color='white' />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.lightBlue,
    shadowColor: "black",
    elevation: 4,
    borderRadius: 15,
    height: 60,
  },
});
