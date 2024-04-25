//Imports app
import { StyleSheet, Text, View } from "react-native";
import React from "react";
//Imports propios
import Bubble from "./Bubble";
import { colors } from "../constants/colors";

const HorizontalList = ({ title }) => {
  return (
    <View style={styles.listGroup}>
      <Text style={styles.listTitle}>{`${title} HorizontalList`}</Text>
      <View style={styles.listContainer}>
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
      </View>
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  listGroup: {
    backgroundColor: colors.cyan
  },
  listTitle: {
    fontFamily: "LatoRegular",
    fontSize: 22,
  },
  listContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
