//imports de app
import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//imports propios
import Bubble from "./Bubble";
import { randomProfilePics } from "../constants/randomPics";
import ButtonBlue from "../componets/ButtonBlue";
import { useSelector } from "react-redux";
import { useGetProfileImageQuery, useGetProfileInfoQuery } from "../services/userService";

const GridOfPlayers = ({ playersNumber,navigation,route }) => {
  const { localId, userInfo } = useSelector((state) => state.auth.value);
  const { data: userImageCloud } = useGetProfileImageQuery(localId);
  const { data: userInfoCloud } = useGetProfileInfoQuery(localId);
  const [arrayOfPlayers, setArrayOfPlayers] = useState([]);
  if (!userInfo) {
    // console.log(userInfoCloud);
  }

  const baseObject = { name: userInfoCloud.userName };
  const noName = {name: 'No User Name'}
  const arrayChevere = Array.from({ length: playersNumber }, (_, index) => Object.create({ index: index }));
  if (arrayChevere.length >= 1) {
    userInfoCloud.userName?arrayChevere[0] = baseObject:arrayChevere[0] = noName
  }
  const handleSelectPlayer = (index) => {
    console.log(index);
    // arrayChevere[index] = { name: `assigned${index}` };
  };
  console.log({ arrayChevere: arrayChevere });
  useEffect(() => {
    setArrayOfPlayers(arrayChevere);
  }, [playersNumber]);
  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={{paddingTop:10}}
          data={arrayOfPlayers}
          numColumns={3}
          renderItem={({ item }) =>
            item.name ? (
              <Bubble text={item.name} thumbnail={userImageCloud?.image} />
            ) : (
              <Bubble text={"player"} localImage={randomProfilePics[Math.floor(Math.random() * 13)]} bubblePress={handleSelectPlayer(item.index)} />
            )
          }
        />
        <View style={styles.btnContinue}>
          {playersNumber >= 2 ?
            <View style={styles.btnGroup}>
              <ButtonBlue title={"Find Players"} onPress={()=>navigation.navigate('FindPlayersScreen')}/>
              <ButtonBlue title={"Select Players"} onPress={()=>navigation.navigate('SelectPlayersScreen')}/>
            </View>
            :
            null}
        </View>
      </View>
    </>
  );
};
export default GridOfPlayers;

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
    paddingTop: "65%",
    alignItems: "center",
  },
  btnGroup: {
    justifyContent: 'space-evenly',
    gap:50,
    width:'70%',
    flexDirection:'row'
  }
});
