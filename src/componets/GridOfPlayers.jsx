import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React from "react";

import Bubble from "./Bubble";

const GridOfPlayers = ({ playersNumber }) => {
  // const playersNumber = 5
  const baseObject = { player: "player" };
  const arrayChevere = Array.from({ length: playersNumber }, (_, index) => Object.create(baseObject));
  console.log(arrayChevere);

  return (
    <>
      <View style={styles.container}>
        <FlatList data={arrayChevere} numColumns={3} renderItem={({ item }) => <Bubble />} />
      </View>
    </>
  );
};
export default GridOfPlayers;

const styles = StyleSheet.create({
  container: {
    height: "43%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
