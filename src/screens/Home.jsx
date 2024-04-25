//imports de app
import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
//imports propios
import HorizontalList from "../componets/HorizontalList";
import { colors } from "../constants/colors";

const Home = () => {
  const handleAllGames = () => {
    navigation.navigate("GameList", GameList);
  };
  return (
    <View>
      <Text>Gamming Panas HOME</Text>
      <View style={styles.mainGroup}>
        <Pressable onPress={handleAllGames()}>
          <Text>Check all games</Text>
        </Pressable>
        <HorizontalList title={"Games"} />
        <HorizontalList title={"Genre"} />
        <HorizontalList title={"Friends"} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainGroup: {
    height: "100%",
    flexDirection: "column",
  },
});
