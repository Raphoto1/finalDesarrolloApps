//imports de app
import { StyleSheet, Text, View, Input, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//imports propios
import { colors } from "../constants/colors";
import InputForm from "../componets/InputForm";
import SubmitButton from "../componets/SubmitButton";
import { useLoginMutation } from "../services/authService";
import { setUser } from "../features/User/UserSlice";
import { loginSchema } from "../validations/signupSchema";

const LoginScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  //form General
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //form Errors
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [generalError, setGeneralError] = useState('');
  //form Functions
  const [triggerLogin, result] = useLoginMutation();

  const onSubmit = () => {
    try {
      const validation=loginSchema.validateSync({email,password})
      triggerLogin({ email, password });
    } catch (err) {
      switch (err.path) {
        case 'email':
          setErrorMail(err.message);
          break;
        case 'password':
          setErrorPassword(err.message)
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId:result.data.localId
        })
      );
    }
    if (result.error) {
      setGeneralError(result.error.data.error.message);
    }
  }, [result]);
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Login to Start</Text>
        <InputForm label={"Email"} onChange={setEmail} error={errorMail} />
        <InputForm label={"Password"} onChange={setPassword} error={errorPassword} isSecure={true} />
        <SubmitButton onPress={onSubmit} title={"Send"} />
        <Text style={styles.sub}>First time on GameCall?</Text>
        <Pressable onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.subLink}>Sign Up</Text>
        </Pressable>
        {generalError?
      <Text style={styles.error}>{generalError}</Text>:null
    }
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
  error: {
    paddintTop: 2,
    fontSize: 16,
    color: 'red',
    fontFamily: 'LatoRegular',
},
});
