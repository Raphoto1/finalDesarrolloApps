import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useEffect, useState } from "react";

import { colors } from "../constants/colors";
import ButtonBlue from "../componets/ButtonBlue";
import ButtonRed from "../componets/ButtonRed";
import BubblePlayer from "./BubblePlayer";
import { useGetFavoriteFriendsQuery, usePostFavoriteFriendsMutation } from "../services/userService";
import { useSelector } from "react-redux";

const FavoriteFriendModal = ({ modalVisibleIn, localIdIn, handleModal = () => {}, submitModal = () => {},setModalVisible } ) => {
  const [userSelected, setUserSelected] = useState(localIdIn);
  const [dataAvailable, setDataAvailable] = useState(null);
  const [addF, setAddF] = useState(true);
  //revisar data de db
  const { localId } = useSelector((state) => state.auth.value);
  const { data: favFriendCloud, isLoading, error: errorFF } = useGetFavoriteFriendsQuery(localId);
  const [triggerPostFavFriend, result] = usePostFavoriteFriendsMutation();

  const chkAddDel = () => {
    const chkFriend = dataAvailable?.fId?.find((item) => item === localIdIn);
    if (chkFriend) {
      setAddF(false);
    }
  };

  const handleSubmit = () => {
    if (dataAvailable === null) {
      const pack = [userSelected];
      triggerPostFavFriend({ data: { friendsId: pack }, localId: localId });
      setModalVisible(!modalVisibleIn);
    } else {
      const chkFriend = favFriendCloud.fId?.find((item) => item === localIdIn);
      if (chkFriend) {
        let pack = dataAvailable.fId;
        let eraseIndex = pack?.indexOf(localIdIn);
        const erased = pack.filter((item) => item !== localIdIn);
        triggerPostFavFriend({ data: { friendsId: erased }, localId: localId });
        setModalVisible(!modalVisibleIn);
      } else {
        const pack = favFriendCloud.fId;
        const friends = [...pack, userSelected];
        triggerPostFavFriend({ data: { friendsId: friends }, localId: localId });
        setModalVisible(!modalVisibleIn);
      }
    }
  };

  useEffect(() => {
    setAddF(true);
    setUserSelected(localIdIn);
    setDataAvailable(favFriendCloud);
    chkAddDel();
  }, [modalVisibleIn, handleSubmit]);
  return (
    <View style={styles.modalGeneral}>
      <View style={styles.modGroup}>
        <Modal style={styles.modal} visible={modalVisibleIn} animationType='slide' transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInfo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Add to Friends</Text>
                <Text>{userSelected}</Text>
              </View>
              <BubblePlayer localId={userSelected} findMe={true} />
              <View style={styles.buttonsConatiner}>
                {addF ? (
                  <ButtonBlue style={styles.buttonModal} title={"AddFriend"} onPress={handleSubmit} />
                ) : (
                  <ButtonRed style={styles.buttonModal} title={"DeleteFrien"} onPress={handleSubmit} />
                )}

                <ButtonRed style={styles.buttonModal} title={"Cancel"} onPress={handleModal} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default FavoriteFriendModal;

const styles = StyleSheet.create({
  modalGeneral: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: "100%",
    paddingTop: 45,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modGroup: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  modalInfo: {
    width: "80%",
    height: "auto",
    paddingVertical: 30,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray,
    borderRadius: 30,
  },
  buttonsConatiner: {
    width: "80%",
    paddingTop: 20,
    gap: 100,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  titleContainer: {
    paddingBottom: 10,
  },
  title: {
    padding: 10,
    borderRadius: 10,
    fontFamily: "LatoRegular",
    fontSize: 24,
    color: colors.gray,
    backgroundColor: colors.darkBlue,
    lineHeight: 24,
  },
});
