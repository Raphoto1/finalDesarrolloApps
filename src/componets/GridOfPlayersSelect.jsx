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
import ListOfPlayersModal from "./ListOfPlayersModal";
import { useGetProfileImageQuery, useGetProfileInfoQuery, useGetUsersListQuery } from "../services/userService";
import { setPlayerChoosed } from "../features/GameSession/GameSessionSlice";

const GridOfPlayersSelect = ({ playersNumber, navigation, route }) => {
  const dispatch = useDispatch();
  const { playerChoosed } = useSelector((state) => state.GameSessionSlice.value);
  const { localId, userInfo } = useSelector((state) => state.auth.value);
  const { data: userImageCloud } = useGetProfileImageQuery(localId);
  const { data: userInfoCloud } = useGetProfileInfoQuery(localId);
  const { data: playerFind } = useGetUsersListQuery();
  const [arrayOfPlayers, setArrayOfPlayers] = useState(null);
  const [playersAvailable, setPlayersAvailable] = useState([]);
  const [defPlayers, setDefPlayers] = useState(null);
  const [indexSelected, setIndexSelected] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  // console.log({ estoesgridpC: playerChoosed });
  // console.log(indexSelected);
  //crear array para el grid
  const baseObject = { name: userInfoCloud.userName };
  const noName = { name: "No User Name" };
  const noName2 = { name: "userNotSelected" };
  const arrayChevere = Array.from({ length: playersNumber }, (_, index) => Object.create({ index: index }));
  if (arrayChevere.length >= 1) {
    userInfoCloud.userName ? (arrayChevere[0] = baseObject) : (arrayChevere[0] = noName);
  }

  //filtrar jugadores que quieren que los encuentren
  const organizePlayersAvailable = () => {
    const filtered = playerFind.filter((item) => item.findMe === true);
    console.log(filtered);
    setPlayersAvailable(filtered);
  };

  //mezclador de players
  const assignGridUsers = () => {
    let work2 = [];
    const work = arrayOfPlayers;
    const ceroData = arrayChevere[0];
    console.log({indexselassi:indexSelected});
    work[indexSelected] = { info: playerChoosed };
    work[0] = { info: ceroData };
    work2 = work.map((item, index) => {
      if (item.info == undefined) {
       console.log('entro al condi');
       return { info: noName2 };
     } else {
       return item
     }
    })
    // console.log({ assignW1: work });
    // console.log({ assignW2: work2 });
    setArrayOfPlayers(work2); 
    setDefPlayers(work2);

  };
  //encontrar el index del array y agregarle info, la info viene de un modal
  const handleModal = (indexSel) => {
    setModalVisible(!modalVisible);
    setIndexSelected(indexSel);
  };

  const submitModal = () => {
    console.log("te escucho");
  };

  const handleCancel = () => {
    console.log('canceled');
    dispatch(setPlayerChoosed({
      playerChoosed:null
    }))
    
  }
  useEffect(() => {
    organizePlayersAvailable();
    setArrayOfPlayers(arrayChevere);
    if (playerChoosed) {
      assignGridUsers();
    }
  }, [playersNumber, playerChoosed]);

  return (
    <>
      <View style={styles.container}>
        <ListOfPlayersModal modalVisibleIn={modalVisible} handleModal={handleModal} setModalVisible={setModalVisible} submitModal={submitModal} />
        <View style={styles.btnSuper}>
          <View style={styles.btnContinue}>
            <View style={styles.btnGroup}>
              <ButtonBlue title={"Call!!"} />
              <ButtonBlue title={"Cancel"} onPress={() => { handleCancel(); navigation.goBack()}} />
            </View>
          </View>
        </View>
        <View style={styles.gridGroup}>
          {defPlayers ? (
            <FlatList
              style={{ paddingTop: 10 }}
              data={defPlayers}
              numColumns={3}
              renderItem={( item ) => 
                item.item.info.name ? (
                  <Bubble text={item.item.info.name} thumbnail={userImageCloud?.image} bubblePress={() => handleModal(item.index)} />
                ) : (
                  <BubblePlayer localId={item.item.info} findMe={true} bubblePress={() => handleModal(item.index)} />
                )
              }
            />
          ) : (
            <FlatList
              style={{ paddingTop: 1 }}
              data={arrayChevere}
              numColumns={3}
                renderItem={(item) => 
                item.item.name ? (
                  <Bubble text={item.item.name} thumbnail={userImageCloud?.image} />
                ) : (
                  <View>
                    <Bubble text={"player"} localImage={randomProfilePics[Math.floor(Math.random() * 13)]} bubblePress={() => handleModal(item.item.index)} />
                  </View>
                )
              }
            />
          )}
        </View>
      </View>
    </>
  );
};
export default GridOfPlayersSelect;

const styles = StyleSheet.create({
  container: {
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  btnSuper: {
    height: "20%",
  },
  gridGroup: {
    height: "75%",
    paddingBottom: 10,
  },
  btnContinue: {
    width: "100%",
    height: "50%",
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
