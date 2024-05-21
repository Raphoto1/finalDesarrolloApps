//imports de app
import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import Bubble from "../componets/Bubble";
import { randomProfilePics } from "../constants/randomPics";
import ButtonBlue from "../componets/ButtonBlue";
import { useGetProfileImageQuery, useGetProfileInfoQuery } from "../services/userService";
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
  const [userData, setUserData] = useState({});

  const launchCamera = async () => {
    navigation.navigate("ImageSelector");
  };

  const logOut = async () => {
    try {
      const response = await truncateSessionTable();
      console.log(response);
      dispatch(clearUser());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      console.log(userInfo);

    })();
  }, [profileInfoCloud]);
  return (
    <>
      <View style={styles.container}>
        {imageFromBase ? (
          <Bubble thumbnail={imageFromBase?.image || imageCamera} text={profileInfoCloud?.userName || "No UserName"} />
        ) : (
          <Bubble localImage={randomProfilePics[1]} text={profileInfoCloud?.userName || "No UserName"} />
        )}
        <ButtonBlue title={imageFromBase ? "Update Pic" : "Add ProfilePic"} onPress={launchCamera} />
        <ButtonBlue title={"LogOut"} onPress={logOut} />
        <Text style={styles.title}>Registered User Names</Text>
        <View style={styles.platformsList}>
          {profileInfoCloud?.playStation ? <Bubble text={profileInfoCloud.playStation} /> : <Bubble text={"No PlayStation User"} />}
          {profileInfoCloud?.xbox ? <Bubble text={profileInfoCloud.xbox} /> : <Bubble text={"No Xbox User"} />}
          {profileInfoCloud?.steam ? <Bubble text={profileInfoCloud.steam} /> : <Bubble text={"No Steam User"} />}
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
  },
});
