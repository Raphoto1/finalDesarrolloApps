//imports de app
import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
//imports propios
import Bubble from "./Bubble";
import Search from "./Search";
import { colors } from "../constants/colors";
const GridList = () => {
  return (
    <View style={styles.gridContainer}>
      <View style={styles.searchContainer}>
        <Search />
      </View>
      <View style={styles.gridGroup}>
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
      </View>
    </View>
  );
};

export default GridList;

const styles = StyleSheet.create({
  gridContainer: {
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  searchContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  gridGroup: {
    paddingTop: 10,
  },
});
