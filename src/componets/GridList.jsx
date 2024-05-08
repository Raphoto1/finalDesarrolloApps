//imports de app
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import Bubble from "./Bubble";
import Search from "./Search";
import { colors } from "../constants/colors";

const GridList = ({ listToShow, specialFilter, navigation, bubbleFunct=()=>{}, targetRedirectBubble }) => {
  const [searchWord, setSearchWord] = useState("");
  const [extraFilter, setExtraFilter] = useState("");
  const [gamesFiltered, setGamesFiltered] = useState(listToShow);
  const [error, setError] = useState("");

  useEffect(() => {
    if (specialFilter) {
      setExtraFilter(specialFilter);
      const gamesPrefilter = listToShow.filter((game) => game.genres[0].name.toLocaleLowerCase().includes(extraFilter.toLocaleLowerCase()));
      const gamesFilter = gamesPrefilter.filter((game) => game.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()));
      setGamesFiltered(gamesFilter);
    } else {
      const gamesFilter = listToShow.filter((game) => game.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()));
      setGamesFiltered(gamesFilter);
    }
  }, [searchWord,extraFilter]);

  return (
    <View style={styles.gridContainer}>
      <View style={styles.searchContainer}>
        <Search error={error} onSearch={setSearchWord} handleClear={() => setGamesFiltered(listToShow)} />
      </View>
      <View style={styles.gridGroup}>
        <FlatList
          data={gamesFiltered}
          numColumns={3}
          initialNumToRender={30}
          renderItem={({ item }) => <Bubble text={item.name} thumbnail={item.background_image} navigation={navigation} bubblePress={() => { navigation.navigate(`${targetRedirectBubble}`,`${item.name}`) }} />}
        />
      </View>
    </View>
  );
};

export default GridList;

const styles = StyleSheet.create({
  gridContainer: {
    height:'100%',
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  searchContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  gridGroup: {
    paddingTop: 10,
    paddingBottom:280,
    justifyContent: "center",
    alignItems: "center",
  },
});
