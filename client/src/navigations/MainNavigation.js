import Mainapp from "./MainApp";
import Signscreens from "./SignScreens";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { changeLogStatus } from "../store/actions";

const Mainnavigation = () => {
  const dispatch = useDispatch();
  const logStatus = useSelector((state) => {
    return state.logStatus;
  });
  const checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem("access_token");
      if (value) {
        dispatch(changeLogStatus(true));
      } else {
        dispatch(changeLogStatus(false));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <NavigationContainer>
      {logStatus ? <Mainapp /> : <Signscreens />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Mainnavigation;
