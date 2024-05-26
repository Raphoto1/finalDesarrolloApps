import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const GamePreview = ({gameInfo}) => {
  return (
    <View>
      <Text style={styles.title}>Let's Play {gameInfo?.name}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.gameImage} resizeMode='cover' source={{ uri: `${gameInfo?.background_image}` }} />
      </View>
    </View>
  );
};

export default GamePreview;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "LatoBold",
  },
  imageContainer: {
    height: 200,
    width: "100%",
  },
  gameImage: {
    height: "100%",
    width: "100%",
  },
});
