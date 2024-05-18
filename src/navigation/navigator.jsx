//imports de app
import { StyleSheet, Text, View } from "react-native";
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
        console.log({sessionsqlTraida:session});
        if (session?.rows.length) {
          const user = session.rows._array[0];
          console.log({userdesql:user});
          dispatch(setUser({
            localId: user.localId,
            email: user.email,
            idToken: user.idToken,
          }));
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return <NavigationContainer>{user ? <BottomTabNavigator /> : <AuthStack />}</NavigationContainer>;
};

export default Navigator;

const styles = StyleSheet.create({});
