//imports de app
import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import PlayersCounter from "../componets/PlayersCounter";
import GridOfPlayers from "../componets/GridOfPlayers";
import { useGetGameByIdQuery } from "../services/gamesService";
import { useDispatch, useSelector } from "react-redux";
import Bubble from "../componets/Bubble";
import { setGame } from "../features/Games/gamesSlice";
import GamePreview from "../componets/GamePreview";

const CreateSession = ({ navigation, route }) => {
  const { gameId: gameIdIn } = route.params;
  const { data: gameInfo, error, isLoading } = useGetGameByIdQuery(gameIdIn);
  const playersAmount = useSelector((state) => state.counterReducer.value);
  const dispatch = useDispatch();
  const [playerNumberToDisplay, setPlayerNumberToDisplay] = useState([]);

  useEffect(() => {
    dispatch(
      setGame({
        gameId: gameIdIn,
      })
    );
  }, [gameIdIn]);

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
      <PlayersCounter />
      <GridOfPlayers playersNumber={playersAmount} gameId={gameIdIn} navigation={navigation} />
    </View>
  );
};

export default CreateSession;

const styles = StyleSheet.create({
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
