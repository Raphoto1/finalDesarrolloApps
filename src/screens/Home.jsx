//imports de app
import { StyleSheet, Text, View } from "react-native";
import React from "react";
//imports propios
import HorizontalList from "../componets/HorizontalList";
const Home = () => {
  return (
    <View>
      <Text>Gamming Panas HOME</Text>
      <HorizontalList title={"Juegos"} />
      <HorizontalList title={"Generos"} />
      <HorizontalList title={"Compas"} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
