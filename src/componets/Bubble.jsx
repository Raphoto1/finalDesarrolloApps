import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { colors } from "../constants/colors";

const Bubble = ({ thumbnail, text, color, bubblePress = () => {}, navigation }) => {
  return (
    <View>
      <Pressable
        onPress={bubblePress}
        navigation={navigation}>
        <View style={styles.bubbleContainer}>
          <Image resizeMode='cover' style={styles.bubbleImage} source={{ uri: `${thumbnail}` }} />
          <Text style={styles.bubbleText}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  bubbleContainer: {
    paddingHorizontal: 10,
    borderBlockColor: "red",
  },
  bubbleImage: {
    // display:'none',
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: colors.lightBlue,
    borderWidth: 3,
  },
  bubbleText: {
    color: "black",
    width: 100,
    textAlign: "center",
  },
});
