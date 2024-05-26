//imports de app
import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import Bubble from "../componets/Bubble";
import { randomProfilePics } from "../constants/randomPics";
import ButtonBlue from "../componets/ButtonBlue";
import ButtonRed from "../componets/ButtonRed";
import {
  useGetProfileImageQuery,
  useGetProfileInfoQuery,
  useGetUsersListByIdQuery,
  useGetUsersListQuery,
  usePostProfileInfoMutation,
  usePostUsersListMutation,
} from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { truncateSessionTable } from "../db";
import { clearUser } from "../features/User/UserSlice";
import ProfileDataModal from "../componets/ProfileDataModal";
import { colors } from "../constants/colors";

const MyProfileScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { imageCamera, localId, userInfo } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);
  const { data: profileInfoCloud, error, isLoading } = useGetProfileInfoQuery(localId);
  const { data: globalFindMe } = useGetUsersListByIdQuery(localId);
  const [triggerUploadInfoFind, result] = usePostProfileInfoMutation(localId);
  const [triggerPostUsersList] = usePostUsersListMutation();
  const [userId, setUserId] = useState(localId);
  const [allowFindMe, setAllowFindme] = useState(profileInfoCloud.findMe);
  const launchCamera = async () => {
    navigation.navigate("ImageSelector");
  };

  const logOut = async () => {
    try {
      const response = await truncateSessionTable();
      dispatch(clearUser());
    } catch (error) {
      Alert.alert("Error on Logout", "try again", [
        {
          text: "Ok",
        },
      ]);
    }
  };

  const findMe = async () => {
    setAllowFindme(!allowFindMe);
    //ajuste global
    const globalRes = await triggerPostUsersList({
      data: {
        localId: localId,
        findMe: allowFindMe,
      },
    });
    //ajuste local
    const response = await triggerUploadInfoFind({
      data: {
        ...profileInfoCloud,
        findMe: allowFindMe,
      },
      localId,
    });
    Alert.alert("FindMe changed", "FindMe Changed Succesfully", [
      {
        text: "Ok",
      },
    ]);
  };

  useEffect(() => {

  }, [profileInfoCloud,globalFindMe]);

  return (
    <>
      <View style={styles.container}>
        {imageFromBase ? (
          <Bubble thumbnail={imageFromBase?.image || imageCamera} text={profileInfoCloud?.userName || "No UserName"} />
        ) : (
          <Bubble localImage={randomProfilePics[Math.floor(Math.random() * 13)]} text={profileInfoCloud?.userName || "No UserName"} />
        )}
        <ButtonBlue title={imageFromBase ? "Update Pic" : "Add ProfilePic"} onPress={launchCamera} />
        <ButtonBlue title={"LogOut"} onPress={logOut} />
        {!allowFindMe ? <ButtonBlue title={"Allow FindMe"} onPress={findMe} /> : <ButtonRed title={"Disable FindMe"} onPress={findMe} />}

        <Text style={styles.title}>Registered User Names</Text>
        <View style={styles.platformsList}>
          {profileInfoCloud?.playStation ? <Bubble text={profileInfoCloud.playStation} thumbnail={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png'}/> : <Bubble text={"No PlayStation User"} thumbnail={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png'}/>}
          {profileInfoCloud?.xbox ? <Bubble text={profileInfoCloud.xbox} thumbnail={'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png'}/> : <Bubble text={"No Xbox User"} thumbnail={'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/2048px-Xbox_one_logo.svg.png'}/>}
          {profileInfoCloud?.steam ? <Bubble text={profileInfoCloud.steam} thumbnail={'https://upload.wikimedia.org/wikipedia/commons/c/c1/Steam_Logo.png'}/> : <Bubble text={"No Steam User"} thumbnail={'https://upload.wikimedia.org/wikipedia/commons/c/c1/Steam_Logo.png'}/>}
        </View>
        <ProfileDataModal />
      </View>
    </>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  platformsList: {
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontFamily: "LatoBold",
    lineHeight: 24,
  },
});
