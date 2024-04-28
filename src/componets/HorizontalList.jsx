//Imports app
import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import React from "react";
//Imports propios
import Bubble from "./Bubble";
import { colors } from "../constants/colors";

const HorizontalList = ({ title, navigation, gridList }) => {

  return (
    <View style={styles.listGroup}>
      <View style={styles.titleContainer}>
        <Text style={styles.listTitle}>{`${title}`}</Text>
        <Pressable style={styles.checkAll} onPress={()=>{navigation.navigate(`${gridList}`)}} navigation={navigation}>
          <Text>{`Check all ${title}`}</Text>
        </Pressable>
      </View>
      <View style={styles.listContainer}>
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble />
      </View>
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  checkAll: {
    alignContent: 'center',
    justifyContent:'center'
  },
  listGroup: {
    paddingTop:10,
    borderColor: colors.gray,
    borderTopWidth: 5,
  },
  listTitle: {
    padding: 10,
    borderRadius:10,
    fontFamily: "LatoRegular",
    fontSize: 24,
    color:colors.gray,
    backgroundColor:colors.darkBlue
  },
  listContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
