import Mainapp from "./MainApp";
import Signscreens from "./SignScreens";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { changeLogStatus } from "../store/actions";
import Loadingscreen from "./LoadingScreen";

const Mainnavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const logStatus = useSelector((state) => {
    return state.logStatus;
  });
  const checkToken = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem("access_token");
      // console.log(value);

      if (value) {
        dispatch(changeLogStatus(true));
        setIsLoading(false);
      } else {
        dispatch(changeLogStatus(false));
        setIsLoading(false);
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
      {isLoading ? (
        <Loadingscreen />
      ) : logStatus ? (
        <Mainapp />
      ) : (
        <Signscreens />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Mainnavigation;
