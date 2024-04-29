import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React from "react";
import { useState } from "react";
import { colors } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount, reset } from "../features/counter/counterSlice";

const PlayersCounter = () => {
  const [inputToAdd, setInputToAdd] = useState();
  const count = useSelector((state) => state.counterReducer.value);
  const dispatch = useDispatch();

  const confirmAdd = () => {
    dispatch(incrementByAmount(inputToAdd));
  };
  return (
    <View style={styles.playerCounter}>
      <View style={styles.title}>
        <Text>How Many Players?</Text>
      </View>
      <View style={styles.containerCounter}>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={() => dispatch(decrement())}>
            <Text style={styles.btnText}>-</Text>
          </Pressable>
          <Text style={styles.number}>{count}</Text>
          <Pressable style={styles.btn} onPress={() => dispatch(increment())}>
            <Text style={styles.btnText}>+</Text>
          </Pressable>
        </View>
        <View style={styles.btnContainer}>
          <TextInput style={styles.number} value={inputToAdd} onChangeText={(text) => setInputToAdd(Number(text))} placeholder='Add Specific Number' />
          <Pressable style={styles.btn} onPress={confirmAdd}>
            <Text style={styles.btnText}>Add Players</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={()=>dispatch(reset())}>
            <Text style={styles.btnText}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PlayersCounter;

const styles = StyleSheet.create({
  playerCounter: {
    height: "100%",
  },
  containerCounter: {
    height: "10%",
    width: "100%",
    backgroundColor: colors.lightBlue,
  },
  btnContainer: {
    borderColor: colors.alertColor,
    borderWidth: 1,
    flexDirection: "row",
    height: "50%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btn: {
    backgroundColor: colors.darkBlue,
    width: "30%",
    height: "80%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Jersey_25",
    color: "white",
  },
  number: {
    width: "30%",
    height: "80%",
    backgroundColor: colors.white,
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Jersey_25",
  },
});
