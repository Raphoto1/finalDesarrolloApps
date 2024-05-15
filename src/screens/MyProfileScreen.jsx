//imports de app
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
//imports propios
import Bubble from "../componets/Bubble";
import { randomProfilePics } from "../constants/randomPics";
import ButtonBlue from "../componets/ButtonBlue";
import { useGetProfileImageQuery } from "../services/userService";
import { useSelector } from "react-redux";

const MyProfileScreen = ({ route, navigation }) => {
  const { imageCamera, localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileImageQuery(localId);
  const launchCamera = async () => {
    navigation.navigate("ImageSelector");
  };

  return (
    <>
      <View style={styles.container}>
        {imageFromBase ? <Bubble thumbnail={imageFromBase?.image || imageCamera} /> : <Bubble localImage={randomProfilePics[1]} />}
        <ButtonBlue title={imageFromBase?"Update Pic":"Add ProfilePic"} onPress={launchCamera} />
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
