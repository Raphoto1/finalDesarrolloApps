//imports de app
import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import HorizontalList from "../componets/HorizontalList";
import ModalCustom from "../componets/ModalCustom";
import { colors } from "../constants/colors";
import gamesFull from "../data/gamesFull.json";
import genresClear from "../data/genresClear.json";
import { useGetGamesQuery, useGetGenreQuery } from "../services/gamesService";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfileImageQuery, useGetProfileInfoQuery } from "../services/userService";
import { setCameraImage, setUserInfo } from "../features/User/UserSlice";

const Home = ({ route, navigation }) => {
  const dispatch = useDispatch();
  //General data
  const { data: allGames, isLoading: isLoadingGames, error: errorGames } = useGetGamesQuery();
  const { data: allGenres, isLoading: isLoadingGenre, error: errorGenres } = useGetGenreQuery();
  //user Data
  const { localId, userInfo } = useSelector((state) => state.auth.value);
  const { data: userInfoCloud } = useGetProfileInfoQuery(localId);
  const { data: userPhotoCloud } = useGetProfileImageQuery(localId);
 

  //Modal controls
  const [modalVisible, setModalVisible] = useState(false);
  const handleGreen = () => {
    console.log("oprimo green y genero el call");
  };
  const handleAux = () => {
    console.log("see edita el call");
  };
  const handleRed = () => {
    setModalVisible(!modalVisible);
  };
  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  //end modal controls
  useEffect(() => {
    if (!userInfo) {
      dispatch(setUserInfo({ userInfo: userInfoCloud }))
    }   
  },[userInfo])
  return (
    <View>
      <Text>Gamming Panas HOME puede ir un call del favorito</Text>
      <ModalCustom
        modalVisible={modalVisible}
        handleModal={handleModal}
        title={`Fast Call the Group`}
        mainText={"test desde home"}
        btnRedActive={"cancel"}
        handleRed={handleRed}
        btnAuxActive={"adjust"}
        handleAux={handleAux}
        btnGreenActive={"lets Play"}
        handleGreen={handleGreen}
      />

      <View style={styles.mainGroup}>
        <HorizontalList title={"Games Available"} navigation={navigation} gridList={"GameList"} listToShow={allGames} isLoadingIn={isLoadingGames} />
        <HorizontalList
          title={"Genres Available"}
          navigation={navigation}
          gridList={"GenreList"}
          listToShow={allGenres}
          isLoadingIn={isLoadingGenre}
          bubbleNavigationTarget={"GameListGenre"}
        />
        <HorizontalList title={"Friends Online"} navigation={navigation} isLoadingIn={isLoadingGames} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainGroup: {
    height: "100%",
    flexDirection: "column",
  },
});
