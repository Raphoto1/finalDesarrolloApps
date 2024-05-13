//imports de app
import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
//imports Propios
import { colors } from "../constants/colors";
import InputForm from "../componets/InputForm";
import SubmitButton from "../componets/SubmitButton";
const SignupScreen = ({ navigation }) => {
  const onSubmit = () => {};
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>
        <InputForm label={"Email"} onChange={() => {}} error={""} />
        <InputForm
          label={"Password"}
          onChange={() => {}}
          error={""}
          isSecure={true}
        />
        <InputForm
          label={"Confirm Password"}
          onChange={() => {}}
          error={""}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Signup" />
        <Text style={styles.sub}>Already GameCalling?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Lato",
  },
  sub: {
    fontSize: 14,
    fontFamily: "Lato",
    color: "black",
  },
  subLink: {
    fontSize: 14,
    fontFamily: "Lato",
    color: "blue",
  },
});
