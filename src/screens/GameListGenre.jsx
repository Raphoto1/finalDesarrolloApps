//imports de app
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
//imports Propios
import GridList from "../componets/GridList";
import gamesFull from '../data/gamesFull.json'
import { colors } from "../constants/colors";

const GameList = ({ route, navigation }) => {
  const genreSelected = route.params
  console.log(genreSelected);
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{genreSelected }</Text>
        <Button
          title='Back'
          onPress={() => {
            navigation.goBack();
          }}></Button>
      </View>
      <GridList listToShow={gamesFull} specialFilter={genreSelected} navigation={navigation}/>
    </View>
  );
};

export default GameList;

const styles = StyleSheet.create({
  title: {
    textAlign:'center',
    padding: 10,
    borderRadius: 10,
    fontFamily: "LatoRegular",
    fontSize: 24,
    color: colors.gray,
    backgroundColor: colors.darkBlue,
  },
  titleContainer: {
    padding:10,
    justifyContent:'center'
  }
});
