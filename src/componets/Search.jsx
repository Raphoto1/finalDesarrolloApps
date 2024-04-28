import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Search...' value={keyword} onChangeText={setKeyword} />
      </View>
      <Pressable>
        <AntDesign name='search1' size={24} color='black' />
      </Pressable>
      <Pressable>
        <MaterialIcons name='search-off' size={24} color='gray' />
      </Pressable>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        width:'95%',
        backgroundColor: colors.gray,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    inputContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'start',
        height:50,
        width: '80%',
      },
});
