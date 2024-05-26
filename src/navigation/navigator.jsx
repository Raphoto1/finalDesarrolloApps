//imports de app
import { StyleSheet, Text, View,Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
//imports propios
import BottomTabNavigator from "./BottomTabNavigator";
import AuthStack from "./AuthStack";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from "../db";
import { setUser } from "../features/User/UserSlice";

const Navigator = () => {
  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.auth.value);
  useEffect(() => {
    (async () => {
      try {
        const session = await fetchSession();
        if (session?.rows.length) {
          const user = session.rows._array[0];
          dispatch(setUser({
            localId: user.localId,
            email: user.email,
            idToken: user.idToken,
          }));
        }
      } catch (error) {
        Alert.alert("Error on Session", "restart app", [
          {
            text: "Ok",
          },
        ]);
      }
    })();
  }, []);
  return <NavigationContainer>{user ? <BottomTabNavigator /> : <AuthStack />}</NavigationContainer>;
};

export default Navigator;

const styles = StyleSheet.create({});
