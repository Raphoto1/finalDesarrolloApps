//imports de app
import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
//imports propios
import GridList from "../componets/GridList";
import genresClear from "../data/genresClear.json";
import { colors } from "../constants/colors";
import { useGetGenreQuery } from "../services/gamesService";


const GenreList = ({ route, navigation }) => {
  const { data: genres, isLoading, error } = useGetGenreQuery();
  return (
    <View>
      <View style={styles.titleContainer}>
        <Button
          title='Back'
          onPress={() => {
            navigation.goBack();
          }}></Button>
      </View>
      <GridList
        listToShow={genres}
        navigation={navigation}
        bubbleFunct={() => {
          navigation.navigate("GameListGenre", `${item.name}`);
        }}
        targetRedirectBubble={"GameListGenre"}
        isLoadingIn={isLoading}
      />
    </View>
  );
};

export default GenreList;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    fontFamily: "LatoRegular",
    fontSize: 24,
    color: colors.gray,
    backgroundColor: colors.darkBlue,
  },
  titleContainer: {
    padding: 10,
    justifyContent: "center",
  },
});
