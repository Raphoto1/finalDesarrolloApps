//imports de app
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//imports propios
import Home from "../screens/Home";
import Header from "../componets/Header";
import GameList from "../screens/GameList";
import GenreList from "../screens/GenreList";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          header: () => {
            return <Header title='Game Call' />;
          },
        })}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='GameList' component={GameList} />
        <Stack.Screen name='GenreList' component={GenreList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
