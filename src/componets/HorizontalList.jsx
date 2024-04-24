import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HorizontalList = ({ title }) => {
  return (
    <View>
      <Text style={styles.listTitle}>{`${title} HorizontalList`}</Text>
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  listTitle: {
    fontFamily: "LatoRegular",
    fontSize: 22,
  },
});
