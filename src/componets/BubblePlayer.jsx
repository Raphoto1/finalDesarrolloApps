//imports de app
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import { colors } from "../constants/colors";
import { useGetProfileImageQuery, useGetProfileInfoQuery } from "../services/userService";
import { randomProfilePics } from "../constants/randomPics";


const BubblePlayer = ({ bubblePress = () => { }, navigation, localId, findMe }) => {
  //traer data del player, photo, name, findMe
  const { data: playerInfo, isLoadingPlayerInfo: isLoading, errorPlayerInfo: error } = useGetProfileInfoQuery(localId);
  const { data: playerPhoto } = useGetProfileImageQuery(localId);
  return (
    !findMe ? null : <View>
    <Pressable onPress={bubblePress} navigation={navigation}>
      <View style={styles.bubbleContainer}>
        {!playerPhoto?.image ? (
          <Image resizeMode='cover' style={styles.bubbleImage} source={randomProfilePics[Math.floor(Math.random() * 13)]} />
        ) : (
          <Image resizeMode='cover' style={styles.bubbleImage} source={{ uri: `${playerPhoto?.image}` }} />
        )}
        {playerInfo?.userName ? <Text style={styles.bubbleText}>{playerInfo?.userName}</Text> : <Text style={styles.bubbleText}>No Name registered</Text>}
      </View>
    </Pressable>
  </View>
    
  );
};

export default BubblePlayer;

const styles = StyleSheet.create({
  bubbleContainer: {
    paddingHorizontal: 10,
    borderBlockColor: "red",
  },
  bubbleImage: {
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
