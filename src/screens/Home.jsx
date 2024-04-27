//imports de app
import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
//imports propios
import HorizontalList from "../componets/HorizontalList";
import { colors } from "../constants/colors";

const Home = ({ route, navigation }) => {
  return (
    <View>
      <Text>Gamming Panas HOME</Text>
      <View style={styles.mainGroup}>
        <HorizontalList title={"Games"} navigation={navigation} gridList={"GameList"} />
        <HorizontalList title={"Genre"} navigation={navigation} gridList={"GenreList"}/>
        <HorizontalList title={"Friends"} navigation={navigation} gridList={"FriendsList"}/>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainGroup: {
    height: "100%",
    flexDirection: "column",
  },
});
