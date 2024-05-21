//imports de app
import { StyleSheet, Text, View, Image, Button } from "react-native";
import React,{useState} from "react";
//imports propios
import PlayersCounter from "../componets/PlayersCounter";
import GridOfPlayers from "../componets/GridOfPlayers";
import { useGetGameByIdQuery } from "../services/gamesService";
import { useSelector } from "react-redux";
import Bubble from "../componets/Bubble";

const CreateSession = ({ navigation, route }) => {
  const { gameId: gameIdIn } = route.params;
  const { data: gameInfo, error, isLoading } = useGetGameByIdQuery(gameIdIn);
  const playersAmount = useSelector((state) => state.counterReducer.value);
  console.log(playersAmount);
  const [playerNumberToDisplay, setPlayerNumberToDisplay] = useState([]);

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
      <View>
        <Text style={styles.title}>Let's Play {gameInfo?.name}</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.gameImage} resizeMode='cover' source={{ uri: `${gameInfo?.background_image}` }} />
        </View>
      </View>
      <PlayersCounter />
      <Text>CreateSession</Text>
      <GridOfPlayers playersNumber={playersAmount } />
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
