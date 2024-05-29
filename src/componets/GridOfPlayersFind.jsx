//imports de app
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//imports propios
import Bubble from "./Bubble";
import BubblePlayer from "./BubblePlayer";
import { randomProfilePics } from "../constants/randomPics";
import ButtonBlue from "./ButtonBlue";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery, useGetProfileInfoQuery, useGetUsersListQuery } from "../services/userService";
import DatePickerModal from "./DatePickerModal";
import { setDateTimeSession, setGroupOfPlayersSelected } from "../features/GameSession/GameSessionSlice";
import { useGetGameSessionByIdQuery, usePostGameSessionByIdMutation } from "../services/gameSessionService";

const GridOfPlayersFind = ({ playersNumber, navigation, route, gameId }) => {
  const dispatch = useDispatch();
  const { localId, userInfo } = useSelector((state) => state.auth.value);
  const { groupOfPlayersSelected, datetimeSession } = useSelector((state) => state.GameSessionSlice.value);
  const { data: userImageCloud } = useGetProfileImageQuery(localId);
  const { data: userInfoCloud } = useGetProfileInfoQuery(localId);
  const { data: playerFind } = useGetUsersListQuery();
  const { data: userSessions } = useGetGameSessionByIdQuery(localId);
  const [triggerPostGameSession, result] = usePostGameSessionByIdMutation(localId);

  const [arrayOfPlayers, setArrayOfPlayers] = useState([]);
  const [playersAvailable, setPlayersAvailable] = useState([]);
  const [defPlayers, setDefPlayers] = useState(null);
  const [allowCall, setAllowCall] = useState(false);
  const [allowTime, setAllowTime] = useState(false);
  //crear array para el grid
  const baseObject = { name: userInfoCloud.userName };
  const noName = { name: "No User Name" };
  const arrayChevere = Array.from({ length: playersNumber }, (_, index) => Object.create({ index: index }));
  if (arrayChevere.length >= 1) {
    userInfoCloud.userName ? (arrayChevere[0] = baseObject) : (arrayChevere[0] = noName);
  }
  //filtrar jugadores que quieren que los encuentren
  const organizePlayersAvailable = () => {
    const filtered = playerFind.filter((item) => item.findMe === true);
    setPlayersAvailable(filtered);
  };
  //generador de random sin repetir para no repetir id
  const maxRange = playersAvailable.length - 1;
  const minRange = 0;
  const amount = playersNumber - 1;
  const uniqueNumbers = (min, max, amount) => {
    const uniqueIndex = new Set();
    while (uniqueIndex.size < amount) {
      const shuf = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueIndex.add(shuf);
    }
    return Array.from(uniqueIndex);
  };
  //mezclador de players
  const shufflePlayer = () => {
    const shuffleIndex = uniqueNumbers(minRange, maxRange, amount);

    const result = arrayChevere.map((info, index) => {
      if (index === 0) {
        return { info: info };
      } else {
        return {
          info: playersAvailable[shuffleIndex[index - 1]],
        };
      }
    });
    setDefPlayers(result);
    dispatch(setGroupOfPlayersSelected({ groupOfPlayersSelected: result }));
  };

  const handleCall = () => {
    if (userSessions === null) {
      const pack = { date: datetimeSession, fId: groupOfPlayersSelected, gameId: gameId };
      triggerPostGameSession({ data: { gameSession: [pack] }, localId: localId });
    } else {
      let oldSessions = userSessions.gameSession;
      let pack = { date: datetimeSession, fId: groupOfPlayersSelected, gameId: gameId };
      let packFinal = [...oldSessions, pack];
      triggerPostGameSession({ data: { gameSession: packFinal }, localId: localId });
    }
    //confirmacion
    setAllowCall(false);
    setAllowTime(false);
    dispatch(setDateTimeSession({ datetimeSession: null }), setGroupOfPlayersSelected({ groupOfPlayersSelected: null }));
    Alert.alert("Call to Play Made", "Lets Play", [
      {
        text: "Ok",
      },
    ]);
    navigation.navigate('Home');
  };

  useEffect(() => {
    groupOfPlayersSelected ? setAllowTime(true) : null;
    if (datetimeSession && groupOfPlayersSelected) {
      setAllowCall(true);
    }
    organizePlayersAvailable();
    setArrayOfPlayers(arrayChevere);
  }, [playersNumber, datetimeSession, groupOfPlayersSelected]);
  return (
    <>
      <View style={styles.container}>
        {defPlayers ? (
          <FlatList
            style={{ paddingTop: 10 }}
            data={defPlayers}
            numColumns={3}
            renderItem={({ item }) =>
              item.info.name ? (
                <Bubble text={item.info.name} thumbnail={userImageCloud?.image} />
              ) : (
                <BubblePlayer localId={item.info.localId} findMe={item.info.findMe} />
              )
            }
          />
        ) : (
          <FlatList
            style={{ paddingTop: 10 }}
            data={arrayOfPlayers}
            numColumns={3}
            renderItem={({ item }) =>
              item.name ? (
                <Bubble text={item.name} thumbnail={userImageCloud?.image} />
              ) : (
                <View>
                  <Bubble text={"player"} localImage={randomProfilePics[Math.floor(Math.random() * 13)]} />
                </View>
              )
            }
          />
        )}
        <View style={styles.btnContinue}>
          <View style={styles.btnShuffle}>
            <ButtonBlue title={"Let's Find Players"} onPress={shufflePlayer} />
            {allowTime ? <DatePickerModal /> : null}
          </View>
          <View style={styles.btnGroup}>
            {allowCall ? <ButtonBlue title={"Call!!"} onPress={handleCall} /> : null}
            <ButtonBlue title={"Cancel"} onPress={() => navigation.navigate("Home")} />
          </View>
        </View>
      </View>
    </>
  );
};
export default GridOfPlayersFind;

const styles = StyleSheet.create({
  container: {
    height: "45%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  btnContinue: {
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: "70%",
    alignItems: "center",
  },
  btnGroup: {
    justifyContent: "space-evenly",
    gap: 50,
    width: "60%",
    flexDirection: "row",
  },
  btnShuffle: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
