//imports de app
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import Bubble from "./Bubble";
import Search from "./Search";
import { colors } from "../constants/colors";

const GridList = ({
  listToShow,
  specialFilter,
  navigation,
  bubbleFunct,
  targetRedirectBubble,
  isLoadingIn,
}) => {
  const [searchWord, setSearchWord] = useState("");
  const [extraFilter, setExtraFilter] = useState("");
  const [dataEmpty, setDataEmpty] = useState(false);
  const [gamesFiltered, setGamesFiltered] = useState(listToShow);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(isLoadingIn);

const bubbleFunctionManager =(bubbleFunct)=>{
if (bubbleFunct) {
  console.log("llega funcion");
} else {
  console.log("se dispara funcion directa");
}
}

  const showData = async (specialFilter, listToShow) => {
    setIsLoading(true);
    if (specialFilter) {
      setExtraFilter(specialFilter);
      const gamesPrefilter = await listToShow.filter((game) =>
        game.genres[0].name
          .toLocaleLowerCase()
          .includes(extraFilter.toLocaleLowerCase())
      );
      const gamesFilter = await gamesPrefilter.filter((game) =>
        game.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
      );
      gamesFilter ? setDataEmpty(false) : setDataEmpty(true);

      setIsLoading(false);
      setGamesFiltered(gamesFilter);
    } else {
      const gamesFilter = await listToShow.filter((game) =>
        game.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
      );
      gamesFilter ? setDataEmpty(false) : setDataEmpty(true);
      setIsLoading(false);
      setGamesFiltered(gamesFilter);
    }
  };

  useEffect(() => {
    showData(specialFilter, listToShow);
  }, [searchWord, extraFilter, listToShow]);

  return (
    <View style={styles.gridContainer}>
      <View style={styles.searchContainer}>
        <Search
          error={error}
          onSearch={setSearchWord}
          handleClear={() => setGamesFiltered(listToShow)}
        />
      </View>
      <View style={styles.gridGroup}>
        <FlatList
          data={gamesFiltered}
          numColumns={3}
          initialNumToRender={30}
          ListEmptyComponent={
            isLoading ? <Text>Loading...</Text> : <Text>No Results</Text>
          }
          ListFooterComponent={
            dataEmpty ? null : <Bubble text={`No More Data`} />
          }
          renderItem={({ item }) => (
            <Bubble
              text={item.name}
              thumbnail={item.background_image}
              navigation={navigation}
              bubblePress={() => {
                navigation.navigate(`${targetRedirectBubble}`, `${item.name}`);
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default GridList;

const styles = StyleSheet.create({
  gridContainer: {
    height: "100%",
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
    paddingBottom: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
