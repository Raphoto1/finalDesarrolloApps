//imports de app
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
//imports propios
import { colors } from "../constants/colors";

const Search = ({onSearch=()=>{}, error="", }) => {
  const [searchWord, setSearchWord] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Search...' value={searchWord} onChangeText={setSearchWord} />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable onPress={onSearch(searchWord)}>
        <AntDesign name='search1' size={24} color='black' />
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
