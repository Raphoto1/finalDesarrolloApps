import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../constants/colors";

const Bubble = ({ thumbnail, text, color }) => {
  return (
    <View>
      <View style={styles.bubbleContainer}>
        <Image
          resizeMode='cover'
          style={styles.bubbleImage}
          source={{ uri: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" }}></Image>
        <Text style={styles.bubbleText}>Bubbble long text extra long</Text>
      </View>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  bubbleContainer: {
    paddingHorizontal: 10,
    borderBlockColor: 'red',
    
  },
  bubbleImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: colors.lightBlue,
    borderWidth:3
  },
  bubbleText: {
    width:100,
    textAlign:'center'
  }
});
