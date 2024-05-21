import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

import { colors } from "../constants/colors";

const InputForm = ({ label, onChange, error = "", isSecure = false, prevInfo }) => {
  const [input, setInput] = useState("");
  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };

 
  useEffect(() => {
    if (prevInfo) {
      setInput(prevInfo)
    }   
  },[prevInfo])
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.subtitle}>{label}</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}

      />
      {error?
      <Text style={styles.error}>{error}</Text>:null
    }
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    subtitle: {
        width: '90%',
        fontSize: 16,
        fontFamily: 'LatoRegular'
    },
    error: {
        paddintTop: 2,
        fontSize: 16,
        color: 'red',
        fontFamily: 'LatoRegular',
    },
    input: {
        width: '90%',
        borderWidth: 0,
        borderBottomWidth: 3,
        borderBottomColor: colors.white,
        padding: 2,
        fontFamily: 'LatoRegular',
        fontSize: 14,
    }
});
