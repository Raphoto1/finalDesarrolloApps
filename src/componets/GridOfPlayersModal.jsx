//imports de app
import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//imports propios
import Bubble from "./Bubble";
import BubblePlayer from "./BubblePlayer";
import { randomProfilePics } from "../constants/randomPics";
import ButtonBlue from "./ButtonBlue";
import { useDispatch, useSelector } from "react-redux";
import { useGetFavoriteFriendsQuery, useGetProfileImageQuery, useGetProfileInfoQuery, useGetUsersListQuery } from "../services/userService";
import { setPlayerChoosed } from "../features/GameSession/GameSessionSlice";

const GridOfPlayersModal = ({ navigation, route, group, setModalVisibleGrid, modalVisibleGrid }) => {
  const dispatch = useDispatch();
  const { localId, userInfo } = useSelector((state) => state.auth.value);
  const { data: userImageCloud } = useGetProfileImageQuery(localId);
  const { data: playerFind } = useGetUsersListQuery();
  const { data: playerFriends } = useGetFavoriteFriendsQuery(localId);
  const [playersAvailable, setPlayersAvailable] = useState([]);
  const [playerSelected, setPlayerSelected] = useState(false);
console.log(playerFriends);
  //filtrar jugadores que quieren que los encuentren
  const organizePlayersAvailable = () => {
    const filtered = playerFind.filter((item) => item.findMe === true);
    setPlayersAvailable(filtered);
  };

  const handleChoosePlayer = (localId) => {
    setPlayerSelected(!playerSelected);
    dispatch(
      setPlayerChoosed({
        playerChoosed: localId,
      })
    );
  };

  useEffect(() => {
    organizePlayersAvailable();
  }, []);
  return (
    <>
      <View style={styles.container}>
        {playerSelected?<Text>User Selected!!!, please Confirm</Text>:<Text>Please Select</Text>}
        {!group ? (
          <FlatList
            style={{ paddingTop: 10 }}
            data={playersAvailable}
            numColumns={2}
            renderItem={({ item }) => <BubblePlayer localId={item.localId} findMe={item.findMe} bubblePress={() => handleChoosePlayer(item.localId)} />}
          />
        ) : (
          <FlatList
            style={{ paddingTop: 10 }}
            data={playerFriends.fId}
            numColumns={2}
            renderItem={({ item }) => <BubblePlayer localId={item} findMe={true} bubblePress={() => handleChoosePlayer(item)}/>}
          />
        )}
      </View>
    </>
  );
};
export default GridOfPlayersModal;

const styles = StyleSheet.create({
  container: {
    height: "70%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  btnContinue: {
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: "90%",
    alignItems: "center",
  },
  btnGroup: {
    justifyContent: "space-evenly",
    gap: 50,
    width: "50%",
    flexDirection: "row",
  },
  btnShuffle: {
    width: "100%",
    paddingBottom: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
