//imports de app
import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
//imports propios
import { colors } from "../constants/colors";

const ButtonBlue = ({ onPress, title, navigation, route }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default ButtonBlue;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: "60%",
  },
  text: {
    color: colors.white,
    fontFamily: "LatoRegular",
    fontSize: 22,
    lineHeight: 22,
  },
});
