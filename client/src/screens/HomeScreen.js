import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { View, Text, Button } from "native-base";
import React, { useEffect, useState } from "react";

export default function HomeScreen({ navigation }) {
  const [userLogin, setUserLogin] = useState("");
  const [token, setToken] = useState("");

  const getData = async () => {
    try {
      const userLogin = await AsyncStorage.getItem("user");
      const acc_token = await AsyncStorage.getItem("access_token");
      if (userLogin) {
        setUserLogin(userLogin);
      }
      if (acc_token) {
        setToken(acc_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <Text>Hello, {userLogin}</Text>
      <Text>token, {token}</Text>
      <Button
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("access_token");
            console.log("Logged out");
            navigation.navigate("Login");
          } catch (err) {
            console.log(err);
          }
        }}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}
