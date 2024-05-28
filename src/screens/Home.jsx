//imports de app
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import HorizontalList from "../componets/HorizontalList";
import HorizontalListPlayers from "../componets/HorizontalListPlayers";
import { colors } from "../constants/colors";
import { useGetGamesQuery, useGetGenreQuery } from "../services/gamesService";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetFavoriteFriendsQuery,
  useGetProfileImageQuery,
  useGetProfileInfoQuery,
  useGetUsersListQuery,
  usePostProfileInfoMutation,
} from "../services/userService";
import { setCameraImage, setUserInfo } from "../features/User/UserSlice";

const Home = ({ route, navigation }) => {
  const [favFriends, setFavFriends] = useState([]);
  const dispatch = useDispatch();
  //General data
  const { data: allGames, isLoading: isLoadingGames, error: errorGames } = useGetGamesQuery();
  const { data: allGenres, isLoading: isLoadingGenre, error: errorGenres } = useGetGenreQuery();
  const { data: playersAvailable, isLoading: isLoadingPlayers, error: errorPlayers } = useGetUsersListQuery();
  //user Data
  const { localId, userInfo } = useSelector((state) => state.auth.value);
  const { data: userInfoCloud } = useGetProfileInfoQuery(localId);
  const { data: userFriends, isLoading: isLoadingFriends } = useGetFavoriteFriendsQuery(localId);
  //user favorites reOrganize
  const favs = async () => {
    const reOrganize = await userFriends.fId.map((item) => {
      return { localId: item, findMe: true };
    });
    setFavFriends(reOrganize);
  };

  useEffect(() => {
    favs();
    if (!userInfo) {
      dispatch(setUserInfo({ userInfo: userInfoCloud }));
    }
  }, [userInfo, userInfoCloud]);

  return (
    <View>
      <Text>Gamming Panas HOME puede ir un call del favorito</Text>

      <ScrollView style={styles.scrollView}>
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
          <HorizontalListPlayers title={"Players Available"} navigation={navigation} listToShow={playersAvailable} isLoadingIn={isLoadingPlayers} />
          <HorizontalListPlayers title={"Friends"} navigation={navigation} listToShow={favFriends} isLoadingIn={isLoadingFriends} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 100,
    height: "97%",
  },
  mainGroup: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
});
