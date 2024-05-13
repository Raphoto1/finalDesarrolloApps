//imports de app
import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
//imports Propios
import { colors } from "../constants/colors";
import InputForm from "../componets/InputForm";
import SubmitButton from "../componets/SubmitButton";
import { useSignUpMutation } from "../services/authService";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [triggerSignup, result] = useSignUpMutation();
  console.log(result);
  const onSubmit = () => {
    triggerSignup({
      email,
      password,
    });
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>
        <InputForm label={"Email"} onChange={setEmail} error={""} isSecure={false} />
        <InputForm label={"Password"} onChange={setPassword} error={""} isSecure={true} />
        <InputForm label={"Confirm Password"} onChange={setConfirmPassword} error={""} isSecure={true} />
        <SubmitButton onPress={onSubmit} title='Signup' />
        <Text style={styles.sub}>Already GameCalling?</Text>
        <Pressable onPress={() => navigation.navigate("LoginScreen")}>
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
    fontFamily: "LatoRegular",
  },
  sub: {
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "black",
  },
  subLink: {
    fontSize: 14,
    fontFamily: "LatoRegular",
    color: "blue",
  },
});
