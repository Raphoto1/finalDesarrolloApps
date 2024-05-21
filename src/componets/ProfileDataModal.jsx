//imports de app
import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import ButtonBlue from "./ButtonBlue";
import ButtonRed from "./ButtonRed";
import { colors } from "../constants/colors";
import InputForm from "./InputForm";
import { setUserInfo } from "../features/User/UserSlice";
import { useGetProfileInfoQuery, usePostProfileInfoMutation } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";

const ProfileDataModal = () => {
  //info del modal
  const [userName, setUserName] = useState("");
  const [playStation, setPlayStation] = useState("");
  const [xbox, setXbox] = useState("");
  const [steam, setSteam] = useState("");
  //traer info del user
  const dispatch = useDispatch();
  const { localId, userInfo } = useSelector((state) => state.auth.value);
  const { data: userInfoCloud } = useGetProfileInfoQuery(localId);

  //enviar iinfo del user
  const [triggerUploadInfo, result] = usePostProfileInfoMutation();
  //control modal
  const [modalVisible, setModalVisible] = useState(false);
  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  const submitModal = async () => {
    await triggerUploadInfo({ data: { userName: userName, playStation: playStation, xbox: xbox, steam: steam }, localId });
    dispatch(
      setUserInfo({
        userInfo: userInfoCloud,
      })
    );
    setModalVisible(!modalVisible);
    Alert.alert("Info Submiited", "Information Submited Succesfully", [
      {
        text: "Ok",
      },
    ]);
  };
  useEffect(() => {
    if (userInfoCloud) {
      setUserName(userInfoCloud.userName);
      setPlayStation(userInfoCloud.playStation);
      setXbox(userInfoCloud.xbox);
      setSteam(userInfoCloud.steam);
    }
  }, [userInfoCloud]);

  return (
    <View style={styles.modalGeneral}>
      <View style={styles.button}>
        <ButtonBlue title={"Add More Info"} onPress={handleModal} />
      </View>

      <View style={styles.modGroup}>
        <Modal style={styles.modal} visible={modalVisible} animationType='slide' transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalInfo}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Your Gamming Tags</Text>
              </View>
              <InputForm label={"User Name"} onChange={setUserName} prevInfo={userName} />
              <InputForm label={"PlayStation Id"} onChange={setPlayStation} prevInfo={playStation} />
              <InputForm label={"Xbox Gamertag"} onChange={setXbox} prevInfo={xbox} />
              <InputForm label={"Steam User"} onChange={setSteam} prevInfo={steam} />
              <View style={styles.buttonsConatiner}>
                <ButtonBlue style={styles.buttonModal} title={"Submit"} onPress={submitModal} />
                <ButtonRed style={styles.buttonModal} title={"Cancel Update"} onPress={handleModal} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ProfileDataModal;

const styles = StyleSheet.create({
  modalGeneral: {
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
  },
});
