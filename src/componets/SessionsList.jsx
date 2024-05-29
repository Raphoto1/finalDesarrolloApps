import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import SessionCard from "./SessionCard";
import { useGetGameSessionByIdQuery } from "../services/gameSessionService";
import { useSelector } from "react-redux";
const SessionsList = () => {
  const { localId } = useSelector((state) => state.auth.value);
  const { data: gameSessions } = useGetGameSessionByIdQuery(localId);
  console.log(gameSessions?.gameSession);
  return (
    <View>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={gameSessions?.gameSession}
          numColumns={1}
          ListEmptyComponent={<Text>No sessions schechuled</Text>}
          renderItem={( item ) => <SessionCard gameId={item.item.gameId} date={item.item.date} players={item.item.fId} index={item.index} />}
        />
      </View>
    </View>
  );
};

export default SessionsList;

const styles = StyleSheet.create({
  listContainer: {

    width: "100%",
    height: "100%",
    paddingTop: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  list: {
    height: "100%",
    width: "90%",

  },
});
