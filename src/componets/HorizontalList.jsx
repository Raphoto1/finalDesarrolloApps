//Imports app
import { StyleSheet, Text, View, Pressable, Button, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//Imports propios
import Bubble from "./Bubble";
import { colors } from "../constants/colors";
import gamesFull from "../data/gamesFull.json";

const HorizontalList = ({ title, navigation, gridList, listToShow, bubbleNavigationTarget, isLoadingIn }) => {
  const [isLoading, setIsLoading] = useState(isLoadingIn);
  const [dataReady, setDataReady] = useState([]);
  const [emptyData, setEmptyData] = useState(false);
  useEffect(() => {
    showData(listToShow);
  }, [dataReady, listToShow]);
//https://stackoverflow.com/questions/49826920/how-to-navigate-between-different-nested-stacks-in-react-navigation
  const showData = async (listToShow) => {
    setIsLoading(true);
    const dataPreloading = await listToShow;
    dataPreloading ? setEmptyData(false) : setEmptyData(true);
    setIsLoading(false);
    setDataReady(dataPreloading);
  };
  
  return (
    <View style={styles.listGroup}>
      <View style={styles.titleContainer}>
        <Text style={styles.listTitle}>{`${title}`}</Text>
        {gridList ? (
          <Pressable
            style={styles.checkAll}
            onPress={() => {
              navigation.navigate(`${gridList}`);
            }}
            navigation={navigation}>
            <Text>{`Check all ${title}`}</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={dataReady}
          horizontal={true}
          ListEmptyComponent={isLoading ? <Text>Loading...</Text> : <Text>{`No ${title} to Show`}</Text>}
          ListFooterComponent={emptyData ? null : <Bubble text={`No More Data`} />}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <Bubble
              text={item.name}
              thumbnail={item.background_image}
              bubblePress={bubbleNavigationTarget ? () => navigation.navigate(`${bubbleNavigationTarget}`, item.name) : ()=>navigation.navigate('SessionStack',{screen:'CreateSession',params:{gameId:item.id}})}
            />
          )}
        />
      </View>
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  checkAll: {
    alignContent: "center",
    justifyContent: "center",
  },
  listGroup: {
    paddingTop: 10,
    borderColor: colors.gray,
    borderTopWidth: 5,
  },
  listTitle: {
    padding: 10,
    borderRadius: 10,
    fontFamily: "LatoRegular",
    fontSize: 24,
    color: colors.gray,
    backgroundColor: colors.darkBlue,
  },
  listContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
