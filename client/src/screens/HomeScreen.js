import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text
} from "native-base";
import React, { useEffect, useState } from "react";

export default function HomeScreen() {
  const [userLogin, setUserLogin] = useState("")

  const getData = async () => {
    try {
      const userLogin = await AsyncStorage.getItem("user")
      if (userLogin) {
        setUserLogin(userLogin)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View>
      <Text>Hello, {userLogin}</Text>
      <StatusBar style="auto" />
    </View>
  )
}