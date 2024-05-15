//imports de app
import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//imports Propios
import { colors } from "../constants/colors";
import InputForm from "../componets/InputForm";
import SubmitButton from "../componets/SubmitButton";
import { useSignUpMutation } from "../services/authService";
import { setUser } from "../features/User/UserSlice";
import { signupSchema } from "../validations/signupSchema";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //form General
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //form Errors
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [generalError, setGeneralError] = useState('');
  //formFuntion
  const [triggerSignup, result] = useSignUpMutation();

  const onSubmit = () => {
    try {
      const validation = signupSchema.validateSync({ email, password, confirmPassword });
      triggerSignup({
        email,
        password,
      });
    } catch (err) {
      switch (err.path) {
        case "email":
          setErrorMail(err.message);
          setErrorPassword("");
          setErrorConfirmPassword("");
          break;
        case "password":
          setErrorPassword(err.message);
          break;
        case "confirmPassword":
          setErrorConfirmPassword(err.message);
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
        <Text style={styles.title}>Signup</Text>
        <InputForm label={"Email"} onChange={setEmail} error={errorMail} isSecure={false} />
        <InputForm label={"Password"} onChange={setPassword} error={errorPassword} isSecure={true} />
        <InputForm label={"Confirm Password"} onChange={setConfirmPassword} error={errorConfirmPassword} isSecure={true} />
        <SubmitButton onPress={onSubmit} title='Signup' />
        <Text style={styles.sub}>Already GameCalling?</Text>
        <Pressable onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.subLink}>Login</Text>
        </Pressable>
        {generalError?
      <Text style={styles.error}>{generalError}</Text>:null
    }
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
  error: {
    paddintTop: 2,
    fontSize: 16,
    color: 'red',
    fontFamily: 'LatoRegular',
},
});
