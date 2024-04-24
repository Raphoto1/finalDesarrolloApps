import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";

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
    height: '20%',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: "center",
  },
  text: {
    fontFamily:'Jersey_25',
    color: "black",
    fontSize:30
  },
});

export default Header;
