//imports de app
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
//imports propios
import GamePreview from "../componets/GamePreview";
import { useGetGameByIdQuery } from "../services/gamesService";
import GridOfPlayersSelect from "../componets/GridOfPlayersSelect";

const SelectPlayersScreen = ({navigation}) => {
  const { gameId } = useSelector((state) => state.games.value);
  const playersAmount = useSelector((state) => state.counterReducer.value);
  const { data: gamesInfo } = useGetGameByIdQuery(gameId);
  return (
      <View>
      <GamePreview gameInfo={gamesInfo} />
      <View style={styles.pContainer}>
        <GridOfPlayersSelect playersNumber={playersAmount} navigation={navigation} />
      </View>
    </View>
  );
};

export default SelectPlayersScreen;

const styles = StyleSheet.create({
    pContainer: {
        height: "100%",
      },
});
