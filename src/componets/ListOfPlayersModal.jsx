import { StyleSheet, Text, View, Modal, Switch } from "react-native";
import React, { useEffect, useState } from "react";

import { colors } from "../constants/colors";
import ButtonBlue from "./ButtonBlue";
import ButtonRed from "./ButtonRed";
import BubblePlayer from "./BubblePlayer";
import GridOfPlayersModal from "./GridOfPlayersModal";
import { useGetFavoriteFriendsQuery } from "../services/userService";
import { useSelector } from "react-redux";

const ListOfPlayersModal = ({ modalVisibleIn, handleModal = () => {}, submitModal = () => {}, setModalVisible }) => {
  const [friends, setFriends] = useState(false);
  const [enableSwitch, setEnableSwitch] = useState(false);
  //revisar data de db
  const { localId } = useSelector((state) => state.auth.value);
  const { data: favFriendCloud, isLoading, error: errorFF } = useGetFavoriteFriendsQuery(localId);

  const switchHandle = () => {
    setFriends(!friends);
  };

  const handleConfirm = () => {
    setModalVisible(!modalVisibleIn);
  };

  useEffect(() => {}, [handleModal]);
  return (
    <View style={styles.modalGeneral}>
      <View style={styles.modGroup}>
        <Modal style={styles.modal} visible={modalVisibleIn} animationType='slide' transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInfo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Select a Friend Above</Text>
              </View>
              <View>
                <View style={styles.switchGroup}>
                  <Text>Show Friends?</Text>
                  <Switch
                    value={friends}
                    onChange={switchHandle}
                    trackColor={{ false: colors.grayDark, true: colors.lightBlue }}
                    thumbColor={friends ? `${colors.blue}` : `${colors.gray}`}
                    disabled={enableSwitch}
                  />
                </View>

                <GridOfPlayersModal group={friends} />
              </View>
              <View>
                <ButtonBlue title={"Confirm"} onPress={handleConfirm} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ListOfPlayersModal;

const styles = StyleSheet.create({
  switchGroup: {
    width: "100%",
  },
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
