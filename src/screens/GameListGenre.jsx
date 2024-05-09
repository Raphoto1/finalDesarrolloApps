//imports de app
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
//imports Propios
import GridList from "../componets/GridList";
import gamesFull from '../data/gamesFull.json'
import { colors } from "../constants/colors";
import { useGetGamesQuery } from "../services/gamesService";

const GameList = ({ route, navigation }) => {
  const{data:games,isLoading,error}=useGetGamesQuery()
  const genreSelected = route.params
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
      <GridList listToShow={games} specialFilter={genreSelected} navigation={navigation} isLoadingIn={isLoading}/>
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
