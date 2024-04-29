//imports de app
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
//imports propios
import { colors } from "../constants/colors";

const Header = ({ title }) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: colors.darkBlue,
  },
  text: {
    fontFamily:'Jersey_25',
    color: "white",
    fontSize:50
  },
});

export default Header;
