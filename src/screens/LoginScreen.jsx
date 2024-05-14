//imports de app
import { StyleSheet, Text, View, Input, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
//imports propios
import { colors } from "../constants/colors";
import InputForm from "../componets/InputForm";
import SubmitButton from "../componets/SubmitButton";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/authService";
import { setUser } from "../features/User/UserSlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerLogin, result] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    triggerLogin({ email, password });
  };

  useEffect(() => {
    if (result.isSuccess) {
      console.log(result);
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
        })
      );
    }
  }, [result]);
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Login to Start</Text>
        <InputForm label={"Email"} onChange={setEmail} error={""} />
        <InputForm label={"Password"} onChange={setPassword} error={""} isSecure={true} />
        <SubmitButton onPress={onSubmit} title={"Send"} />
        <Text style={styles.sub}>First time on GameCall?</Text>
        <Pressable onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.subLink}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    color: "black",
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
});
