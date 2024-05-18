//imports de app
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
//imports propios
import Bubble from "../componets/Bubble";
import { randomProfilePics } from "../constants/randomPics";
import ButtonBlue from "../componets/ButtonBlue";
import { useGetProfileImageQuery } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { truncateSessionTable } from "../db";
import { clearUser } from "../features/User/UserSlice";

const MyProfileScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { imageCamera, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);
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
  }

  return (
    <>
      <View style={styles.container}>
        {imageFromBase ? <Bubble thumbnail={imageFromBase?.image || imageCamera} /> : <Bubble localImage={randomProfilePics[1]} />}
        <ButtonBlue title={imageFromBase ? "Update Pic" : "Add ProfilePic"} onPress={launchCamera} />
        <ButtonBlue title={'LogOut'} onPress={logOut}/>
      </View>
    </>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
