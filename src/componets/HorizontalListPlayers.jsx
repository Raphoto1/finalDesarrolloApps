//Imports app
import { StyleSheet, Text, View, Pressable, Button, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
//Imports propios
import BubblePlayer from "./BubblePlayer";
import FavoriteFriendModal from "./FavoriteFriendModal";
import Bubble from "./Bubble";
import { colors } from "../constants/colors";
import { useGetFavoriteFriendsQuery, usePostFavoriteFriendsMutation, useGetUsersListQuery } from "../services/userService";
import { useSelector } from "react-redux";

const HorizontalListPlayers = ({ title, navigation, gridList, listToShow, bubbleNavigationTarget, isLoadingIn }) => {
  const [isLoading, setIsLoading] = useState(isLoadingIn);
  const [dataReady, setDataReady] = useState([]);
  const [emptyData, setEmptyData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const { localId, userInfo } = useSelector((state) => state.auth.value);
  const [triggerPostFavoriteFriends, result] = usePostFavoriteFriendsMutation();
  // const { data: favFriends, error } = useGetFavoriteFriendsQuery(localId);
  const { data: allowList } = useGetUsersListQuery();
  useEffect(() => {
    showData(listToShow);
  }, [dataReady, listToShow, selectedUser, allowList]);

  const showData = async (listToShow) => {
    setIsLoading(true);
    const dataPreloading = await listToShow;
    dataPreloading ? setEmptyData(false) : setEmptyData(true);
    setIsLoading(false);
    setDataReady(dataPreloading);
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <FavoriteFriendModal
        modalVisibleIn={modalVisible}
        handleModal={handleModal}
        localIdIn={selectedUser}
        setModalVisible={setModalVisible}
      />

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
              <BubblePlayer
                findMe={item.findMe}
                localId={item.localId}
                bubblePress={() => {
                  setModalVisible(!modalVisible);
                  setSelectedUser(item.localId);
                }}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default HorizontalListPlayers;

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
