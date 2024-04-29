//imports de app
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
//imports propios
import { colors } from "../constants/colors";

const Header = ({ title }) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={width > 360 ? styles.textHeader : styles.textSm}>{title}</Text>
      {/* <Text style={styles.text2}>holi</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: colors.darkBlue,
  },
  text2: {
    color:'white'
  },
  textHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical:'center',
    fontFamily:'Jersey_25',
    color: "white",
    fontSize:50
  },
  textSm: {
    justifyContent: 'center',
    alignItems:'center',
    fontFamily:'Jersey_25',
    color: "white",
    fontSize:30
  }
});

export default Header;
