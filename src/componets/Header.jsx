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
    height: 70,
    justifyContent: "center",
    },
    text: {
        color: 'black'
    }
});

export default Header;
