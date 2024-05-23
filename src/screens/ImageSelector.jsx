//imports de app
import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
//imports propios
import ButtonBlue from "../componets/ButtonBlue";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/UserSlice";
import { colors } from "../constants/colors";
import { useGetProfileImageQuery, usePostProfileImageMutation } from "../services/userService";
import Bubble from "../componets/Bubble";

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { localId, imageCamera } = useSelector((state) => state.auth.value);
  const { data: imageFromBase, error, isLoading } = useGetProfileImageQuery(localId);
  const [triggerSaveProfileImage, result] = usePostProfileImageMutation();

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions();
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.2,
      });
      if (!result.canceled) {
        const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImage(image);
      }
    }
  };
  const confirmImage = () => {
    dispatch(setCameraImage(image));
    triggerSaveProfileImage({ image, localId });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {image ? (
        <>
          <Image source={{ uri: image||imageFromBase?.image }} style={styles.image} />
          <ButtonBlue title={"Take AnotherPhoto"} onPress={pickImage} />
          <ButtonBlue title={"Confirm Photo"} onPress={confirmImage} />
        </>
      ) : (
        <>
          <View style={styles.noPhotoContainer}>
            <Text>No Photo To Show...</Text>
          </View>
          <ButtonBlue title={"Take a photo"} onPress={pickImage} />
        </>
      )}
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  noPhotoContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.gray,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
