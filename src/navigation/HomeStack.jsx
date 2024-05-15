//imports de app
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//imports propios
import Home from "../screens/Home";
import Header from "../componets/Header";
import GameList from "../screens/GameList";
import GenreList from "../screens/GenreList";
import FriendsList from "../screens/FriendsList";
import GameListGenre from "../screens/GameListGenre";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        header: () => {
          return (
            <Header
              title={
                route.name === "Home"
                  ? "Game Call"
                  : route.name === "GameList"
                  ? "Games List"
                  : route.name === "GenreList"
                  ? "Genre List"
                  : route.name === "FriendsList"
                        ? "Friends List"
                        : route.name === "GameListGenre"
                  ? "Game List By Genre"
                  : route.name === "lost"
              }
            />
          );
        },
      })}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='GameList' component={GameList} />
      <Stack.Screen name='GameListGenre' component={GameListGenre} />
      <Stack.Screen name='GenreList' component={GenreList} />
      <Stack.Screen name='FriendsList' component={FriendsList} />
    </Stack.Navigator>
  );
};

export default HomeStack;
