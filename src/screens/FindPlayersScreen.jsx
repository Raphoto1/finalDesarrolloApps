//imports de app
import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
//imports Propios
import { useGetGameByIdQuery } from "../services/gamesService";
import GridOfPlayersFind from "../componets/GridOfPlayersFind";
import GamePreview from "../componets/GamePreview";

const FindPlayersScreen = ({ navigation, route }) => {
  const playersAmount = useSelector((state) => state.counterReducer.value);
  const { gameId } = useSelector((state) => state.games.value);
  const { data: gameInfo, isLoading, error } = useGetGameByIdQuery(gameId);
  console.log(gameId);
  return (
    <View>
      <View>
        <Button
          title={"Back"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <GamePreview gameInfo={gameInfo } />
      <View style={styles.pContainer}>
        <GridOfPlayersFind playersNumber={playersAmount} navigation={navigation} />
      </View>
    </View>
  );
};

export default FindPlayersScreen;

const styles = StyleSheet.create({
  pContainer: {
    height: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "LatoBold",
  },
  imageContainer: {
    height: 200,
    width: "100%",
  },
  gameImage: {
    height: "100%",
    width: "100%",
  },
});
